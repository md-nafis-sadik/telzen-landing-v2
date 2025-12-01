"use client";

import { appStrings } from "@/service";
import Button from "../shared/Button";
import Input from "../shared/Input";
import { CardElement } from "@stripe/react-stripe-js";
import { Suspense } from "react";
import { useCheckoutForm } from "@/hook";

interface CheckoutFormProps {
  packageData?: any;
  onSuccess?: () => void;
  finalAmount?: number;
  couponId?: string;
}

function CheckoutFormContent({
  packageData,
  onSuccess,
  finalAmount,
  couponId,
}: CheckoutFormProps) {
  const {
    email,
    setEmail,
    isProcessing,
    stripeReady,
    error,
    paymentAmount,
    handleSubmit,
  } = useCheckoutForm({
    packageData,
    onSuccess,
    finalAmount,
    couponId,
  });

  return (
    <div className="w-full flex flex-col justify-center bg-white rounded-3xl px-6 py-8">
      <div>
        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            type="email"
            id="email"
            label={appStrings.yourEmail}
            placeholder={appStrings.enterYourEmail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Stripe Card Element */}
          <div className="w-full">
            <label className="block text-left text-xs md:text-sm font-medium text-text-700 mb-2">
              {appStrings.cardNumber || "Card Details"}
            </label>
            {!stripeReady ? (
              <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
                <p className="text-sm text-gray-500">Loading payment form...</p>
              </div>
            ) : (
              <div className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-within:border-primary-700 transition-all bg-white">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#1a1a1a",
                        fontFamily: "Inter, system-ui, sans-serif",
                        lineHeight: "24px",
                        "::placeholder": {
                          color: "#9ca3af",
                          fontSize: "14px",
                        },
                      },
                      invalid: {
                        color: "#ef4444",
                      },
                    },
                    hidePostalCode: false,
                  }}
                />
              </div>
            )}
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              className="mt-2"
              disabled={!stripeReady || isProcessing}
              isLoading={isProcessing}
            >
              {isProcessing 
                ? "Processing..." 
                : paymentAmount === 0 
                  ? "Continue to Purchase" 
                  : appStrings.continue}
            </Button>
          </div>
        </form>
        <div className="text-sm md:text-base text-text-950 tracking-tight mt-7">
          Your input data is always safe and we never store your any sensitive
          data. You can also check our
          <Button
            variant="link"
            className="underline ml-1 text-sm md:text-base"
          >
            Terms of Use & Privacy Policy
          </Button>
        </div>
      </div>
    </div>
  );
}

function CheckoutForm(props: CheckoutFormProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full flex flex-col justify-center bg-white rounded-3xl px-6 py-8">
          <div className="space-y-4">
            <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="w-full h-32 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      }
    >
      <CheckoutFormContent {...props} />
    </Suspense>
  );
}

export default CheckoutForm;
