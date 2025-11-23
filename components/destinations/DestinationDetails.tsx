"use client";

import {
  ArrowLeftBlackSvg,
  images,
  StarPointSvg,
  appStrings,
} from "@/service";
import BlurText from "../animation/BlurText";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../shared/Button";
import PackageCardSkeleton from "../shared/PackageCardSkeleton";
import { useDestinationDetails } from "@/hook";

function DestinationDetails() {
  const router = useRouter();
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
    <section
      className="py-10 md:py-16 lg:py-20 bg-white lg:min-h-screen flex"
      id="destinationDetails"
    >
      <div className="w-full">
        <div className="containerX">
          <div
            className="flex items-center gap-2 cursor-pointer w-max mb-6 md:mb-8 lg:mb-10"
            onClick={handleBackClick}
          >
            <ArrowLeftBlackSvg />
            <h2 className="backTitle text-text-950">
              <BlurText
                text={displayName || "Destination"}
                translateY={[50, 0]}
              />
            </h2>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex h-full">
              <Image
                src={images?.newZealand}
                alt="world"
                width={386}
                height={460}
                priority
                className="rounded-3xl"
              />
            </div>
            <div className="w-full">
              <span className="backTitle text-primary-700">
                <BlurText
                  text="Packages"
                  translateY={[50, 0]}
                  className=" text-[32px]"
                />
              </span>

              <p className="text-text-700 mt-2 mb-6 max-w-lg tracking-tight text-sm md:text-base">
                Here is the list of packages. You can see details upon selecting
                a package.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {isLoading ? (
                  // Show skeleton loading
                  Array.from({ length: 6 }).map((_, index) => (
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
                              {formatDataSize(
                                packageItem.total_data_plan_in_mb
                              )}{" "}
                              • {packageItem.validity}
                            </div>
                            <div className="flex items-center gap-1">
                              <span>
                                <StarPointSvg className="w-4 md:w-5 lg:w-6 h-4 md:h-5 lg:h-6" />
                              </span>
                              <span className="text-natural-500 text-sm md:text-base">
                                {packageItem.on_purchase_reward_point || 0}{" "}
                                Points
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
                  <div className="col-span-full text-center py-12">
                    <div className="max-w-md mx-auto">
                      <div className="mb-6">
                        <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{appStrings.noPackagesAvailable}</h3>
                        <p className="text-gray-500 mb-6">{appStrings.noPackagesMessage}</p>
                        <Button
                          variant="primary"
                          onClick={() => router.push('/destinations')}
                        >
                          {appStrings.browseAllDestinations}
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  null
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DestinationDetails;
