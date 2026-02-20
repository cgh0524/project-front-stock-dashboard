const DEFAULT_BASE_PATH = "/stock-dashboard";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? DEFAULT_BASE_PATH;

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: BASE_PATH,
  async redirects() {
    return [
      {
        source: "/",
        destination: BASE_PATH,
        permanent: false,
        basePath: false,
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
