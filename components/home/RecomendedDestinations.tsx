"use client";

import React from "react";
import { appStrings, ArrowRightSvg } from "@/service";
import BlurText from "../animation/BlurText";
import Link from "next/link";
import DestinationCard from "../shared/DestinationCard";
import DestinationCardSkeleton from "../shared/DestinationCardSkeleton";
import { useRecommendedDestinations } from "@/hook";

function RecomendedDestinations() {
  const { popularCountries, isLoading, error } = useRecommendedDestinations();
  return (
    <section
      className="py-10 md:py-16 lg:py-20 bg-white flex items-center"
      id="recomendedDestinations"
    >
      <div className="w-full">
        <div className="containerX">
          <div className="w-full max-w-[728px] mx-auto text-center">
            <h2 className="title text-center text-primary-700 overflow-hidden">
              <BlurText
                text={appStrings.recomended}
                translateY={[50, 0]}
                className="md:tracking-[-2px]"
              />
            </h2>
            <p className="text-lg md:text-2xl lg:text-3xs text-text-700 mt-2 md:mt-4 overflow-hidden">
              <BlurText
                delay={50}
                translateX={[-30, 0]}
                text={appStrings.basedOnPublicDemand}
              />
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3 lg:gap-4 mt-6 md:mt-10 w-full mx-auto">
              {Array.from({ length: 4 }).map((_, index) => (
                <DestinationCardSkeleton key={index} index={index} />
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <>
              <div className="relative mt-6 md:mt-10 mb-6">
                {/* Blur overlay */}
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-3xl z-10 flex flex-col items-center justify-center px-4">
                  <div className="text-center max-w-md">
                    <h3 className="text-xl md:text-2xl font-bold text-primary-700 mb-2">
                      Failed to Load Recommendations
                    </h3>
                    <p className="text-text-700 mb-6">
                      We couldn&apos;t fetch recommended destinations. Please
                      try again.
                    </p>
                    <button
                      onClick={() => window.location.reload()}
                      className="px-4 md:px-6 py-3 bg-primary-700 hover:bg-primary-800 text-white rounded-full font-semibold transition-colors duration-200 flex items-center gap-2 mx-auto cursor-pointer"
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
                    </button>
                  </div>
                </div>

                {/* Fallback cards below blur */}
                <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3 lg:gap-4 opacity-50 p-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <DestinationCard
                      key={`error-${index}`}
                      index={index}
                      destinationImage="/images/new-zealand.webp"
                      destinationName="New Zealand"
                      destinationPrice="5.00"
                    />
                  ))}
                </div>

                <div className="grid md:hidden grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3 lg:gap-4 opacity-50 p-4">
                  {Array.from({ length: 2 }).map((_, index) => (
                    <DestinationCard
                      key={`error-${index}`}
                      index={index}
                      destinationImage="/images/new-zealand.webp"
                      destinationName="New Zealand"
                      destinationPrice="5.00"
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Data State */}
          {!isLoading && !error && popularCountries.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3 lg:gap-4 mt-6 md:mt-10 w-full mx-auto">
              {popularCountries.map((item, index) => (
                <DestinationCard
                  key={item._id}
                  index={index}
                  data={item}
                  isRegional={false}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && popularCountries.length === 0 && (
            <div className="text-center text-text-700 py-8">
              <p>No recommended destinations found.</p>
            </div>
          )}
          <div>
            <Link
              href="/destinations"
              className="flex justify-center items-center text-text-50 gap-2 mt-6 lg:mt-10"
            >
              <span>See more</span>
              <ArrowRightSvg />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecomendedDestinations;
