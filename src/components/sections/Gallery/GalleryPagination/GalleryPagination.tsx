'use client';
import { FC } from 'react';
import styles from './GallleryPagination.module.scss';
import ImageCounter from '../ImageCounter/ImageCounter';

interface Props {
  count: number;
}

const GalleryPagination: FC<Props> = ({ count }) => {
  return (
    <div className={styles.paginationBox}>
      <ImageCounter count={count} />
    </div>
  );
};

export default GalleryPagination;
