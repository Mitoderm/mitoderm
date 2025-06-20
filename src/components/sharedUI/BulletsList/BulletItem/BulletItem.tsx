import { FC } from 'react';
import styles from './BulletItem.module.scss';
import { useTranslations } from 'next-intl';

interface Props {
  imageUrl: string;
  text: string;
  isEventPage: boolean;
}

const BulletItem: FC<Props> = ({ imageUrl, text, isEventPage }) => {
  const t = useTranslations();

  return (
    <div
      className={`${styles.container} ${isEventPage && styles.containerEvent}`}
    >
      <span>{t(text)}</span>
      <img src={imageUrl} alt='item purpose' />
    </div>
  );
};

export default BulletItem;
