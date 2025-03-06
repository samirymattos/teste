/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/files/**",
      },
      {
        protocol: "https",
        hostname: "gestedu-api.creativecode.dev.br",
        pathname: "/files/**",
      },
    ],
  },
};

export default nextConfig;
