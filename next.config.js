/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Important: return the modified config
    return config;
  },
  images: {
    domains: [
      "localhost",
      "digitalgorilla.up.railway.app", // URL for deployment
    ],
  },
};


module.exports = nextConfig;
