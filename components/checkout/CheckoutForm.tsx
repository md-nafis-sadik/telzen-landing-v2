"use client";

import { images, appStrings } from "@/service";
import Image from "next/image";
import Button from "../shared/Button";
import Input from "../shared/Input";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FormEvent, useState, useEffect, Suspense } from "react";
import { useCheckout } from "@/hook";
import { useAppSelector } from "@/store/hooks";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

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
  const stripe = useStripe();
  const elements = useElements();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [stripeReady, setStripeReady] = useState(false);

  const { createPayment, verifyPayment, error, setError } = useCheckout();
  const authData = useAppSelector((state) => state.auth.auth);
  const token = authData?.token || "";

  const packageId = searchParams.get("package_id");
  const orderType = searchParams.get("order_type") || "new";

  // Calculate final payment amount from packageData if not provided
  const paymentAmount =
    finalAmount !== undefined
      ? finalAmount
      : packageData?.grand_total_selling_price || 0;

  // Check if Stripe is ready
  useEffect(() => {
    if (stripe && elements) {
      setStripeReady(true);
    }
  }, [stripe, elements]);

  // Set user email on component mount
  useEffect(() => {
    if (authData?.email) {
      setEmail(authData.email);
    }
  }, [authData]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !token) {
      toast.error("Payment system not ready. Please try again.");
      return;
    }

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    if (!packageId) {
      toast.error("Package ID is required");
      return;
    }

    setIsProcessing(true);
    console.log("Clearing error state");

    try {
      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        toast.error("Card details not found");
        return;
      }

      // Create payment intent only when user submits
      console.log("Creating payment on form submit with:", {
        packageId,
        orderType,
        paymentAmount,
      });

      const paymentResult = await createPayment(
        {
          package_id: packageId,
          order_type: orderType as "new" | "topup",
          final_payment_amount: paymentAmount,
          currency: "USD",
          coupon_id: couponId,
        },
        token
      );

      console.log("Payment creation result:", paymentResult);

      if (!paymentResult?.data) {
        toast.error("Failed to create payment. Please try again.");
        return;
      }

      const createdOrderId = paymentResult.data._id;
      const isFree = paymentResult.data.is_free_purchase;
      const secret = paymentResult.data.client_secret;

      // Handle free purchase - validate card but don't charge
      if (isFree) {
        // For free packages, just show success message and redirect
        toast.success("Free package activated successfully!");
        
        // Redirect to success page with order ID
        if (onSuccess) {
          onSuccess();
        } else {
          // Fallback redirect to my-esim page
          window.location.href = "/my-esim";
        }
        return;
      }

      // Handle paid purchase with Stripe
      if (!secret) {
        toast.error("Payment system not ready. Please try again.");
        return;
      }

      // Confirm the payment with Stripe
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(secret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              email: email,
            },
          },
        });

      if (stripeError) {
        toast.error(stripeError.message || "Payment failed");
        console.log(stripeError.message || "Payment failed");
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        // Verify payment with backend
        const verifyResult = await verifyPayment(createdOrderId, token);

        if (verifyResult?.success || verifyResult?.status_code === 409) {
          toast.success("Payment successful! Your eSIM is being activated.");
          if (onSuccess) onSuccess();
        } else {
          toast.error("Payment verification failed. Please contact support.");
        }
      }
    } catch (err: any) {
      console.log("Payment error:", err);
      toast.error(err.message || "An error occurred during payment");
    } finally {
      setIsProcessing(false);
    }
  };

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
              disabled={!stripe || isProcessing}
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
