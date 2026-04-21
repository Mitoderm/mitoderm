'use client';
import { FC, useState } from 'react';
import styles from './AdminDoctorPage.module.scss';
import { DoctorType } from '@/types';
import { useTranslations } from 'next-intl';
import AdminAddButton from '../AdminAddButton/AdminAddButton';
import { useMediaQuery } from 'react-responsive';
import AdminListItem from '../AdminListItem/AdminListItem';
import AdminModal from '../AdminModal/AdminModal';
import DoctorForm from '@/components/forms/DoctorForm/DoctorForm';
import { useRouter } from 'next/navigation';

interface Props {
  doctors: DoctorType[];
}

const AdminDoctorPage: FC<Props> = ({ doctors }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedDoctor, setEditedDoctor] = useState<DoctorType | null>(null);
  const router = useRouter();
  const t = useTranslations();

  const handleClose = () => {
    setIsModalOpen(false);
    setEditedDoctor(null);
  };

  const handleDoctorEdit = (doctor: DoctorType) => {
    setEditedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleDoctorDelete = async (doctor: DoctorType) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${doctor.name}?`,
    );
    if (confirmed) {
      const response = await fetch('/api/doctors', {
        method: 'DELETE',
        body: JSON.stringify({ _id: doctor._id }),
      });
      const data = await response.json();
      if (data._id) {
        router.refresh();
      }
    }
  };

  const isMobile = useMediaQuery({ maxWidth: 768 });
  return (
    <main className={styles.root}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>{t('admin.doctors')}</h1>
          <p
            className={`${styles.subtitle} ${isMobile ? styles.subtitleMobile : ''}`}
          >
            {t('admin.doctorsDescPageText')}
          </p>
        </div>
        <AdminAddButton
          onClick={() => setIsModalOpen(true)}
          text={t('admin.addDoctor')}
        />
      </div>
      <div className={styles.doctorList}>
        {doctors.map((doctor) => (
          <AdminListItem
            key={doctor._id}
            onEdit={() => handleDoctorEdit(doctor)}
            onDelete={() => handleDoctorDelete(doctor)}
          >
            <div className={styles.doctorInfo}>
              <span className={styles.doctorInfoItem}>
                <span className={styles.doctorInfoItemLabel}>
                  {t('admin.name')}:
                </span>{' '}
                {doctor.name}
              </span>
              <span className={styles.doctorInfoItem}>
                <span className={styles.doctorInfoItemLabel}>
                  {t('admin.city')}:
                </span>{' '}
                {doctor.city}
              </span>
              <span className={styles.doctorInfoItem}>
                <span className={styles.doctorInfoItemLabel}>
                  {t('admin.area')}:
                </span>{' '}
                {doctor.area}
              </span>
              <span className={styles.doctorInfoItem}>
                <span className={styles.doctorInfoItemLabel}>
                  {t('admin.profession')}:
                </span>
                {doctor.profession}
              </span>
              <span className={styles.doctorInfoItem}>
                <span className={styles.doctorInfoItemLabel}>
                  {t('admin.contact')}:
                </span>
                {doctor.contact}
              </span>
              <span className={styles.doctorInfoItem}>
                <span className={styles.doctorInfoItemLabel}>
                  {t('admin.instagram')}:
                </span>{' '}
                {doctor.instagram}
              </span>
            </div>
          </AdminListItem>
        ))}
      </div>
      <AdminModal
        isOpen={isModalOpen}
        onClose={handleClose}
        title={t('admin.addDoctor')}
        subtitle={t('admin.addDoctorSubtitle')}
      >
        <DoctorForm
          doctor={editedDoctor}
          setDoctor={setEditedDoctor}
          isOpen={isModalOpen}
          onClose={handleClose}
        />
      </AdminModal>
    </main>
  );
};

export default AdminDoctorPage;
