import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
  },
  serverExternalPackages: [
    'katcn',
    '@tailwindcss/postcss',
    'lightningcss',
    'lightningcss-darwin-arm64',
    'lightningcss-linux-x64-gnu',
    'tailwindcss',
    'postcss',
  ],
  outputFileTracingRoot: path.join(__dirname, '../../'),
  typedRoutes: true,
};

export default nextConfig;
