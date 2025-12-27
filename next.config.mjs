/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'v0.blob.com',
      },
    ],
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Configuração Turbopack (Next.js 16+)
  turbopack: {},
  // Configuração Webpack (mantida para compatibilidade)
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Ignorar jsPDF durante o build do servidor
      config.externals = config.externals || []
      config.externals.push({
        'jspdf': 'commonjs jspdf'
      })
    }
    return config
  },
};

export default nextConfig;
