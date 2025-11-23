import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setAuthModalStep,
  setAuthModalEmail,
} from "@/store/modules/ui/uiSlice";
import { useSignupMutation } from "@/store/modules/auth/authApi";
import { getDeviceId } from "@/service/helpers/device.utils";
import { toast } from "react-toastify";

interface Country {
  code: string;
  name: string;
}

export const countries: Country[] = [
  { code: "BD", name: "Bangladesh" },
  { code: "US", name: "United States" },
  { code: "AU", name: "Australia" },
  { code: "IN", name: "India" },
  { code: "UK", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
];

export const useRegister = () => {
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
      const errorMessage =
        error?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleGoogleRegister = () => {
    console.log("Google register clicked");
  };

  const handleLoginClick = () => {
    dispatch(setAuthModalStep("login"));
  };

  const updateFormData = (field: string, value: string | boolean | Country) => {
    setFormData({ ...formData, [field]: value });
  };

  return {
    formData,
    setFormData,
    loading,
    error,
    handleSubmit,
    handleGoogleRegister,
    handleLoginClick,
    updateFormData,
  };
};
