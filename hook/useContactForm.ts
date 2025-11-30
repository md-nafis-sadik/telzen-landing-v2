import { useState } from "react";
import { useCreateContactSupportMutation } from "@/store/modules/destination/destinationApi";
import { toast } from "react-toastify";

export const useContactForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const [createContactSupport, { isLoading }] =
    useCreateContactSupportMutation();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      const contactData = {
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: `${formData.message.trim()}`,
      };

      const result = await createContactSupport(contactData).unwrap();

      if (result.success) {
        toast.success(
          "Your message has been sent successfully! We'll get back to you soon."
        );
        // Reset form
        setFormData({
          email: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(
          result.message || "Failed to send message. Please try again."
        );
      }
    } catch (error: any) {
      console.log("Contact form error:", error);
      const errorMessage =
        error?.data?.message || "Failed to send message. Please try again.";
      toast.error(errorMessage);
    }
  };

  return {
    formData,
    isLoading,
    handleInputChange,
    handleSubmit,
  };
};
