import moment from "moment";
import { apiSlice } from "../api/apiSlice";
import { saveAuthData, setLoading, setError, updateAuth } from "./authSlice";
import { closeAuthModal } from "../ui/uiSlice";

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

export interface ProfileData {
  _id: string;
  name: string;
  email: string;
  country: {
    name: string;
    code: string;
  };
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
  country: {
    code: string;
    name: string;
  };
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
            // Update auth state with fresh profile data
            dispatch(
              updateAuth({
                id: data.data._id,
                name: data.data.name,
                email: data.data.email,
                country: data.data.country,
                image: data.data.image,
              })
            );
          }
        } catch (error) {
          console.error('Failed to update auth from profile:', error);
        }
      },
      providesTags: ["Auth"],
    }),

    // Update profile mutation (dummy for now)
    updateProfile: builder.mutation<any, UpdateProfileData>({
      query: (formData) => ({
        url: "/auth/profile", // This will be the actual API when ready
        method: "PUT",
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
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useOtpVerifyMutation,
  useResendOtpMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = authApi;
