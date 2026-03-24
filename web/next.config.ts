import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Dev’de Strict Mode bileşeni iki kez mount eder; canvas/kar katmanı ile bazen lokal titreme. Prod’da çift mount zaten yok. */
  reactStrictMode: false,
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        ...config.watchOptions,
        aggregateTimeout: 600,
        ignored: ["**/node_modules/**", "**/.git/**"],
      };
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.mavikadraj.com.tr",
        pathname: "/wp-content/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
