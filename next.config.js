/** @type {import('next').NextConfig} */
const r2PublicUrl = process.env.R2_PUBLIC_URL || ''
const minioPublicUrl = process.env.MINIO_PUBLIC_URL || ''
const knownR2PublicHost = 'pub-bda40c407bfa46509c3a0aa7e7223a73.r2.dev'

const buildRemotePattern = (url) => {
  if (!url) {
    return null
  }

  try {
    const parsed = new URL(url)
    return {
      protocol: parsed.protocol.replace(':', ''),
      hostname: parsed.hostname,
      ...(parsed.port ? { port: parsed.port } : {}),
      pathname: '/**',
    }
  } catch {
    return null
  }
}

const r2RemotePattern = buildRemotePattern(r2PublicUrl)
const minioRemotePattern = buildRemotePattern(minioPublicUrl)

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
      {
        protocol: 'https',
        hostname: '**.r2.dev',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.r2.cloudflarestorage.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: knownR2PublicHost,
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'minio',
        pathname: '/**',
      },
      ...(r2RemotePattern ? [r2RemotePattern] : []),
      ...(minioRemotePattern ? [minioRemotePattern] : []),
    ],
    unoptimized: true,
  },
  transpilePackages: ['three'],

  typescript: {
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig
