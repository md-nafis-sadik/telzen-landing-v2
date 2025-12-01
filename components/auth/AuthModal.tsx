"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { closeAuthModal } from "@/store/modules/ui/uiSlice";
import LoginStep from "./LoginStep";
import RegisterStep from "./RegisterStep";
import OtpStep from "./OtpStep";
import SuccessStep from "./SuccessStep";

const AuthModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { authModal } = useAppSelector((state) => state.ui);
  const { isOpen, step } = authModal;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    dispatch(closeAuthModal());
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-[#004534E5] opacity-90"
            onClick={handleClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ 
              type: "spring", 
              duration: 0.5, 
              bounce: 0.3 
            }}
            className={`relative rounded-3xl w-full max-w-[94%] sm:max-w-md z-10 max-h-[92vh] flex flex-col ${step === "success" ? "bg-transparent" : "bg-white"}`}
            onWheel={(e) => e.stopPropagation()}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer z-10"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>

            <div className="overflow-y-auto no-scrollbar overflow-x-hidden p-6 sm:p-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {step === "login" && <LoginStep />}
                {step === "register" && <RegisterStep />}
                {step === "otp" && <OtpStep />}
                {step === "success" && <SuccessStep />}
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;