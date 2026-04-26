const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
  
  experimental: {
    turbo: {
      resolveAlias: {
        '@': './src'
      }
    }
  },
};

module.exports = nextConfig;