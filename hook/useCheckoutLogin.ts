import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import {
  openAuthModal,
  setAuthModalStep,
  setAuthModalEmail,
  setAuthModalOtpType,
} from "@/store/modules/ui/uiSlice";
import { useSigninMutation } from "@/store/modules/auth/authApi";
import {
  getDeviceId,
  getDeviceIpAddress,
} from "@/service/helpers/device.utils";
import { countriesData, envConfig } from "@/service";
import { getCountryCode } from "./useLocation";
import { toast } from "react-toastify";

export const useCheckoutLogin = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [signin] = useSigninMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    setIsLoading(true);

    try {
      const deviceId = getDeviceId();
      const ipAddress = await getDeviceIpAddress();

      await signin({
        email: email.trim(),
        device_id: deviceId,
        device_web_ip_address: ipAddress,
      }).unwrap();

      // Store email and set OTP type
      dispatch(setAuthModalEmail(email.trim()));
      dispatch(setAuthModalOtpType("signin"));
      
      // Open the auth modal at OTP step
      dispatch(openAuthModal({ step: "otp", email: email.trim() }));
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage =
        error?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const deviceId = getDeviceId();
      const ipAddress = await getDeviceIpAddress();

      // Try to get country from location, otherwise use default
      const locationCountryCode = getCountryCode();
      const country =
        countriesData.find((c) => c.code === locationCountryCode) ||
        countriesData[0];

      // Build Google OAuth URL with query parameters
      const googleAuthUrl = `${
        envConfig.webApiUrl
      }/auth/google?device_id=${deviceId}&country_code=${
        country.code
      }&country_name=${encodeURIComponent(
        country.name
      )}&ip_address=${ipAddress}`;

      // Redirect to Google OAuth
      window.location.href = googleAuthUrl;
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Failed to initiate Google login. Please try again.");
    }
  };

  const handleRegisterClick = () => {
    dispatch(openAuthModal({ step: "register" }));
  };

  return {
    email,
    setEmail,
    isLoading,
    handleSubmit,
    handleGoogleLogin,
    handleRegisterClick,
  };
};
