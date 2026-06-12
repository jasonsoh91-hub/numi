import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    qualities: [75, 90],
  },
  // Disable Turbopack if experiencing issues
  // experimental: {
  //   turbo: undefined,
  // },
};

export default nextConfig;
