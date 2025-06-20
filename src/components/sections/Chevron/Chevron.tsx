'use client';
import { FC } from 'react';
import styles from './Chevron.module.scss';
import { useTranslations, useLocale } from 'next-intl';
import Button from '../../sharedUI/Button/Button';
import { useMediaQuery } from 'react-responsive';

const Chevron: FC = () => {
  const t = useTranslations();
  const locale = useLocale();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 779px)' });
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.textContainer}>
          <span dir={locale === 'he' ? 'rtl' : 'ltr'}>
            <span className={styles.bold}>{t('chevron.text1')}</span>
            {t('chevron.text2')}
          </span>
        </div>
        <img
          className={styles.arrows}
          src='/images/chevron.svg'
          alt='gold arrows'
        />
      </div>
      <div dir='ltr' className={styles.staffContainer}>
        <img
          className={styles.image}
          src='/images/chevronImage.png'
          alt='item preview'
        />
        <div className={styles.description}>
          <div
            className={`${styles.titleBox} ${
              isTabletOrMobile && locale != 'he' ? styles.titleBoxColumn : ''
            }`}
          >
            <span className={styles.title}>{t('chevron.title1')}</span>
            <span className={styles.title}>{t('chevron.title2')}</span>
            <span className={styles.title}>{t('chevron.title3')}</span>
          </div>
          <span className={styles.subtitle}>{t('chevron.subtitle')}</span>
          <Button
            style={{ maxWidth: isTabletOrMobile ? '100%' : 256, height: 72 }}
            text={t('chevron.button')}
            formPage={'main'}
          />
        </div>
      </div>
    </div>
  );
};

export default Chevron;
