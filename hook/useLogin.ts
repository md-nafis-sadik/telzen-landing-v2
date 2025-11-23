import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setAuthModalStep,
  setAuthModalEmail,
} from "@/store/modules/ui/uiSlice";
import { useSigninMutation } from "@/store/modules/auth/authApi";
import { getDeviceId } from "@/service/helpers/device.utils";
import { toast } from "react-toastify";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [signin] = useSigninMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      return;
    }

    try {
      const deviceId = getDeviceId();
      await signin({
        email: email.trim(),
        device_id: deviceId,
      }).unwrap();

      dispatch(setAuthModalEmail(email.trim()));
      dispatch(setAuthModalStep("otp"));
    } catch (error: any) {
      console.log("Login error:", error);
      const errorMessage = error?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  const handleRegisterClick = () => {
    dispatch(setAuthModalStep("register"));
  };

  return {
    email,
    setEmail,
    loading,
    error,
    handleSubmit,
    handleGoogleLogin,
    handleRegisterClick,
  };
};