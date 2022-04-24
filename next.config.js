/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos", "source.unsplash.com", "res.cloudinary.com"],
  },
};
module.exports = nextConfig;
