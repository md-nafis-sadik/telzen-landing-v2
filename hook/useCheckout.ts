import {
  useCreatePaymentMutation,
  useVerifyPaymentMutation,
  useCancelPaymentMutation,
  CreatePaymentParams,
  CreatePaymentResponse,
  VerifyPaymentResponse,
} from "@/store/modules/checkout/checkoutApi";
import { useAppSelector } from "@/store/hooks";

export type {
  CreatePaymentParams,
  CreatePaymentResponse,
  VerifyPaymentResponse,
};

export const useCheckout = () => {
  const [createPaymentMutation, { isLoading: isCreatingPayment }] =
    useCreatePaymentMutation();
  const [verifyPaymentMutation, { isLoading: isVerifyingPayment }] =
    useVerifyPaymentMutation();
  const [cancelPaymentMutation, { isLoading: isCancellingPayment }] =
    useCancelPaymentMutation();

  const createPayment = async (
    params: CreatePaymentParams,
    token: string
  ): Promise<CreatePaymentResponse | null> => {
    try {
      const result = await createPaymentMutation({ params }).unwrap();
      return result;
    } catch (error: any) {
      console.log("Payment creation error:", error);
      return null;
    }
  };

  const verifyPayment = async (
    orderId: string,
    token: string
  ): Promise<VerifyPaymentResponse | null> => {
    try {
      const result = await verifyPaymentMutation({ orderId }).unwrap();
      return result;
    } catch (error: any) {
      console.log("Payment verification error:", error);
      return error?.data || null;
    }
  };

  const cancelPayment = async (
    orderId: string,
    token: string
  ): Promise<boolean> => {
    try {
      const result = await cancelPaymentMutation({ orderId }).unwrap();
      return result.success;
    } catch (error: any) {
      console.log("Payment cancellation error:", error);
      return false;
    }
  };

  return {
    createPayment,
    verifyPayment,
    cancelPayment,
    isLoading: isCreatingPayment || isVerifyingPayment || isCancellingPayment,
    error: null,
    setError: () => {}, // Kept for backward compatibility
  };
};
