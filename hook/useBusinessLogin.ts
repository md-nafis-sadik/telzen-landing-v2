import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setBusinessAuthModalStep,
  setBusinessAuthModalEmail,
  setBusinessAuthModalOtpType,
} from "@/store/modules/ui/uiSlice";
import { useBusinessLoginMutation } from "@/store/modules/auth/authApi";
import { toast } from "react-toastify";

export const useBusinessLogin = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [businessLogin] = useBusinessLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      return;
    }

    try {
      await businessLogin({
        email: email.trim(),
      }).unwrap();

      dispatch(setBusinessAuthModalEmail(email.trim()));
      dispatch(setBusinessAuthModalOtpType("login"));
      dispatch(setBusinessAuthModalStep("otp"));
    } catch (error: any) {
      console.log("Business login error:", error);
      const errorMessage =
        error?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleRegisterClick = () => {
    dispatch(setBusinessAuthModalStep("register"));
  };

  return {
    email,
    setEmail,
    loading,
    handleSubmit,
    handleRegisterClick,
  };
};
