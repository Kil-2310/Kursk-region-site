const path = require('path');

const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../.env') });

const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,

  env: {
    NEXT_PUBLIC_SERVER_URL: process.env.HOST,
  },
  
  experimental: {
    turbo: {
      resolveAlias: {
        '@': './src'
      }
    }
  },
};

module.exports = nextConfig;