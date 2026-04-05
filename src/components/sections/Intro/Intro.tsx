'use client';
import { FC, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import dynamic from 'next/dynamic';
import styles from './Intro.module.scss';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import DotPagination from '../../sharedUI/DotPagination/DotPagination';
import useAppStore from '@/store/store';
import EventButton from '@/components/sharedUI/EventButton/EventButton';

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
  const isSignalPage = pathname.includes('exosignal_hair');
  const isGelPage = pathname.includes('exotechgel');
  const isSprayPage = pathname.includes('exosignalhairspray');
  const { introPage, setIntroPage } = useAppStore((state) => state);

  useEffect(() => {
    if (isEventPage) {
      scrollTo(1);
      setIntroPage(1);
    } else if (isSprayPage) {
      scrollTo(2);
      setIntroPage(2);
    } else if (isGelPage) {
      scrollTo(3);
      setIntroPage(3);
    } else if (isSignalPage) {
      scrollTo(4);
      setIntroPage(4);
    } else setIntroPage(0);
  }, []);

  const scrollTo = (page: number, smooth: boolean = false) => {
    const container = document.getElementById('scroller');
    const scrollPosition = page * window.innerWidth;
    if (locale === 'he') {
      container?.scrollTo({
        left: -scrollPosition,
        behavior: smooth ? 'smooth' : 'auto',
      });
    } else {
      container?.scrollTo({
        left: scrollPosition,
        behavior: smooth ? 'smooth' : 'auto',
      });
    }
  };

  useEffect(() => {
    const container = ref.current;

    const handleScroll = (value: number | Event) => {
      const container = document.getElementById('scroller');
      if (!container) return;

      const itemWidth = container.clientWidth;
      const scrollDistance =
        locale === 'he' ? -container.scrollLeft : container.scrollLeft;

      let page: number;
      if (typeof value === 'number') {
        const scrollDestination =
          locale === 'he' ? -itemWidth * value : itemWidth * value;
        container.scrollTo({ left: scrollDestination });
      } else {
        page = Math.round(scrollDistance / itemWidth);
        setIntroPage(page);
      }
    };

    container?.addEventListener('scroll', handleScroll, { passive: true });
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const currentValue = introPage < 4 ? introPage + 1 : 0;
    const interval = setInterval(() => {
      scrollTo(currentValue, true);
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
          <div className={styles.eventBG}>
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
              transition={{ duration: 20, repeat: Infinity }}
              className={styles.blur1}
            />
            <motion.div
              animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
              transition={{ duration: 25, repeat: Infinity }}
              className={styles.blur2}
            />
          </div>
          <div className={styles.eventContent}>
            <div className={styles.contentWrapper}>
              <motion.video
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`${styles.eventVideo} ${locale === 'he' && styles.he}`}
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/videos/eventIntroVideo.webm" type="video/webm" />
                Your browser does not support the video tag.
              </motion.video>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className={styles.eventTextContainer}
              >
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className={styles.badge}
                >
                  <div
                    className={styles.badgeDot + ' ' + styles.animatePulse}
                  />
                  {t('intro.eventBadge')}
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className={styles.eventTitle}
                >
                  <span style={{ color: 'white' }}>
                    {t('intro.eventTitleP1')}
                  </span>
                  <span className={styles.eventTitleAccent}>
                    {t('intro.eventTitleP2')}
                  </span>
                  <span style={{ color: 'white' }}>
                    {t('intro.eventTitleP3')}
                  </span>
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className={styles.eventSubtitle}
                >
                  <p className={styles.eventSubtitleText}>
                    {t('intro.eventSubtitle')}
                  </p>
                </motion.div>
                <EventButton
                  text={t('buttons.cta')}
                  url={isEventPage ? '#about' : undefined}
                  onClick={() => {
                    if (!isEventPage) {
                      router.push('/event');
                    }
                  }}
                />
              </motion.div>
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
        <DotPagination count={5} intro handleIntroSwitch={scrollTo} />
      </div>
    </section>
  );
};
``;

export default Intro;
