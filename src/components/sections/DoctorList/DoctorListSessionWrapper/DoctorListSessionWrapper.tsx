'use client';
import { FC } from 'react';
import styles from './DoctorListSessionWrapper.module.scss';
import { DoctorType } from '@/types';
import DoctorList from '../DoctorList/DoctorList';
import { SessionProvider } from 'next-auth/react';
import { useTranslations } from 'next-intl';

interface Props {
  doctors: DoctorType[];
}

const DoctorListSessionWrapper: FC<Props> = ({ doctors }) => {
  const t = useTranslations();
  return (
    <main className={styles.container}>
      <span className={styles.title}>{t('faq.centerTitle')}</span>
      <SessionProvider>
        <DoctorList doctors={doctors} />
      </SessionProvider>
    </main>
  );
};

export default DoctorListSessionWrapper;
