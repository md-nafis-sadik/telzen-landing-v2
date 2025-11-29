"use client";

import { Suspense } from "react";
import SingleDestination from "./SingleDestination";
import PackageCardSkeleton from "../shared/PackageCardSkeleton";

function DestinationDetails() {
  return (
    <section
      className="py-10 md:py-16 lg:py-20 bg-white lg:min-h-screen flex"
      id="destinationDetails"
    >
      <div className="w-full">
        <div className="containerX">
          <Suspense
            fallback={
              <div className="w-full">
                <div className="flex items-center gap-2 w-max mb-4 lg:mb-6">
                  <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-48 h-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <PackageCardSkeleton key={index} />
                  ))}
                </div>
              </div>
            }
          >
            <SingleDestination />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

export default DestinationDetails;
