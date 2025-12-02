"use client";

import { useEffect, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { saveAuthData } from "@/store/modules/auth/authSlice";
import { toast } from "react-toastify";
import { envConfig } from "@/service/config/env";

const GoogleOAuthHandlerContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const token = searchParams.get("token");
  const [isLoading, setIsLoading] = useState(false);

  // Get the stored redirect URL from sessionStorage
  const getRedirectUrl = () => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("oauth_redirect_url") || "/";
    }
    return "/";
  };

  useEffect(() => {
    const handleGoogleCallback = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      
      try {
        // Calculate expiration time (7 days from now)
        const expireAt = Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60);
        
        // Manually fetch profile using fetch API with the token
        const response = await fetch(`${envConfig.webApiUrl}/auth/profile`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
        });

        console.log("Profile API response status:", response.status);

        if (response.ok) {
          const result = await response.json();
          console.log("Profile API result:", result);

          if (result?.data) {
            const profileData = result.data;
            
            console.log("Profile data fetched:", profileData);
            
            // Save complete auth data with profile info and token
            dispatch(
              saveAuthData({
                id: profileData._id,
                name: profileData.name,
                email: profileData.email,
                country: profileData.country,
                image: profileData.image,
                customerId: profileData._id,
                token: token,
                expireAt: expireAt,
              })
            );
            
            // console.log("Auth data saved with name:", profileData.name);
            // toast.success("Successfully logged in!");
          }
        } else {
          console.log("Profile API error:", response.status, await response.text());
          // Still save the token even if profile fetch fails
          dispatch(saveAuthData({ token, expireAt }));
        //   toast.success("Successfully logged in!");
        }

        // Get redirect URL and clean up
        const redirectUrl = getRedirectUrl();
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("oauth_redirect_url");
        }

        // Small delay to ensure state is saved to localStorage
        await new Promise(resolve => setTimeout(resolve, 150));

        // Remove token from URL and redirect
        router.replace(redirectUrl);
      } catch (error) {
        console.log("OAuth callback error:", error);
        toast.error("Login failed. Please try again.");
        
        // Clean up and redirect to home
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("oauth_redirect_url");
        }
        router.replace("/");
      } finally {
        setIsLoading(false);
      }
    };

    handleGoogleCallback();
  }, [token, dispatch, router]);

  // Show loading spinner while processing
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-primary-black opacity-90 flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 md:w-12 h-10 md:h-12 border-4 border-gray-50 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 dark:text-gray-300 font-medium text-sm md:text-base">
            Signing in...
          </p>
        </div>
      </div>
    );
  }

  // Show nothing after processing
  return null;
};

const GoogleOAuthHandler = () => {
  return (
    <Suspense fallback={null}>
      <GoogleOAuthHandlerContent />
    </Suspense>
  );
};

export default GoogleOAuthHandler;
