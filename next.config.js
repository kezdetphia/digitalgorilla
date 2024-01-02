/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost",
      "digitalgorilla.up.railway.app", // URL for deployment
    ],
  },
};

module.exports = nextConfig;
