import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setBusinessAuthModalStep,
  setBusinessAuthModalEmail,
  setBusinessAuthModalOtpType,
} from "@/store/modules/ui/uiSlice";
import { useBusinessRegisterMutation } from "@/store/modules/auth/authApi";
import { AuthCountry } from "@/store/modules/auth/authSlice";
import { toast } from "react-toastify";

export const useBusinessRegister = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    country: { code: "AU", name: "Australia", dial_code: "+61" } as AuthCountry,
    document: null as File | null,
    agreeToTerms: false,
  });

  const [businessRegister] = useBusinessRegisterMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.businessName.trim() || !formData.email.trim()) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!formData.agreeToTerms) {
      toast.error("Please agree to Terms & Conditions");
      return;
    }

    try {
      await businessRegister({
        name: formData.name.trim(),
        businessName: formData.businessName.trim(),
        email: formData.email.trim(),
        country: formData.country,
        document: formData.document,
      }).unwrap();

      dispatch(setBusinessAuthModalEmail(formData.email.trim()));
      dispatch(setBusinessAuthModalOtpType("register"));
      dispatch(setBusinessAuthModalStep("otp"));
    } catch (error: any) {
      console.log("Business registration error:", error);
      const errorMessage =
        error?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleLoginClick = () => {
    dispatch(setBusinessAuthModalStep("login"));
  };

  const handleFileChange = (file: File | null) => {
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB");
        return;
      }
      setFormData({ ...formData, document: file });
    }
  };

  return {
    formData,
    setFormData,
    loading,
    handleSubmit,
    handleLoginClick,
    handleFileChange,
  };
};
