/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // Permitir imágenes de Cloudinary
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Set-Cookie',
          value: 'cookie_consent=strictly_necessary; Path=/; HttpOnly; SameSite=Lax'
        }
      ]
    }
  ]
};

module.exports = nextConfig;
