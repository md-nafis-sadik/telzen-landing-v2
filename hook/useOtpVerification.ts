import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setAuthModalStep } from "@/store/modules/ui/uiSlice";
import {
  useOtpVerifyMutation,
  useResendOtpMutation,
} from "@/store/modules/auth/authApi";
import { getDeviceId, getDeviceIpAddress } from "@/service/helpers/device.utils";
import { toast } from "react-toastify";

export const useOtpVerification = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const { authModal } = useAppSelector((state) => state.ui);
  const email = authModal.email;
  const otpType = authModal.otpType;
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [countdown, setCountdown] = useState(59);
  const [otpVerify] = useOtpVerifyMutation();
  const [resendOtp] = useResendOtpMutation();

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.querySelector(
        `input[name="otp-${index + 1}"]`
      ) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.querySelector(
        `input[name="otp-${index - 1}"]`
      ) as HTMLInputElement;
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpString = otp.join("");
    if (otpString.length !== 4) {
      return;
    }

    try {
      const deviceId = getDeviceId();
      const ipAddress = await getDeviceIpAddress();
      
      await otpVerify({
        email: email,
        otp: otpString,
        type: otpType,
        device_id: deviceId,
        device_web_ip_address: ipAddress,
      }).unwrap();

      dispatch(setAuthModalStep("success"));
    } catch (error: any) {
      console.log("OTP verification error:", error);
      const errorMessage =
        error?.data?.message || "OTP verification failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleResendOtp = async () => {
    try {
      await resendOtp({ email: email }).unwrap();
      setCountdown(59);
      toast.success("OTP has been resent to your email.");
    } catch (error: any) {
      console.log("Resend OTP error:", error);
      const errorMessage =
        error?.data?.message || "Failed to resend OTP. Please try again.";
      toast.error(errorMessage);
    }
  };

  const maskedEmail = email.replace(
    /(.{4})(.*)(@.*)/,
    (match, start, middle, end) => start + "*".repeat(middle.length) + end
  );

  return {
    otp,
    countdown,
    loading,
    maskedEmail,
    handleOtpChange,
    handleKeyDown,
    handleSubmit,
    handleResendOtp,
  };
};
