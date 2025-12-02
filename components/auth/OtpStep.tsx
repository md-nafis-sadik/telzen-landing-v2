"use client";

import React from "react";
import { useOtpVerification } from "@/hook";
import Button from "../shared/Button";
import { appStrings } from "@/service";

const OtpStep: React.FC = () => {
  const {
    otp,
    countdown,
    loading,
    maskedEmail,
    handleOtpChange,
    handleKeyDown,
    handlePaste,
    handleSubmit,
    handleResendOtp,
  } = useOtpVerification();



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
              onPaste={handlePaste}
              className="w-16 md:w-21 h-10 md:h-12 text-center text-2xl font-bold bg-[#F5F5F5] border-1 border-[#E4E4E4] rounded-lg focus:ring-1 focus:ring-primary-700 focus:border-transparent outline-none transition-all max-h-[90%]"
              maxLength={1}
            />
          ))}
        </div>

        <div className="text-center mb-6">
          <span className="text-natural-500 text-lg">
            {countdown > 9 ? `0:${countdown}` : `0:0${countdown}`}
          </span>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          fullWidth
          disabled={otp.join("").length !== 4}
          isLoading={loading}
          loadingText={appStrings.verifying}
          className="mb-3"
        >
          {appStrings.verifyBtn}
        </Button>

        <div className="text-center text-sm md:text-base text-text-950 tracking-tight">
          {appStrings.didntReceiveOtp}{" "}
          <Button
            variant="link"
            onClick={handleResendOtp}
            disabled={countdown > 0}
          >
            {appStrings.resendCode}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OtpStep;
