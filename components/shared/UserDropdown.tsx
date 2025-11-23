"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { useAppSelector } from "@/store/hooks";
import { useGetProfileQuery } from "@/store/modules/auth/authApi";
import { EsimIconSvg, LogoutGreyIconSvg, PersonIconSvg } from "@/service";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface UserDropdownProps {
  onProfileClick: () => void;
  onLogoutClick: () => void;
}

function UserDropdown({ onProfileClick, onLogoutClick }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { auth } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const { data: profileData } = useGetProfileQuery(undefined, {
    skip: !auth.token,
  });

  const profile = profileData?.data;

  // Use profile data if available, otherwise fallback to auth data
  const displayName = profile?.name || auth.name || "User";
  const displayImage = profile?.image || auth.image;
  const countryCode = profile?.country?.code || auth.country?.code;
  const countryName = profile?.country?.name || auth.country?.name;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleProfileClick = () => {
    setIsOpen(false);
    onProfileClick();
  };

  const handleLogoutClick = () => {
    setIsOpen(false);
    onLogoutClick();
  };

  const handleButtonClick = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonRect(rect);
    }
    setIsOpen(!isOpen);
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
        <span className="text-xs sm:text-sm max-w-[60px] sm:max-w-[100px] hidden sm:inline truncate">
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
            {isOpen && buttonRect && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-[100]"
                  onClick={() => setIsOpen(false)}
                />
                {/* Dropdown */}
                <motion.div
                  ref={dropdownRef}
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="fixed w-48 bg-white rounded-lg border border-natural-200 z-[101] overflow-hidden"
                  style={{
                    top: buttonRect.bottom + 8,
                    right: window.innerWidth - buttonRect.right - 8,
                  }}
                >
                  {/* User Info Section */}
                  {/* <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white/20 flex-shrink-0">
                        {displayImage && displayImage !== "http://46.250.238.64:9000/public/default/default.jpg" ? (
                          <Image
                            src={displayImage}
                            alt={displayName}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          <div className="w-full h-full bg-primary-200 rounded-full flex items-center justify-center">
                            <span className="text-primary-700 font-semibold text-sm">
                              {displayName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {displayName}
                        </p>
                        {countryName && (
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <span>{countryName}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div> */}

                  {/* Profile Option */}
                  <motion.button
                    whileHover={{ backgroundColor: "#f3f4f6" }}
                    onClick={handleProfileClick}
                    className="w-full cursor-pointer px-4 py-2.5 text-left flex items-center gap-3 text-black transition-colors"
                  >
                    <span className="h-6 w-6 flex justify-center items-center">
                      <PersonIconSvg />
                    </span>
                    <span className="font-medium text-sm sm:text-base">
                      Profile
                    </span>
                  </motion.button>

                  {/* My eSIM Option */}
                  <motion.button
                    whileHover={{ backgroundColor: "#fff7ed" }}
                    onClick={() => {
                      setIsOpen(false);
                      router.push("/my-esim");
                    }}
                    className="w-full cursor-pointer px-3 sm:px-4 py-2.5 text-left flex items-center gap-2 sm:gap-3 text-black hover:bg-orange-50 transition-all"
                  >
                    <span className="h-6 w-6 flex justify-center items-center">
                      <EsimIconSvg />
                    </span>
                    <span className="font-medium text-sm sm:text-base">
                      My eSIM
                    </span>
                  </motion.button>

                  {/* Logout Option */}
                  <motion.button
                    whileHover={{ backgroundColor: "#fef2f2" }}
                    onClick={handleLogoutClick}
                    className="w-full cursor-pointer px-3 sm:px-4 py-2.5 text-left flex items-center gap-2 sm:gap-3 text-black hover:bg-red-50 transition-all"
                  >
                    <span className="h-6 w-6 flex justify-center items-center">
                      <LogoutGreyIconSvg />
                    </span>
                    <span className="font-medium text-sm sm:text-base">
                      Log Out
                    </span>
                  </motion.button>

                  <motion.div className=" px-3 sm:px-4 py-2.5">
                    <Link href="#" className="text-primary-700 underline">
                      Install Telzen App
                    </Link>
                  </motion.div>
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
