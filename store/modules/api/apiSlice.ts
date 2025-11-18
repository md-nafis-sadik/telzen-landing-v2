import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, clearAuthState } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://46.250.238.64:9000/api/v1/app/",
  prepareHeaders: async (headers, { getState, endpoint }) => {
    const token = (getState() as any)?.auth?.auth?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Accept", "application/json");
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    const response = result?.error?.data as any;
    
    if (response?.error === "Invalid token" || response?.error === "Unauthorized") {
      // Clear all auth state and API cache when token is invalid
      api.dispatch(logout());
      api.dispatch(clearAuthState());
      api.dispatch(apiSlice.util.resetApiState());
    }
    return result;
  },
  endpoints: (builder) => ({}),
});