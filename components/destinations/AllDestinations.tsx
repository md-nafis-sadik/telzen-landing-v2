"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  useGetRegionsQuery,
  useGetCountriesQuery,
} from "@/store/modules/destination/destinationApi";
import {
  setDestinationType,
  setDestinationPageSearch,
  resetDestinationPage,
  DestinationType,
} from "@/store/modules/destination/destinationSlice";
import { useSearchParams } from "next/navigation";
import { appStrings, ArrowRightSvg } from "@/service";
import HeaderPrev from "../shared/HeaderPrev";
import SearchInput from "../shared/SearchInput";
import BigToggleSwitch from "../shared/BigToggleSwitch";
import DestinationCard from "../shared/DestinationCard";
import DestinationCardSkeleton from "../shared/DestinationCardSkeleton";

function AllDestinations() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const { activeType } = useAppSelector((state) => state.destination);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [allDestinations, setAllDestinations] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [apiSearchQuery, setApiSearchQuery] = useState(
    searchParams.get("search") || ""
  );

  const itemsPerPage = 15;
  const loadMoreCount = 5;

  // API queries for both regions and countries
  const {
    data: regionsData,
    isLoading: regionsLoading,
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
  const currentData = activeType === "regions" ? regionsData : countriesData;
  const hasError = activeType === "regions" ? regionsError : countriesError;

  // Set search query from URL on mount
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    setSearchQuery(urlSearch);
    setApiSearchQuery(urlSearch);
    dispatch(setDestinationPageSearch(urlSearch));
    // Reset page and data when URL search changes
    setCurrentPage(1);
    setAllDestinations([]);
    setHasMore(true);
  }, [searchParams, dispatch]);

  // Update destinations when data changes
  useEffect(() => {
    if (currentData?.data) {
      if (currentPage === 1) {
        setAllDestinations(currentData.data);
      } else {
        setAllDestinations((prev) => [...prev, ...currentData.data]);
      }
      setHasMore(currentData.meta.has_next_page);
    }
  }, [currentData, currentPage]);

  // Reset when toggle changes
  useEffect(() => {
    setCurrentPage(1);
    setAllDestinations([]);
    setHasMore(true);
  }, [activeType]);

  // Immediate search effect - always call API
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(1);
      setAllDestinations([]);
      setHasMore(true);
      setApiSearchQuery(searchQuery);
      dispatch(setDestinationPageSearch(searchQuery));
    }, 500); // 500ms delay

    return () => clearTimeout(timeoutId);
  }, [searchQuery, dispatch]);

  const handleToggle = (type: DestinationType) => {
    dispatch(setDestinationType(type));
    dispatch(resetDestinationPage());
    // Reset local state when toggling
    setCurrentPage(1);
    setAllDestinations([]);
    setHasMore(true);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSearch = () => {
    // Reset page and data when performing new search
    setCurrentPage(1);
    setAllDestinations([]);
    setHasMore(true);
    setApiSearchQuery(searchQuery);
    dispatch(setDestinationPageSearch(searchQuery));
  };

  const handleLoadMore = () => {
    if (hasMore && !isLoading) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <section
      className="py-10 md:py-16 lg:py-20 bg-white lg:min-h-screen flex"
      id="allDestinations"
    >
      <div className="w-full">
        <div className="containerX">
          <HeaderPrev text={appStrings.destinations} />
          <div className="w-full flex flex-col gap-4 sm:flex-row items-center justify-between my-6 md:my-8 lg:my-10">
            <BigToggleSwitch onToggle={handleToggle} />

            <div className="w-full max-w-[360px] px-2 lg:px-0">
              <SearchInput
                placeholder="Your destination"
                value={searchQuery}
                onChange={handleSearchChange}
                onSearch={handleSearch}
              />
            </div>
          </div>

          {/* Error State */}
          {hasError && (
            <div className="text-center text-text-700 py-8">
              <p>Failed to load destinations. Please try again later.</p>
            </div>
          )}

          {/* Loading State */}
          {isLoading && currentPage === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 md:gap-3 lg:gap-4 mt-6 md:mt-10 w-full mx-auto">
              {Array.from({ length: itemsPerPage }).map((_, index) => (
                <DestinationCardSkeleton key={index} index={index} />
              ))}
            </div>
          )}

          {/* Data State */}
          {!isLoading && !hasError && allDestinations.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 md:gap-3 lg:gap-4 mt-6 md:mt-10 w-full mx-auto">
                {allDestinations.map((item, index) => (
                  <DestinationCard key={item._id} index={index} data={item} />
                ))}
              </div>

              {/* Load More Loading */}
              {isLoading && currentPage > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 md:gap-3 lg:gap-4 mt-6 w-full mx-auto">
                  {Array.from({ length: loadMoreCount }).map((_, index) => (
                    <DestinationCardSkeleton
                      key={`load-more-${index}`}
                      index={index}
                    />
                  ))}
                </div>
              )}

              {/* Load More Button */}
              {hasMore && !isLoading && (
                <div className="flex justify-center items-center">
                  <button
                    onClick={handleLoadMore}
                    className="flex justify-center items-center text-primary-700 tracking-wide font-medium gap-2 mt-6 lg:mt-10 cursor-pointer w-max hover:text-primary-800 transition-colors"
                  >
                    <span>Load More</span>
                    <ArrowRightSvg />
                  </button>
                </div>
              )}
            </>
          )}

          {/* Empty State */}
          {!isLoading && !hasError && allDestinations.length === 0 && (
            <div className="text-center text-text-700 py-8">
              <p>
                No destinations found
                {searchQuery ? ` for "${searchQuery}"` : ""}.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default AllDestinations;
