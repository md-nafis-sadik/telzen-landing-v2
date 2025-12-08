"use client";

import { images, MobileWithStarsSvg, appStrings } from "@/service";
import BlurText from "../animation/BlurText";
import BigToggleSwitch from "../shared/BigToggleSwitch";
import { motion } from "motion/react";
import { useMyEsim } from "@/hook";
import { useRouter } from "next/navigation";
import EsimCard from "./EsimCard";
import EmptyState from "../shared/EmptyState";

function MyEsimComponent() {
  const router = useRouter();
  const { isAuthenticated, esims, isLoading, error, handleToggleChange } =
    useMyEsim();

  // Don't render if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <section
      className="py-10 md:py-16 lg:py-20 bg-natural-50 lg:min-h-screen flex"
      id="allDestinations"
    >
      <div className="w-full">
        <div className="containerX">
          <div className="overflow-y-clip pb-2">
            <h2 className="backTitle text-text-950">
              <BlurText text="my esim" translateY={[50, 0]} />
            </h2>
          </div>
          <div className="bg-secondary-100 flex items-center gap-3 px-8 md:px-14 py-3 md:py-5 rounded-full mt-8">
            <span>
              <MobileWithStarsSvg />
            </span>
            <span className="text-[#FF9F20] text-sm md:text-base">
              For best experience we recomend to use our app.
            </span>
          </div>
          <div className="w-full flex flex-col-reverse gap-4 lg:flex-row items-center justify-between my-6 md:my-7 lg:my-8">
            <BigToggleSwitch
              firstbuttonText="My Plans"
              secondbuttonText="Buy Another"
              onToggle={handleToggleChange}
              useLocalState={true}
              defaultActive="first"
            />
          </div>
          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col gap-6">
              {Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white w-full flex flex-col lg:flex-row rounded-xl border border-natural-200 animate-pulse"
                >
                  <div className="hidden lg:flex w-[348px] h-[185px] bg-gray-200 rounded-l-xl"></div>
                  <div className="flex lg:hidden w-full h-[200px] md:h-[320px] bg-gray-200 rounded-t-xl"></div>
                  <div className="p-4 flex flex-col lg:flex-row justify-between items-center gap-4 w-full">
                    <div className="flex flex-col gap-4 text-center lg:text-left w-full">
                      <div className="h-6 bg-gray-200 rounded w-32"></div>
                      <div className="h-4 bg-gray-200 rounded w-48"></div>
                      <div className="h-8 bg-gray-200 rounded w-40"></div>
                    </div>
                    <div className="w-16 h-16 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="w-full flex flex-col items-center justify-center py-12">
              <EmptyState
                title={appStrings.errorLoadingEsims}
                description={appStrings.errorLoadingEsimsDesc}
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
                {appStrings.reloadPage}
              </motion.button>
            </div>
          )}

          {/* eSIMs List */}
          {!isLoading && !error && (
            <div className="flex flex-col gap-6">
              {esims.length > 0 ? (
                esims.map((esim) => <EsimCard key={esim._id} esim={esim} />)
              ) : (
                <EmptyState
                  // searchQuery={apiSearchQuery}
                  title={appStrings.noEsimsFound}
                  description={appStrings.purchaseFirstEsim}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default MyEsimComponent;
