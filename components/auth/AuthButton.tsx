"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openAuthModal } from "@/store/modules/ui/uiSlice";
import { logout } from "@/store/modules/auth/authSlice";
import Button from "../shared/Button";

const AuthButton: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, auth } = useAppSelector((state) => state.auth);

  const handleLoginClick = () => {
    dispatch(openAuthModal({ step: "login" }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-white text-sm">
          Welcome, {auth.name || auth.email}
        </span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="px-4 py-2 text-white border border-white rounded hover:bg-white hover:text-[#004534] transition-colors"
        >
          Logout
        </motion.button>
      </div>
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
      {/* <Button
        buttonText="SignUp"
        className="font-semibold"
        onClick={handleRegisterClick}
      /> */}
    </div>
  );
};

export default AuthButton;