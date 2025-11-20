"use client";

import React, { useState, useEffect } from "react";
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
import { appStrings, ArrowRightSvg } from "@/service";
import HeaderPrev from "../shared/HeaderPrev";
import SearchInput from "../shared/SearchInput";
import BigToggleSwitch from "../shared/BigToggleSwitch";
import DestinationCard from "../shared/DestinationCard";
import DestinationCardSkeleton from "../shared/DestinationCardSkeleton";
import EmptyState from "../shared/EmptyState";

function AllDestinations() {
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

  const handleToggle = (type: DestinationType) => {
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
              {isFetching && currentPage > 1 && (
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
              {hasMore && !isFetching && (
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
            <EmptyState 
              searchQuery={apiSearchQuery}
              title="No Destinations Found"
              description="We couldn't find any destinations. Please try again later."
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default AllDestinations;
