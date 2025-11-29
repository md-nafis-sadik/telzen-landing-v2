"use client";

import React from "react";
import { appStrings, ArrowRightSvg } from "@/service";
import HeaderPrev from "../shared/HeaderPrev";
import SearchInput from "../shared/SearchInput";
import BigToggleSwitch from "../shared/BigToggleSwitch";
import DestinationCard from "../shared/DestinationCard";
import DestinationCardSkeleton from "../shared/DestinationCardSkeleton";
import EmptyState from "../shared/EmptyState";
import { useAllDestinations } from "@/hook";
import Button from "../shared/Button";
import { motion } from "motion/react";

function AllDestinations() {
  const {
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
  } = useAllDestinations();

  return (
    <>
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
        <div className="w-full flex flex-col items-center justify-center py-12">
          <EmptyState
            title="Error Loading Destinations"
            description="We couldn't load the destinations. Please try again."
            className="!py-0 !md:py-0 !lg:py-0 w-full"
            isButton={false}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="cursor-pointer mt-6 px-4 md:px-6 py-2 md:py-3 bg-primary-700 hover:bg-primary-800 text-white rounded-full font-semibold transition-colors duration-200 flex items-center gap-2 text-sm md:text-base"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Reload Page
          </motion.button>
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
              <DestinationCard
                key={item._id}
                index={index}
                data={item}
                isRegional={activeType === "regions"}
              />
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
              <Button
                variant="link"
                onClick={handleLoadMore}
                rightIcon={<ArrowRightSvg />}
                className="mt-6 lg:mt-10"
              >
                {appStrings.loadMore}
              </Button>
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
    </>
  );
}

export default AllDestinations;
