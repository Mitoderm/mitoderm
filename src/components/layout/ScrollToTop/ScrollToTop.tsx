'use client';

import { FC, useState, useEffect } from 'react';
import styles from './ScrollToTop.module.scss';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const ScrollToTop: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const isAdminPage = pathname.includes('admin');

  useEffect(() => {
    const scrollContainer = document.querySelector('body');
    if (!scrollContainer) return;

    const toggleVisibility = () => {
      if (scrollContainer.scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    scrollContainer.addEventListener('scroll', toggleVisibility);
    return () =>
      scrollContainer.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    const scrollContainer = document.querySelector('body');
    if (!scrollContainer) return;

    scrollContainer.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className={`${styles.button} ${isAdminPage ? styles.admin : ''}`}
          aria-label="Scroll to top"
        >
          <Image
            src="/images/icons/arrowDown.svg"
            alt="Scroll to top"
            width={24}
            height={24}
            className={styles.icon}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
