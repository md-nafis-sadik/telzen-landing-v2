import moment from "moment";
import { apiSlice } from "../api/apiSlice";
import { saveAuthData, setLoading, setError, updateAuth } from "./authSlice";

export interface SignupData {
  name: string;
  email: string;
  country: {
    code: string;
    name: string;
  };
  device_id: string;
}

export interface SigninData {
  email: string;
  device_id: string;
}

export interface OtpVerifyData {
  email: string;
  otp: string;
  type: "signin" | "signup";
}

export interface ResendOtpData {
  email: string;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Signup mutation
    signup: builder.mutation<any, SignupData>({
      query: (formData) => ({
        url: "/auth/signup",
        method: "POST",
        body: formData,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
          // Store email for OTP verification
          dispatch(updateAuth({ email: _arg.email }));
        } catch (error: any) {
          dispatch(setError(error?.data?.message || "Registration failed"));
        }
      },
    }),

    // Signin mutation
    signin: builder.mutation<any, SigninData>({
      query: (formData) => ({
        url: "/auth/signin",
        method: "POST",
        body: formData,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
          // Store email for OTP verification
          dispatch(updateAuth({ email: _arg.email }));
        } catch (error: any) {
          dispatch(setError(error?.data?.message || "Login failed"));
        }
      },
    }),

    // OTP verification mutation
    otpVerify: builder.mutation<any, OtpVerifyData>({
      query: (formData) => ({
        url: "/auth/otp-verify",
        method: "POST",
        body: formData,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          
          if (data?.data?.token) {
            // Calculate expiry time (30 days from now)
            const currentDate = moment();
            const futureDate = currentDate.add(30, "days");
            const expireAt = futureDate.unix();
            
            // Save auth data with token
            dispatch(saveAuthData({ 
              ...data.data, 
              expireAt,
              email: _arg.email 
            }));
          }
          
          dispatch(setLoading(false));
        } catch (error: any) {
          dispatch(setError(error?.data?.message || "OTP verification failed"));
        }
      },
    }),

    // Resend OTP mutation
    resendOtp: builder.mutation<any, ResendOtpData>({
      query: (formData) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: formData,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          await queryFulfilled;
          dispatch(setLoading(false));
        } catch (error: any) {
          dispatch(setError(error?.data?.message || "Failed to resend OTP"));
        }
      },
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useOtpVerifyMutation,
  useResendOtpMutation,
} = authApi;