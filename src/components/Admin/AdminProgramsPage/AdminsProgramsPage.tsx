'use client';

import { FC, useState } from 'react';
import type { Event } from '@/types';
import Image from 'next/image';
import styles from './AdminPrograms.module.scss';
import { useMediaQuery } from 'react-responsive';
import AdminModal from '../AdminModal/AdminModal';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import AdminListItem from '../AdminListItem/AdminListItem';
import AdminAddButton from '../AdminAddButton/AdminAddButton';
import EventEditForm from '@/components/forms/EventEditForm/EventEditForm';

interface Props {
  events: Event[];
}

const AdminProgramsPage: FC<Props> = ({ events }) => {
  const t = useTranslations();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Event | null>(null);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const router = useRouter();

  const getCategoryText = (category: number | string) => {
    switch (parseInt(category.toString())) {
      case 990:
        return t('stickyBar.workshop');
      case 480:
        return t('stickyBar.hours480');
      case 180:
        return t('stickyBar.hours180');
    }
  };

  const handleEventEdit = (program: Event) => {
    setEditingProgram(program);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProgram(null);
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this program?',
    );
    if (confirmed) {
      const response = await fetch(`/api/events`, {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      });
      const data = await response.json();

      if (data._id) {
        router.refresh();
      }
    }
  };

  return (
    <>
      <div className={styles.root}>
        <div className={styles.headerRow}>
          <div>
            <h1 className={styles.title}>{t('admin.programs')}</h1>
            <p
              className={`${styles.subtitle} ${isMobile ? styles.subtitleMobile : ''}`}
            >
              {t('admin.programsDescPageText')}
            </p>
          </div>
          <AdminAddButton
            onClick={() => setIsModalOpen(true)}
            text={t('admin.addProgram')}
          />
        </div>

        <div className={styles.eventList}>
          {events.map((prog) => {
            return (
              <AdminListItem
                key={prog.id}
                onEdit={() => handleEventEdit(prog)}
                onDelete={() => handleDelete(prog.id)}
              >
                <div className={styles.badgeRow}>
                  <span className={styles.statusBadge}>
                    {new Date(prog.date).toLocaleDateString('he-IL')}
                  </span>
                  <span className={styles.cityBadge}>{prog.time}</span>
                </div>
                <h3 className={styles.programTitle}>
                  {getCategoryText(prog.category)}
                </h3>
                <div className={styles.metaRow}>
                  <span className={styles.metaItem}>
                    <Image
                      src="/images/icons/mapPin.svg"
                      className={styles.icon3}
                      alt="map pin"
                      width={16}
                      height={16}
                    />
                    {prog.city}
                  </span>
                </div>
              </AdminListItem>
            );
          })}
        </div>
      </div>
      <AdminModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={t('admin.addProgram')}
        subtitle={t('admin.addProgramSubtitle')}
      >
        <EventEditForm
          editingProgram={editingProgram}
          setEditingProgram={setEditingProgram}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </AdminModal>
    </>
  );
};

export default AdminProgramsPage;
