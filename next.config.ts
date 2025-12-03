import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // output: "export",
  images: {
    unoptimized: true,
  },
  experimental: {
    // Enable prefetching in development
    optimizePackageImports: ["@reduxjs/toolkit", "motion"],
  },
};

export default nextConfig;
