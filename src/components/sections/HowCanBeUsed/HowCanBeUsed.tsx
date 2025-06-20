'use client';
import { FC } from 'react';
import styles from './HowCaBeUsed.module.scss';
import { useTranslations } from 'next-intl';
import { howToUseItemList } from '@/constants';
import BulletList from '../../sharedUI/BulletsList/BulletList';

const HowCanBeUsed: FC = () => {
  const t = useTranslations();
  return (
    <section className={styles.section}>
      <p className={styles.title}>{t('howToUse.title')}</p>
      <BulletList data={howToUseItemList} />
    </section>
  );
};

export default HowCanBeUsed;
