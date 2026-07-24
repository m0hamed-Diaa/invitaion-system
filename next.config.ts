import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "smgndjtsevgbyyykzans.supabase.co",
      },
    ],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
};

export default nextConfig;