import { MetadataRoute } from 'next';

const baseUrl = 'https://mitoderm.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/utils/',
          '/*/form',
          '/*/event/form',
          '/*/event/success',
        ],
      },
      // Allow Google verification file
      {
        userAgent: '*',
        allow: ['/*/googlee699627fee504b66.html'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
