'use client';
import { FC } from 'react';
import styles from './StickyBar.module.scss';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { WorkshopVariant } from '@/types';
import useAppStore from '@/store/store';

const StickyBar: FC = () => {
  const t = useTranslations();
  const { courseVariant, setCourseVariant, showStickyBar } = useAppStore(
    (state) => state,
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: showStickyBar ? 1 : 0, y: showStickyBar ? 0 : -20 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className={styles.stickyBar}
      >
        <div className={styles.inner}>
          {(['990', '180', '480'] as WorkshopVariant[]).map((v) => (
            <motion.button
              key={v}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCourseVariant(v)}
              className={`${styles.btn} ${courseVariant === v ? styles.active : ''}`}
            >
              {v === '990'
                ? t('stickyBar.workshop')
                : v === '180'
                  ? t('stickyBar.hours180')
                  : t('stickyBar.hours480')}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StickyBar;
