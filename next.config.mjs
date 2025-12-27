/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['v0.blob.com'],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
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
