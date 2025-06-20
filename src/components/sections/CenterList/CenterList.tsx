import { FC } from 'react';
import styles from './CenterList.module.scss';
import Dropdown from '../../sharedUI/Dropdown/Dropdown';
import { centerItemData } from '@/constants';
import { useTranslations } from 'next-intl';

const CenterList: FC = () => {
  const t = useTranslations();
  return (
    <section id='clinic' className={styles.container}>
      <span className={styles.title}>{t('faq.centerTitle')}</span>
      <div className={styles.containerInner}>
        <Dropdown data={centerItemData} />
      </div>
    </section>
  );
};

export default CenterList;
