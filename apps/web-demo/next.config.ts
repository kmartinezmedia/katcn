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
    '@tailwindcss/postcss',
    'katcn',
    'prettier',
    'postcss',
    'typescript',
    'ts-morph',
  ],
  // experimental: {
  //   reactCompiler: true,
  // },
  // transpilePackages: [],
  typedRoutes: true,
};

export default nextConfig;
