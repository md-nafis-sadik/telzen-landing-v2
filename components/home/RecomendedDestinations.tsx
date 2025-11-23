"use client";

import React from 'react';
import { useGetPopularCountriesQuery } from '@/store/modules/destination/destinationApi';
import { getCountryCode as getStoredCountryCode } from '@/hook/useLocation';
import { useAppSelector } from '@/store/hooks';
import { appStrings, ArrowRightSvg } from "@/service";
import BlurText from "../animation/BlurText";
import Link from "next/link";
import DestinationCard from "../shared/DestinationCard";
import DestinationCardSkeleton from "../shared/DestinationCardSkeleton";

function RecomendedDestinations() {
  const { isAuthenticated, auth } = useAppSelector((state) => state.auth);
  
  const getApiCountryCode = (): string | undefined => {
    if (isAuthenticated && auth.country?.code) {
      return auth.country.code;
    }
    
    const storedCode = getStoredCountryCode();
    if (storedCode !== 'BD' || typeof window !== 'undefined' && localStorage.getItem('telzen_country_code')) {
      return storedCode;
    }

    return undefined;
  };
  
  const countryCode = getApiCountryCode();

  const {
    data: popularCountriesData,
    isLoading,
    error,
  } = useGetPopularCountriesQuery(
    countryCode ? { country_code: countryCode } : {}
  );

  const popularCountries = popularCountriesData?.data?.slice(0, 4) || [];
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
            <div className="text-center text-text-700 py-8">
              <p>
                Failed to load recommended destinations. Please try again later.
              </p>
            </div>
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
