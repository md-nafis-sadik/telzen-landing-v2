const envConfig = {
  googleAppUrl: process.env.NEXT_PUBLIC_GOOGLE_APP_URL,
  playAppUrl: process.env.NEXT_PUBLIC_PLAY_APP_URL,
  baseUrl: process.env.APP_BASE_URL || "http://46.250.238.64:9000/api/v1/app/",
};

export { envConfig };
