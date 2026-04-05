import { FC, useMemo } from 'react';
import styles from './CenterList.module.scss';
import Dropdown from '../../sharedUI/Dropdown/Dropdown';
import { useTranslations } from 'next-intl';
import { DoctorType } from '@/types';

interface Props {
  doctors: DoctorType[];
}

const CenterList: FC<Props> = ({ doctors }) => {
  const centerItemData = doctors?.map((doctor) => ({
    name: doctor.name,
    city: doctor.city,
    contact: doctor.contact,
  }));

  const dropdownList = useMemo(() => <Dropdown data={centerItemData} />, []);

  const t = useTranslations();

  return (
    <section id="clinic" className={styles.container}>
      <span className={styles.title}>{t('faq.centerTitle')}</span>
      <div className={styles.containerInner}>{dropdownList}</div>
    </section>
  );
};

export default CenterList;
