"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setAuthModalStep } from "@/store/modules/ui/uiSlice";
import {
  useOtpVerifyMutation,
  useResendOtpMutation,
} from "@/store/modules/auth/authApi";
import { toast } from 'react-toastify';

const OtpStep: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const { authModal } = useAppSelector((state) => state.ui);
  const email = authModal.email;
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
      const result = await otpVerify({
        email: email,
        otp: otpString,
        type: "signin",
      }).unwrap();

      // Navigate to success step
      dispatch(setAuthModalStep("success"));
    } catch (error: any) {
      console.log("OTP verification error:", error);
      const errorMessage = error?.data?.message || 'OTP verification failed. Please try again.';
      toast.error(errorMessage);
    }
  };

  const handleResendOtp = async () => {
    try {
      await resendOtp({ email: email }).unwrap();
      setCountdown(59); // Reset countdown
      toast.success('OTP has been resent to your email.');
    } catch (error: any) {
      console.log("Resend OTP error:", error);
      const errorMessage = error?.data?.message || 'Failed to resend OTP. Please try again.';
      toast.error(errorMessage);
    }
  };

  const maskedEmail = email.replace(
    /(.{4})(.*)(@.*)/,
    (match, start, middle, end) => start + "*".repeat(middle.length) + end
  );



  return (
    <div className="text-center">
      <h1 className="text-4xl md:text-[56px] font-extrabold text-text-950 font-barlow">
        OTP
        <br />
        VERIFICATION
      </h1>
      <div>
        <p className="text-text-700 max-w-[360px] mx-auto tracking-tight text-sm md:text-base">
          An OTP has been sent to
        </p>
        <p className="text-text-700 mb-4 max-w-[360px] mx-auto tracking-tight text-sm md:text-base">
          {maskedEmail}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              name={`otp-${index}`}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-[84px] h-[50px] text-center text-2xl font-bold bg-[#F5F5F5] border-1 border-[#E4E4E4] rounded-lg focus:ring-1 focus:ring-primary-700 focus:border-transparent outline-none transition-all"
              maxLength={1}
            />
          ))}
        </div>

        <div className="text-center mb-6">
          <span className="text-natural-500 text-lg">
            {countdown > 9 ? `0:${countdown}` : `0:0${countdown}`}
          </span>
        </div>

        <button
          type="submit"
          disabled={loading || otp.join("").length !== 4}
          className="w-full px-4 py-2 h-13 bg-primary-700 text-white rounded-full cursor-pointer hover:bg-primary-800 transition disabled:opacity-50 disabled:cursor-not-allowed mb-3 font-medium text-sm md:text-base"
        >
          {loading ? "Verifying..." : "Verify and Login"}
        </button>

        <div className="text-center text-sm md:text-base text-text-950 tracking-tight">
          Didn&apos;t receive an OTP?{" "}
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={countdown > 0 || loading}
            className="text-primary-700 cursor-pointer hover:text-primary-800 transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Resend Code
          </button>
        </div>
      </form>
    </div>
  );
};

export default OtpStep;
