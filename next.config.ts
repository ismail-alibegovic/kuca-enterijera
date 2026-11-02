import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    qualities: [80],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 828, 1080, 1440, 1920, 2560],
  },
  /** URLs from the previous demo keep working. */
  async redirects() {
    return [
      { source: "/kolekcije", destination: "/ponuda", permanent: true },
      { source: "/kolekcije/:path*", destination: "/ponuda/:path*", permanent: true },
      { source: "/inspiracija", destination: "/ponuda", permanent: true },
      { source: "/brand", destination: "/", permanent: true },
      { source: "/napomene", destination: "/o-nama", permanent: true },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
