"use client";

import React from "react";
import { useBusinessOtp } from "@/hook";
import Button from "../shared/Button";

const BusinessOtpStep: React.FC = () => {
  const {
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
  } = useBusinessOtp();

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
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              name={`otp-${index}`}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-16 md:w-21 h-10 md:h-12 text-center text-2xl font-bold bg-[#F5F5F5] border-1 border-[#E4E4E4] rounded-lg focus:ring-1 focus:ring-primary-700 focus:border-transparent outline-none transition-all max-h-[90%]"
              maxLength={1}
              autoComplete="off"
            />
          ))}
        </div>

        <div className="text-sm md:text-base text-gray-500">
          {countdown > 0 ? (
            <span>0:{countdown < 10 ? `0${countdown}` : countdown}</span>
          ) : null}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          fullWidth
          disabled={otp.some((digit) => !digit)}
          isLoading={loading}
          loadingText="Verifying..."
        >
          Verify and Login
        </Button>

        <div className="text-center text-sm md:text-base text-text-950 tracking-tight">
          Didn&apos;t receive an OTP?{" "}
          {countdown === 0 ? (
            <Button variant="link" onClick={handleResendOtp}>
              Resend Code
            </Button>
          ) : (
            <span className="text-gray-400">Resend Code</span>
          )}
        </div>
      </form>
    </div>
  );
};

export default BusinessOtpStep;
