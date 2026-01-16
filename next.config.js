/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
  transpilePackages: ['three'],
  
  // Ignorar errores de TypeScript en build para desarrollo
  typescript: {
    // Temporal: permitir build aunque haya errores de tipos
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig
