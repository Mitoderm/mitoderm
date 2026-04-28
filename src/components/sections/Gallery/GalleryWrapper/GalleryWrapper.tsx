'use client';

import { FC } from 'react';
import styles from './GalleryWrapper.module.scss';
import useHydratedMediaQuery from '@/hooks/useHydratedMediaQuery';
import GalleryDesktop from '../GalleryDesktop/GalleryDesktop';
import GalleryMobile from '../GalleryMobile/GalleryMobile';

interface Props {
  itemList: string[];
  isEventPage?: boolean;
}

const GalleryWrapper: FC<Props> = ({ itemList, isEventPage }) => {
  const isTabletOrMobile = useHydratedMediaQuery({
    query: '(max-width: 1224px)',
  });

  return (
    <div className={styles.container}>
      {isTabletOrMobile ? (
        <GalleryMobile items={itemList} isEventPage={isEventPage} />
      ) : (
        <GalleryDesktop items={itemList} isEventPage={isEventPage} />
      )}
    </div>
  );
};

export default GalleryWrapper;
