/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  images: {
    domains: [ 'https://res.cloudinary.com', 'res.cloudinary.com'], // Add your backend domain here
  },
};

export default nextConfig;
