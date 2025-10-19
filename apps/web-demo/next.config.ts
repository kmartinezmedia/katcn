/** @type {import('next').NextConfig} */
const nextConfig = {
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
    'prettier',
    '@tailwindcss/cli',
    'typescript',
    'ts-morph',
  ],
  experimental: {
    reactCompiler: true,
  },
  transpilePackages: [],
  typedRoutes: true,
};

export default nextConfig;
