'use client';
import { FC, useEffect, useRef } from 'react';
import 'react-photo-view/dist/react-photo-view.css';
import styles from './GalleryMobile.module.scss';
import { useTranslations, useLocale } from 'next-intl';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import useAppStore from '@/store/store';

interface Props {
  items: string[];
}

const GalleryMobile: FC<Props> = ({ items }) => {
  const setGalleryPage = useAppStore((state) => state.setGalleryPage);
  const locale = useLocale();
  const t = useTranslations();

  // const handleScroll = () => {
  //   const container = document.getElementById('galleryItemBox');
  //   if (!container) return;

  //   const scrollLeft = container.scrollLeft;
  //   const itemWidth = container.clientWidth;
  //   const newPage = Math.round(scrollLeft / itemWidth);

  //   setGalleryPage(newPage);
  // };

  const handleScroll = () => {
    const container = document.getElementById('galleryItemBox');
    if (!container) return;

    const itemWidth = container.clientWidth;
    const scrollDistance =
      locale === 'he' ? -container.scrollLeft : container.scrollLeft;

    switch (scrollDistance) {
      case 0:
        return setGalleryPage(0);
      case itemWidth * 1:
        return setGalleryPage(1);
      case itemWidth * 2:
        return setGalleryPage(2);
      case itemWidth * 3:
        return setGalleryPage(3);
      case itemWidth * 4:
        return setGalleryPage(4);
      case itemWidth * 5:
        return setGalleryPage(5);
      case itemWidth * 6:
        return setGalleryPage(6);
    }
  };

  useEffect(() => {
    const container = document.getElementById('galleryItemBox');
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <>
      <div className={styles.itemWrapper}>
        <span className={styles.zoomLabel}>{t('gallery.zoom')}</span>
        <div id='galleryItemBox' className={styles.imageBox}>
          <PhotoProvider>
            {items.map((item, i) => (
              <div className={styles.item} key={i}>
                <PhotoView src={`/images/beforeAfter/${item}`}>
                  <img
                    className={styles.image}
                    src={`/images/beforeAfter/${item}`}
                    alt='Example of Exosomes effect'
                  />
                </PhotoView>
              </div>
            ))}
          </PhotoProvider>
        </div>
      </div>
    </>
  );
};

export default GalleryMobile;
