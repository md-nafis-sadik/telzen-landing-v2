"use client";

import React, { useRef } from "react";
import { images, countriesData, getDialCode } from "@/service";
import { useBusinessRegister } from "@/hook";
import Button from "../shared/Button";
import Input from "../shared/Input";
import SelectDropdown from "../shared/SelectDropdown";
import Link from "next/link";

const BusinessRegisterStep: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const {
    formData,
    setFormData,
    loading,
    handleSubmit,
    handleLoginClick,
    handleFileChange,
  } = useBusinessRegister();

  const handleDocumentClick = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    handleFileChange(file || null);
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl md:text-[56px] font-extrabold text-text-950 font-barlow">
        REGISTER
      </h1>
      <p className="text-text-700 mb-4 max-w-[360px] mx-auto tracking-tight text-sm md:text-base">
        Register now and unlock borderless connections.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        <Input
          type="text"
          id="contact-name"
          label="Contact Person name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter your name"
          required
        />

        <Input
          type="text"
          id="business-name"
          label="Business Name"
          value={formData.businessName}
          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
          placeholder="Enter your business name"
          required
        />

        <Input
          type="email"
          id="business-register-email"
          label="Your Email (For OTP Verification)"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Enter your email"
          required
        />

        <SelectDropdown
          label="Country"
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
              country: { 
                code: value, 
                name: option.label,
                dial_code: getDialCode(value)
              },
            });
          }}
          placeholder="Select your country"
          showFlag={true}
          searchable={true}
        />

        {/* Document Upload */}
        <div className="text-left">
          <label className="block text-xs md:text-sm font-medium text-text-700 mb-2">
            Business Document (Trade Licence/ Incorporation Papers)
          </label>
          <div
            onClick={handleDocumentClick}
            className="w-full p-4 border-2 border-dashed border-primary-700 rounded-lg bg-[#F0FFF9] cursor-pointer hover:bg-[#E0FFF3] transition-colors flex flex-col gap-2"
          >
            <p className="text-text-950 text-sm font-medium">
              {formData.document ? formData.document.name : "UPLOAD DOCUMENT upto 10MB"}
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={onFileChange}
            className="hidden"
          />
        </div>

        <div className="flex items-start gap-3 text-left">
          <input
            type="checkbox"
            id="business-terms"
            checked={formData.agreeToTerms}
            onChange={(e) =>
              setFormData({ ...formData, agreeToTerms: e.target.checked })
            }
            className="mt-1 w-5 h-5 text-primary-700 border-gray-300 rounded focus:border-primary-800 focus:ring-0 cursor-pointer"
            required
          />
          <label htmlFor="business-terms" className="text-xs md:text-sm text-gray-600">
            By creating an account, you agree to our{" "}
            <Link
              href="/terms-and-conditions"
              className="text-primary-700 cursor-pointer hover:text-primary-800"
              target="_blank"
            >
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy-policy"
              className="text-primary-700 cursor-pointer hover:text-primary-800"
              target="_blank"
            >
              Privacy Policy
            </Link>
          </label>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          fullWidth
          disabled={!formData.name.trim() || !formData.businessName.trim() || !formData.email.trim()}
          isLoading={loading}
          loadingText="Registering..."
          className="mb-3"
        >
          Register
        </Button>

        <div className="text-center text-sm md:text-base text-text-950 tracking-tight">
          Already have an account?{" "}
          <Button variant="link" onClick={handleLoginClick}>
            Login Now
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BusinessRegisterStep;
