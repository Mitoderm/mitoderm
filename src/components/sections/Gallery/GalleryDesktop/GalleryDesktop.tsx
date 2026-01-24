import { FC } from 'react';
import styles from './GalleryDesktop.module.scss';
import ArrowButton from '@/components/sharedUI/ArrowButton/ArrowButton';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

interface Props {
  disabledLeft: boolean;
  disabledRight: boolean;
  onClickLeft: () => void;
  onClickRight: () => void;
  items: string[];
}

const GalleryDesktop: FC<Props> = ({
  disabledLeft,
  disabledRight,
  onClickLeft,
  onClickRight,
  items,
}) => {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <>
      <ArrowButton
        disabled={disabledLeft}
        reversed={locale === 'he' ? false : true}
        colored
        onClick={onClickLeft}
      />
      <div className={styles.itemWrapper}>
        <div id='galleryItemBox' className={styles.imageBox}>
          {items.map((item, i) => (
            <div className={styles.item} key={i}>
              <Image
                className={styles.image}
                src={`/images/beforeAfter/${item}`}
                alt='Example of Exosomes effect'
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          ))}
        </div>
      </div>
      <ArrowButton
        reversed={locale === 'he'}
        disabled={disabledRight}
        colored
        onClick={onClickRight}
      />
    </>
  );
};

export default GalleryDesktop;
