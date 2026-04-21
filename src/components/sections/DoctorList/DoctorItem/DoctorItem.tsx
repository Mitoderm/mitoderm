'use client';
import { FC } from 'react';
import styles from './DoctorItem.module.scss';
import { DoctorType } from '@/types';
import { useTranslations } from 'next-intl';
import DoctorSocialLink from '../DoctorSocialLink/DoctorSocialLink';

interface Props {
  doctor: DoctorType;
}

const DoctorItem: FC<Props> = ({ doctor }) => {
  const t = useTranslations();

  return (
    <div className={styles.container}>
      <div className={styles.contentItem}>
        <span className={styles.contentItemLabel}>
          {t('doctorList.name')}:{' '}
        </span>
        <span className={styles.contentItemValue}>{doctor.name}</span>
      </div>
      {doctor.city.length ? (
        <div className={styles.contentItem}>
          <span className={styles.contentItemLabel}>
            {t('doctorList.city')}:{' '}
          </span>
          <span className={styles.contentItemValue}>{doctor.city}</span>
        </div>
      ) : null}
      {doctor.profession.length ? (
        <div className={styles.contentItem}>
          <span className={styles.contentItemLabel}>
            {t('doctorList.profession.profession')}:{' '}
          </span>
          <span className={styles.contentItemValue}>
            {doctor.profession === '1'
              ? t('doctorList.profession.1')
              : doctor.profession === '2'
                ? t('doctorList.profession.2')
                : t('doctorList.profession.3')}
          </span>
        </div>
      ) : null}
      {doctor.area.length ? (
        <div className={styles.contentItem}>
          <span className={styles.contentItemLabel}>
            {t('doctorList.area')}:{' '}
          </span>
          <span className={styles.contentItemValue}>{doctor.area}</span>
        </div>
      ) : null}
      <div className={styles.contentItem}>
        <span className={styles.contentItemLabel}>
          {t('doctorList.contact')}:{' '}
        </span>
        <a className={styles.phoneLink} href={`tel:${doctor.contact}`}>
          {doctor.contact}
        </a>
      </div>
      <DoctorSocialLink url={doctor.instagram} />
    </div>
  );
};

export default DoctorItem;
