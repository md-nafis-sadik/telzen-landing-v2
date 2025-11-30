"use client";

import { appStrings, images } from "@/service";
import Image from "next/image";
import BlurText from "../animation/BlurText";
import { useContactForm } from "@/hook";
import Button from "../shared/Button";
import Input from "../shared/Input";
import Textarea from "../shared/Textarea";

function ContactForm() {
  const { formData, isLoading, handleInputChange, handleSubmit } =
    useContactForm();

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
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* <Input
                  type="text"
                  id="name"
                  label={appStrings.yourName}
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder={appStrings.startTypingName}
                  required
                /> */}

                <Input
                  type="email"
                  id="email"
                  label={appStrings.yourEmail}
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder={appStrings.startTypingEmail}
                  className="border-natural-400 bg-white"
                  required
                />

                <Input
                  type="text"
                  id="subject"
                  label={appStrings.subjectOptional}
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  placeholder={appStrings.enterSubject}
                  className="border-natural-400 bg-white"
                  required
                />

                <Textarea
                  id="message"
                  label={appStrings.message}
                  rows={6}
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder={appStrings.startTypingMessage}
                  className="border-natural-400 bg-white"
                  required
                />

                <div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    fullWidth
                    isLoading={isLoading}
                    loadingText={appStrings.sendingMessage}
                    className="mt-2"
                  >
                    {appStrings.submit}
                  </Button>
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
