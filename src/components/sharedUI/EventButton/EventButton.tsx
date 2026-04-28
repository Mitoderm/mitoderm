'use client';
import { FC } from 'react';
import styles from './EventButton.module.scss';
import { motion } from 'motion/react';
import { Link } from '@/i18n/routing';
import useHydratedMediaQuery from '@/hooks/useHydratedMediaQuery';

interface Props {
  text: string;
  onClick?: () => void;
  url?: string;
}

const EventButton: FC<Props> = ({ text, onClick, url }) => {
  const isMobile = useHydratedMediaQuery({ query: '(max-width: 768px)' });
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className={styles.buttonWrapper}
    >
      {url ? (
        <Link className={styles.buttonLink} href={url}>
          <motion.div
            whileHover={{ scale: isMobile ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.button}
          >
            {text}
          </motion.div>
        </Link>
      ) : (
        <motion.button
          onClick={onClick}
          whileHover={{ scale: isMobile ? 1 : 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={styles.button}
        >
          {text}
        </motion.button>
      )}
    </motion.div>
  );
};

export default EventButton;
