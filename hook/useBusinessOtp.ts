import { useState, useEffect, useRef } from "react";
import { useAppSelector } from "@/store/hooks";
import {
  useBusinessOtpVerifyMutation,
  useBusinessResendOtpMutation,
} from "@/store/modules/auth/authApi";
import { toast } from "react-toastify";

export const useBusinessOtp = () => {
  const { businessAuthModal } = useAppSelector((state) => state.ui);
  const { loading } = useAppSelector((state) => state.auth);
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [businessOtpVerify] = useBusinessOtpVerifyMutation();
  const [businessResendOtp] = useBusinessResendOtpMutation();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const maskedEmail = businessAuthModal.email.replace(
    /(.{2})(.*)(@.*)/,
    (_, start, middle, end) => start + "*".repeat(middle.length) + end
  );

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }

    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4);

    if (!/^\d+$/.test(pastedData)) {
      return;
    }

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length && i < 4; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    const nextEmptyIndex = newOtp.findIndex((digit) => !digit);
    const focusIndex = nextEmptyIndex === -1 ? 3 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpCode = otp.join("");
    if (otpCode.length !== 4) {
      toast.error("Please enter complete OTP");
      return;
    }

    try {
      await businessOtpVerify({
        email: businessAuthModal.email,
        code: otpCode,
      }).unwrap();

      // The redirect will be handled in the API onQueryStarted
    } catch (error: any) {
      console.log("Business OTP verification error:", error);
      const errorMessage =
        error?.data?.message || "OTP verification failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleResendOtp = async () => {
    try {
      await businessResendOtp({
        email: businessAuthModal.email,
      }).unwrap();

      toast.success("OTP resent successfully");
      setCountdown(60);
      setOtp(["", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (error: any) {
      console.log("Resend OTP error:", error);
      const errorMessage =
        error?.data?.message || "Failed to resend OTP. Please try again.";
      toast.error(errorMessage);
    }
  };

  return {
    otp,
    countdown,
    loading,
    maskedEmail,
    inputRefs,
    handleOtpChange,
    handleKeyDown,
    handlePaste,
    handleSubmit,
    handleResendOtp,
  };
};
