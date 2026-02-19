/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/stock-dashboard",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/stock-dashboard",
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
