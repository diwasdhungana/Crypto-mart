/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos", "source.unsplash.com"],
    formats: ["image/webp"],
  },
};
module.exports = nextConfig;
