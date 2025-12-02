import { useState, useEffect, useRef } from "react";
import { useAppDispatch } from "@/store/hooks";
import { openRemoveEsimModal } from "@/store/modules/ui/uiSlice";
import { Esim } from "@/store/modules/destination/destinationApi";

export const useEsimCard = (esim: Esim) => {
  const dispatch = useAppDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const formatDataSize = (sizeInMB: number) => {
    if (sizeInMB >= 1024) {
      return `${(sizeInMB / 1024).toFixed(0)} GB`;
    }
    return `${sizeInMB} MB`;
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getLocationName = () => {
    if (esim.associated_country) {
      return esim.associated_country.name.toUpperCase();
    }
    if (esim.associated_region) {
      return esim.associated_region.name.toUpperCase();
    }
    return "UNKNOWN";
  };

  const getStatusColor = () => {
    switch (esim.status) {
      case "active":
        return "text-green-600";
      case "expired":
        return "text-red-600";
      case "pending":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  const handleDownloadQR = () => {
    if (esim.qr_code_url) {
      const link = document.createElement("a");
      link.href = esim.qr_code_url;
      link.download = `${getLocationName()}-QR-Code.png`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    setShowDropdown(false);
  };

  const handleRemoveEsim = () => {
    dispatch(openRemoveEsimModal(esim._id));
    setShowDropdown(false);
  };

  const handleBuyAnother = () => {
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    if (buttonRef.current) {
      setButtonRect(buttonRef.current.getBoundingClientRect());
    }
    setShowDropdown(!showDropdown);
  };

  return {
    showDropdown,
    buttonRect,
    dropdownRef,
    buttonRef,
    formatDataSize,
    formatDate,
    getLocationName,
    getStatusColor,
    handleDownloadQR,
    handleRemoveEsim,
    handleBuyAnother,
    toggleDropdown,
  };
};
