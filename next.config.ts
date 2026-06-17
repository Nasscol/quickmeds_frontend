import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    unoptimized: process.env.NODE_ENV === 'development',
     remotePatterns: [
      // Production API
     {
        protocol: "https",
        hostname: "gxznivbgxcitminxrcdt.storage.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },  
   async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.BACKEND_URL}/api/v1/:path*/`,
      },
    ];
  },
};

export default nextConfig;
