import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: "https://62a6ec0ebedc4ca6d7bd21af.mockapi.io/api/:path*",
      },
    ];
  },
};

export default nextConfig;
