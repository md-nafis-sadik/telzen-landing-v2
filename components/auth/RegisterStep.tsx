"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setAuthModalStep,
  setAuthModalEmail,
} from "@/store/modules/ui/uiSlice";
import { useSignupMutation } from "@/store/modules/auth/authApi";
import { getDeviceId } from "@/service/helpers/device.utils";
import Image from "next/image";
import { images } from "@/service";
import { toast } from 'react-toastify';

interface Country {
  code: string;
  name: string;
}

const countries: Country[] = [
  { code: "BD", name: "Bangladesh" },
  { code: "US", name: "United States" },
  { code: "AU", name: "Australia" },
  { code: "IN", name: "India" },
  { code: "UK", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
];

const RegisterStep: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: countries[0],
    agreeToTerms: false,
  });
  const [signup] = useSignupMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.agreeToTerms
    ) {
      return;
    }

    try {
      const deviceId = getDeviceId();
      await signup({
        name: formData.name.trim(),
        email: formData.email.trim(),
        country: formData.country,
        device_id: deviceId,
      }).unwrap();

      dispatch(setAuthModalEmail(formData.email.trim()));
      dispatch(setAuthModalStep("otp"));
    } catch (error: any) {
      console.log("Registration error:", error);
      const errorMessage = error?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
    }
  };

  const handleGoogleRegister = () => {
    console.log("Google register clicked");
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl md:text-[56px] font-extrabold text-text-950 font-barlow">
        REGISTER
      </h1>
      <p className="text-text-700 mb-4 max-w-[360px] mx-auto tracking-tight text-sm md:text-base">
        Register now and unlock borderless connections.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-left text-xs md:text-sm font-medium text-text-700 mb-2"
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter your name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-0 focus:border-primary-700 outline-none transition-all placeholder:text-xs md:placeholder:text-sm"
            required
          />
        </div>

        <div>
          <label
            htmlFor="register-email"
            className="block text-left text-xs md:text-sm font-medium text-text-700 mb-2"
          >
            Your Email (For OTP Verification)
          </label>
          <input
            type="email"
            id="register-email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-0 focus:border-primary-700 outline-none transition-all placeholder:text-xs md:placeholder:text-sm"
            required
          />
        </div>

        <div>
          <label
            htmlFor="country"
            className="block text-left text-xs md:text-sm font-medium text-text-700 mb-2"
          >
            Country
          </label>
          <select
            id="country"
            value={formData.country.code}
            onChange={(e) => {
              const selectedCountry =
                countries.find((c) => c.code === e.target.value) ||
                countries[0];
              setFormData({ ...formData, country: selectedCountry });
            }}
            className="w-full px-4 py-3 border border-gray-300 focus:border-primary-800 rounded-lg focus:ring-0 outline-none transition-all placeholder:text-xs md:placeholder:text-sm"
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-start gap-3 text-left">
          <input
            type="checkbox"
            id="terms"
            checked={formData.agreeToTerms}
            onChange={(e) =>
              setFormData({ ...formData, agreeToTerms: e.target.checked })
            }
            className="mt-1 w-5 h-5 text-primary-700 border-gray-300 rounded focus:border-primary-800 focus:ring-0 cursor-pointer"
            required
          />
          <label htmlFor="terms" className="text-sm text-gray-600">
            By creating an account, you agree to our{" "}
            <a
              href="#"
              className="text-primary-700 cursor-pointer hover:text-primary-800"
            >
              Terms & Conditions
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-primary-700 cursor-pointer hover:text-primary-800"
            >
              Privacy Policy
            </a>
          </label>
        </div>

        {error && <div className="text-red-500 text-sm text-left">{error}</div>}

        <button
          type="submit"
          disabled={loading || !formData.agreeToTerms}
          className="w-full px-4 py-2 h-13 bg-primary-700 text-white rounded-full cursor-pointer hover:bg-primary-800 transition disabled:opacity-50 disabled:cursor-not-allowed mb-3 font-medium text-sm md:text-base"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <div className="text-center text-sm md:text-base text-text-950 tracking-tight">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => dispatch(setAuthModalStep("login"))}
            className="text-primary-700 cursor-pointer hover:text-primary-800 transition-colors font-bold"
          >
            Login Now
          </button>
        </div>

        <button
          type="button"
          onClick={handleGoogleRegister}
          className="w-full border border-natural-500 text-black py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-[10px] tracking-tight text-sm md:text-base"
        >
          <div className="relative w-5 md:w-6 h-5 md:h-6">
            <Image
              src={images?.googleLogo}
              alt="google"
              fill
              className="object-contain"
              priority
            />
          </div>
          Login With Google
        </button>
      </form>
    </div>
  );
};

export default RegisterStep;
