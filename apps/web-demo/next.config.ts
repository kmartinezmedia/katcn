import type { NextConfig } from 'next';
import tailwindDeps from './tailwind-transitive-deps.json';

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
  serverExternalPackages: ['katcn', 'tailwindcss', '@tailwindcss/postcss'],
  outputFileTracingIncludes: {
    '/*': tailwindDeps,
  },
  typedRoutes: true,
};

export default nextConfig;
