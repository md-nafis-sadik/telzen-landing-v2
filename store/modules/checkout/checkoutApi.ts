import { apiSlice } from "../api/apiSlice";
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
    _id?: string;
    order_id?: string;
    package?: string;
    payment_id: string;
    payment_status: string;
    order_type?: string;
    is_free_purchase?: boolean;
    payment_amount?: {
      USD: number;
      BDT?: number;
    };
    payment_currency?: string;
    created_at: number;
    client_secret?: string;
    approve_link?: string;
  };
}

export interface VerifyPaymentResponse {
  status_code: number;
  success: boolean;
  message: string;
  meta?: null;
  data?: any;
}

export interface CancelPaymentResponse {
  status_code: number;
  success: boolean;
  message: string;
  meta?: null;
  data?: any;
}

export const checkoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create payment
    createPayment: builder.mutation<
      CreatePaymentResponse,
      { params: CreatePaymentParams }
    >({
      query: ({ params }) => {
        const requestBody: any = {
          package: params.package_id,
          final_payment_amount: params.final_payment_amount,
          currency: params.currency || "USD",
        };

        if (params.coupon_id) {
          requestBody.coupon = params.coupon_id;
        }

        // Use v3 endpoint for BDT currency, v2 for others
        const endpoint = params.currency === "BDT" 
          ? `/checkout-v3/create-payment?order_type=${params.order_type}`
          : `/checkout-v2/create-payment?order_type=${params.order_type}&is_web=true`;

        return {
          url: endpoint,
          method: "POST",
          body: requestBody,
        };
      },
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (!data.success) {
            toast.error(data.message || "Failed to create payment");
          }
        } catch (error: any) {
          const errorMsg =
            error?.error?.data?.message || "Failed to create payment";
          toast.error(errorMsg);
        }
      },
    }),

    // Verify payment with order_id
    verifyPayment: builder.mutation<
      VerifyPaymentResponse,
      { orderId: string }
    >({
      query: ({ orderId }) => ({
        url: `/checkout/verify-payment?order_id=${orderId}`,
        method: "POST",
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            toast.success("Payment verified! Your eSIM is being activated.");
          }
        } catch (error: any) {
          const errorMsg =
            error?.error?.data?.message || "Failed to verify payment";
          toast.error(errorMsg);
        }
      },
      invalidatesTags: ["Esim"],
    }),

    // Cancel payment
    cancelPayment: builder.mutation<
      CancelPaymentResponse,
      { orderId: string }
    >({
      query: ({ orderId }) => ({
        url: `/checkout/cancel-payment?order_id=${orderId}`,
        method: "POST",
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            toast.success("Payment cancelled successfully");
          } else {
            toast.error(data.message || "Failed to cancel payment");
          }
        } catch (error: any) {
          const errorMsg =
            error?.error?.data?.message || "Failed to cancel payment";
          toast.error(errorMsg);
        }
      },
    }),
  }),
});

export const {
  useCreatePaymentMutation,
  useVerifyPaymentMutation,
  useCancelPaymentMutation,
} = checkoutApi;
