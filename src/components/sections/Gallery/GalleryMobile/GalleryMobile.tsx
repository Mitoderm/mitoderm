'use client';
import { FC, useEffect } from 'react';
import 'react-photo-view/dist/react-photo-view.css';
import styles from './GalleryMobile.module.scss';
import { useTranslations, useLocale } from 'next-intl';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import useAppStore from '@/store/store';

interface Props {
  items: string[];
  isHairPage?: boolean;
}

const GalleryMobile: FC<Props> = ({ items, isHairPage }) => {
  const setGalleryPage = useAppStore((state) => state.setGalleryPage);
  const locale = useLocale();
  const t = useTranslations();

  const handleScroll = (value: number | Event) => {
    const container = document.getElementById('galleryItemBox');
    if (!container) return;

    const itemWidth = container.clientWidth;
    const scrollDistance =
      locale === 'he' ? -container.scrollLeft : container.scrollLeft;

    let page: number;
    if (typeof value === 'number') {
      const scrollDestination =
        locale === 'he' ? -itemWidth * value : itemWidth * value;
      container.scrollTo({ left: scrollDestination });
    } else {
      page = Math.round(scrollDistance / itemWidth);
      setGalleryPage(page);
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
        <div id="galleryItemBox" className={styles.imageBox}>
          <PhotoProvider
            onIndexChange={(index) => {
              handleScroll(index);
            }}
          >
            {items.map((item, i) => (
              <div className={styles.item} key={i}>
                <PhotoView
                  src={`/images/beforeAfter/${
                    isHairPage ? `hair/` : ''
                  }${item}`}
                >
                  <img
                    className={styles.image}
                    src={`/images/beforeAfter/${
                      isHairPage ? `hair/` : ''
                    }${item}`}
                    alt="Example of Exosomes effect"
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
