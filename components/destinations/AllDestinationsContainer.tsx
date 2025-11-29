"use client";

import { Suspense } from "react";
import AllDestinations from "./AllDestinations";
import DestinationCardSkeleton from "../shared/DestinationCardSkeleton";

function AllDestinationsContainer() {
  return (
    <section
      className="py-10 md:py-16 lg:py-20 bg-white lg:min-h-screen flex"
      id="allDestinations"
    >
      <div className="w-full">
        <div className="containerX">
          <Suspense
            fallback={
              <div className="w-full">
                <div className="w-48 h-8 bg-gray-200 rounded animate-pulse mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 md:gap-3 lg:gap-4 mt-6 md:mt-10 w-full mx-auto">
                  {Array.from({ length: 15 }).map((_, index) => (
                    <DestinationCardSkeleton key={index} index={index} />
                  ))}
                </div>
              </div>
            }
          >
            <AllDestinations />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

export default AllDestinationsContainer;
