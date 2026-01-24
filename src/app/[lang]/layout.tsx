import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '../globals.scss';
import { Rubik } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import Footer from '@/components/layout/Footer/Footer';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';
import { getOrganizationSchema } from '@/utils/structuredData';

const Header = dynamic(() => import('@/components/layout/Header/Header'), {
  ssr: false,
});

const Modal = dynamic(() => import('@/components/layout/Modal/Modal'), {
  ssr: false,
});

const Chatbot = dynamic(() => import('@/components/ChatBot/ChatBot'), {
  ssr: false,
});

const WhatsappLink = dynamic(
  () => import('@/components/layout/WhatsappLink/WhatsappLink'),
  {
    ssr: false,
  }
);

const rubik = Rubik({
  weight: ['300', '400', '500', '900'],
  style: 'normal',
  display: 'swap',
  variable: '--font-Rubik',
  subsets: ['latin', 'cyrillic', 'hebrew'],
});

const baseUrl = 'https://mitoderm.com';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'he' }, { lang: 'ru' }];
}

export const metadata: Metadata = {
  title: 'אקסוזומים V-Tech | מיטודרם - מערכת מתקדמת לקוסמטיקאיות בישראל',
  description:
    'מערכת V-Tech - אקסוזומים סינתטיים + PDRN פולינוקלאוטידים לקוסמטיקאיות. תוצאות מהטיפול הראשון | הכשרות מקצועיות | מיטודרם ישראל 054-762-1889',
  keywords:
    'אקסוזומים לקוסמטיקאיות, V-Tech System, מיטודרם, PDRN פולינוקלאוטידים, אקסוזומים סינתטיים, טיפולי אקסוזומים, צלקות פוסט אקנה',
  icons: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      url: '/favicon/favicon.ico',
      sizes: 'auto',
    },
    {
      rel: 'icon',
      type: 'image/png',
      url: '/favicon/favicon-16x16.png',
      sizes: '16x16',
    },
    {
      rel: 'icon',
      type: 'image/png',
      url: '/favicon/favicon-32x32.png',
      sizes: '32x32',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '512x512',
      url: '/favicon/android-chrome-512x512.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '192x192',
      url: '/favicon/android-chrome-192x192.png',
    },
    {
      rel: 'apple-touch-icon',
      type: 'image/png',
      sizes: '192x192',
      url: '/favicon/apple-touch-icon.png',
    },
  ],
  alternates: {
    canonical: `${baseUrl}/he`,
    languages: {
      he: `${baseUrl}/he`,
      en: `${baseUrl}/he`,
      ru: `${baseUrl}/he`,
    },
  },
  openGraph: {
    title: 'אקסוזומים V-Tech | מיטודרם - מערכת מתקדמת לקוסמטיקאיות בישראל',
    description:
      'מערכת V-Tech - אקסוזומים סינתטיים + PDRN פולינוקלאוטידים לקוסמטיקאיות. תוצאות מהטיפול הראשון | הכשרות מקצועיות | מיטודרם ישראל 054-762-1889',
    url: `${baseUrl}/he`,
    siteName: 'Mitoderm',
    locale: 'he_IL',
    type: 'website',
    images: [
      {
        url: `${baseUrl}/images/introBG.png`,
        width: 1200,
        height: 630,
        alt: 'V-Tech System - Synthetic Exosomes + PDRN Polynucleotides',
        type: 'image/jpeg',
      },
    ],
    alternateLocale: ['en_US', 'ru_RU'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'אקסוזומים V-Tech | מיטודרם - מערכת מתקדמת לקוסמטיקאיות בישראל',
    description:
      'מערכת V-Tech - אקסוזומים סינתטיים + PDRN פולינוקלאוטידים לקוסמטיקאיות. תוצאות מהטיפול הראשון | הכשרות מקצועיות | מיטודרם ישראל 054-762-1889',
    images: [
      {
        url: `${baseUrl}/images/introBG.png`,
        alt: 'V-Tech System - Synthetic Exosomes + PDRN Polynucleotides',
      },
    ],
    creator: '@mitoderm',
    site: '@mitoderm',
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  const messages = await getMessages();

  if (!routing.locales.includes(params.lang as any)) {
    notFound();
  }

  unstable_setRequestLocale(params.lang);

  return (
    <html lang={params.lang}>
      {/* Google Tag Manager */}
      <Script
        id='gtm-script'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W7HBVJPC');
          `,
        }}
      />

      <NextIntlClientProvider messages={messages}>
        <body
          className={rubik.className}
          dir={params.lang === 'he' ? 'rtl' : 'ltr'}
        >
          {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe
              src='https://www.googletagmanager.com/ns.html?id=GTM-W7HBVJPC'
              height='0'
              width='0'
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>

          <Header />
          <Modal />
          {children}
          <Footer />
          {params.lang === 'he' && <Chatbot locale={params.lang} />}
          <WhatsappLink />
          <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(getOrganizationSchema(params.lang)),
            }}
          />
        </body>
      </NextIntlClientProvider>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ID as string} />
    </html>
  );
}
