const envConfig = {
  googleAppUrl: process.env.NEXT_PUBLIC_GOOGLE_APP_URL,
  playAppUrl: process.env.NEXT_PUBLIC_PLAY_APP_URL,
  baseUrl:
    process.env.NEXT_PUBLIC_BASE_URL || "http://46.250.238.64:9000/api/v1/app/",
  blogUrl:
    process.env.NEXT_PUBLIC_BLOG_URL || "https://server.netrosystems.com",
  stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
};

export { envConfig };
