"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import { images, appStrings } from "@/service";
import { useLogin } from "@/hook";
import Button from "../shared/Button";
import Input from "../shared/Input";

const LoginStep: React.FC = () => {
  const {
    email,
    setEmail,
    loading,
    googleLoading,
    handleSubmit,
    handleGoogleLogin,
    handleRegisterClick,
  } = useLogin();

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
        {appStrings.login}
      </h2>
      <p className="text-text-700 mb-4 max-w-[360px] mx-auto tracking-tight text-sm md:text-base">
        {appStrings.loginDescription}
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 md:space-y-6 max-w-[360px] mx-auto"
      >
        <Input
          type="email"
          id="email"
          label={appStrings.yourEmail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={appStrings.enterYourEmail}
          required
        />

        <div>
          <Button
            type="submit"
            variant="primary"
            size="md"
            fullWidth
            isLoading={loading}
            loadingText={appStrings.loggingIn}
            className="mb-3"
          >
            {appStrings.loginBtn}
          </Button>

          <div className="text-center text-sm md:text-base text-text-950 tracking-tight">
            {appStrings.dontHaveAccount}{" "}
            <Button variant="link" onClick={handleRegisterClick}>
              {appStrings.registerNow}
            </Button>
          </div>
        </div>

        <Button
          variant="google"
          fullWidth
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          isLoading={googleLoading}
          loadingText="Redirecting..."
          leftIcon={
            !googleLoading ? (
              <div className="relative w-5 md:w-6 h-5 md:h-6">
                <Image
                  src={images?.googleLogo}
                  alt="google"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            ) : undefined
          }
        >
          {appStrings.loginWithGoogle}
        </Button>
      </form>
    </div>
  );
};

export default LoginStep;
