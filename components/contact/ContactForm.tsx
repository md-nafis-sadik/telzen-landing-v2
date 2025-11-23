"use client";

import { appStrings, images } from "@/service";
import Image from "next/image";
import BlurText from "../animation/BlurText";
import { useState } from "react";
import { useCreateContactSupportMutation } from "@/store/modules/destination/destinationApi";
import { toast } from "react-toastify";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [createContactSupport, { isLoading }] = useCreateContactSupportMutation();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
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
        subject: formData.subject.trim() || `Message from ${formData.name.trim()}`,
        message: `Name: ${formData.name.trim()}\n\n${formData.message.trim()}`,
      };

      const result = await createContactSupport(contactData).unwrap();
      
      if (result.success) {
        toast.success("Your message has been sent successfully! We'll get back to you soon.");
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(result.message || "Failed to send message. Please try again.");
      }
    } catch (error: any) {
      console.error("Contact form error:", error);
      const errorMessage = error?.data?.message || "Failed to send message. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <section className="pt-10 md:pt-16 lg:pt-20 pb-10 md:pb-20 lg:pb-28 min-h-screen bg-white">
      <div className="containerX text-center">
        <h2 className="title text-primary-700 mb-6 md:mb-8 lg:mb-10 overflow-hidden">
          <BlurText
            text={appStrings.contactUs}
            translateY={[50, 0]}
            className="md:tracking-[-2px]"
          />
        </h2>
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12 mt-10 lg:mt-20">
          <div className="w-full flex justify-center items-center">
            <Image
              src={images.contactUs}
              alt="app store"
              width={432}
              height={432}
              className="duration-200"
              priority
            />
          </div>

          <div className="w-full flex flex-col justify-center bg-natural-50 rounded-3xl px-6 py-8">
            <div>
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-left text-xs md:text-sm font-medium text-text-700 mb-2"
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 border border-natural-400 bg-white rounded-lg focus:ring-0 focus:border-primary-700 outline-none transition-all placeholder:text-xs md:placeholder:text-sm"
                    required
                  />
                </div>
                
                <div>
                  <label
                    htmlFor="email"
                    className="block text-left text-xs md:text-sm font-medium text-text-700 mb-2"
                  >
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-natural-400 bg-white rounded-lg focus:ring-0 focus:border-primary-700 outline-none transition-all placeholder:text-xs md:placeholder:text-sm"
                    required
                  />
                </div>
                
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-left text-xs md:text-sm font-medium text-text-700 mb-2"
                  >
                    Subject (Optional)
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    placeholder="Enter subject"
                    className="w-full px-4 py-3 border border-natural-400 bg-white rounded-lg focus:ring-0 focus:border-primary-700 outline-none transition-all placeholder:text-xs md:placeholder:text-sm"
                  />
                </div>
                
                <div>
                  <label
                    htmlFor="message"
                    className="block text-left text-xs md:text-sm font-medium text-text-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Start typing your message here"
                    className="w-full px-4 py-3 border border-natural-400 bg-white rounded-lg focus:ring-0 focus:border-primary-700 outline-none transition-all placeholder:text-xs md:placeholder:text-sm"
                    required
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-4 py-2 mt-2 h-13 bg-primary-700 text-white rounded-full cursor-pointer hover:bg-primary-800 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm md:text-base"
                  >
                    {isLoading ? "Sending..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
