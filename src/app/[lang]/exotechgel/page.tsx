import { unstable_setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import Intro from '@/components/sections/Intro/Intro';
import Mission from '@/components/sections/Mission/Mission';
import CenterList from '@/components/sections/CenterList/CenterList';
import Faq from '@/components/sections/Faq/Faq';
import Contact from '@/components/sections/Contact/Contact';
import HowCanBeUsed from '@/components/sections/HowCanBeUsed/HowCanBeUsed';
import Gallery from '@/components/sections/Gallery/Gallery';
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
      title: 'Exotech Gel | ג׳ל אקסוזומים סינתטיים - מיטודרם',
      description:
        'Exotech Gel - ג׳ל המכיל אקסוזומים סינתטיים עם פפטידים ביו-מימטיים, חומצה היאלורונית, פוליסכריד מוצין חילזון טהור ו-PDRN. תוצאות מהטיפול הראשון | מיטודרם ישראל',
      keywords:
        'Exotech Gel, ג׳ל אקסוזומים, אקסוזומים סינתטיים, V-Tech Gel, טיפול עור, קוסמטיקה מקצועית, מיטודרם, PDRN, פפטידים ביו-מימטיים',
      ogLocale: 'he_IL',
    },
    en: {
      title: 'Exotech Gel | Synthetic Exosomes Gel - Mitoderm',
      description:
        'Exotech Gel - A gel containing synthetic exosomes that encapsulate biomimetic peptides, hyaluronic acid, pure snail mucin polysaccharide, and PDRN. Results from the first treatment | Mitoderm Israel',
      keywords:
        'Exotech Gel, synthetic exosomes gel, V-Tech Gel, skin treatment, professional cosmetics, Mitoderm, PDRN, biomimetic peptides, hyaluronic acid',
      ogLocale: 'en_US',
    },
    ru: {
      title: 'Exotech Gel | Гель с синтетическими экзосомами - Митодерм',
      description:
        'Exotech Gel - Гель, содержащий синтетические экзосомы с биомиметическими пептидами, гиалуроновой кислотой, чистым полисахаридом слизи улитки и PDRN. Результаты с первого лечения | Митодерм Израиль',
      keywords:
        'Exotech Gel, гель с экзосомами, синтетические экзосомы, V-Tech Gel, лечение кожи, профессиональная косметика, Митодерм, PDRN, биомиметические пептиды',
      ogLocale: 'ru_RU',
    },
  };

  const meta = metadataMap[lang] || metadataMap.en;
  const url = `${baseUrl}/${lang}/exotechgel`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: url,
      languages: {
        he: `${baseUrl}/he/exotechgel`,
        en: `${baseUrl}/en/exotechgel`,
        ru: `${baseUrl}/ru/exotechgel`,
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

  // Product schema
  const productName =
    lang === 'he'
      ? 'Exotech Gel'
      : lang === 'ru'
        ? 'Exotech Gel'
        : 'Exotech Gel';
  const productUrl = `${baseUrl}/${lang}/exotechgel`;
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
        <Chevron page='gel' imageName='chevronGel' />
        <Synergy />
        <HowCanBeUsed page='gel' />
        <Solution page='gel' />
        <Gallery />
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
