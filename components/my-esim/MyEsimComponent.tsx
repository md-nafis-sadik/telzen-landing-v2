"use client";

import {
  BuyBoxIconSvg,
  CheverondownIconSvg,
  EsimBlackIconSvg,
  images,
  MobileWithStarsSvg,
  QRIconSvg,
} from "@/service";
import BlurText from "../animation/BlurText";
import BigToggleSwitch from "../shared/BigToggleSwitch";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  useGetPersonalEsimsQuery,
  Esim,
} from "@/store/modules/destination/destinationApi";
import { openRemoveEsimModal } from "@/store/modules/ui/uiSlice";
import { motion, AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";

// EsimCard Component
interface EsimCardProps {
  esim: Esim;
}

function EsimCard({ esim }: EsimCardProps) {
  const dispatch = useAppDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const formatDataSize = (sizeInMB: number) => {
    if (sizeInMB >= 1024) {
      return `${(sizeInMB / 1024).toFixed(0)} GB`;
    }
    return `${sizeInMB} MB`;
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getLocationName = () => {
    if (esim.associated_country) {
      return esim.associated_country.name.toUpperCase();
    }
    if (esim.associated_region) {
      return esim.associated_region.name.toUpperCase();
    }
    return "UNKNOWN";
  };

  const getStatusColor = () => {
    switch (esim.status) {
      case "active":
        return "text-green-600";
      case "expired":
        return "text-red-600";
      case "pending":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  const handleDownloadQR = () => {
    if (esim.qr_code_url) {
      window.open(esim.qr_code_url, "_blank");
    }
    setShowDropdown(false);
  };

  const handleRemoveEsim = () => {
    dispatch(openRemoveEsimModal(esim._id));
    setShowDropdown(false);
  };

  const handleBuyAnother = () => {
    // Navigate to destinations - disabled for now
    setShowDropdown(false);
  };

  return (
    <div className="bg-white w-full flex flex-col lg:flex-row rounded-xl border border-natural-200">
      {/* Image */}
      <div className="hidden lg:flex w-[348px] h-[185px]">
        <Image
          src={images?.newZealand}
          alt="destination"
          width={384}
          height={185}
          priority
          className="rounded-l-xl object-cover"
        />
      </div>
      <div className="flex lg:hidden w-full h-[200px] md:h-[320px] relative">
        <Image
          src={images?.newZealand}
          alt="destination"
          fill
          priority
          className="rounded-t-xl object-cover"
        />
      </div>

      <div className="p-4 flex flex-col lg:flex-row justify-between items-center gap-4 w-full">
        <div className="flex flex-col gap-4 text-center lg:text-left">
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 justify-center lg:justify-start items-center">
              <div className="w-6 h-6 rounded flex items-center justify-center text-md">
                🌍
              </div>
              <span className="text-sm md:text-base uppercase tracking-wide">
                {esim?.associated_region?.name ||
                  esim?.associated_country?.name}
              </span>
              {/* <span className={`text-sm ${getStatusColor()} font-medium`}>
                ({esim.status})
              </span> */}
            </div>
            <div className="text-sm md:text-base text-text-700">
              {esim?.iccid}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-lg lg:text-xl font-semibold">
            <div>
              {formatDataSize(esim?.data_package.total_data_plan_in_mb)} •{" "}
              {esim?.data_package.validity.amount}{" "}
              {esim.data_package.validity.type}s
            </div>
            <div>
              <span className="font-normal text-base lg:text-lg text-text-700 mr-1">
                Expires:
              </span>
              {formatDate(esim?.data_package.expired_at)}
            </div>
          </div>
          <div className="text-xl md:text-[32px] font-extrabold text-primary-700 font-barlow uppercase">
            BALANCE: {esim?.data_package?.total_data_plan_in_mb}MB
          </div>
        </div>

        {/* Dropdown Menu */}
        <div className="flex">
          <div className="flex">
            <a
              href={esim?.qr_code_url}
              target="_blank"
              rel="noopener noreferrer"
              className=" transition-colors"
            >
              <div className="flex w-[136px] h-[136px] p-2 border border-natural-200 hover:bg-gray-50">
                <Image
                  src={esim?.qr_code_url}
                  alt="destination"
                  width={136}
                  height={136}
                  priority
                  className="rounded-l-xl object-cover"
                />
              </div>
            </a>
            <motion.button
              ref={buttonRef}
              whileHover={{ backgroundColor: "#f3f4f6" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (buttonRef.current) {
                  const rect = buttonRef.current.getBoundingClientRect();
                  setButtonRect(rect);
                }
                setShowDropdown(!showDropdown);
              }}
              className="p-1 hover:bg-gray-50 transition-colors h-max cursor-pointer"
            >
              <CheverondownIconSvg />
            </motion.button>
          </div>

          {/* Portal-based Dropdown Menu */}
          {typeof window !== "undefined" &&
            createPortal(
              <AnimatePresence>
                {showDropdown && buttonRect && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-[100]"
                      onClick={() => setShowDropdown(false)}
                    />
                    {/* Dropdown */}
                    <motion.div
                      ref={dropdownRef}
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="fixed w-44 bg-white rounded-lg border border-natural-200 z-[101] overflow-hidden"
                      style={{
                        top: buttonRect.bottom + 8,
                        right: window.innerWidth - buttonRect.right,
                      }}
                    >
                      <button
                        onClick={handleDownloadQR}
                        className="w-full cursor-pointer px-4 py-3 text-left hover:bg-natural-50 transition-colors flex items-center gap-2 text-sm"
                      >
                        <span className="w-6 h-6">
                          <QRIconSvg />
                        </span>
                        Download QR
                      </button>

                      <button
                        onClick={handleRemoveEsim}
                        className="w-full cursor-pointer px-4 py-3 text-left hover:bg-natural-50 transition-colors flex items-center gap-2 text-sm text-black"
                      >
                        <span className="w-6 h-6">
                          <EsimBlackIconSvg />
                        </span>
                        Remove eSIM
                      </button>

                      <button
                        onClick={handleBuyAnother}
                        disabled
                        className="w-full px-4 py-3 text-left text-natural-400 cursor-not-allowed flex items-center gap-2 text-sm"
                      >
                        <span className="w-6 h-6">
                          <BuyBoxIconSvg />
                        </span>
                        Buy Another Plan
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>,
              document.body
            )}
        </div>
      </div>
    </div>
  );
}

function MyEsimComponent() {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [activeToggle, setActiveToggle] = useState<"myPlans" | "buyAnother">(
    "myPlans"
  );

  const {
    data: esimsData,
    isLoading,
    error,
  } = useGetPersonalEsimsQuery(undefined, {
    skip: !isAuthenticated,
  });

  // Redirect to homepage if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleToggleChange = (option: string) => {
    if (option === "My Plans") {
      setActiveToggle("myPlans");
    } else if (option === "Buy Another") {
      setActiveToggle("buyAnother");
      router.push("/destinations");
    }
  };

  // Don't render if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  const esims = esimsData?.data || [];

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
                  <p className="text-lg mb-2">No eSIMs found</p>
                  <p className="text-sm">
                    Purchase your first eSIM to get started!
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push("/destinations")}
                    className="mt-4 px-6 py-2 bg-primary-700 text-white rounded-full hover:bg-primary-800 transition"
                  >
                    Browse Destinations
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
