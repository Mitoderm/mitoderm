import { unstable_setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import Intro from '@/components/sections/Intro/Intro';
import HowCanBeUsed from '@/components/sections/HowCanBeUsed/HowCanBeUsed';
import Gallery from '@/components/sections/Gallery/Gallery';
import Mission from '@/components/sections/Mission/Mission';
import CenterList from '@/components/sections/CenterList/CenterList';
import Faq from '@/components/sections/Faq/Faq';
import Contact from '@/components/sections/Contact/Contact';
import { getProductSchema, getFAQPageSchema } from '@/utils/structuredData';
import { getTranslations } from 'next-intl/server';

const Solution = dynamic(
  () => import('@/components/sections/Solution/Solution'),
  {
    ssr: false,
  }
);

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
      title: 'Exosignal Hair | אמפולות מקצועיות לשיער - מיטודרם',
      description:
        'Exosignal Hair - אמפולות מקצועיות עם אקסוזומים סינתטיים לטיפול בנשירת שיער. מגרה זקיקי שיער רדומים, מחזק ומזין מהשורש. תוצאות מהטיפול הראשון | מיטודרם ישראל',
      keywords:
        'Exosignal Hair, אמפולות שיער, טיפול נשירת שיער, אקסוזומים לשיער, V-Tech Hair, שיקום שיער, מיטודרם, PDRN, פפטידים ביו-מימטיים',
      ogLocale: 'he_IL',
    },
    en: {
      title: 'Exosignal Hair | Professional Hair Ampoules - Mitoderm',
      description:
        'Exosignal Hair - Professional ampoules with synthetic exosomes for hair loss treatment. Stimulates dormant hair follicles, strengthens and nourishes from the root. Results from the first treatment | Mitoderm Israel',
      keywords:
        'Exosignal Hair, hair ampoules, hair loss treatment, exosomes for hair, V-Tech Hair, hair restoration, Mitoderm, PDRN, biomimetic peptides, hair follicles',
      ogLocale: 'en_US',
    },
    ru: {
      title: 'Exosignal Hair | Профессиональные ампулы для волос - Митодерм',
      description:
        'Exosignal Hair - Профессиональные ампулы с синтетическими экзосомами для лечения выпадения волос. Стимулирует спящие фолликулы, укрепляет и питает от корня. Результаты с первого лечения | Митодерм Израиль',
      keywords:
        'Exosignal Hair, ампулы для волос, лечение выпадения волос, экзосомы для волос, V-Tech Hair, восстановление волос, Митодерм, PDRN, биомиметические пептиды, фолликулы волос',
      ogLocale: 'ru_RU',
    },
  };

  const meta = metadataMap[lang] || metadataMap.en;
  const url = `${baseUrl}/${lang}/exosignal_hair`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: url,
      languages: {
        he: `${baseUrl}/he/exosignal_hair`,
        en: `${baseUrl}/en/exosignal_hair`,
        ru: `${baseUrl}/ru/exosignal_hair`,
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
          url: `${baseUrl}/images/introBG.png`,
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
          url: `${baseUrl}/images/introBG.png`,
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

  // Product schema
  const productName =
    lang === 'he'
      ? 'Exosignal Hair'
      : lang === 'ru'
        ? 'Exosignal Hair'
        : 'Exosignal Hair';
  const productUrl = `${baseUrl}/${lang}/exosignal_hair`;
  const productSchema = getProductSchema(productName, productUrl, lang);

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
        <Chevron page='hair' imageName='chevronHair' />
        <Synergy page='hair' />
        <HowCanBeUsed page='hair' />
        <Solution page='signal' />
        <Gallery isHairPage />
        <Mission />
        <CenterList />
        <Faq />
        <Contact />
      </main>
      <Script
        id='product-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
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
