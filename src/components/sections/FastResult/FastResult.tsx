import { FC } from 'react';
import styles from './FastResult.module.scss';
import { useTranslations } from 'next-intl';

const FastResult: FC = () => {
  const t = useTranslations();
  return (
    <section className={styles.container}>
      <div className={styles.containerInner}>
        <div className={styles.textBox}>
          <h2>
            {t('fastResult.titleP1')}
            <span>{t('fastResult.titleP2')}</span>
          </h2>
          <span className={styles.subtitle}>{t('fastResult.subtitle')}</span>
          <span className={styles.text}>{t('fastResult.text')}</span>
        </div>
        <img
          src='/images/fastResults.png'
          alt='v-tech box on gold background'
          className={styles.image}
        />
      </div>
    </section>
  );
};

export default FastResult;
