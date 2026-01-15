"use client";

import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { appStrings, EsimIconSvg, LogoutGreyIconSvg, PersonIconSvg } from "@/service";
import Link from "next/link";
import Image from "next/image";
import { useUserDropdown } from "@/hook";
import { useSharedStore } from "@/store";

interface UserDropdownProps {
  onProfileClick: () => void;
  onLogoutClick: () => void;
}

function UserDropdown({ onProfileClick, onLogoutClick }: UserDropdownProps) {
  const { setShowMenu } = useSharedStore();
  const {
    isOpen,
    buttonRect,
    buttonRef,
    dropdownRef,
    displayName,
    displayImage,
    handleProfileClick,
    handleLogoutClick,
    handleMyEsimClick,
    handleButtonClick,
    closeDropdown,
  } = useUserDropdown(onProfileClick, onLogoutClick);

  const handleProfileClickWithMenuClose = () => {
    handleProfileClick();
    setShowMenu(false);
  };

  const handleMyEsimClickWithMenuClose = () => {
    handleMyEsimClick();
    setShowMenu(false);
  };

  const handleLogoutClickWithMenuClose = () => {
    handleLogoutClick();
    setShowMenu(false);
  };

  return (
    <>
      {/* User Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleButtonClick}
        ref={buttonRef}
        className="flex items-center gap-1 sm:gap-2 bg-primary-700 hover:bg-primary-800 text-white px-2 py-2 rounded-full transition-colors font-medium text-xs sm:text-sm cursor-pointer max-w-[150px]"
      >
        <div className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden bg-white/20 flex-shrink-0">
          {displayImage ? (
            <Image
              src={displayImage}
              alt={displayName}
              width={24}
              height={24}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="w-full h-full bg-primary-200 rounded-full flex items-center justify-center">
              <span className="text-primary-700 font-semibold text-[10px] sm:text-xs">
                {displayName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <span className="text-xs sm:text-sm max-w-[60px] sm:max-w-[100px] inline truncate">
          {displayName}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </motion.button>

      {/* Portal-based Dropdown Menu */}
      {typeof window !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 bg-transparent z-[100]"
                  onClick={closeDropdown}
                />

                {/* Desktop Dropdown */}
                {buttonRect && (
                  <motion.div
                    ref={dropdownRef}
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="hidden md:block fixed w-48 bg-white rounded-lg border border-natural-200 z-[101] overflow-hidden shadow-lg"
                    style={{
                      top: buttonRect.bottom + 8,
                      right: window.innerWidth - buttonRect.right - 8,
                    }}
                  >
                    {/* Profile Option */}
                    <motion.button
                      whileHover={{ backgroundColor: "#f3f4f6" }}
                      onClick={handleProfileClick}
                      className="w-full cursor-pointer px-4 py-2.5 text-left flex items-center gap-3 text-black transition-colors"
                    >
                      <span className="h-6 w-6 flex justify-center items-center">
                        <PersonIconSvg />
                      </span>
                      <span className="font-medium text-sm">Profile</span>
                    </motion.button>

                    {/* My eSIM Option */}
                    <motion.button
                      whileHover={{ backgroundColor: "#fff7ed" }}
                      onClick={handleMyEsimClick}
                      className="w-full cursor-pointer px-4 py-2.5 text-left flex items-center gap-3 text-black hover:bg-orange-50 transition-all"
                    >
                      <span className="h-6 w-6 flex justify-center items-center">
                        <EsimIconSvg />
                      </span>
                      <span className="font-medium text-sm">My eSIM</span>
                    </motion.button>

                    {/* Logout Option */}
                    <motion.button
                      whileHover={{ backgroundColor: "#fef2f2" }}
                      onClick={handleLogoutClick}
                      className="w-full cursor-pointer px-4 py-2.5 text-left flex items-center gap-3 text-black hover:bg-red-50 transition-all"
                    >
                      <span className="h-6 w-6 flex justify-center items-center">
                        <LogoutGreyIconSvg />
                      </span>
                      <span className="font-medium text-sm">Log Out</span>
                    </motion.button>

                    <div className="px-4 py-2.5 border-t border-natural-200">
                      <Link
                        href="https://play.google.com/store/apps/details?id=com.netro.telzenapp"
                        className="text-primary-700 text-sm underline"
                      >
                        Install Telzen App
                      </Link>
                    </div>
                  </motion.div>
                )}

                {/* Mobile Bottom Sheet */}
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="md:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-[101] shadow-2xl"
                  ref={dropdownRef}
                >
                  {/* Handle Bar */}
                  <div className="flex justify-center pt-3 pb-2">
                    <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
                  </div>

                  {/* User Info */}
                  <div className="px-5 md:px-6 py-3 md:py-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white/20 flex-shrink-0">
                        {displayImage ? (
                          <Image
                            src={displayImage}
                            alt={displayName}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          <div className="w-full h-full bg-primary-200 rounded-full flex items-center justify-center">
                            <span className="text-primary-700 font-semibold text-lg">
                              {displayName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-semibold text-gray-900 truncate">
                          {displayName}
                        </p>
                        <p className="text-sm text-gray-500">User Account</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Options */}
                  <div className="py-2">
                    {/* Profile Option */}
                    <button
                      onClick={handleProfileClickWithMenuClose}
                      className="w-full px-5 md:px-6 py-3 md:py-4 text-left flex items-center gap-4 text-black active:bg-gray-100 transition-colors"
                    >
                      <span className="h-7 w-7 flex justify-center items-center">
                        <PersonIconSvg />
                      </span>
                      <span className="font-medium text-sm md:text-base">Profile</span>
                    </button>

                    {/* My eSIM Option */}
                    <button
                      onClick={handleMyEsimClickWithMenuClose}
                      className="w-full px-5 md:px-6 py-3 md:py-4 text-left flex items-center gap-4 text-black active:bg-orange-50 transition-colors"
                    >
                      <span className="h-7 w-7 flex justify-center items-center">
                        <EsimIconSvg />
                      </span>
                      <span className="font-medium text-sm md:text-base">My eSIM</span>
                    </button>

                    {/* Logout Option */}
                    <button
                      onClick={handleLogoutClickWithMenuClose}
                      className="w-full px-5 md:px-6 py-3 md:py-4 text-left flex items-center gap-4 text-black active:bg-red-50 transition-colors"
                    >
                      <span className="h-7 w-7 flex justify-center items-center">
                        <LogoutGreyIconSvg />
                      </span>
                      <span className="font-medium text-sm md:text-base">Log Out</span>
                    </button>
                  </div>

                  {/* Install App Link */}
                  <div className="px-5 md:px-6 py-3 md:py-4 border-t border-gray-100">
                    <Link
                      href={appStrings.playAppUrl || "#"}
                      className="text-primary-700 text-sm md:text-base font-medium underline"
                    >
                      Install Telzen App
                    </Link>
                  </div>

                  {/* Safe area for mobile devices */}
                  <div className="h-safe-area-inset-bottom"></div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

export default UserDropdown;
