"use client";

import React from "react";
import Image from "next/image";
import { images } from "@/service";
import { useBusinessLogin } from "@/hook";
import Button from "../shared/Button";
import Input from "../shared/Input";

const BusinessLoginStep: React.FC = () => {
  const {
    email,
    setEmail,
    loading,
    handleSubmit,
    handleRegisterClick,
  } = useBusinessLogin();

  return (
    <div className="text-center">
      <div className="mb-6 flex justify-center">
        <div className="w-full h-full flex justify-center items-center">
          <Image
            src={images?.globeAirplane}
            alt="world"
            width={239}
            height={170}
            priority
          />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-4xl md:text-[56px] font-extrabold text-text-950 font-barlow">
        BUSINESS LOGIN
      </h2>
      <p className="text-text-700 mb-4 max-w-[360px] mx-auto tracking-tight text-sm md:text-base">
        World of affordable eSIM for your clients and Users.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 max-w-[360px] mx-auto">
        <Input
          type="email"
          id="business-email"
          label="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />

        <div>
          <Button
            type="submit"
            variant="primary"
            size="md"
            fullWidth
            isLoading={loading}
            loadingText="Logging in..."
            className="mb-3"
          >
            Login
          </Button>

          <div className="text-center text-sm md:text-base text-text-950 tracking-tight">
            Don&apos;t have an account?{" "}
            <Button
              variant="link"
              onClick={handleRegisterClick}
            >
              Register Now
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BusinessLoginStep;
