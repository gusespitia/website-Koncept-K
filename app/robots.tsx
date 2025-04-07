// app/robots.tsx
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // disallow: '/private/', // Uncomment if you have private sections
    },
    sitemap: 'https://koncept-k.vercel.app/sitemap.xml',
  }
}