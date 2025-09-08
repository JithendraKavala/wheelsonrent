/** @type {import('next').NextConfig} */
const nextConfig = {
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
        protocol: 'http',
        hostname: 'localhost',
        port: process.env.NEXT_PUBLIC_API_PORT,
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        port:process.env.NEXT_PUBLIC_API_PORT,
      },
    ],
  },
};

module.exports = nextConfig;
