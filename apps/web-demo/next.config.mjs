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
    'execa',
    'katcn',
    'prettier',
    '@tailwindcss/cli',
    'typescript',
    'ts-morph',
  ],
  experimental: {
    typedRoutes: true,
    reactCompiler: true,
  },
  transpilePackages: [],
};

export default nextConfig;
