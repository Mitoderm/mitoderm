import { FC } from 'react';
import styles from './Faq.module.scss';
import { useTranslations } from 'next-intl';
import Dropdown from '../../sharedUI/Dropdown/Dropdown';

const Faq: FC = () => {
  const t = useTranslations();
  return (
    <section id='faq' className={styles.container}>
      <div className={styles.containerInner}>
        <span className={styles.title}>{t('faq.title')}</span>
        <div className={styles.itemBox}>
          <Dropdown data={{ item: 'faq.item1' }} />
          <Dropdown data={{ item: 'faq.item2' }} />
          <Dropdown data={{ item: 'faq.item3' }} />
          <Dropdown data={{ item: 'faq.item4' }} />
          <Dropdown data={{ item: 'faq.item5' }} />
          <Dropdown data={{ item: 'faq.item6' }} />
        </div>
      </div>
    </section>
  );
};

export default Faq;
