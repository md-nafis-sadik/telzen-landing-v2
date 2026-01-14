import moment from "moment";
import { apiSlice } from "../api/apiSlice";
import { saveAuthData, setLoading, setError, updateAuth, AuthCountry } from "./authSlice";
import { closeAuthModal } from "../ui/uiSlice";
import { envConfig } from "@/service";

export interface SignupData {
  name: string;
  email: string;
  country: AuthCountry;
  device_id: string;
  device_web_ip_address: string;
}

export interface SigninData {
  email: string;
  device_id: string;
  device_web_ip_address: string;
}

export interface OtpVerifyData {
  email: string;
  otp: string;
  type: "signin" | "signup";
  device_id: string;
  device_web_ip_address: string;
}

export interface ResendOtpData {
  email: string;
}

export interface ProfileData {
  _id: string;
  name: string;
  email: string;
  country: AuthCountry;
  is_email_verified: boolean;
  image: string;
  currency: string;
  tz_point: number;
  is_blocked: boolean;
  created_at: number;
}

export interface ProfileResponse {
  status_code: number;
  success: boolean;
  message: string;
  meta: null;
  data: ProfileData;
}

export interface UpdateProfileData {
  name: string;
  email: string;
  country: AuthCountry;
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

          if (data?.data?.access_token) {
            // Calculate expiry time (30 days from now)
            const currentDate = moment();
            const futureDate = currentDate.add(30, "days");
            const expireAt = futureDate.unix();

            // Save auth data with token (normalize access_token to token)
            dispatch(
              saveAuthData({
                id: data.data._id,
                name: data.data.name,
                email: data.data.email,
                country: data.data.country,
                image: data.data.image,
                token: data.data.access_token, // Normalize the token field
                expireAt,
                customerId: data.data._id, // Save customer_id for coupon validation
              })
            );

            // Don't close modal here - let the success step handle it
            // The UI will show success step and user can close manually
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

    // Get profile query
    getProfile: builder.query<ProfileResponse, void>({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data) {
            // Update auth state with fresh profile data including customer_id
            dispatch(
              updateAuth({
                id: data.data._id,
                name: data.data.name,
                email: data.data.email,
                country: data.data.country,
                image: data.data.image,
                customerId: data.data._id, // Save customer_id for coupon validation
              })
            );
          }
        } catch (error) {
          console.log("Failed to update auth from profile:", error);
        }
      },
      providesTags: ["Auth"],
    }),

    // Update profile mutation (dummy for now)
    updateProfile: builder.mutation<any, UpdateProfileData>({
      query: (formData) => ({
        url: "/customer/update-own-profile", // This will be the actual API when ready
        method: "PATCH",
        body: formData,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          // Update the auth state with new profile data
          dispatch(
            updateAuth({
              name: _arg.name,
              email: _arg.email,
              country: _arg.country,
            })
          );
          dispatch(setLoading(false));
        } catch (error: any) {
          dispatch(
            setError(error?.data?.message || "Failed to update profile")
          );
        }
      },
      invalidatesTags: ["Auth"],
    }),

    // Business Login mutation (dummy endpoint)
    businessLogin: builder.mutation<any, { email: string }>({
      query: (formData) => ({
        url: "/business/auth/login", // Dummy endpoint
        method: "POST",
        body: formData,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
          dispatch(updateAuth({ email: _arg.email }));
        } catch (error: any) {
          dispatch(setError(error?.data?.message || "Business login failed"));
        }
      },
    }),

    // Business Register mutation (dummy endpoint)
    businessRegister: builder.mutation<any, {
      name: string;
      businessName: string;
      email: string;
      country: AuthCountry;
      document?: File | null;
    }>({
      query: (formData) => {
        // For file upload, use FormData
        const body = new FormData();
        body.append("name", formData.name);
        body.append("business_name", formData.businessName);
        body.append("email", formData.email);
        body.append("country_code", formData.country.code);
        body.append("country_name", formData.country.name);
        if (formData.document) {
          body.append("document", formData.document);
        }

        return {
          url: "/business/auth/register", // Dummy endpoint
          method: "POST",
          body,
        };
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;
          dispatch(setLoading(false));
          dispatch(updateAuth({ email: _arg.email }));
        } catch (error: any) {
          dispatch(setError(error?.data?.message || "Business registration failed"));
        }
      },
    }),

    // Business OTP verification mutation (dummy endpoint)
    businessOtpVerify: builder.mutation<any, {
      email: string;
      otp: string;
      type: "login" | "register";
    }>({
      query: (formData) => ({
        url: "/business/auth/otp-verify", // Dummy endpoint
        method: "POST",
        body: formData,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true));
        try {
          const { data } = await queryFulfilled;

          if (data?.data?.access_token) {
            // Save token and user info to localStorage
            const businessAuthData = {
              token: data.data.access_token,
              email: data.data.email || _arg.email,
              name: data.data.name,
              businessName: data.data.business_name,
              country: data.data.country,
            };
            
            localStorage.setItem("telzen_business_auth", JSON.stringify(businessAuthData));
            
            // Redirect to business portal with token
            const redirectUrl = `${envConfig.businessPortalUrl}?token=${encodeURIComponent(data.data.access_token)}`;
            
            window.location.href = redirectUrl;
          }

          dispatch(setLoading(false));
        } catch (error: any) {
          dispatch(setError(error?.data?.message || "Business OTP verification failed"));
        }
      },
    }),

    // Business Resend OTP mutation (dummy endpoint)
    businessResendOtp: builder.mutation<any, { email: string }>({
      query: (formData) => ({
        url: "/business/auth/resend-otp", // Dummy endpoint
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
  useGetProfileQuery,
  useUpdateProfileMutation,
  useBusinessLoginMutation,
  useBusinessRegisterMutation,
  useBusinessOtpVerifyMutation,
  useBusinessResendOtpMutation,
} = authApi;
