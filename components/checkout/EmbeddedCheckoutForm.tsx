"use client";

import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";
import type { StripeCardNumberElementChangeEvent } from "@stripe/stripe-js";
import Image from "next/image";
import { useCheckout } from "@/hook";
import { useAppSelector } from "@/store/hooks";
import { toast } from "react-toastify";
import Button from "../shared/Button";
import Link from "next/link";

interface EmbeddedCheckoutFormProps {
  packageId: string;
  amount: number;
  currency?: string;
  couponId?: string;
  orderType: "new" | "topup";
  onSuccess?: () => void;
}

export default function EmbeddedCheckoutForm({
  packageId,
  amount,
  currency = "USD",
  couponId,
  orderType,
  onSuccess,
}: EmbeddedCheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardholderName, setCardholderName] = useState("");
  const [cardBrand, setCardBrand] = useState<string>("unknown");

  const { createPayment, verifyPayment } = useCheckout();
  const authData = useAppSelector((state) => state.auth.auth);
  const token = authData?.token || "";

  const handleCardChange = (event: StripeCardNumberElementChangeEvent) => {
    setCardBrand(event.brand);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !token) {
      toast.error("Payment system not ready. Please try again.");
      return;
    }

    if (!cardholderName.trim()) {
      setError("Please enter cardholder name");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const cardNumberElement = elements.getElement(CardNumberElement);

      if (!cardNumberElement) {
        throw new Error("Card element not found");
      }

      // Create payment on backend
      const paymentResult = await createPayment(
        {
          package_id: packageId,
          order_type: orderType,
          final_payment_amount: amount,
          currency,
          coupon_id: couponId,
        },
        token
      );

      if (!paymentResult?.data) {
        throw new Error("Failed to create payment");
      }

      const {
        client_secret,
        _id: orderId,
        is_free_purchase,
      } = paymentResult.data;

      // Handle free packages
      if (is_free_purchase) {
        const verifyResult = await verifyPayment(orderId, token);
        if (verifyResult?.success) {
          toast.success("Free package activated successfully!");
          if (onSuccess) onSuccess();
        }
        return;
      }

      // Confirm card payment with Stripe
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(client_secret, {
          payment_method: {
            card: cardNumberElement,
            billing_details: {
              name: cardholderName.trim(),
            },
          },
        });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      if (paymentIntent?.status === "succeeded") {
        // Verify payment with backend
        const verifyResult = await verifyPayment(orderId, token);
        if (verifyResult?.success) {
          toast.success("Payment successful! Your eSIM is being activated.");
          if (onSuccess) onSuccess();
        }
      }
    } catch (err: any) {
      const errorMsg = err.message || "Payment failed. Please try again.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsProcessing(false);
    }
  };

  // Card Brand Icon Component
  const CardBrandIcon = ({ brand }: { brand: string }) => {
    const icons: Record<string, string> = {
      visa: "https://js.stripe.com/v3/fingerprinted/img/visa-729c05c240c4bdb47b03ac81d9945bfe.svg",
      mastercard:
        "https://js.stripe.com/v3/fingerprinted/img/mastercard-4d8844094130711885b5e41b28c9848f.svg",
      amex: "https://js.stripe.com/v3/fingerprinted/img/amex-a49b82f46c5cd6a96a6e418a6ca1717c.svg",
      discover:
        "https://js.stripe.com/v3/fingerprinted/img/discover-ac52cd46f89fa40a29a0bfb954e33173.svg",
      diners:
        "https://js.stripe.com/v3/fingerprinted/img/diners-fbcbd3360f8e3f629cdaa80e93abdb8b.svg",
      jcb: "https://js.stripe.com/v3/fingerprinted/img/jcb-271fd06e6e7a2c52692ffa91a95fb64f.svg",
      unionpay:
        "https://js.stripe.com/v3/fingerprinted/img/unionpay-8a10aefc7295216c338ba4e1224627a1.svg",
    };

    if (brand === "unknown" || !icons[brand]) {
      return (
        <svg
          className="w-7 h-5" // smaller size
          viewBox="0 0 40 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="39"
            height="27"
            rx="3.5"
            fill="white"
            stroke="#D1D5DB"
          />
          <rect x="3" y="9" width="34" height="3" rx="1.5" fill="#E5E7EB" />
          <rect x="3" y="15" width="14" height="3" rx="1.5" fill="#E5E7EB" />
        </svg>
      );
    }

    return (
      <Image
        src={icons[brand]}
        alt={brand}
        width={28}
        height={20}
        className="object-contain"
        unoptimized
      />
    );
  };

  return (
    <div className="w-full flex flex-col justify-center bg-white rounded-3xl px-6 py-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Cardholder Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Name
          </label>
          <input
            type="text"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            placeholder="Enter your Name"
            className="w-full px-3 md:px-4 py-2.5 md:py-3.5 border border-gray-300 rounded-lg focus:ring-0 outline-none transition-all text-gray-900 placeholder:text-gray-400"
            required
          />
        </div>

        {/* Card Number with Brand Icon */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Number
          </label>
          <div className="relative border border-gray-300 rounded-lg px-3 md:px-4 py-2.5 md:py-3.5 pr-16 focus-within:border-primary-500 transition-colors">
            <CardNumberElement
              options={{
                placeholder: "0000 0000 0000 0000",
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#111827",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    "::placeholder": {
                      color: "#9ca3af",
                    },
                  },
                  invalid: {
                    color: "#ef4444",
                  },
                },
              }}
              onChange={handleCardChange}
            />
            {/* Card Brand Icon */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <CardBrandIcon brand={cardBrand} />
            </div>
          </div>
        </div>

        {/* Expiration Date and CVV */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiration Date
            </label>
            <div className="border border-gray-300 rounded-lg px-3 md:px-4 py-2.5 md:py-3.5 focus-within:border-primary-500 transition-colors">
              <CardExpiryElement
                options={{
                  placeholder: "MM/YY",
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#111827",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      "::placeholder": {
                        color: "#9ca3af",
                      },
                    },
                    invalid: {
                      color: "#ef4444",
                    },
                  },
                }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CVV/CVC
            </label>
            <div className="border border-gray-300 rounded-lg px-3 md:px-4 py-2.5 md:py-3.5 focus-within:border-primary-500 transition-colors">
              <CardCvcElement
                options={{
                  placeholder: "000",
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#111827",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      "::placeholder": {
                        color: "#9ca3af",
                      },
                    },
                    invalid: {
                      color: "#ef4444",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="md"
          fullWidth
          disabled={!stripe || isProcessing || !cardholderName.trim()}
          isLoading={isProcessing}
          loadingText={amount === 0 ? "Activating..." : "Processing Payment..."}
          className="font-semibold !rounded-full !py-4 mt-2"
        >
          {amount === 0 ? "Activate Free Package" : "Continue"}
        </Button>

        <p className="text-sm lg:text-base text-text-700">
          Your input data is always safe and we never store your any sensitive
          data. You can also check our{" "}
          <Link
            href="/terms-and-conditions"
            className="underline font-bold text-text-950"
          >
            Terms of Use
          </Link>{" "}
          &{" "}
          <Link
            href="/privacy-policy"
            className="underline font-bold text-text-950"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </form>
    </div>
  );
}
