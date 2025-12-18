import { FormEvent, useState } from "react";
import type { StripeCardNumberElementChangeEvent } from "@stripe/stripe-js";
import { useStripe, useElements, CardNumberElement } from "@stripe/react-stripe-js";
import { useAppSelector } from "@/store/hooks";
import { toast } from "react-toastify";
import { useCheckout } from "@/hook";
import { formatFloatingNumber } from "@/service";

interface UseEmbeddedCheckoutFormProps {
  packageId: string;
  amount: number;
  currency?: string;
  couponId?: string;
  orderType: "new" | "topup";
  onSuccess?: (orderId: string) => void; 
}

export const useEmbeddedCheckoutForm = ({
  packageId,
  amount,
  currency = "USD",
  couponId,
  orderType,
  onSuccess,
}: UseEmbeddedCheckoutFormProps) => {
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
          final_payment_amount: formatFloatingNumber(amount),
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
          if (onSuccess) onSuccess(orderId);
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

  const handleFreePackage = async () => {
    if (!token) {
      toast.error("Please login to continue.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Create payment on backend for free package
      const paymentResult = await createPayment(
        {
          package_id: packageId,
          order_type: orderType,
          final_payment_amount: 0,
          currency,
          coupon_id: couponId,
        },
        token
      );

      if (!paymentResult?.data) {
        throw new Error("Failed to activate free package");
      }

      const { _id: orderId } = paymentResult.data;

      toast.success("Free package activated successfully!");
      // Pass orderId to onSuccess callback
      if (onSuccess) onSuccess(orderId);
    } catch (err: any) {
      const errorMsg = err.message || "Activation failed. Please try again.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    stripe,
    isProcessing,
    error,
    cardholderName,
    setCardholderName,
    cardBrand,
    handleCardChange,
    handleSubmit,
    handleFreePackage,
  };
};