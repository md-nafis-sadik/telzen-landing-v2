"use client";

import {
  BuyBoxIconSvg,
  CheverondownIconSvg,
  EsimBlackIconSvg,
  images,
  QRIconSvg,
  appStrings,
} from "@/service";
import Image from "next/image";
import Button from "../shared/Button";
import { Esim } from "@/store/modules/destination/destinationApi";
import { motion, AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";
import { useEsimCard } from "@/hook";

interface EsimCardProps {
  esim: Esim;
}

function EsimCard({ esim }: EsimCardProps) {
  const {
    showDropdown,
    buttonRect,
    dropdownRef,
    buttonRef,
    formatDataSize,
    formatDate,
    getLocationName,
    getStatusColor,
    handleDownloadQR,
    handleRemoveEsim,
    handleBuyAnother,
    toggleDropdown,
  } = useEsimCard(esim);

  // Get image from esim data
  const displayImage = esim?.associated_country?.image || 
                       esim?.associated_region?.image || 
                       images?.newZealand;

  return (
    <div className="bg-white w-full flex flex-col lg:flex-row rounded-xl border border-natural-200">
      {/* Image */}
      <div className="hidden lg:flex w-[348px] h-[185px]">
        <Image
          src={displayImage}
          alt="destination"
          width={384}
          height={185}
          priority
          className="rounded-l-xl object-cover"
        />
      </div>
      <div className="flex lg:hidden w-full h-[200px] md:h-[320px] relative">
        <Image
          src={displayImage}
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
              onClick={toggleDropdown}
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
                      onClick={() => toggleDropdown()}
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
                      <Button
                        variant="link"
                        onClick={handleDownloadQR}
                        leftIcon={
                          <span className="w-6 h-6">
                            <QRIconSvg />
                          </span>
                        }
                        className="w-full px-4 py-3 justify-start hover:bg-natural-50 text-sm text-black font-normal"
                      >
                        {appStrings.downloadQr}
                      </Button>

                      <Button
                        variant="link"
                        onClick={handleRemoveEsim}
                        leftIcon={
                          <span className="w-6 h-6">
                            <EsimBlackIconSvg />
                          </span>
                        }
                        className="w-full px-4 py-3 justify-start hover:bg-natural-50 text-sm text-black font-normal"
                      >
                        {appStrings.removeEsim}
                      </Button>

                      <Button
                        variant="link"
                        disabled
                        leftIcon={
                          <span className="w-6 h-6">
                            <BuyBoxIconSvg />
                          </span>
                        }
                        className="w-full px-4 py-3 justify-start text-natural-400 text-sm font-normal"
                      >
                        {appStrings.buyAnotherPlan}
                      </Button>
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

export default EsimCard;
