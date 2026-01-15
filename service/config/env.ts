const envConfig = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  frontendUrl: process.env.NEXT_PUBLIC_FRONTEND_URL,
  blogUrl: process.env.NEXT_PUBLIC_BLOG_URL,
  stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
  businessApiUrl: process.env.NEXT_PUBLIC_BUSINESS_API_URL,
  businessRedirectUrl: process.env.NEXT_PUBLIC_BUSINESS_REDIRECT_URL,
};

export { envConfig };
