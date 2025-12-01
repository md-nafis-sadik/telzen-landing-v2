import { FormEvent, useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useCheckout } from "./useCheckout";
import { useAppSelector } from "@/store/hooks";
import { formatFloatingNumber } from "@/service";

interface UseCheckoutFormProps {
  packageData?: any;
  onSuccess?: () => void;
  finalAmount?: number;
  couponId?: string;
}

export const useCheckoutForm = ({
  packageData,
  onSuccess,
  finalAmount,
  couponId,
}: UseCheckoutFormProps) => {
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
    //   console.log("Creating payment on form submit with:", {
    //     packageId,
    //     orderType,
    //     paymentAmount,
    //   });

      const paymentResult = await createPayment(
        {
          package_id: packageId,
          order_type: orderType as "new" | "topup",
          final_payment_amount: formatFloatingNumber(paymentAmount),
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

  return {
    email,
    setEmail,
    isProcessing,
    stripeReady,
    error,
    paymentAmount,
    handleSubmit,
  };
};
