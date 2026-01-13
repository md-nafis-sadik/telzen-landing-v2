import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { toast } from "react-toastify";
import { useCheckout } from "@/hook";
import { formatFloatingNumber } from "@/service";

interface UsePayPalCheckoutFormProps {
  packageId: string;
  amount: number;
  currency?: string;
  couponId?: string;
  orderType: "new" | "topup";
  onSuccess?: (orderId: string) => void;
}

export const usePayPalCheckoutForm = ({
  packageId,
  amount,
  currency = "USD",
  couponId,
  orderType,
  onSuccess,
}: UsePayPalCheckoutFormProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { createPayment } = useCheckout();
  const authData = useAppSelector((state) => state.auth.auth);
  const token = authData?.token || "";

  const handlePayPalPayment = async () => {
    if (!token) {
      toast.error("Please login to continue.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
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

      const { approve_link, order_id } = paymentResult.data;

      // Redirect to PayPal for payment approval
      if (approve_link) {
        // Store order_id in sessionStorage as fallback
        if (order_id) {
          sessionStorage.setItem('paypal_order_id', order_id);
          sessionStorage.setItem('paypal_payment_pending', 'true');
        }
        
        // Backend handles the return URL, just redirect to PayPal
        window.location.href = approve_link;
      } else {
        throw new Error("PayPal approval link not received");
      }
    } catch (err: any) {
      const errorMsg = err.message || "Payment failed. Please try again.";
      setError(errorMsg);
      toast.error(errorMsg);
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

      const orderId = paymentResult.data._id || paymentResult.data.order_id || "";

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
    isProcessing,
    error,
    handlePayPalPayment,
    handleFreePackage,
  };
};
