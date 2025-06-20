'use client';
import { FC, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import styles from './Intro.module.scss';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from '@/i18n/routing';
import DotPagination from '../../sharedUI/DotPagination/DotPagination';
import useAppStore from '@/store/store';
import { useMediaQuery } from 'react-responsive';

const Button = dynamic(() => import('@/components/sharedUI/Button/Button'), {
  ssr: false,
});

const Intro: FC = () => {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const isEventPage = pathname.includes('event');
  const { introPage, setIntroPage } = useAppStore((state) => state);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 779px)' });

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
    } else setIntroPage(0);
  }, []);

  useEffect(() => {
    const container = ref.current;

    const handleScroll = () => {
      const containerWidth = ref.current?.clientWidth;
      if (locale === 'he' && container?.scrollLeft && containerWidth) {
        if (container?.scrollLeft === -containerWidth) setIntroPage(1);
      } else if (container?.scrollLeft === 0) {
        setIntroPage(0);
      }
      if (locale !== 'he' && container?.scrollLeft && containerWidth) {
        if (container?.scrollLeft === containerWidth) setIntroPage(1);
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
    const currentValue = introPage === 0 ? 1 : 0;
    const interval = setInterval(() => {
      setIntroPage(currentValue);
    }, 15000);

    return () => clearInterval(interval);
  }, [introPage]);

  return (
    <section id='intro' className={styles.section}>
      <div ref={ref} id='scroller' className={styles.scrollBox}>
        <div
          className={`${styles.introMain} ${
            locale === 'he' ? styles.reversed : ''
          }`}
        >
          <div dir='ltr' className={styles.introMainContent}>
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
                  maxWidth: isTabletOrMobile ? 'auto' : 218,
                  width: '100%',
                }}
                formPage={'main'}
              />
              <Image
                className={styles.leaves}
                src='/images/leaves.svg'
                width={90}
                height={100}
                alt='leavest pattern'
              />
            </div>
          </div>
        </div>
        <div className={styles.introEvent}>
          <div className={`${styles.container} ${styles.eventPageContainer}`}>
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
            <Button
              text={t('buttons.seat')}
              style={{ marginTop: 20, width: isTabletOrMobile ? '100%' : 300 }}
              formPage={'event'}
            />
          </div>
        </div>
      </div>
      <div className={styles.paginationBox}>
        <DotPagination count={2} intro />
      </div>
    </section>
  );
};

export default Intro;
