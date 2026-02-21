import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '1214244a5427f71a53f3224f9a618cb3.r2.cloudflarestorage.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pub-31d5abaaeadc42e092b62816edbab470.r2.dev',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
