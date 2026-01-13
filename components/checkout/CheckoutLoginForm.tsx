"use client";

import { images, appStrings } from "@/service";
import Image from "next/image";
import Button from "../shared/Button";
import Input from "../shared/Input";
import { useCheckoutLogin } from "@/hook";

function CheckoutLoginForm() {
  const {
    email,
    setEmail,
    isLoading,
    handleSubmit,
    handleGoogleLogin,
    handleRegisterClick,
  } = useCheckoutLogin();

  return (
    <div className="w-full lg:w-1/2 flex flex-col justify-center bg-white rounded-3xl px-6 py-8">
      <div>
        {/* Title */}
        <h2 className="text-4xl md:text-[56px] font-extrabold text-text-950 font-barlow text-center">
          {appStrings.login}
        </h2>
        <p className="text-text-700 mb-4 mx-auto tracking-tight text-sm md:text-base text-center">
          {appStrings.loginDescription}
        </p>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            type="email"
            id="email"
            label={appStrings.yourEmail}
            placeholder={appStrings.enterYourEmail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div>
            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              className="mb-3"
              isLoading={isLoading}
              loadingText={appStrings.loggingIn}
              disabled={isLoading}
            >
              {appStrings.loginBtn}
            </Button>

            <div className="text-center text-sm md:text-base text-text-950 tracking-tight">
              {appStrings.dontHaveAccount}{" "}
              <Button
                variant="link"
                onClick={handleRegisterClick}
                type="button"
              >
                {appStrings.registerNow}
              </Button>
            </div>
          </div>

          <Button
            variant="google"
            fullWidth
            onClick={handleGoogleLogin}
            type="button"
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
            {appStrings.loginWithGoogle}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CheckoutLoginForm;
