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

  serverExternalPackages: [
    "@sparticuz/chromium",
    "puppeteer-core",
  ],

  outputFileTracingIncludes: {
    "/*": [
      "./node_modules/@sparticuz/chromium/**/*",
    ],
  },
};

export default nextConfig;