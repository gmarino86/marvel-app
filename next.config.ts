import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["i.annihil.us"], // 🔹 Agrega el dominio de Marvel
    remotePatterns: [
      {
        protocol: "http",
        hostname: "i.annihil.us",
        pathname: "/u/prod/**",
      },
    ],
  },
};

export default nextConfig;
