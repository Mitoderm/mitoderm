'use client';
import { FC, SetStateAction, Dispatch } from 'react';
import styles from './DoctorItem.module.scss';
import { DoctorType } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import WhatsappLink from '@/components/layout/WhatsappLink/WhatsappLink';

interface Props {
  doctor: DoctorType;
  setCurrentDoctor: Dispatch<SetStateAction<DoctorType>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  loggedIn: boolean;
}

const DoctorItem: FC<Props> = ({
  doctor,
  setCurrentDoctor,
  setIsOpen,
  loggedIn,
}) => {
  const router = useRouter();
  const t = useTranslations();
  const handleDelete = async () => {
    const confirmed = window.confirm(`Are you sure to delete ${doctor.name}?`);
    if (confirmed)
      await fetch('/api/doctors', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: doctor._id,
        }),
      });
    // const data = await res.json();
    router.refresh();
  };

  const handleEdit = () => {
    setCurrentDoctor(doctor);
    setIsOpen(true);
  };

  return (
    <div className={styles.container}>
      <span>{`${t('doctorList.name')}: ${doctor.name}`}</span>
      {doctor.city.length ? (
        <span>{`${t('doctorList.city')}: ${doctor.city}`}</span>
      ) : null}
      {doctor.profession.length ? (
        <span>{`${t('doctorList.profession.profession')}: ${
          doctor.profession === '1'
            ? t('doctorList.profession.1')
            : doctor.profession === '2'
            ? t('doctorList.profession.2')
            : t('doctorList.profession.3')
        }`}</span>
      ) : null}
      {doctor.area.length ? (
        <span>{`${t('doctorList.area')}: ${doctor.area}`}</span>
      ) : null}
      <span>
        {`${t('doctorList.contact')}: `}
        <a className={styles.phoneLink} href={`tel:${doctor.contact}`}>
          {doctor.contact}
        </a>
      </span>
      {doctor.instagram.length ? (
        <a href={doctor.instagram} target="_blank">
          <Image
            src="/images/contacts/instagram.svg"
            width={25}
            height={25}
            alt="instagram icon"
          />
        </a>
      ) : null}
      <WhatsappLink
        phone={doctor.contact}
        customClassName={styles.whatsAppCustomClass}
      />
      {loggedIn && (
        <div className={styles.buttonBox}>
          <button className={styles.editButton} onClick={handleEdit}>
            <Image
              src="/images/icons/edit.svg"
              width={20}
              height={20}
              alt="edit icon"
            />
          </button>
          <button className={styles.deleteButton} onClick={handleDelete}>
            <Image
              src="/images/icons/delete.svg"
              width={20}
              height={20}
              alt="delete icon"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default DoctorItem;
