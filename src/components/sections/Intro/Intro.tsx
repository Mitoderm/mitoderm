'use client';
import { FC, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import styles from './Intro.module.scss';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import DotPagination from '../../sharedUI/DotPagination/DotPagination';
import useAppStore from '@/store/store';

const Button = dynamic(() => import('@/components/sharedUI/Button/Button'), {
  ssr: false,
});

const Intro: FC = () => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const isEventPage = pathname.includes('event');
  const isSignalPage = pathname.includes('exosignalhair');
  const isGelPage = pathname.includes('exotechgel');
  const isSprayPage = pathname.includes('exosignalhairspray');
  const { introPage, setIntroPage } = useAppStore((state) => state);

  const scrollToNextChild = () => {
    const container = document.getElementById('scroller');
    const scrollPosition = introPage * window.innerWidth;
    if (locale === 'he') {
      container?.scrollTo({
        left: -scrollPosition,
        behavior: 'smooth',
      });
    } else {
      container?.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (isEventPage) {
      setIntroPage(1);
    } else if (isSprayPage) {
      setIntroPage(2);
    } else if (isGelPage) {
      setIntroPage(3);
    } else if (isSignalPage) {
      setIntroPage(4);
    } else setIntroPage(0);
  }, []);

  useEffect(() => {
    const container = ref.current;

    const handleScroll = () => {
      const containerWidth = ref.current?.clientWidth;
      if (locale === 'he' && container?.scrollLeft && containerWidth) {
        if (container?.scrollLeft === -containerWidth) setIntroPage(1);
        else if (container?.scrollLeft === -containerWidth * 2) setIntroPage(2);
        else if (container?.scrollLeft === -containerWidth * 3) setIntroPage(3);
        else if (container?.scrollLeft === -containerWidth * 4) setIntroPage(4);
      } else if (container?.scrollLeft === 0) {
        setIntroPage(0);
      }
      if (locale !== 'he' && container?.scrollLeft && containerWidth) {
        if (container?.scrollLeft === containerWidth) setIntroPage(1);
        else if (container?.scrollLeft === containerWidth * 2) setIntroPage(2);
        else if (container?.scrollLeft === containerWidth * 3) setIntroPage(3);
        else if (container?.scrollLeft === containerWidth * 4) setIntroPage(4);
      } else if (container?.scrollLeft === 0) {
        setIntroPage(0);
      }
    };

    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    scrollToNextChild();
  }, [introPage]);

  useEffect(() => {
    const currentValue = introPage < 4 ? introPage + 1 : 0;
    const interval = setInterval(() => {
      setIntroPage(currentValue);
    }, 15000);

    return () => clearInterval(interval);
  }, [introPage]);

  return (
    <section id="intro" className={styles.section}>
      <div
        aria-live="polite"
        ref={ref}
        id="scroller"
        className={styles.scrollBox}
      >
        <div
          className={`${styles.introMain} ${
            locale === 'he' ? styles.reversed : ''
          }`}
        >
          <div dir="ltr" className={styles.introMainContent}>
            <div className={styles.container}>
              <h1
                className={`${styles.title} ${
                  locale === 'ru' ? styles.ru : ''
                }`}
              >
                {t('intro.title')}
              </h1>
              <p className={styles.text}>{t('intro.text')}</p>
              <Button
                text={t('buttons.intro')}
                style={{
                  marginTop: 20,
                  width: '100%',
                }}
                formPage={'main'}
              />
              <Image
                className={styles.leaves}
                src="/images/leaves.svg"
                width={90}
                height={100}
                alt="leavest pattern"
              />
            </div>
          </div>
        </div>
        <div className={styles.introEvent}>
          <div className={`${styles.container} ${styles.eventPageContainer}`}>
            <video
              className={`${styles.eventVideo} ${locale === 'he' && styles.he}`}
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/videos/eventIntroVideo.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
            <div className={styles.textContainer}>
              <span className={styles.subtitleEvent}>
                {t('intro.eventSubtitle1')}
              </span>
              <h1
                className={`${styles.eventTitle} ${
                  locale === 'ru' ? styles.ru : ''
                }`}
              >
                {t('intro.eventTitleP1')}
                <span>{t('intro.eventTitleP2')}</span>
                {t('intro.eventTitleP3')}
              </h1>
              <span className={styles.subtitleEvent}>
                {t('intro.eventSubtitle2')}
              </span>
              <Button text={t('buttons.seat')} formPage={'event'} />
            </div>
          </div>
        </div>
        <div
          className={`${styles.introProducts} ${styles.introSpray} ${
            locale === 'he' ? styles.reversed : ''
          }`}
        >
          <div dir="ltr" className={styles.introProductsContent}>
            <div className={styles.container}>
              <h1
                className={`${styles.title} ${
                  locale === 'ru' ? styles.ru : ''
                }`}
              >
                {t('intro.hairSprayTitle')}
              </h1>
              <p className={styles.text}>{t('intro.hairSubtitle')}</p>
              <Button
                text={t('buttons.intro')}
                style={{
                  marginTop: 20,
                  marginBottom: 60,
                  width: '100%',
                }}
                onClick={
                  isSprayPage
                    ? undefined
                    : () => router.push('/exosignalhairspray')
                }
                formPage={isSprayPage ? 'main' : undefined}
              />
              <Image
                className={styles.leaves}
                src="/images/leaves.svg"
                width={90}
                height={100}
                alt="leavest pattern"
              />
            </div>
          </div>
        </div>
        <div
          className={`${styles.introProducts} ${styles.introGel} ${
            locale === 'he' ? styles.reversed : ''
          }`}
        >
          <div dir="ltr" className={styles.introProductsContent}>
            <div className={styles.container}>
              <h1
                className={`${styles.title} ${
                  locale === 'ru' ? styles.ru : ''
                }`}
              >
                {t('intro.gelTitle')}
              </h1>
              <p className={styles.text}>{t('intro.gelSubtitle')}</p>
              <Button
                text={t('buttons.intro')}
                style={{
                  marginTop: 20,
                  marginBottom: 60,
                  width: '100%',
                }}
                onClick={
                  isGelPage ? undefined : () => router.push('/exotechgel')
                }
                formPage={isGelPage ? 'main' : undefined}
              />
              <Image
                className={styles.leaves}
                src="/images/leaves.svg"
                width={90}
                height={100}
                alt="leavest pattern"
              />
            </div>
          </div>
        </div>
        <div
          className={`${styles.introProducts} ${styles.introHair} ${
            locale === 'he' ? styles.reversed : ''
          }`}
        >
          <div dir="ltr" className={styles.introProductsContent}>
            <div className={styles.container}>
              <h1
                className={`${styles.title} ${
                  locale === 'ru' ? styles.ru : ''
                }`}
              >
                {t('intro.signalTitle')}
              </h1>
              <p className={styles.text}>{t('intro.signalSubtitle')}</p>
              <Button
                text={t('buttons.intro')}
                style={{
                  marginTop: 20,
                  marginBottom: 60,
                  width: '100%',
                }}
                onClick={
                  isSignalPage
                    ? undefined
                    : () => router.push('/exosignal_hair')
                }
                formPage={isSignalPage ? 'main' : undefined}
              />
              <Image
                className={styles.leaves}
                src="/images/leaves.svg"
                width={90}
                height={100}
                alt="leavest pattern"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.paginationBox}>
        <DotPagination count={5} intro />
      </div>
    </section>
  );
};

export default Intro;
