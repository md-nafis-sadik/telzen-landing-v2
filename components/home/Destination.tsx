"use client";

import React from "react";
import { motion } from "motion/react";
import { appStrings, ArrowRightSvg } from "@/service";
import BlurText from "../animation/BlurText";
import Link from "next/link";
import BigToggleSwitch from "../shared/BigToggleSwitch";
import DestinationCard from "../shared/DestinationCard";
import DestinationCardSkeleton from "../shared/DestinationCardSkeleton";
import ErrorOverlay from "../shared/ErrorOverlay";
import SeeMoreLink from "../shared/SeeMoreLink";
import { useDestination } from "@/hook";

function Destination() {
  const { activeType, isLoading, currentData, hasError, handleToggle } =
    useDestination();
  return (
    <section
      className="py-10 md:py-16 lg:py-20 bg-primary-black lg:min-h-screen flex items-center"
      id="destinations"
    >
      <div className="w-full">
        <div className="containerX">
          <div className="w-full max-w-[728px] mx-auto text-center">
            <h2 className="title text-center text-primary-500 overflow-hidden">
              <BlurText
                text={appStrings.destinations}
                translateY={[50, 0]}
                className="md:tracking-[-2px]"
              />
            </h2>
            <p className="text-lg md:text-2xl lg:text-3xs text-text-200 mt-2 md:mt-4 overflow-hidden">
              <BlurText
                delay={50}
                translateX={[-30, 0]}
                text={appStrings.discoverOurMostPopularDesc}
              />
            </p>
            <div className="w-full flex justify-center mt-6">
              <BigToggleSwitch onToggle={handleToggle} />
            </div>
          </div>

          {/* Error State */}
          {hasError && (
            <>
              <div className="relative mt-6 md:mt-10 mb-6">
                <ErrorOverlay
                  title="Failed to Load Destinations"
                  description="We couldn't fetch the latest destinations. Please try again."
                  buttonText="Reload Page"
                  backgroundColor="bg-primary-black/60"
                />

                {/* Fallback cards below blur */}
                <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4 opacity-50 p-4">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <DestinationCard
                      key={`error-${index}`}
                      index={index}
                      destinationImage="/images/new-zealand.webp"
                      destinationName="New Zealand"
                      destinationPrice="5.00"
                    />
                  ))}
                </div>

                {/* Fallback cards below blur */}
                <div className="grid md:hidden grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4 opacity-50 p-4">
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

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4 mt-6 md:mt-10 w-full mx-auto">
              {Array.from({ length: 8 }).map((_, index) => (
                <DestinationCardSkeleton key={index} index={index} />
              ))}
            </div>
          )}

          {/* Data State */}
          {!isLoading && !hasError && currentData.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4 mt-6 md:mt-10 w-full mx-auto">
              {currentData.map((item, index) => (
                <DestinationCard
                  key={item._id}
                  index={index}
                  data={item}
                  isRegional={activeType === "regions"}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !hasError && currentData.length === 0 && (
            <div className="text-center text-text-200 py-8">
              <p>No {activeType} found.</p>
            </div>
          )}

          {/* See More Button */}
          {!isLoading && currentData.length > 0 && (
            <SeeMoreLink
              href="/destinations"
              text="See more"
              className="text-text-50"
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default Destination;
