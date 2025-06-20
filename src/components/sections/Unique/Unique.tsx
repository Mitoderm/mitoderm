import { FC } from 'react';
import styles from './Unique.module.scss';
import { useTranslations } from 'next-intl';

const Unique: FC = () => {
  const t = useTranslations();
  return (
    <section className={styles.container}>
      <div className={styles.containerInner}>
        <img src='/images/chevronImage.png' alt='v-teck package' />
        <div className={styles.textBox}>
          <h3>
            {t('unique.titleP1')}
            <span>{t('unique.titleP2')}</span>
            {t('unique.titleP3')}
          </h3>
          <p>
            {t('unique.textP1')}
            <span>{t('unique.textP2')}</span>
            {t('unique.textP3')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Unique;
