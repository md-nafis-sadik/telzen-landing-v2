"use client";

import { images, StarPointSvg } from "@/service";
import BlurText from "../animation/BlurText";
import Image from "next/image";
import PackageCardSkeleton from "../shared/PackageCardSkeleton";
import { useDestinationDetails } from "@/hook";
import EmptyState from "../shared/EmptyState";
import HeaderPrev from "../shared/HeaderPrev";

function SingleDestination() {
  const {
    displayName,
    packagesData,
    isLoading,
    error,
    handlePackageClick,
    handleBackClick,
    formatDataSize,
    getRandomIcon,
  } = useDestinationDetails();

  return (
    <>
      <HeaderPrev
        text={displayName || "Destination"}
        className="mb-4 lg:mb-6"
      />
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex h-full">
          {isLoading ? (
            <div className="w-full md:w-[386px] aspect-[5/6] rounded-2xl lg:rounded-3xl bg-gray-200 animate-pulse"></div>
          ) : (
            <div className="w-full md:w-[386px]">
              <div className="aspect-[5/6] relative">
                <Image
                  src={images?.newZealand}
                  alt="world"
                  width={386}
                  height={460}
                  className="object-cover rounded-3xl w-full h-full"
                  priority
                />
              </div>
            </div>
          )}
        </div>
        <div className="w-full">
          {isLoading ? (
            <div className="flex flex-col gap-2">
              <div className="w-20 md:w-24 lg:w-28 h-4 md:h-5 lg:h-7 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-3 md:h-4 bg-gray-200 rounded w-32 mt-2 mb-6 animate-pulse"></div>
            </div>
          ) : (
            packagesData?.data.length !== 0 && (
              <div>
                <span className="backTitle text-primary-700">
                  <BlurText
                    text="Packages"
                    translateY={[50, 0]}
                    className="text-lg md:text-2xl lg:text-[32px]"
                  />
                </span>

                <p className="text-text-700 mt-2 mb-6 max-w-lg tracking-tight text-xs md:text-sm lg:text-base">
                  Here is the list of packages. You can see details upon
                  selecting a package.
                </p>
              </div>
            )
          )}
          <div className={`grid grid-cols-1 gap-4 lg:grid-cols-2 `}>
            {isLoading ? (
              // Show skeleton loading
              Array.from({ length: 4 }).map((_, index) => (
                <PackageCardSkeleton key={index} />
              ))
            ) : error ? (
              <div className="col-span-full text-center py-8 text-red-500">
                Error loading packages. Please try again.
              </div>
            ) : packagesData?.data && packagesData.data.length > 0 ? (
              packagesData.data.map((packageItem, index) => {
                const IconComponent = getRandomIcon(index);
                return (
                  <div
                    key={packageItem._id}
                    className="flex gap-3 cursor-pointer bg-text-100 p-4 rounded-2xl w-full hover:bg-text-200 transition-colors"
                    onClick={() => handlePackageClick(packageItem._id)}
                  >
                    <div className="flex flex-col w-full gap-3">
                      <span>
                        <IconComponent className="w-6 md:w-7 lg:w-8 h-6 md:h-7 lg:h-8" />
                      </span>
                      <div className="flex flex-col gap-1">
                        <div className="text-lg md:text-xl lg:text-2xl">
                          {formatDataSize(packageItem.total_data_plan_in_mb)} •{" "}
                          {packageItem.validity}
                        </div>
                        <div className="flex items-center gap-1">
                          <span>
                            <StarPointSvg className="w-4 md:w-5 lg:w-6 h-4 md:h-5 lg:h-6" />
                          </span>
                          <span className="text-natural-500 text-sm md:text-base">
                            {packageItem.on_purchase_reward_point || 0} Points
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-end">
                      <div className="text-xl md:text-2xl lg:text-3xl justify-end">
                        ${packageItem.grand_total_selling_price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : packagesData?.data && packagesData.data.length === 0 ? (
              <EmptyState
                title="No Packages Found"
                description="We couldn't find any packages matching your search."
                className="!py-0 !md:py-0 !lg:py-0"
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleDestination;
