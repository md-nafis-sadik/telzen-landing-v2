"use client";

import React from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeEsimSuccessModal } from "@/store/modules/ui/uiSlice";
import Image from "next/image";
import { CloseIcon, images } from "@/service";

function EsimSuccessModal() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { esimSuccessModal } = useAppSelector((state) => state.ui);

  const handleClose = () => {
    dispatch(closeEsimSuccessModal());
  };

  const handleHome = () => {
    handleClose();
    router.push("/");
  };

  if (!esimSuccessModal.isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#004534E5]/90 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-md mx-auto bg-white rounded-3xl p-6 relative text-center"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <CloseIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
        </button>
        <div className="mb-6 flex justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.5,
              type: "spring",
              bounce: 0.5,
            }}
            className="relative"
          >
            <Image
              src={images?.successful}
              alt="successful"
              width={260}
              height={260}
              priority
            />
          </motion.div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-4xl md:text-[56px] font-extrabold text-text-950 font-barlow mb-1 uppercase"
        >
          Removed
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-text-700 mb-6"
        >
          Your eSIM has been removed.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleHome}
          className="w-full px-4 py-2 h-13 bg-primary-700 text-white rounded-full cursor-pointer hover:bg-primary-800 transition disabled:opacity-50 disabled:cursor-not-allowed mb-3 font-semibold text-sm md:text-base"
        >
          Home
        </motion.button>
      </motion.div>
    </div>
  );
}

export default EsimSuccessModal;
