import { MetadataRoute } from 'next';

const baseUrl = 'https://mitoderm.com';
const langs = ['he', 'en', 'ru'];
const googleFile = 'googlee699627fee504b66.html';

export default function robots(): MetadataRoute.Robots {
  const rules = langs.map((lang) => ({
    userAgent: '*',
    allow: [
      '/',
      `/${lang}/${googleFile}`
    ],
    disallow: [
      '/api/',
      '/utils/',
      '/*/form',
      '/*/v_tech/form',
      '/*/success',
      '/*/doctors'
    ],
  }));
  
  return {
    rules,
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
