import { unstable_setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import Intro from '@/components/sections/Intro/Intro';
import CenterList from '@/components/sections/CenterList/CenterList';
import HowCanBeUsed from '@/components/sections/HowCanBeUsed/HowCanBeUsed';
import Faq from '@/components/sections/Faq/Faq';
import Contact from '@/components/sections/Contact/Contact';
import Gallery from '@/components/sections/Gallery/Gallery';
import { getFAQPageSchema } from '@/utils/structuredData';
import { getTranslations } from 'next-intl/server';

const Solution = dynamic(
  () => import('@/components/sections/Solution/Solution'),
  {
    ssr: false,
  }
);

const Mission = dynamic(() => import('@/components/sections/Mission/Mission'), {
  ssr: false,
});

const Chevron = dynamic(() => import('@/components/sections/Chevron/Chevron'));

const Synergy = dynamic(() => import('@/components/sections/Synergy/Synergy'));

const baseUrl = 'https://mitoderm.com';

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
      title: 'אקסוזומים V-Tech | מיטודרם - מערכת מתקדמת לקוסמטיקאיות בישראל',
      description:
        'מערכת V-Tech - אקסוזומים סינתטיים + PDRN פולינוקלאוטידים לקוסמטיקאיות. תוצאות מהטיפול הראשון | הכשרות מקצועיות | מיטודרם ישראל 054-762-1889',
      keywords:
        'אקסוזומים לקוסמטיקאיות, V-Tech System, מיטודרם, PDRN פולינוקלאוטידים, אקסוזומים סינתטיים, טיפולי אקסוזומים, צלקות פוסט אקנה',
      ogLocale: 'he_IL',
    },
    en: {
      title: 'V-Tech Exosomes | Mitoderm - Advanced System for Cosmetologists in Israel',
      description:
        'V-Tech System - Synthetic exosomes + PDRN polynucleotides for cosmetologists. Results from the first treatment | Professional training | Mitoderm Israel 054-762-1889',
      keywords:
        'exosomes for cosmetologists, V-Tech System, Mitoderm, PDRN polynucleotides, synthetic exosomes, exosome treatments, post-acne scars',
      ogLocale: 'en_US',
    },
    ru: {
      title: 'Экзосомы V-Tech | Митодерм - Продвинутая система для косметологов в Израиле',
      description:
        'Система V-Tech - синтетические экзосомы + PDRN полинуклеотиды для косметологов. Результаты с первого лечения | Профессиональное обучение | Митодерм Израиль 054-762-1889',
      keywords:
        'экзосомы для косметологов, система V-Tech, Митодерм, PDRN полинуклеотиды, синтетические экзосомы, лечение экзосомами, постакне шрамы',
      ogLocale: 'ru_RU',
    },
  };

  const meta = metadataMap[lang] || metadataMap.en;
  const url = `${baseUrl}/${lang}`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: url,
      languages: {
        he: `${baseUrl}/he`,
        en: `${baseUrl}/en`,
        ru: `${baseUrl}/ru`,
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
          url: 'https://mitoderm.com/images/v-tech-social.jpg',
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
          url: 'https://mitoderm.com/images/v-tech-social.jpg',
          alt: meta.title,
        },
      ],
      creator: '@mitoderm',
      site: '@mitoderm',
    },
  };
}

export default async function HomePage({ params: { lang } }: any) {
  unstable_setRequestLocale(lang);
  const t = await getTranslations({ locale: lang });

  // FAQ schema
  const faqs = [
    {
      question: t('faq.item1.title'),
      answer: t('faq.item1.text'),
    },
    {
      question: t('faq.item2.title'),
      answer: t('faq.item2.text'),
    },
    {
      question: t('faq.item3.title'),
      answer: t('faq.item3.text'),
    },
    {
      question: t('faq.item4.title'),
      answer: t('faq.item4.text'),
    },
    {
      question: t('faq.item5.title'),
      answer: t('faq.item5.text'),
    },
    {
      question: t('faq.item6.title'),
      answer: t('faq.item6.text'),
    },
  ];
  const faqSchema = getFAQPageSchema(faqs);

  return (
    <>
      <main id='mainpage'>
        <Intro />
        <Chevron page='intro' imageName='chevronImage' />
        <Synergy />
        <HowCanBeUsed page='main' />
        <Solution page='main' />
        <Gallery />
        <Mission />
        <CenterList />
        <Faq />
        <Contact />
      </main>
      <Script
        id='faq-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}
