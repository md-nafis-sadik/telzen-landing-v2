"use client";

import React from "react";
import { motion } from "motion/react";
import { CloseIcon, images, appStrings } from "@/service";
import Image from "next/image";
import { useRemoveEsim } from "@/hook";
import Button from "../shared/Button";

function RemoveEsimModal() {
  const { isRemoveEsimModalOpen, isLoading, handleClose, handleRemove } =
    useRemoveEsim();

  if (!isRemoveEsimModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#004534E5]/90 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-md mx-auto bg-white rounded-2xl p-6 relative"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <CloseIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
        </button>

        {/* Icon */}
        <div className="mb-4 flex justify-center">
          <div className="flex justify-center items-center h-full">
            <Image
              src={images?.removeIcon}
              alt="world"
              width={130}
              height={130}
              priority
            />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-4xl md:text-[48px] font-extrabold text-black font-barlow mb-1 uppercase text-center">
          {appStrings.removingEsim}
        </h2>

        {/* Description */}
        <p className="text-text-700 text-center mb-6 text-sm md:text-[17px] leading-6">
          {appStrings.removeEsimMessage}
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={handleClose}
            animate
            className="flex-1"
          >
            {appStrings.cancel}
          </Button>

          <Button
            variant="primary"
            onClick={handleRemove}
            isLoading={isLoading}
            loadingText={appStrings.removing}
            animate
            className="flex-1"
          >
            {appStrings.remove}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default RemoveEsimModal;
