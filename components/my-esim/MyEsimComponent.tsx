"use client";

import { images, MobileWithStarsSvg, appStrings } from "@/service";
import BlurText from "../animation/BlurText";
import BigToggleSwitch from "../shared/BigToggleSwitch";
import { motion } from "motion/react";
import { useMyEsim } from "@/hook";
import { useRouter } from "next/navigation";
import EsimCard from "./EsimCard";

function MyEsimComponent() {
  const router = useRouter();
  const {
    isAuthenticated,
    esims,
    isLoading,
    error,
    handleToggleChange,
  } = useMyEsim();

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
          <h2 className="backTitle text-text-950">
            <BlurText text="my esim" translateY={[50, 0]} />
          </h2>
          <div className="bg-secondary-100 flex items-center gap-3 px-14 py-5 rounded-full mt-8">
            <span>
              <MobileWithStarsSvg />
            </span>
            <span className="text-[#FF9F20]">
              For best experience we recomend to use our app.
            </span>
          </div>
          <div className="w-full flex flex-col-reverse gap-4 lg:flex-row items-center justify-between my-6 md:my-7 lg:my-8">
            <BigToggleSwitch
              firstbuttonText="My Plans"
              secondbuttonText="Buy Another"
              onToggle={handleToggleChange}
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
            <div className="text-center py-8 text-red-500">
              <p>Failed to load eSIMs. Please try again later.</p>
            </div>
          )}

          {/* eSIMs List */}
          {!isLoading && !error && (
            <div className="flex flex-col gap-6">
              {esims.length > 0 ? (
                esims.map((esim) => <EsimCard key={esim._id} esim={esim} />)
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-lg mb-2">{appStrings.noEsimsFound}</p>
                  <p className="text-sm">
                    {appStrings.purchaseFirstEsim}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push("/destinations")}
                    className="mt-4 px-6 py-2 bg-primary-700 text-white rounded-full hover:bg-primary-800 transition"
                  >
                    {appStrings.browseDestinations}
                  </motion.button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default MyEsimComponent;
