"use client";

import React from "react";
import { motion } from "motion/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  closeRemoveEsimModal,
  openEsimSuccessModal,
} from "@/store/modules/ui/uiSlice";
import { useDeleteEsimMutation } from "@/store/modules/destination/destinationApi";
import { CloseIcon, images } from "@/service";
import Image from "next/image";
import { toast } from 'react-toastify';

function RemoveEsimModal() {
  const dispatch = useAppDispatch();
  const { removeEsimModal } = useAppSelector((state) => state.ui);
  const { isOpen: isRemoveEsimModalOpen, selectedEsimId } = removeEsimModal;
  const [deleteEsim, { isLoading }] = useDeleteEsimMutation();

  const handleClose = () => {
    dispatch(closeRemoveEsimModal());
  };

  const handleRemove = async () => {
    if (selectedEsimId) {
      try {
        await deleteEsim({ esim_id: selectedEsimId }).unwrap();
        handleClose();
        dispatch(openEsimSuccessModal());
      } catch (error: any) {
        console.error("Failed to remove eSIM:", error);
        const errorMessage = error?.data?.message || 'Failed to remove eSIM. Please try again.';
        toast.error(errorMessage);
      }
    }
  };

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
          REMOVING ESIM?
        </h2>

        {/* Description */}
        <p className="text-text-700 text-center mb-6 text-sm md:text-[17px] leading-6">
          Removing an eSIM will lose access to this connection. Make sure to
          your decision.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleClose}
            className="flex-1 px-4 py-3 cursor-pointer border border-natural-500 text-black rounded-full font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRemove}
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-primary-700 text-white rounded-full cursor-pointer hover:bg-primary-800 font-semibold"
          >
            {isLoading ? "Removing..." : "Remove"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default RemoveEsimModal;
