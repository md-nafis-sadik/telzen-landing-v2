"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  openAuthModal,
  openProfileModal,
  openLogoutModal,
} from "@/store/modules/ui/uiSlice";
import Button from "../shared/Button";
import UserDropdown from "../shared/UserDropdown";

const AuthButton: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, auth } = useAppSelector((state) => state.auth);

  // Debug auth state
  console.log("AuthButton - isAuthenticated:", isAuthenticated, "auth:", auth);

  const handleLoginClick = () => {
    dispatch(openAuthModal({ step: "login" }));
  };

  const handleProfileClick = () => {
    dispatch(openProfileModal());
  };

  const handleLogoutClick = () => {
    dispatch(openLogoutModal());
  };

  if (isAuthenticated) {
    return (
      <UserDropdown
        onProfileClick={handleProfileClick}
        onLogoutClick={handleLogoutClick}
      />
    );
  }

  return (
    <div className="flex items-center gap-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLoginClick}
        className="px-4 py-2 bg-primary-700 text-white rounded-full cursor-pointer hover:bg-primary-800 transition z-[1000] font-semibold"
      >
        Login/SignUp
      </motion.button>
    </div>
  );
};

export default AuthButton;
