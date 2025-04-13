/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
  
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
