import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    unoptimized: process.env.NODE_ENV === 'development',
     remotePatterns: [
      // Production API
     {
        protocol: "https",
        hostname: "kmmrgijtqahiilujqbck.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },  
   async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://quickmeds-backend-ktvv.onrender.com/api/:path*/",
      },
    ];
  },
};

export default nextConfig;
