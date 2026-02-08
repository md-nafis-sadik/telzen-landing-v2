import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/store/modules/auth/authApi";
import { closeProfileModal } from "@/store/modules/ui/uiSlice";
import { countriesData as countries } from "@/service";
import { toast } from "react-toastify";
import { getCountryCode } from "./useLocation";

export const useProfileModal = () => {
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((state) => state.auth);
  const { profileModal } = useAppSelector((state) => state.ui);
  const isOpen = profileModal.isOpen;

  const { data: profileData, isLoading: profileLoading, refetch } = useGetProfileQuery(
    undefined,
    {
      skip: !auth.token || !isOpen,
      refetchOnMountOrArgChange: true,
    }
  );

  // Refetch profile when modal opens
  useEffect(() => {
    if (isOpen && auth.token) {
      refetch();
    }
  }, [isOpen, auth.token, refetch]);

  const [updateProfile, { isLoading: updateLoading }] =
    useUpdateProfileMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: {
      code: "",
      name: "",
    },
  });

  const profile = profileData?.data;

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

  useEffect(() => {
    if (profile) {
      // If profile has country, use it; otherwise, use location data
      let countryData = profile.country || { code: "", name: "" };

      // If no country in profile, try to get from location
      if (!countryData.code) {
        const locationCountryCode = getCountryCode();
        if (locationCountryCode) {
          const foundCountry = countries.find(
            (c) => c.code === locationCountryCode
          );
          if (foundCountry) {
            countryData = {
              code: foundCountry.code,
              name: foundCountry.name,
            };
          }
        }
      }

      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        country: countryData,
      });
    } else {
      // If no profile loaded yet, try to preselect from location
      const locationCountryCode = getCountryCode();
      if (locationCountryCode) {
        const foundCountry = countries.find(
          (c) => c.code === locationCountryCode
        );
        if (foundCountry) {
          setFormData((prev) => ({
            ...prev,
            country: {
              code: foundCountry.code,
              name: foundCountry.name,
            },
          }));
        }
      }
    }
  }, [profile]);

  const handleClose = () => {
    dispatch(closeProfileModal());
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === "country.name") {
      setFormData((prev) => ({
        ...prev,
        country: { ...prev.country, name: value },
      }));
    } else if (field === "country.code") {
      setFormData((prev) => ({
        ...prev,
        country: { ...prev.country, code: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = async () => {
    try {
      await updateProfile(formData).unwrap();
      toast.success("Profile updated successfully!");
      handleClose();
    } catch (error: any) {
      console.log("Failed to update profile:", error);
      const errorMessage =
        error?.data?.message || "Failed to update profile. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleCountryChange = (value: string, option: { label: string }) => {
    setFormData((prev) => ({
      ...prev,
      country: {
        code: value,
        name: option.label,
      },
    }));
  };

  // Transform countries data for SelectDropdown
  const countryOptions = countries.map((country) => ({
    value: country.code,
    label: country.name,
    code: country.code,
    flagCode: country.code,
  }));

  return {
    isOpen,
    profileLoading,
    updateLoading,
    formData,
    countryOptions,
    handleClose,
    handleInputChange,
    handleSave,
    handleCountryChange,
  };
};
