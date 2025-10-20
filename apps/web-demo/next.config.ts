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
    'execa',
    'katcn',
    'prettier',
    '@tailwindcss/cli',
    'typescript',
    'ts-morph',
  ],
  outputFileTracingRoot: path.join(__dirname, '../../'),
  outputFileTracingIncludes: {
    '/*': ['../../node_modules/**/*', 'node_modules/**/*'],
  },
  // experimental: {
  //   reactCompiler: true,
  // },
  // transpilePackages: [],
  typedRoutes: true,
};

export default nextConfig;
