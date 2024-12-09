import { FC } from 'react';
import styles from './Review.module.scss';
import { ReviewType } from '@/types';

interface Props {
  item: ReviewType;
}

const Review: FC<Props> = ({ item }) => {
  return (
    <div className={styles.container}>
      <span className={styles.name}>{item.name}</span>
      <div className={styles.stars}>
        {Array.from({ length: item.rating }, (_, i) => i + 1).map((_, i) => (
          <img
            className={styles.star}
            src='/images/star.svg'
            alt='star icon'
            key={i}
          />
        ))}
      </div>
      <p className={styles.text}>{item.text}</p>
      <div className={styles.googleRow}>
        <img
          className={styles.google}
          src='/images/google.svg'
          alt='google icon'
        />
        <div className={styles.googleTextBox}>
          <span>Posted on</span>
          <span className={styles.colored}>Google</span>
        </div>
      </div>
    </div>
  );
};

export default Review;