"use client";

import React from 'react';
import { motion } from 'motion/react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useGetRegionsQuery, useGetCountriesQuery } from '@/store/modules/destination/destinationApi';
import { setDestinationType, DestinationType } from '@/store/modules/destination/destinationSlice';
import { appStrings, ArrowRightSvg } from "@/service";
import BlurText from "../animation/BlurText";
import Link from "next/link";
import BigToggleSwitch from "../shared/BigToggleSwitch";
import DestinationCard from "../shared/DestinationCard";
import DestinationCardSkeleton from "../shared/DestinationCardSkeleton";

function Destination() {
  const dispatch = useAppDispatch();
  const { activeType } = useAppSelector((state) => state.destination);

  // API queries
  const { 
    data: regionsData, 
    isLoading: regionsLoading,
    error: regionsError 
  } = useGetRegionsQuery({ 
    page: 1, 
    limit: 8 
  }, {
    skip: activeType !== 'regions'
  });

  const { 
    data: countriesData, 
    isLoading: countriesLoading,
    error: countriesError 
  } = useGetCountriesQuery({ 
    page: 1, 
    limit: 8 
  }, {
    skip: activeType !== 'countries'
  });

  const handleToggle = (type: DestinationType) => {
    dispatch(setDestinationType(type));
  };

  // Determine what data to show based on active type
  const isLoading = activeType === 'regions' ? regionsLoading : countriesLoading;
  const currentData = activeType === 'regions' 
    ? regionsData?.data || [] 
    : countriesData?.data || [];
  const hasError = activeType === 'regions' ? regionsError : countriesError;
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
            <div className="text-center text-text-200 py-8">
              <p>Failed to load destinations. Please try again later.</p>
            </div>
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
