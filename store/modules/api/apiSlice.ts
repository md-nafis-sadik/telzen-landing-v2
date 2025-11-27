import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, clearAuthState } from "../auth/authSlice";

const dynamicBaseQuery = fetchBaseQuery({
  baseUrl: "/", // Default base URL, will be overridden by individual endpoints
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

// Create a custom base query that can handle different base URLs
const baseQueryWithDynamicUrl = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  let url = args.url;

  // If a custom baseUrl is provided in args, use it
  if (args.baseUrl) {
    url = `${args.baseUrl}${args.url}`;
  } else {
    // Use default app API base URL
    url = `http://46.250.238.64:9000/api/v1/web${args.url}`;
  }

  // Create new args with the full URL
  const newArgs = {
    ...args,
    url,
  };

  const result = await dynamicBaseQuery(newArgs, api, extraOptions);
  const response = result?.error?.data as any;

  if (
    response?.error === "Invalid token" ||
    response?.error === "Unauthorized"
  ) {
    // Clear all auth state and API cache when token is invalid
    api.dispatch(logout());
    api.dispatch(clearAuthState());
    api.dispatch(apiSlice.util.resetApiState());
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithDynamicUrl,
  tagTypes: ["Auth", "Blog", "Destination", "Package", "Esim"],
  endpoints: (builder) => ({}),
});
