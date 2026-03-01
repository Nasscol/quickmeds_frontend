import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    unoptimized: process.env.NODE_ENV === 'development',
     remotePatterns: [
      // Production API
     {
        protocol: 'http',
        hostname: 'api.yourdomain.com',
      },
    ],
  },  
};

export default nextConfig;
