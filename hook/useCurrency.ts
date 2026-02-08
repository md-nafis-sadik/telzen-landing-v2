"use client";

import { useGetProfileQuery } from "@/store/modules/auth/authApi";
import { useAppSelector } from "@/store/hooks";
import { getCurrencyCode } from "@/service/helpers/currencyUtils";
import { useEffect, useState } from "react";

/**
 * Custom hook to get the current currency code
 * Priority: Profile currency > Location currency > Default (USD)
 */
export const useCurrency = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [locationCountryCode, setLocationCountryCode] = useState<string | null>(null);

  // Only fetch profile if user is authenticated
  // refetchOnMountOrArgChange ensures fresh data after login/logout
  const { data: profileData, refetch } = useGetProfileQuery(undefined, {
    skip: !isAuthenticated,
    refetchOnMountOrArgChange: true,
  });

  // Refetch profile whenever authentication state changes to true
  useEffect(() => {
    if (isAuthenticated) {
      refetch();
    }
  }, [isAuthenticated, refetch]);

  // Watch for location changes
  useEffect(() => {
    // Get initial location
    const storedCountryCode = localStorage.getItem("telzen_country_code");
    setLocationCountryCode(storedCountryCode);

    // Listen for storage changes (when location is updated)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "telzen_country_code") {
        setLocationCountryCode(e.newValue);
      }
    };

    // Listen for custom event dispatched by useLocation
    const handleLocationUpdate = () => {
      const countryCode = localStorage.getItem("telzen_country_code");
      setLocationCountryCode(countryCode);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("locationUpdated", handleLocationUpdate);

    // Poll for changes (fallback for same-tab updates)
    const pollInterval = setInterval(() => {
      const currentCode = localStorage.getItem("telzen_country_code");
      if (currentCode !== locationCountryCode) {
        setLocationCountryCode(currentCode);
      }
    }, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("locationUpdated", handleLocationUpdate);
      clearInterval(pollInterval);
    };
  }, [locationCountryCode]);

  // Get profile currency if available
  const profileCurrency = profileData?.data?.currency;

  // Get currency code based on priority (will recalculate when locationCountryCode changes)
  const currencyCode = getCurrencyCode(profileCurrency);

  return {
    currencyCode,
    profileCurrency,
    isAuthenticated,
  };
};
