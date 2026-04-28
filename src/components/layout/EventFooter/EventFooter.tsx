'use client';

import { FC } from 'react';
import styles from './EventFooter.module.scss';
import { useTranslations } from 'next-intl';
import useAppStore from '@/store/store';
import Image from 'next/image';

const MAIN_SITE_URL = 'https://mitoderm.vercel.app';

const EventFooter: FC = () => {
  const { setModalContent, toggleModal } = useAppStore((state) => state);
  const t = useTranslations('eventFooter');
  const siteUrl = '#';

  const handlePrivacyClick = () => {
    toggleModal(true);
    setModalContent('privatePolicy');
  };

  const handleAccessibilityClick = () => {
    toggleModal(true);
    setModalContent('accessibility');
  };

  return (
    <footer className={styles.eventFooter}>
      <div className={styles.inner}>
        <span className={styles.copyright}>
          {t('copyright')}
          <span suppressHydrationWarning>{new Date().getFullYear()}</span>
          {' ' + t('rights')}
        </span>
        <span className={styles.subtitle}>{t('subtitle')}</span>
        <div className={styles.links}>
          <button className={styles.link} onClick={handleAccessibilityClick}>
            {t('accessibility')}
          </button>
          <button className={styles.link} onClick={handlePrivacyClick}>
            {t('privacy')}
          </button>
          <a href={siteUrl} target="_blank" className={styles.link}>
            {t('group')}
          </a>
        </div>
        <div className={styles.textContainer}>
          <span className={styles.text}>{t('made')}</span>
          <Image
            src={'/images/icons/heart.svg'}
            alt="icon"
            width={10}
            height={10}
          />
          <span className={styles.text}>{t('by')}</span>
        </div>
      </div>
    </footer>
  );
};

export default EventFooter;
