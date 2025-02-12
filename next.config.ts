/** @type {import('next').NextConfig} */

const nextConfig = {
  /* config options here */
  images: {
    domains: ["image.tmdb.org"], // Add TMDb image domain here
  },
  experimental: {
    appDir: true,
    isrMemoryCacheSize: 0,
  },
};

module.exports = nextConfig;
