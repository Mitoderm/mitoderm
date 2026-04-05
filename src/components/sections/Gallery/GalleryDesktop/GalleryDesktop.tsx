import { FC } from 'react';
import styles from './GalleryDesktop.module.scss';
import ArrowButton from '@/components/sharedUI/ArrowButton/ArrowButton';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Props {
  disabledLeft: boolean;
  disabledRight: boolean;
  onClickLeft: () => void;
  onClickRight: () => void;
  items: string[];
  isEventPage?: boolean;
}

const GalleryDesktop: FC<Props> = ({
  disabledLeft,
  disabledRight,
  onClickLeft,
  onClickRight,
  items,
  isEventPage,
}) => {
  const locale = useLocale();
  return (
    <>
      {isEventPage ? (
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClickLeft}
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
          disabled={disabledLeft}
          reversed={locale === 'he' ? false : true}
          colored
          onClick={onClickLeft}
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
          onClick={onClickRight}
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
        <ArrowButton
          reversed={locale === 'he'}
          disabled={disabledRight}
          colored
          onClick={onClickRight}
        />
      )}
    </>
  );
};

export default GalleryDesktop;
