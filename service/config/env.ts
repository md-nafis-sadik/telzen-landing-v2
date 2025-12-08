const envConfig = {
  googleAppUrl: process.env.NEXT_PUBLIC_GOOGLE_APP_URL,
  playAppUrl: process.env.NEXT_PUBLIC_PLAY_APP_URL,
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  frontendUrl: process.env.NEXT_PUBLIC_FRONTEND_URL,
  webApiUrl: process.env.NEXT_PUBLIC_WEB_API_URL,
  appApiUrl: process.env.NEXT_PUBLIC_APP_API_URL,
  blogUrl: process.env.NEXT_PUBLIC_BLOG_URL,
  stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
};

export { envConfig };
