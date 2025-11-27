import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setAuthModalStep,
  setAuthModalEmail,
  setAuthModalOtpType,
} from "@/store/modules/ui/uiSlice";
import { useSignupMutation } from "@/store/modules/auth/authApi";
import { getDeviceId, getDeviceIpAddress } from "@/service/helpers/device.utils";
import { countriesData, envConfig } from "@/service";
import { toast } from "react-toastify";

// Export countries for use in components
export const countries = countriesData;

export const useRegister = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: countriesData[0],
    agreeToTerms: false,
  });
  const [signup] = useSignupMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.agreeToTerms
    ) {
      return;
    }

    try {
      const deviceId = getDeviceId();
      const ipAddress = await getDeviceIpAddress();
      
      await signup({
        name: formData.name.trim(),
        email: formData.email.trim(),
        country: formData.country,
        device_id: deviceId,
        device_web_ip_address: ipAddress,
      }).unwrap();

      dispatch(setAuthModalEmail(formData.email.trim()));
      dispatch(setAuthModalOtpType("signup"));
      dispatch(setAuthModalStep("otp"));
    } catch (error: any) {
      console.log("Registration error:", error);
      const errorMessage =
        error?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const deviceId = getDeviceId();
      const ipAddress = await getDeviceIpAddress();
      
      // Get current selected country or default
      const countryCode = formData.country?.code || countriesData[0].code;
      const countryName = formData.country?.name || countriesData[0].name;
      
      // Build Google OAuth URL with query parameters
      const googleAuthUrl = `${envConfig.baseUrl}auth/google?device_id=${deviceId}&country_code=${countryCode}&country_name=${encodeURIComponent(countryName)}&ip_address=${ipAddress}`;
      
      // Redirect to Google OAuth
      window.location.href = googleAuthUrl;
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Failed to initiate Google login. Please try again.");
    }
  };

  const handleLoginClick = () => {
    dispatch(setAuthModalStep("login"));
  };

  const updateFormData = (field: string, value: string | boolean | typeof countriesData[0]) => {
    setFormData({ ...formData, [field]: value });
  };

  return {
    formData,
    setFormData,
    loading,
    error,
    handleSubmit,
    handleGoogleRegister,
    handleLoginClick,
    updateFormData,
  };
};
