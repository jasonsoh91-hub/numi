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
  async redirects() {
    return [
      {
        source: "/preview-event-v4",
        destination: "/masterclass",
        permanent: true,
      },
      {
        source: "/preview-event-v4/thank-you",
        destination: "/masterclass/thank-you",
        permanent: true,
      },
    ];
  },
  // Disable Turbopack if experiencing issues
  // experimental: {
  //   turbo: undefined,
  // },
};

export default nextConfig;
