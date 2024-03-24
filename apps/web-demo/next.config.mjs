/** @type {import('next').NextConfig} */
const nextConfig = async function nextConfig() {
  return {
    transpilePackages: ['katcn', 'docgen'],
  };
};

export default nextConfig;
