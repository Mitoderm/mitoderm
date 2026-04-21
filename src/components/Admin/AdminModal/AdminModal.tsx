'use client';

import { FC, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './AdminModal.module.scss';
import Image from 'next/image';
import { useLocale } from 'next-intl';

interface Props {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
  title: string;
  subtitle: string;
}

const AdminModal: FC<Props> = ({
  children,
  onClose,
  isOpen,
  title,
  subtitle,
}) => {
  const locale = useLocale();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className={styles.backdrop}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className={styles.modalWrap}
          >
            <div className={styles.modal}>
              <div className={styles.header}>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className={`${styles.closeBtn} ${locale === 'he' && styles.he}`}
                >
                  <Image
                    src="/images/icons/x.svg"
                    width={24}
                    height={24}
                    alt="close"
                    className={styles.closeIcon}
                  />
                </motion.button>

                <h2 className={styles.title}>{title}</h2>
                <p className={styles.subtitle}>{subtitle}</p>

                <div className={styles.decor1} />
                <div className={styles.decor2} />
              </div>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AdminModal;
