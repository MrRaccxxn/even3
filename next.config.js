/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  experimental: {
    forceSwcTransforms: false,
  },
  images: {
    domains: [
      'even3-prod.s3.us-west-1.amazonaws.com',
      'even3-test.s3.sa-east-1.amazonaws.com',
      'lh3.googleusercontent.com',
      'assets.poap.xyz',
      'www.poap.xyz'
    ],
  },
};

module.exports = nextConfig