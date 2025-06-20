import { unstable_setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic';
import Intro from '@/components/sections/Intro/Intro';
import HowCanBeUsed from '@/components/sections/HowCanBeUsed/HowCanBeUsed';
import Gallery from '@/components/sections/Gallery/Gallery';

const Solution = dynamic(
  () => import('@/components/sections/Solution/Solution'),
  {
    ssr: false,
  }
);

// const Reviews = dynamic(() => import('@/components/Reviews/Reviews'), {
//   ssr: false,
// });

// const About = dynamic(() => import('@/components/About/About'), {
//   ssr: false,
// });

const Mission = dynamic(() => import('@/components/sections/Mission/Mission'), {
  ssr: false,
});

const CenterList = dynamic(
  () => import('@/components/sections/CenterList/CenterList'),
  {
    ssr: false,
  }
);

const Faq = dynamic(() => import('@/components/sections/Faq/Faq'), {
  ssr: false,
});

const Contact = dynamic(() => import('@/components/sections/Contact/Contact'), {
  ssr: false,
});

const Chevron = dynamic(() => import('@/components/sections/Chevron/Chevron'));

const Synergy = dynamic(() => import('@/components/sections/Synergy/Synergy'));

export default function HomePage({ params: { lang } }: any) {
  unstable_setRequestLocale(lang);
  return (
    <main id='mainpage'>
      <Intro />
      <Chevron />
      <Synergy />
      <HowCanBeUsed />
      <Solution />
      <Gallery />
      <Mission />
      <CenterList />
      <Faq />
      <Contact />
      {/** Unused section in current version  */}
      {/* <About /> */}
      {/* <Reviews /> */}
    </main>
  );
}
