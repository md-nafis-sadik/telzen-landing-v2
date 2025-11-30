"use client";

import React from "react";
import Image from "next/image";
import { images, appStrings, countriesData } from "@/service";
import { useRegister } from "@/hook";
import Button from "../shared/Button";
import Input from "../shared/Input";
import SelectDropdown, { SelectOption } from "../shared/SelectDropdown";

const RegisterStep: React.FC = () => {
  const {
    formData,
    setFormData,
    loading,
    error,
    handleSubmit,
    handleGoogleRegister,
    handleLoginClick,
  } = useRegister();

  return (
    <div className="text-center">
      <h1 className="text-4xl md:text-[56px] font-extrabold text-text-950 font-barlow">
        {appStrings.register}
      </h1>
      <p className="text-text-700 mb-4 max-w-[360px] mx-auto tracking-tight text-sm md:text-base">
        {appStrings.registerDescription}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        <Input
          type="text"
          id="name"
          label={appStrings.yourName}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder={appStrings.enterYourName}
          required
        />

        <Input
          type="email"
          id="register-email"
          label={appStrings.yourEmailOtp}
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          placeholder={appStrings.enterYourEmail}
          required
        />

        <SelectDropdown
          label={appStrings.country}
          options={countriesData.map((country) => ({
            value: country.code,
            label: country.name,
            code: country.code,
            flagCode: country.code,
          }))}
          value={formData.country.code}
          onChange={(value, option) => {
            setFormData({
              ...formData,
              country: { code: value, name: option.label },
            });
          }}
          placeholder="Select your country"
          showFlag={true}
          searchable={true}
        />

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
          <label htmlFor="terms" className="text-xs md:text-sm text-gray-600">
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


        <Button
          type="submit"
          variant="primary"
          size="md"
          fullWidth
          disabled={!formData.name.trim() || !formData.email.trim()}
          isLoading={loading}
          loadingText="Registering..."
          className="mb-3"
        >
          Register
        </Button>

        <div className="text-center text-sm md:text-base text-text-950 tracking-tight">
          Already have an account?{" "}
          <Button
            variant="link"
            onClick={handleLoginClick}
          >
            Login Now
          </Button>
        </div>

        {/* <Button
          variant="google"
          fullWidth
          onClick={handleGoogleRegister}
          className="py-3"
          leftIcon={
            <div className="relative w-5 md:w-6 h-5 md:h-6">
              <Image
                src={images?.googleLogo}
                alt="google"
                fill
                className="object-contain"
                priority
              />
            </div>
          }
        >
          Login With Google
        </Button> */}
      </form>
    </div>
  );
};

export default RegisterStep;
