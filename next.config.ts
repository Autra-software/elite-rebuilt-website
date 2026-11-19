import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first (smallest), WebP for browsers without AVIF support.
    formats: ["image/avif", "image/webp"],
    // Our photos are 1600px wide; no need to prepare larger versions.
    deviceSizes: [640, 828, 1080, 1200, 1600],
    // Photos rarely change: keep optimized copies for 31 days.
    minimumCacheTTL: 2678400,
  },
};

export default nextConfig;
