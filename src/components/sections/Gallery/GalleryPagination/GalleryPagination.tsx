'use client';
import { FC } from 'react';
import styles from './GallleryPagination.module.scss';
import ImageCounter from '../ImageCounter/ImageCounter';
import useAppStore from '@/store/store';

interface Props {
  count: number;
  isEventPage?: boolean;
}

const GalleryPagination: FC<Props> = ({ count, isEventPage }) => {
  const { galleryPage } = useAppStore((state) => state);
  return (
    <>
      {isEventPage ? (
        <div className={styles.eventPaginationBox}>
          <span className={styles.counterText}>
            {galleryPage + 1} / {count}
          </span>
          <div className={styles.dotsRow}>
            {Array.from({ length: count }).map((_, i) => (
              <div
                key={i}
                className={`${styles.dotBtn} ${i === galleryPage ? styles.dotActive : styles.dotInactive}`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.paginationBox}>
          <ImageCounter count={count} />
        </div>
      )}
    </>
  );
};

export default GalleryPagination;
