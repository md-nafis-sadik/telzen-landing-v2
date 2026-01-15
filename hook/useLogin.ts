import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
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

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [signin] = useSigninMutation();

  useEffect(() => {
    setGoogleLoading(false);

    const handlePageShow = () => setGoogleLoading(false);
    window.addEventListener("pageshow", handlePageShow);

    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      return;
    }

    try {
      const deviceId = getDeviceId();
      const ipAddress = await getDeviceIpAddress();

      await signin({
        email: email.trim(),
        device_id: deviceId,
        device_web_ip_address: ipAddress,
      }).unwrap();

      dispatch(setAuthModalEmail(email.trim()));
      dispatch(setAuthModalOtpType("signin"));
      dispatch(setAuthModalStep("otp"));
    } catch (error: any) {
      console.log("Login error:", error);
      const errorMessage =
        error?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);

      // Save current URL for redirect after OAuth
      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          "oauth_redirect_url",
          window.location.pathname + window.location.search
        );
      }

      const deviceId = getDeviceId();
      const ipAddress = await getDeviceIpAddress();

      // Try to get country from location, otherwise use default
      const locationCountryCode = getCountryCode();
      const country =
        countriesData.find((c) => c.code === locationCountryCode) ||
        countriesData[0];

      // Build Google OAuth URL with query parameters
      const googleAuthUrl = `${
        envConfig.baseUrl
      }/auth/google?device_id=${deviceId}&country_code=${
        country.code
      }&country_name=${encodeURIComponent(
        country.name
      )}&ip_address=${ipAddress}`;

      // Redirect to Google OAuth
      window.location.href = googleAuthUrl;
    } catch (error) {
      setGoogleLoading(false);
      console.log("Google login error:", error);
      toast.error("Failed to initiate Google login. Please try again.");
    }
  };

  const handleRegisterClick = () => {
    dispatch(setAuthModalStep("register"));
  };

  return {
    email,
    setEmail,
    loading,
    googleLoading,
    error,
    handleSubmit,
    handleGoogleLogin,
    handleRegisterClick,
  };
};
