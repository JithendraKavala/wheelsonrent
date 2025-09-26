import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: process.env.NEXT_IMAGE_HOSTNAME || "",
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: process.env.NEXT_PUBLIC_API_PORT,
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        port: process.env.NEXT_PUBLIC_API_PORT,
      },
    ],
  },
};

export default nextConfig;
