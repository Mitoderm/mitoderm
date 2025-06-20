import { FC } from 'react';
import styles from './Synegry.module.scss';
import { useTranslations } from 'next-intl';
import Button from '../../sharedUI/Button/Button';

const Synergy: FC = () => {
  const t = useTranslations();
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <span className={styles.title}>{t('synergy.title')}</span>
        <div className={styles.items}>
          <div className={styles.item}>
            <img src='/images/synergy1.png' alt='dna' />
            <span className={styles.subtitle}>{t('synergy.item1.title')}</span>
            <span className={styles.bullet}>{t('synergy.item1.text1')}</span>
            <span className={styles.bullet}>{t('synergy.item1.text2')}</span>
            <span className={styles.bullet}>{t('synergy.item1.text3')}</span>
          </div>
          <div className={styles.item}>
            <img src='/images/synergy2.png' alt='atom' />
            <span className={styles.subtitle}>{t('synergy.item2.title')}</span>
            <span className={styles.bullet}>{t('synergy.item2.text')}</span>
          </div>
          <div className={styles.item}>
            <img src='/images/synergy3.png' alt='water' />
            <span className={styles.subtitle}>{t('synergy.item3.title')}</span>
            <span className={styles.bullet}>{t('synergy.item3.text')}</span>
          </div>
        </div>
      </div>
      <Button formPage='main' text={t('buttons.contactForPrice')} />
    </section>
  );
};

export default Synergy;
