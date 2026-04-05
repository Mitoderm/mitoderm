'use client';
import { FC } from 'react';
import { motion } from 'framer-motion';
import styles from './BulletItem.module.scss';
import { useTranslations } from 'next-intl';

interface Props {
  imageUrl: string;
  text: string;
  isEventPage: boolean;
  page?: 'hair' | 'gel' | 'main';
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const BulletItem: FC<Props> = ({ imageUrl, page, text, isEventPage }) => {
  const t = useTranslations();

  return (
    <motion.div
      variants={itemVariants}
      viewport={{ once: true }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`${styles.container} ${isEventPage && styles.containerEvent} ${
        page && page !== 'main' && styles.productContainer
      }`}
    >
      <span>{t(text)}</span>
      <img src={imageUrl} alt="item purpose" />
    </motion.div>
  );
};

export default BulletItem;
