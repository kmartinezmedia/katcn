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
    'postcss',
    'prettier',
    'tailwindcss',
    'typescript',
    'ts-morph',
  ],
  experimental: {
    typedRoutes: true,
    optimizePackageImports: ['katcn'],
    reactCompiler: true,
  },
};

export default nextConfig;
