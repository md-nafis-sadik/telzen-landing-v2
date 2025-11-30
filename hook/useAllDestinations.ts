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
  const loadMoreCount = 5;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [apiSearchQuery, setApiSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [allDestinations, setAllDestinations] = useState<any[]>([]);

  // API queries for both regions and countries
  const {
    data: regionsData,
    isLoading: regionsLoading,
    isFetching: regionsFetching,
    error: regionsError,
  } = useGetRegionsQuery(
    {
      page: currentPage,
      limit: currentPage === 1 ? itemsPerPage : loadMoreCount,
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
      limit: currentPage === 1 ? itemsPerPage : loadMoreCount,
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

  // Update destinations when data changes
  useEffect(() => {
    if (currentData?.data) {
      if (currentPage === 1) {
        setAllDestinations(currentData.data);
      } else {
        setAllDestinations((prev) => [...prev, ...currentData.data]);
      }
    }
  }, [currentData, currentPage]);

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
    setCurrentPage(1);
    setAllDestinations([]);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setAllDestinations([]);
    setApiSearchQuery(searchQuery);
  };

  const handleLoadMore = () => {
    if (hasMore && !isFetching) {
      setCurrentPage((prev) => prev + 1);
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
