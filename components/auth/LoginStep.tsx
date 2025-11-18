"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setAuthModalStep, setAuthModalEmail } from "@/store/modules/ui/uiSlice";
import { useSigninMutation } from "@/store/modules/auth/authApi";
import { getDeviceId } from "@/service/helpers/device.utils";
import Image from "next/image";
import { images } from "@/service";

const LoginStep: React.FC = () => {
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
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <div className="text-center">
      <div className="mb-6 flex justify-center">
        <div className="w-full h-full">
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="w-full h-[170px] mx-auto"
          >
            <SwiperSlide>
              <div className="flex justify-center items-center h-full">
                <Image
                  src={images?.globeAirplane}
                  alt="world"
                  width={239}
                  height={170}
                  priority
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex justify-center items-center h-full">
                <Image
                  src={images?.pyramidGiza}
                  alt="world"
                  width={246}
                  height={170}
                  priority
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex justify-center items-center h-full">
                <Image
                  src={images?.easterIsland}
                  alt="world"
                  width={240}
                  height={170}
                  priority
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex justify-center items-center h-full">
                <Image
                  src={images?.palmTree}
                  alt="world"
                  width={193}
                  height={170}
                  priority
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex justify-center items-center h-full">
                <Image
                  src={images?.coinGame}
                  alt="world"
                  width={196}
                  height={170}
                  priority
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-4xl md:text-[56px] font-extrabold text-text-950 font-barlow">
        LOGIN
      </h2>
      <p className="text-text-700 mb-4 max-w-[360px] mx-auto tracking-tight text-sm md:text-base">
        Simple login towards unlimited, unmetered internet access for everyone
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-left text-xs md:text-sm font-medium text-text-700 mb-2"
          >
            Your Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all placeholder:text-xs md:placeholder:text-sm"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 h-13 bg-primary-700 text-white rounded-full cursor-pointer hover:bg-primary-800 transition disabled:opacity-50 disabled:cursor-not-allowed mb-3 font-medium text-sm md:text-base"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="text-center text-sm md:text-base text-text-950 tracking-tight">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => dispatch(setAuthModalStep("register"))}
              className="text-primary-700 cursor-pointer hover:text-primary-800 transition-colors font-bold"
            >
              Register Now
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full border border-natural-500 text-black py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-[10px] tracking-tight text-sm md:text-base"
        >
          <div className="relative w-5 md:w-6 h-5 md:h-6">
            <Image
              src={images?.googleLogo}
              alt="world"
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

export default LoginStep;
