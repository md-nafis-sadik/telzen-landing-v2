"use client";

import React from "react";
import { appStrings, ArrowRightSvg } from "@/service";
import BlurText from "../animation/BlurText";
import Link from "next/link";
import DestinationCard from "../shared/DestinationCard";
import DestinationCardSkeleton from "../shared/DestinationCardSkeleton";
import ErrorOverlay from "../shared/ErrorOverlay";
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
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-4 mt-6 md:mt-10 w-full mx-auto">
              {Array.from({ length: 4 }).map((_, index) => (
                <DestinationCardSkeleton key={index} index={index} />
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <>
              <div className="relative mt-6 md:mt-10 mb-6">
                <ErrorOverlay
                  title="Failed to Load Recommendations"
                  description="We couldn't fetch recommended destinations. Please try again."
                  buttonText="Reload Page"
                  backgroundColor="bg-white/60"
                  descriptionClassName="text-text-700"
                />

                {/* Fallback cards below blur */}
                <div className="hidden md:grid grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-4 opacity-50 p-4">
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

                <div className="grid md:hidden grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-4 opacity-50 p-4">
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
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-4 mt-6 md:mt-10 w-full mx-auto">
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
          {/* <div>
            <Link
              href="/destinations"
              className="flex justify-center items-center text-text-50 gap-2 mt-6 lg:mt-10"
            >
              <span>See more</span>
              <ArrowRightSvg />
            </Link>
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default RecomendedDestinations;
