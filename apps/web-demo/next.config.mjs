/** @type {import('next').NextConfig} */
const nextConfig = async function nextConfig() {
  return {
    webpack: (config) => {
      // ignore formidable warnings
      config.ignoreWarnings = [
        { module: /node_modules\/typescript\/lib\/typescript\.js/ },
      ];

      return config;
    },
    transpilePackages: ['katcn', 'docgen'],
  };
};

export default nextConfig;
