import { useState } from "react";
import { envConfig } from "@/service";
import { toast } from "react-toastify";

export interface CreatePaymentParams {
  package_id: string;
  order_type: "new" | "topup";
  coupon_id?: string;
  final_payment_amount: number;
  currency?: string;
}

export interface CreatePaymentResponse {
  status_code: number;
  success: boolean;
  message: string;
  meta: null;
  data: {
    _id: string;
    package: string;
    payment_id: string;
    payment_status: string;
    payment_amount: {
      USD: number;
    };
    created_at: number;
    client_secret: string;
    is_free_purchase: boolean;
  };
}

export interface VerifyPaymentResponse {
  status_code: number;
  success: boolean;
  message: string;
  meta?: null;
  data?: any;
  error_messages?: Array<{
    path: string;
    message: string;
  }>;
}

export const useCheckout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPayment = async (
    params: CreatePaymentParams,
    token: string
  ): Promise<CreatePaymentResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const requestBody: any = {
        package: params.package_id,
        final_payment_amount: params.final_payment_amount,
        currency: params.currency || "USD",
      };

      if (params.coupon_id) {
        requestBody.coupon = params.coupon_id;
      }

      console.log("Creating payment with body:", requestBody);

      const response = await fetch(
        `${envConfig.baseUrl}checkout/create-payment?order_type=${params.order_type}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();

      console.log("API Response:", data);

      if (!data.success) {
        const errorMsg = data.message || "Failed to create payment";
        setError(errorMsg);
        console.error("Payment creation failed:", data);
        toast.error(errorMsg);
        return null;
      }

      return data;
    } catch (err: any) {
      const errorMsg = err.message || "An error occurred";
      setError(errorMsg);
      console.error("Payment creation error:", err);
      toast.error(errorMsg);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyPayment = async (
    orderId: string,
    token: string
  ): Promise<VerifyPaymentResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${envConfig.baseUrl}checkout/verify-payment?order_id=${orderId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!data.success) {
        // Check if it's the "already assigned" error - this might be acceptable
        if (data.status_code === 409) {
          setError(data.message);
        } else {
          setError(data.message || "Failed to verify payment");
        }
        return data;
      }

      return data;
    } catch (err: any) {
      setError(err.message || "An error occurred");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const cancelPayment = async (
    orderId: string,
    token: string
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${envConfig.baseUrl}checkout/cancel-payment?order_id=${orderId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Failed to cancel payment");
        return false;
      }

      return true;
    } catch (err: any) {
      setError(err.message || "An error occurred");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createPayment,
    verifyPayment,
    cancelPayment,
    isLoading,
    error,
    setError,
  };
};
