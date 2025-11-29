"use client";

import React from "react";
import { motion } from "motion/react";
import { appStrings, ArrowRightSvg } from "@/service";
import BlurText from "../animation/BlurText";
import Link from "next/link";
import BigToggleSwitch from "../shared/BigToggleSwitch";
import DestinationCard from "../shared/DestinationCard";
import DestinationCardSkeleton from "../shared/DestinationCardSkeleton";
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
                {/* Blur overlay */}
                <div className="absolute inset-0 bg-primary-black/60 backdrop-blur-sm rounded-3xl z-10 flex flex-col items-center justify-center px-4">
                  <div className="text-center max-w-md">
                    <h3 className="text-xl md:text-2xl font-bold text-primary-700 mb-2">
                      Failed to Load Destinations
                    </h3>
                    <p className="text-text-200 mb-6">
                      We couldn&apos;t fetch the latest destinations. Please try
                      again.
                    </p>
                    <button
                      onClick={() => window.location.reload()}
                      className="px-6 py-3 bg-primary-700 hover:bg-primary-800 text-white rounded-full font-semibold transition-colors duration-200 flex items-center gap-2 mx-auto"
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

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3 lg:gap-4 mt-6 md:mt-10 w-full mx-auto">
              {Array.from({ length: 8 }).map((_, index) => (
                <DestinationCardSkeleton key={index} index={index} />
              ))}
            </div>
          )}

          {/* Data State */}
          {!isLoading && !hasError && currentData.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3 lg:gap-4 mt-6 md:mt-10 w-full mx-auto">
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
            <div className="flex justify-center mt-6 lg:mt-10">
              <Link
                href="/destinations"
                className="group flex items-center gap-1 text-text-50"
              >
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex items-center gap-2"
                >
                  <span>See more</span>
                  <ArrowRightSvg />
                </motion.span>
              </Link>
            </div>
          )}
        </div>
        {/* <EmblaCarousel
          className="my-7 md:my-10"
          options={{ containScroll: "trimSnaps", loop: true }}
          playOnInit={true}
        >
          <div className="flex">
            {destinations.map((destination) => (
              <div
                key={destination?.id}
                className="w-56 min-w-56 md:w-[282px] md:min-w-[282px] h-64 md:h-[300px] p-6 rounded-3xl text-white mx-2 select-none"
                style={{
                  backgroundColor: destination?.color,
                }}
              >
                <Image
                  src={destination?.image_url}
                  alt={destination?.name}
                  width={100}
                  height={100}
                  className="size-12 object-fill"
                />
                <h3 className="text-2xl md:text-3xl lg:text-5xl font-barlow font-bold md:font-black uppercase mt-3">
                  {destination.name}
                </h3>
                <p className="text-lg md:text-xl lg:text-2xl mt-1">
                  {destination.description}
                </p>
              </div>
            ))}
          </div>
        </EmblaCarousel>
        <p className="px-6 text-lg text-text-500 text-center">
          <BlurText
            translateX={[-30, 0]}
            delay={50}
            text={appStrings.pleaseCheckOurPrice}
          />
        </p> */}
      </div>
    </section>
  );
}

export default Destination;
