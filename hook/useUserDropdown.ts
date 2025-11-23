import { useState, useRef, useEffect } from "react";
import { useAppSelector } from "@/store/hooks";
import { useGetProfileQuery } from "@/store/modules/auth/authApi";
import { useRouter } from "next/navigation";

export const useUserDropdown = (
  onProfileClick: () => void,
  onLogoutClick: () => void
) => {
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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
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

  const handleMyEsimClick = () => {
    setIsOpen(false);
    router.push("/my-esim");
  };

  const handleButtonClick = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonRect(rect);
    }
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return {
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
  };
};
