import { unstable_setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { getDoctors } from '@/lib/mongodb';
import DoctorListSessionWrapper from '@/components/sections/DoctorList/DoctorListSessionWrapper/DoctorListSessionWrapper';

const baseUrl = 'https://mitoderm.com';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const metadataMap: Record<
    string,
    {
      title: string;
      description: string;
      keywords: string;
      ogLocale: string;
    }
  > = {
    he: {
      title:
        'קוסמטיקאיות וטריכולוגים העובדים עם מיטודרם | קליניקות מורשות בישראל',
      description:
        'רשימת קוסמטיקאיות וטריכולוגים העובדים עם Mitoderm ועם מערכת V-Tech. קליניקות מורשות בישראל לטיפולי אקסוזומים, PDRN והתחדשות העור והשיער.',
      keywords:
        'קוסמטיקאיות מיטודרם, טריכולוגים בישראל, קליניקות אקסוזומים, Mitoderm קליניקות מורשות, טיפולי שיער מתקדמים, טיפולי עור אסתטיים',
      ogLocale: 'he_IL',
    },
    en: {
      title:
        'Cosmetologists & Trichologists Working with Mitoderm | Authorized Clinics',
      description:
        'Find cosmetologists and trichologists working with Mitoderm and the V-Tech system. Authorized clinics in Israel specializing in exosome, PDRN, skin and hair treatments.',
      keywords:
        'Mitoderm cosmetologists, trichologists Israel, exosome clinics, authorized Mitoderm clinics, advanced hair treatments, aesthetic skin treatments',
      ogLocale: 'en_US',
    },
    ru: {
      title:
        'Косметологи и трихологи, работающие с Mitoderm | Авторизованные клиники',
      description:
        'Список косметологов и трихологов, работающих с Mitoderm и системой V-Tech. Авторизованные клиники в Израиле по лечению кожи и волос экзосомами и PDRN.',
      keywords:
        'косметологи Mitoderm, трихологи Израиль, клиники экзосом, авторизованные клиники Mitoderm, лечение волос, эстетическая косметология',
      ogLocale: 'ru_RU',
    },
  };

  const meta = metadataMap[lang] || metadataMap.en;
  const url = `${baseUrl}/${lang}/specialists`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: url,
      languages: {
        he: `${baseUrl}/he/specialists`,
        en: `${baseUrl}/en/specialists`,
        ru: `${baseUrl}/ru/specialists`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: url,
      siteName: 'Mitoderm',
      locale: meta.ogLocale,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/images/backgrounds/introBG.png`,
          width: 1200,
          height: 630,
          alt: meta.title,
          type: 'image/jpeg',
        },
      ],
      alternateLocale: [
        lang !== 'he' ? 'he_IL' : undefined,
        lang !== 'en' ? 'en_US' : undefined,
        lang !== 'ru' ? 'ru_RU' : undefined,
      ].filter(Boolean) as string[],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [
        {
          url: `${baseUrl}/images/backgrounds/introBG.png`,
          alt: meta.title,
        },
      ],
      creator: '@mitoderm',
      site: '@mitoderm',
    },
  };
}

export default async function DoctorsPage({ params: { lang } }: any) {
  unstable_setRequestLocale(lang);
  const doctors = await getDoctors();
  return <DoctorListSessionWrapper doctors={doctors} />;
}
