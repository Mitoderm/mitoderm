'use client';
import { FC, useState, useEffect } from 'react';
import styles from './NavigationProductButton.module.scss';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { usePathname } from '@/i18n/routing';
import { Link } from '@/i18n/routing';

const variants = {
  hidden: { opacity: 0, height: 0 },
  show: {
    height: 'auto',
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    pointerEvents: 'none',
    opacity: 0,
    x: 20,
  },
  show: {
    pointerEvents: 'all',
    opacity: 1,
    x: 0,
    transition: { duration: 0.1 },
  },
};

interface Props {
  isMobile?: boolean;
  handleClick?: () => void;
  isMenuOpen?: boolean;
}
const NavigationProductButton: FC<Props> = ({
  isMobile,
  handleClick,
  isMenuOpen,
}) => {
  const locale = useLocale();
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isEventPage = pathname === '/' && !pathname.includes('form');

  useEffect(() => {
    !isMobile && setIsOpen(false);
  }, [isMobile]);

  useEffect(() => {
    !isMenuOpen && setIsOpen(false);
  }, [isMenuOpen]);

  const handleBtnClick = () => {
    setIsOpen(false);
    handleClick?.();
  };

  return (
    <motion.div
      className={`${isMobile ? styles.buttonMobile : styles.button} ${
        styles.dropDownButton
      } ${!isOpen ? styles.closed : styles.opened}`}
    >
      <motion.div variants={itemVariants}>
        {isMobile ? (
          <button
            className={styles.productButton}
            onClick={() => setIsOpen((isOpen) => !isOpen)}
          >
            {t('navigation.product')}
            <Image
              className={`${styles.arrowIcon} ${isOpen ? styles.opened : ''}`}
              src="/images/icons/arrowDown.svg"
              width={15}
              height={11}
              alt="arrow icon"
            />
          </button>
        ) : (
          <button
            onClick={() => setIsOpen((isOpen) => !isOpen)}
            className={`${styles.productButtonDesktop} ${isOpen ? styles.opened : ''}`}
          >
            {t('navigation.product')}
            <Image
              className={`${styles.arrowIcon} ${isOpen ? styles.opened : ''}`}
              src="/images/icons/arrowDown.svg"
              width={15}
              height={11}
              alt="arrow icon"
            />
          </button>
        )}
      </motion.div>
      <motion.div
        initial="hidden"
        animate={isOpen ? 'show' : 'hidden'}
        variants={variants}
        className={`${
          isMobile ? styles.dropdownListMobile : styles.dropDownList
        } ${locale === 'he' && styles.reversed}`}
      >
        <motion.div variants={itemVariants}>
          <Link
            onClick={handleBtnClick}
            className={`${styles.link} ${isMobile && styles.linkMobile} ${isEventPage && styles.eventLink}`}
            href="/v_tech"
            locale={locale}
          >
            V-Tech System
          </Link>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Link
            onClick={handleBtnClick}
            className={`${styles.link} ${isMobile && styles.linkMobile} ${isEventPage && styles.eventLink}`}
            href="/exotechgel"
            locale={locale}
          >
            Exotech Gel
          </Link>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Link
            onClick={handleBtnClick}
            className={`${styles.link} ${isMobile && styles.linkMobile} ${isEventPage && styles.eventLink}`}
            href="/exosignalhairspray"
            locale={locale}
          >
            Exosignal Hair Spray
          </Link>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Link
            onClick={handleBtnClick}
            className={`${styles.link} ${isMobile && styles.linkMobile} ${isEventPage && styles.eventLink}`}
            href="/exosignal_hair"
            locale={locale}
          >
            Exosignal Hair
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default NavigationProductButton;
