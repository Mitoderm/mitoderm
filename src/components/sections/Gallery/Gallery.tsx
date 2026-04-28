import { FC } from 'react';
import dynamic from 'next/dynamic';
import path from 'path';
import { promises as fs } from 'fs';
import styles from './Gallery.module.scss';
import { getTranslations } from 'next-intl/server';
import GalleryPagination from './GalleryPagination/GalleryPagination';
import EventButton from '@/components/sharedUI/EventButton/EventButton';
import GalleryWrapper from './GalleryWrapper/GalleryWrapper';

interface Props {
  isHairPage?: boolean;
  isEventPage?: boolean;
}

const Gallery: FC<Props> = async ({ isHairPage, isEventPage }) => {
  const t = await getTranslations();
  const imageDirectory = path.join(
    process.cwd(),
    `/public/images/${isEventPage ? 'eventB' : 'b'}eforeAfter`,
  );

  const imageFilenames = await fs.readdir(imageDirectory);
  let sliderItemsArray: string[] = [];

  let itemList: string[] = [];

  sliderItemsArray = imageFilenames.filter((file) => file !== '.DS_Store');

  if (isHairPage)
    sliderItemsArray = sliderItemsArray.filter((file) => file.includes('hair'));

  if (sliderItemsArray) itemList = sliderItemsArray;

  return (
    <section
      id="gallery"
      className={`${styles.container} ${isEventPage ? styles.eventPage : ''}`}
    >
      {isEventPage ? (
        <>
          <h2 className={styles.eventTitle}>{t('gallery.eventTitle')}</h2>
          <span className={styles.prefixLine} />
        </>
      ) : (
        <h2 className={styles.title}>{t('gallery.title')}</h2>
      )}
      <GalleryWrapper
        itemList={itemList as string[]}
        isEventPage={isEventPage}
      />
      <GalleryPagination count={itemList.length} isEventPage={isEventPage} />
      {isEventPage ? (
        <EventButton text={t('buttons.cta')} url={'#about'} />
      ) : null}
    </section>
  );
};

export default Gallery;
