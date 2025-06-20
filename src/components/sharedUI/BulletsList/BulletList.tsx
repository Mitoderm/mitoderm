'use client';
import { FC } from 'react';
import styles from './BulletList.module.scss';
import type { HowToUseItem, EventBulletItem } from '@/types';
import BulletItem from './BulletItem/BulletItem';
import { usePathname } from '@/i18n/routing';

interface Props {
  data: HowToUseItem[] | EventBulletItem[];
}

const BulletList: FC<Props> = ({ data }) => {
  const pathname = usePathname();
  const isEventPage = pathname.includes('event');
  return (
    <div
      className={`${styles.itemList} ${
        isEventPage && styles.eventPageItemList
      }`}
    >
      {data.map((item) => (
        <BulletItem
          isEventPage={isEventPage}
          key={item.text}
          imageUrl={item.imagePath}
          text={item.text}
        />
      ))}
    </div>
  );
};

export default BulletList;
