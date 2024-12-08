import { FC } from 'react';
import styles from './GalleryDesktop.module.scss';
import ArrowButton from '@/components/Shared/ArrowButton/ArrowButton';
import { useTranslations } from 'next-intl';

interface Props {
  disabledLeft: boolean;
  disabledRight: boolean;
  onClickLeft: () => void;
  onClickRight: () => void;
  items: Array<[string, string]>;
}

const GalleryDesktop: FC<Props> = ({
  disabledLeft,
  disabledRight,
  onClickLeft,
  onClickRight,
  items,
}) => {
  const t = useTranslations();
  return (
    <>
      <ArrowButton
        disabled={disabledLeft}
        reversed
        colored
        onClick={onClickLeft}
      />
      <div className={styles.itemWrapper}>
        <div className={styles.imageBox}>
          {items.map((item, i) => (
            <div id={`item${i}`} className={styles.item} key={`key${i}`}>
              <img
                className={styles.image}
                src={`/images/beforeAfterExamples/${item[0]}`}
                alt='before usage exoxo'
              />
              <img
                className={styles.image}
                src={`/images/beforeAfterExamples/${item[1]}`}
                alt='result after usage exoxo'
              />
            </div>
          ))}
        </div>
        <div className={styles.itemLabel}>
          <span className={styles.roundLabel}>&</span>
          <span className={styles.label}>{t('gallery.before')}</span>
          <span className={styles.label}>{t('gallery.after')}</span>
        </div>
      </div>
      <ArrowButton disabled={disabledRight} colored onClick={onClickRight} />
    </>
  );
};

export default GalleryDesktop;