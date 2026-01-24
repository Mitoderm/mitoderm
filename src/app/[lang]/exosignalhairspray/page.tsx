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
      title: 'Exosignal Hair Spray | ספריי שיער יומיומי - מיטודרם',
      description:
        'Exosignal Hair Spray - פורמולה חדשנית לטיפול יומיומי המשלב אקסוזומים סינתטיים, פפטידים ביו-מימטיים ו-PDRN. מפחית נשירת שיער, מאזן את הקרקפת ותומך בחידוש נראה לעין של שיער חזק ובריא מהשבועות הראשונים | מיטודרם ישראל',
      keywords:
        'Exosignal Hair Spray, ספריי שיער, טיפול יומיומי שיער, אקסוזומים לשיער, נשירת שיער, חיזוק שיער, V-Tech Hair Spray, מיטודרם, PDRN, פפטידים ביו-מימטיים',
      ogLocale: 'he_IL',
    },
    en: {
      title: 'Exosignal Hair Spray | Daily Hair Care Spray - Mitoderm',
      description:
        'Exosignal Hair Spray - An innovative formula for daily care, combining synthetic exosomes, biomimetic peptides and PDRN. Designed to reduce hair loss, balance the scalp and support visible renewal of strong and healthy hair from the first weeks of use | Mitoderm Israel',
      keywords:
        'Exosignal Hair Spray, hair spray, daily hair care, exosomes for hair, hair loss treatment, hair strengthening, V-Tech Hair Spray, Mitoderm, PDRN, biomimetic peptides, scalp care',
      ogLocale: 'en_US',
    },
    ru: {
      title: 'Exosignal Hair Spray | Ежедневный спрей для волос - Митодерм',
      description:
        'Exosignal Hair Spray - Инновационная формула для ежедневного ухода, сочетающая синтетические экзосомы, биомиметические пептиды и PDRN. Предназначен для уменьшения выпадения волос, балансировки кожи головы и поддержки видимого обновления сильных и здоровых волос с первых недель использования | Митодерм Израиль',
      keywords:
        'Exosignal Hair Spray, спрей для волос, ежедневный уход за волосами, экзосомы для волос, лечение выпадения волос, укрепление волос, V-Tech Hair Spray, Митодерм, PDRN, биомиметические пептиды, уход за кожей головы',
      ogLocale: 'ru_RU',
    },
  };

  const meta = metadataMap[lang] || metadataMap.en;
  const url = `${baseUrl}/${lang}/exosignalhairspray`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: url,
      languages: {
        he: `${baseUrl}/he/exosignalhairspray`,
        en: `${baseUrl}/en/exosignalhairspray`,
        ru: `${baseUrl}/ru/exosignalhairspray`,
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
          url: `${baseUrl}images/introBG.png`,
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
      ? 'Exosignal Hair Spray'
      : lang === 'ru'
        ? 'Exosignal Hair Spray'
        : 'Exosignal Hair Spray';
  const productUrl = `${baseUrl}/${lang}/exosignalhairspray`;
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
        <Chevron page='hairspray' imageName='chevronImage1' />
        <Synergy page='hair' />
        <HowCanBeUsed page='hair' />
        <Solution page='hair' />
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
