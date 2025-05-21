/** @type {import('next').NextConfig} */
const nextConfig = {
  // Change from static export to server rendering
  // output: 'export', // Removing this line
  distDir: 'dist',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  // Removing exportPathMap as it's not compatible with app directory
};

module.exports = nextConfig;
