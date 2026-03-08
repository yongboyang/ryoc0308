import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    domains: ['ryoc20260308.blob.core.windows.net'],
  },
}

export default nextConfig
