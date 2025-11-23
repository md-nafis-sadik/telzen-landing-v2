"use client";

import { motion, AnimatePresence } from "motion/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/modules/auth/authSlice";
import { closeLogoutModal } from "@/store/modules/ui/uiSlice";
import Image from "next/image";
import { CloseIcon, images, appStrings } from "@/service";
import Button from "../shared/Button";

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
              {appStrings.takingBreak}
            </h2>
            <p className="text-text-700 mb-8 text-sm">
              {appStrings.logoutMessage}
            </p>

            {/* Buttons */}
            <div className="flex gap-4">
              <Button
                variant="secondary"
                onClick={handleLogout}
                animate
                className="flex-1"
              >
                {appStrings.logOut}
              </Button>
              <Button
                variant="primary"
                onClick={handleClose}
                animate
                className="flex-1"
              >
                {appStrings.cancel}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LogoutModal;
