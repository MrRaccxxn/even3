/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  experimental: {
    forceSwcTransforms: false,
  },
  images: {
    domains: [
      "https://even3-prod.s3.us-west-1.amazonaws.com",
      "https://lh3.googleusercontent.com",
      "https://assets.poap.xyz",
      "assets.poap.xyz"
    ],
  },
};

module.exports = nextConfig