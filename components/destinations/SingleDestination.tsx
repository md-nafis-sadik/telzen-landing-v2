"use client";

import { images, StarPointSvg } from "@/service";
import BlurText from "../animation/BlurText";
import Image from "next/image";
import PackageCardSkeleton from "../shared/PackageCardSkeleton";
import PackageCard from "../shared/PackageCard";
import { useDestinationDetails } from "@/hook";
import EmptyState from "../shared/EmptyState";
import HeaderPrev from "../shared/HeaderPrev";
import { motion } from "motion/react";

function SingleDestination() {
  const {
    displayName,
    displayImage,
    packagesData,
    isLoading,
    error,
    handlePackageClick,
    getCheckoutUrl,
    handleBackClick,
    formatDataSize,
    getRandomIcon,
  } = useDestinationDetails();

  // Check if there's an error or no packages
  const hasError = !!error;
  const hasNoPackages =
    !isLoading && packagesData?.data?.packages?.length === 0;
  const showEmptyState = hasError || hasNoPackages;

  return (
    <>
      <HeaderPrev
        text={displayName || "Destination"}
        className="mb-4 lg:mb-6"
      />

      {/* Show empty state full width for error or no packages */}
      {showEmptyState ? (
        <div className="w-full">
          {hasError ? (
            <div className="w-full flex flex-col items-center justify-center py-12">
              <EmptyState
                title="Error Loading Packages"
                description="We couldn't load the packages. Please try again."
                className="!py-0 !md:py-0 !lg:py-0 w-full"
                isButton={false}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.reload()}
                className="cursor-pointer mt-6 px-4 md:px-6 py-2 md:py-3 bg-primary-700 hover:bg-primary-800 text-white rounded-full font-semibold transition-colors duration-200 flex items-center gap-2 text-sm md:text-base"
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
              </motion.button>
            </div>
          ) : (
            <EmptyState
              title="No Packages Found"
              description="We couldn't find any packages for this destination."
              className="!py-0 !md:py-0 !lg:py-0 w-full"
            />
          )}
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex h-full">
            {isLoading ? (
              <div className="w-full md:w-[350px] lg:w-[386px] aspect-[5/6] rounded-2xl lg:rounded-3xl bg-gray-200 animate-pulse"></div>
            ) : (
              <div className="w-full md:w-[350px] lg:w-[386px]">
                <div className="aspect-[5/6] relative">
                  <Image
                    src={displayImage || images?.newZealand}
                    alt={displayName || "Destination"}
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
              <div>
                <span className="backTitle text-primary-700">
                  <BlurText
                    text="Packages"
                    translateY={[50, 0]}
                    className="text-xl md:text-[26px] lg:text-[32px]"
                  />
                </span>

                <p className="text-text-700 mt-2 mb-6 max-w-lg tracking-tight text-xs md:text-sm lg:text-base">
                  Here is the list of packages. You can see details upon
                  selecting a package.
                </p>
              </div>
            )}
            <div className={`grid grid-cols-1 gap-4 lg:grid-cols-2 `}>
              {isLoading
                ? // Show skeleton loading
                  Array.from({ length: 4 }).map((_, index) => (
                    <PackageCardSkeleton key={index} />
                  ))
                : packagesData?.data?.packages?.map((packageItem, index) => {
                    const IconComponent = getRandomIcon(index);
                    return (
                      <PackageCard
                        key={packageItem._id}
                        packageId={packageItem._id}
                        totalDataPlanInMb={packageItem.total_data_plan_in_mb}
                        validity={packageItem.validity}
                        onPurchaseRewardPoint={packageItem.on_purchase_reward_point}
                        grandTotalSellingPrice={packageItem.grand_total_selling_price}
                        IconComponent={IconComponent}
                        checkoutUrl={getCheckoutUrl(packageItem._id)}
                        onClick={() => handlePackageClick(packageItem._id)}
                        formatDataSize={formatDataSize}
                      />
                    );
                  })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SingleDestination;
