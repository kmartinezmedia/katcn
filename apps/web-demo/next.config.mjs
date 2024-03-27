/** @type {import('next').NextConfig} */
const nextConfig = async function nextConfig() {
  return {
    transpilePackages: ['katcn'],
  };
};

export default nextConfig;
