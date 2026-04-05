'use client';
import { FC } from 'react';
import { motion } from 'framer-motion';
import styles from './BulletList.module.scss';
import type { HowToUseItem, EventBulletItem } from '@/types';
import BulletItem from './BulletItem/BulletItem';
import { usePathname } from '@/i18n/routing';

interface Props {
  data: HowToUseItem[] | EventBulletItem[];
  page?: 'hair' | 'gel' | 'main';
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const BulletList: FC<Props> = ({ data, page }) => {
  const pathname = usePathname();
  const isEventPage = pathname.includes('event');
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className={`${styles.itemList} ${
        isEventPage && styles.eventPageItemList
      } ${page && page !== 'main' && styles.productList}`}
    >
      {data.map((item) => (
        <BulletItem
          page={page}
          isEventPage={isEventPage}
          key={item.text}
          imageUrl={item.imagePath}
          text={item.text}
        />
      ))}
    </motion.div>
  );
};

export default BulletList;
