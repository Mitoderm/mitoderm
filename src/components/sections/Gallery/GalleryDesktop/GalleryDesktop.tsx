import { FC, useEffect } from 'react';
import styles from './GalleryDesktop.module.scss';
import ArrowButton from '@/components/sharedUI/ArrowButton/ArrowButton';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import useAppStore from '@/store/store';

interface Props {
  items: string[];
  isEventPage?: boolean;
}

const GalleryDesktop: FC<Props> = ({ items, isEventPage }) => {
  const { galleryPage, setGalleryPage } = useAppStore((state) => state);
  const locale = useLocale();

  const scrollTo = () => {
    const container = document.getElementById('galleryItemBox');
    if (galleryPage >= items.length) setGalleryPage(0);
    if (galleryPage < 0) setGalleryPage(items.length - 1);
    if (container) {
      const scrollPosition = galleryPage * container?.clientWidth;
      if (locale === 'he') {
        container?.scrollTo({
          left: -scrollPosition,
          behavior: 'smooth',
        });
      } else {
        container?.scrollTo({
          left: scrollPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  const increment = () => {
    items.length >= galleryPage
      ? setGalleryPage(galleryPage + 1)
      : setGalleryPage(0);
  };
  const decrement = () => {
    galleryPage <= 0
      ? setGalleryPage(items.length - 1)
      : setGalleryPage(galleryPage - 1);
  };

  useEffect(() => {
    setGalleryPage(0);
  }, []);

  useEffect(() => {
    scrollTo();
  }, [galleryPage]);

  return (
    <>
      {isEventPage ? (
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={decrement}
          className={`${styles.navBtn} ${styles.navBtnLeft}`}
        >
          <Image
            src="/images/icons/arrowRight.svg"
            className={`${styles.navIcon} ${styles.navIconRotated} ${locale === 'he' ? styles.navBtnHebrew : ''}`}
            width={30}
            height={30}
            alt="arrow button"
          />
        </motion.button>
      ) : (
        <ArrowButton
          reversed={locale === 'he' ? false : true}
          colored
          onClick={decrement}
        />
      )}
      <div
        className={`${styles.itemWrapper} ${isEventPage ? styles.eventItemWrapper : ''}`}
      >
        <div id="galleryItemBox" className={styles.imageBox}>
          {items.map((item, i) => (
            <div className={styles.item} key={i}>
              <Image
                className={styles.image}
                src={`/images/${isEventPage ? 'eventB' : 'b'}eforeAfter/${item}`}
                alt="Example of Exosomes effect"
                fill
                style={{ objectFit: 'contain' }}
                sizes="100%"
                priority
              />
            </div>
          ))}
        </div>
      </div>
      {isEventPage ? (
        <motion.button
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={increment}
          className={`${styles.navBtn} ${styles.navBtnRight}`}
        >
          <Image
            src="/images/icons/arrowRight.svg"
            className={`${styles.navIcon} ${locale === 'he' ? styles.navIconRotated : ''}`}
            width={30}
            height={30}
            alt="arrow button"
          />
        </motion.button>
      ) : (
        <ArrowButton reversed={locale === 'he'} colored onClick={increment} />
      )}
    </>
  );
};

export default GalleryDesktop;
