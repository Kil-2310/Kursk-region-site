
const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  
  experimental: {
    turbo: {
      resolveAlias: {
        '@': './src'
      }
    }
  },
};

module.exports = nextConfig;