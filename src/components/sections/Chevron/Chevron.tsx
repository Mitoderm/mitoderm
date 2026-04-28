'use client';
import { FC } from 'react';
import styles from './Chevron.module.scss';
import { useTranslations, useLocale } from 'next-intl';
import Button from '../../sharedUI/Button/Button';
import useHydratedMediaQuery from '@/hooks/useHydratedMediaQuery';

interface Props {
  page: string;
  imageName: string;
}

const Chevron: FC<Props> = ({ page, imageName }) => {
  const t = useTranslations();
  const locale = useLocale();
  const isTabletOrMobile = useHydratedMediaQuery({ query: '(max-width: 779px)' });
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div
          className={`${styles.textContainer} ${
            locale === 'ru' ? styles.textContainerRu : ''
          }`}
        >
          <span dir={locale === 'he' ? 'rtl' : 'ltr'}>
            <span className={styles.bold}>{t(`chevron.${page}.text1`)}</span>
            {t(`chevron.${page}.text2`)}
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
          src={`/images/${imageName}.png`}
          alt='item preview'
        />
        <div className={styles.description}>
          <div className={`${styles.titleBox} ${styles.titleBoxColumn}`}>
            <span className={styles.title}>{t(`chevron.${page}.title1`)}</span>
            <span className={styles.title}>{t(`chevron.${page}.title2`)}</span>
            <span className={styles.title}>{t(`chevron.${page}.title3`)}</span>
          </div>
          <span className={styles.subtitle}>
            {t(`chevron.${page}.subtitle`)}
          </span>
          <Button
            style={{ maxWidth: isTabletOrMobile ? '100%' : 256, height: 72 }}
            text={t(`chevron.${page}.button`)}
            formPage={'main'}
          />
        </div>
      </div>
    </div>
  );
};

export default Chevron;
