"use client";

import React from 'react';
import { useGetPopularCountriesQuery } from '@/store/modules/destination/destinationApi';
import { LocationUtils } from '@/service/helpers/locationUtils';
import { appStrings, ArrowRightSvg } from "@/service";
import BlurText from "../animation/BlurText";
import Link from "next/link";
import DestinationCard from "../shared/DestinationCard";
import DestinationCardSkeleton from "../shared/DestinationCardSkeleton";

function RecomendedDestinations() {
  // Get user's country code from location or default to 'BD'
  const userLocation = LocationUtils.getLocation();
  
  // Map country names to country codes (expand as needed)
  const getCountryCode = (countryName: string | null): string => {
    if (!countryName) return 'BD';
    
    const countryMap: Record<string, string> = {
      'Bangladesh': 'BD',
      'United States': 'US',
      'United Kingdom': 'GB',
      'Canada': 'CA',
      'Australia': 'AU',
      'India': 'IN',
      'Pakistan': 'PK',
      'Malaysia': 'MY',
      'Singapore': 'SG',
      'Thailand': 'TH',
      'Indonesia': 'ID',
      'Philippines': 'PH',
      // Add more countries as needed
    };
    
    return countryMap[countryName] || 'BD';
  };
  
  const countryCode = getCountryCode(userLocation?.country);
  
  const { 
    data: popularCountriesData, 
    isLoading,
    error 
  } = useGetPopularCountriesQuery({ country_code: countryCode });
  
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
              <p>Failed to load recommended destinations. Please try again later.</p>
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
