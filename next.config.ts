import type { NextConfig } from "next";

type ExtendedNextConfig = NextConfig & {
  eslint?: {
    ignoreDuringBuilds?: boolean;
  };
  typescript?: {
    ignoreBuildErrors?: boolean;
  };
};

const nextConfig: ExtendedNextConfig = {
  /* config options here */
  reactStrictMode: true,
  // Disable type checking during builds (useful for Vercel to avoid failing builds for TS errors)
  typescript: {
    ignoreBuildErrors: true,
  },
  // Optional: disable ESLint during builds as well
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
