import { useState, useEffect, useCallback, useRef } from "react";
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
  const [regionsAccumulatedData, setRegionsAccumulatedData] = useState<
    Map<number, any[]>
  >(new Map());
  const [countriesAccumulatedData, setCountriesAccumulatedData] = useState<
    Map<number, any[]>
  >(new Map());

  const searchQueryRef = useRef(searchQuery);
  
  useEffect(() => {
    searchQueryRef.current = searchQuery;
  }, [searchQuery]);

  const currentPage = activeType === "regions" ? regionsPage : countriesPage;

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

  const isLoading =
    activeType === "regions" ? regionsLoading : countriesLoading;
  const isFetching =
    activeType === "regions" ? regionsFetching : countriesFetching;
  const currentData = activeType === "regions" ? regionsData : countriesData;
  const hasError = activeType === "regions" ? regionsError : countriesError;
  const hasMore = currentData?.meta?.has_next_page ?? false;

  const accumulatedData =
    activeType === "regions"
      ? regionsAccumulatedData
      : countriesAccumulatedData;
  const sortedPages = Array.from(accumulatedData.keys()).sort((a, b) => a - b);
  const allData = sortedPages.flatMap(
    (page) => accumulatedData.get(page) || []
  );

  const seenIds = new Set<string>();
  const allDestinations = allData.filter((item: any) => {
    if (seenIds.has(item._id)) {
      return false;
    }
    seenIds.add(item._id);
    return true;
  });

  useEffect(() => {
    setRegionsAccumulatedData(new Map());
    setCountriesAccumulatedData(new Map());
    setRegionsPage(1);
    setCountriesPage(1);
  }, [apiSearchQuery]);

  useEffect(() => {
    if (
      activeType === "regions" &&
      regionsData?.data &&
      regionsData.data.length > 0
    ) {
      const isValidRegionData = regionsData.data.every(
        (item: any) => "region_id" in item
      );

      if (isValidRegionData) {
        setRegionsAccumulatedData((prev) => {
          const newMap = new Map(prev);
          newMap.set(currentPage, regionsData.data);
          return newMap;
        });
      }
    }
  }, [regionsData, currentPage, activeType]);

  useEffect(() => {
    if (
      activeType === "countries" &&
      countriesData?.data &&
      countriesData.data.length > 0
    ) {
      const isValidCountryData = countriesData.data.every(
        (item: any) => "country_id" in item
      );

      if (isValidCountryData) {
        setCountriesAccumulatedData((prev) => {
          const newMap = new Map(prev);
          newMap.set(currentPage, countriesData.data);
          return newMap;
        });
      }
    }
  }, [countriesData, currentPage, activeType]);

  const handleToggle = (typeOrText: DestinationType | string) => {
    let type: DestinationType;
    if (typeOrText === "Countries" || typeOrText === "countries") {
      type = "countries";
    } else if (typeOrText === "Regional Packs" || typeOrText === "regions") {
      type = "regions";
    } else {
      type = typeOrText as DestinationType;
    }

    dispatch(setDestinationType(type));
    
    setSearchQuery("");
    setApiSearchQuery("");
    setRegionsAccumulatedData(new Map());
    setCountriesAccumulatedData(new Map());
    setRegionsPage(1);
    setCountriesPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSearch = useCallback(() => {
    setRegionsPage(1);
    setCountriesPage(1);
    setApiSearchQuery(searchQueryRef.current);
  }, []);

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