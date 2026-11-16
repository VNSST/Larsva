import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Add any external image domains here if needed
    // e.g., domains: ['example.com'],
  },
  async redirects() {
    return [
      // Kill Chess and HRDocForensics were removed; send old links to the products page.
      { source: '/games/killchess/:path*', destination: '/products', permanent: false },
      { source: '/products/HRDocForensics/:path*', destination: '/products', permanent: false },
      { source: '/downloads/killchess.apk', destination: '/products', permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
