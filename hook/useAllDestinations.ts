import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  useGetRegionsQuery,
  useGetCountriesQuery,
} from "@/store/modules/destination/destinationApi";
import {
  setDestinationType,
  DestinationType,
} from "@/store/modules/destination/destinationSlice";
import { useSearchParams } from "next/navigation";

export const useAllDestinations = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const { activeType } = useAppSelector((state) => state.destination);

  const itemsPerPage = 15;
  const loadMoreCount = 15;

  const [regionsPage, setRegionsPage] = useState(1);
  const [countriesPage, setCountriesPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [apiSearchQuery, setApiSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [regionsAccumulatedData, setRegionsAccumulatedData] = useState<Map<number, any[]>>(
    new Map()
  );
  const [countriesAccumulatedData, setCountriesAccumulatedData] = useState<Map<number, any[]>>(
    new Map()
  );
  
  // Use the appropriate page based on active type
  const currentPage = activeType === "regions" ? regionsPage : countriesPage;

  // API queries for both regions and countries
  const {
    data: regionsData,
    isLoading: regionsLoading,
    isFetching: regionsFetching,
    error: regionsError,
  } = useGetRegionsQuery(
    {
      page: currentPage,
      limit: itemsPerPage,
      search: apiSearchQuery,
    },
    {
      skip: activeType !== "regions",
    }
  );

  const {
    data: countriesData,
    isLoading: countriesLoading,
    isFetching: countriesFetching,
    error: countriesError,
  } = useGetCountriesQuery(
    {
      page: currentPage,
      limit: itemsPerPage,
      search: apiSearchQuery,
    },
    {
      skip: activeType !== "countries",
    }
  );

  // Determine current state based on active type
  const isLoading =
    activeType === "regions" ? regionsLoading : countriesLoading;
  const isFetching =
    activeType === "regions" ? regionsFetching : countriesFetching;
  const currentData = activeType === "regions" ? regionsData : countriesData;
  const hasError = activeType === "regions" ? regionsError : countriesError;
  const hasMore = currentData?.meta?.has_next_page ?? false;

  // Compute allDestinations based on activeType
  const accumulatedData = activeType === "regions" ? regionsAccumulatedData : countriesAccumulatedData;
  const sortedPages = Array.from(accumulatedData.keys()).sort((a, b) => a - b);
  const allData = sortedPages.flatMap((page) => accumulatedData.get(page) || []);
  
  // Deduplicate by _id to prevent duplicate entries
  const seenIds = new Set<string>();
  const allDestinations = allData.filter((item: any) => {
    if (seenIds.has(item._id)) {
      return false;
    }
    seenIds.add(item._id);
    return true;
  });

  // Reset accumulated data and pages when search changes
  useEffect(() => {
    setRegionsAccumulatedData(new Map());
    setCountriesAccumulatedData(new Map());
    setRegionsPage(1);
    setCountriesPage(1);
  }, [apiSearchQuery]);

  // Update regions accumulated data - only when data is fresh and matches current activeType
  useEffect(() => {
    // Only process if we're actually viewing regions and data is available
    if (activeType === "regions" && regionsData?.data && regionsData.data.length > 0) {
      // Validate that this is actually region data (not cached country data)
      const isValidRegionData = regionsData.data.every((item: any) => 'region_id' in item);
      
      if (isValidRegionData) {
        setRegionsAccumulatedData((prev) => {
          const newMap = new Map(prev);
          // Always set the data for current page (handles both new page and refresh)
          newMap.set(currentPage, regionsData.data);
          return newMap;
        });
      }
    }
  }, [regionsData, currentPage, activeType]);

  // Update countries accumulated data - only when data is fresh and matches current activeType
  useEffect(() => {
    // Only process if we're actually viewing countries and data is available
    if (activeType === "countries" && countriesData?.data && countriesData.data.length > 0) {
      // Validate that this is actually country data (not cached region data)
      const isValidCountryData = countriesData.data.every((item: any) => 'country_id' in item);
      
      if (isValidCountryData) {
        setCountriesAccumulatedData((prev) => {
          const newMap = new Map(prev);
          // Always set the data for current page (handles both new page and refresh)
          newMap.set(currentPage, countriesData.data);
          return newMap;
        });
      }
    }
  }, [countriesData, currentPage, activeType]);

  const handleToggle = (typeOrText: DestinationType | string) => {
    // Convert button text to DestinationType if needed
    let type: DestinationType;
    if (typeOrText === "Countries" || typeOrText === "countries") {
      type = "countries";
    } else if (typeOrText === "Regional Packs" || typeOrText === "regions") {
      type = "regions";
    } else {
      type = typeOrText as DestinationType;
    }

    dispatch(setDestinationType(type));
    // Use current search query from input field when toggling
    setApiSearchQuery(searchQuery);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSearch = () => {
    setRegionsPage(1);
    setCountriesPage(1);
    setApiSearchQuery(searchQuery);
  };

  const handleLoadMore = () => {
    if (hasMore && !isFetching) {
      if (activeType === "regions") {
        setRegionsPage((prev) => prev + 1);
      } else {
        setCountriesPage((prev) => prev + 1);
      }
    }
  };

  return {
    activeType,
    searchQuery,
    apiSearchQuery,
    allDestinations,
    isLoading,
    isFetching,
    hasError,
    hasMore,
    currentPage,
    itemsPerPage,
    loadMoreCount,
    handleToggle,
    handleSearchChange,
    handleSearch,
    handleLoadMore,
  };
};
