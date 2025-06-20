import { unstable_setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic';
import Intro from '@/components/sections/Intro/Intro';
import Button from '@/components/sharedUI/Button/Button';
import { useTranslations } from 'next-intl';
import EventBulletList from '@/components/sections/EventBulletList/EventBulletList';
import Gallery from '@/components/sections/Gallery/Gallery';

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

const Contact = dynamic(() => import('@/components/sections/Contact/Contact'), {
  ssr: false,
});

const About = dynamic(() => import('@/components/sections/About/About'), {
  ssr: false,
});

const Mission = dynamic(() => import('@/components/sections/Mission/Mission'), {
  ssr: false,
});

export default function EventPage({ params: { lang } }: any) {
  unstable_setRequestLocale(lang);
  const t = useTranslations();
  return (
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
          colored
          text={t('buttons.seat')}
          formPage='event'
        />
      </div>
      <About />
      <Mission />
    </main>
  );
}
