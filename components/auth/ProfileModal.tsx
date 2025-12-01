"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/store/modules/auth/authApi";
import { closeProfileModal } from "@/store/modules/ui/uiSlice";
import { CloseIcon, countriesData as countries, appStrings } from "@/service";
import { toast } from "react-toastify";
import SelectDropdown, { SelectOption } from "../shared/SelectDropdown";
import { getCountryCode, getStoredLocationData } from "@/hook/useLocation";
import Button from "../shared/Button";

function ProfileModal() {
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((state) => state.auth);
  const { profileModal } = useAppSelector((state) => state.ui);
  const isOpen = profileModal.isOpen;

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
    dispatch(closeProfileModal());
  };

  const { data: profileData, isLoading: profileLoading } = useGetProfileQuery(
    undefined,
    {
      skip: !auth.token || !isOpen,
    }
  );

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

  // Transform countries data for SelectDropdown
  const countryOptions: SelectOption[] = countries.map((country) => ({
    value: country.code,
    label: country.name,
    code: country.code,
    flagCode: country.code,
  }));

  const handleCountryChange = (value: string, option: SelectOption) => {
    setFormData((prev) => ({
      ...prev,
      country: {
        code: value,
        name: option.label,
      },
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#004534E5] opacity-90 flex items-center justify-center z-[10000] p-4 overflow-hidden"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.3 }}
            className="bg-white rounded-3xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto no-scrollbar relative shadow-xl"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <CloseIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-4xl md:text-[56px] font-extrabold text-text-950 font-barlow">
                {appStrings.myProfile}
              </h2>
              <p className="text-text-700 text-sm lg:text-base">
                {appStrings.profileWelcome}
              </p>
            </div>

            {profileLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-700"></div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-left text-xs md:text-sm font-medium text-text-700 mb-2">
                    {appStrings.yourName}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder={appStrings.startTypingName}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-0 focus:border-primary-700 outline-none transition-all placeholder:text-xs md:placeholder:text-sm"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-left text-xs md:text-sm font-medium text-text-700 mb-2">
                    {appStrings.yourEmail}
                  </label>
                  <input
                    disabled
                    type="email"
                    value={formData.email}
                    readOnly
                    placeholder={appStrings.enterYourEmail}
                    className="w-full px-4 py-3 border bg-gray-100 border-gray-300 rounded-lg cursor-not-allowed opacity-60 placeholder:text-xs md:placeholder:text-sm"
                  />
                </div>

                {/* Country Field */}
                <SelectDropdown
                  disabled
                  label={appStrings.country}
                  options={countryOptions}
                  value={formData.country.code}
                  onChange={() => {}}
                  placeholder="Select your country"
                  showFlag={true}
                  searchable={true}
                />

                {/* Save Button */}
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={handleSave}
                  isLoading={updateLoading}
                  loadingText={appStrings.saving}
                  animate
                  className="mt-6 font-semibold lg:text-base"
                >
                  {appStrings.save}
                </Button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ProfileModal;
