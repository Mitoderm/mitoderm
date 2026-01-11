import { unstable_setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import Intro from '@/components/sections/Intro/Intro';
import Button from '@/components/sharedUI/Button/Button';
import Contact from '@/components/sections/Contact/Contact';
import Mission from '@/components/sections/Mission/Mission';
import { useTranslations } from 'next-intl';
import EventBulletList from '@/components/sections/EventBulletList/EventBulletList';
import Gallery from '@/components/sections/Gallery/Gallery';
import { getEventSchema } from '@/utils/structuredData';

const FirstLook = dynamic(
  () => import('@/components/sections/FirstLook/FirstLook'),
  {
    ssr: false,
  }
);

const FastResult = dynamic(
  () => import('@/components/sections/FastResult/FastResult'),
  {
    ssr: false,
  }
);

const Invite = dynamic(() => import('@/components/sections/Invite/Invite'), {
  ssr: false,
});

const Event = dynamic(() => import('@/components/sections/Event/Event'), {
  ssr: false,
});

const ToTopItOff = dynamic(
  () => import('@/components/sections/ToTopItOff/ToTopItOff'),
  {
    ssr: false,
  }
);

const Unique = dynamic(() => import('@/components/sections/Unique/Unique'), {
  ssr: false,
});

const About = dynamic(() => import('@/components/sections/About/About'), {
  ssr: false,
});


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
      title: 'אירוע מקצועי לקוסמטיקאיות | מיטודרם - הדור הבא של האסתטיקה',
      description:
        'מפגש מקצועי לקוסמטיקאיות ואסתטיקאיות. הכירו את מערכת V-Tech - אקסוזומים סינתטיים + PDRN. הכשרות מקצועיות, הדגמות חיות, והזדמנות להכיר את הטכנולוגיה החדשנית באסתטיקה | מיטודרם ישראל',
      keywords:
        'אירוע קוסמטיקאיות, מפגש מקצועי, הכשרה מקצועית, אקסוזומים, V-Tech System, מיטודרם, אסתטיקה מקצועית, PDRN, קוסמטיקה מקצועית',
      ogLocale: 'he_IL',
    },
    en: {
      title: 'Professional Event for Cosmetologists | Mitoderm - Next Generation Aesthetics',
      description:
        'Professional event for cosmetologists and aestheticians. Discover the V-Tech System - synthetic exosomes + PDRN. Professional training, live demonstrations, and opportunity to learn about innovative aesthetics technology | Mitoderm Israel',
      keywords:
        'cosmetologist event, professional event, professional training, exosomes, V-Tech System, Mitoderm, professional aesthetics, PDRN, professional cosmetics, aesthetic training',
      ogLocale: 'en_US',
    },
    ru: {
      title: 'Профессиональное мероприятие для косметологов | Митодерм - Новое поколение эстетики',
      description:
        'Профессиональное мероприятие для косметологов и эстетистов. Откройте для себя систему V-Tech - синтетические экзосомы + PDRN. Профессиональное обучение, живые демонстрации и возможность узнать об инновационных технологиях в эстетике | Митодерм Израиль',
      keywords:
        'мероприятие для косметологов, профессиональное мероприятие, профессиональное обучение, экзосомы, система V-Tech, Митодерм, профессиональная эстетика, PDRN, профессиональная косметика, обучение эстетике',
      ogLocale: 'ru_RU',
    },
  };

  const meta = metadataMap[lang] || metadataMap.en;
  const url = `${baseUrl}/${lang}/event`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: url,
      languages: {
        he: `${baseUrl}/he/event`,
        en: `${baseUrl}/en/event`,
        ru: `${baseUrl}/ru/event`,
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

export default function EventPage({ params: { lang } }: any) {
  unstable_setRequestLocale(lang);
  const t = useTranslations();

  // Event schema
  const eventUrl = `${baseUrl}/${lang}/event`;
  const eventSchema = getEventSchema(eventUrl, lang);

  return (
    <>
      <main>
        <Intro />
        <EventBulletList />
        <FastResult />
        <Invite />
        <FirstLook />
        <Event />
        <ToTopItOff />
        <Unique />
        <Contact />
        <Gallery />
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            padding: '0px 20px',
          }}
        >
          <Button
            style={{ margin: '20px auto 40px auto' }}
            text={t('buttons.seat')}
            formPage='event'
          />
        </div>
        <About />
        <Mission />
      </main>
      <Script
        id='event-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(eventSchema),
        }}
      />
    </>
  );
}
