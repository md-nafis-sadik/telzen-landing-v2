"use client";

import { motion, AnimatePresence } from "motion/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/modules/auth/authSlice";
import { closeLogoutModal } from "@/store/modules/ui/uiSlice";
import Image from "next/image";
import { CloseIcon, images } from "@/service";

function LogoutModal() {
  const dispatch = useAppDispatch();
  const { logoutModal } = useAppSelector((state) => state.ui);
  const isOpen = logoutModal.isOpen;

  const handleClose = () => {
    dispatch(closeLogoutModal());
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#004534E5] opacity-90 flex items-center justify-center z-[10000] p-4"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.3 }}
            className="relative bg-white rounded-3xl p-8 w-full max-w-md text-center shadow-xl"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <CloseIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
            </button>
            {/* Icon */}
            <div className="mb-6 flex justify-center">
              <div className="flex justify-center items-center h-full">
                <Image
                  src={images?.LogoutIcon}
                  alt="world"
                  width={130}
                  height={130}
                  priority
                />
              </div>
            </div>

            {/* Content */}
            <h2 className="text-4xl md:text-[48px] font-extrabold text-black font-barlow mb-4 uppercase">
              TAKING A BREAK?
            </h2>
            <p className="text-text-700 mb-8 text-sm">
              Rather than you can stay here, we do not bite!
            </p>

            {/* Buttons */}
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="flex-1 px-4 py-3 cursor-pointer border border-natural-500 text-black rounded-full font-semibold hover:bg-gray-50 transition-colors"
              >
                Log Out
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClose}
                className="flex-1 px-4 py-3 bg-primary-700 text-white rounded-full cursor-pointer hover:bg-primary-800 font-semibold"
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LogoutModal;
