/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    apiKey: '3ec4d8d0f832d2541e0951a665871b6b',
  },
  images: {
    domains: ['image.tmdb.org'],
  },
};

module.exports = nextConfig;
