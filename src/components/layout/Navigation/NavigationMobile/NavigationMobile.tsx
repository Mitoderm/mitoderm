import { FC } from 'react';
import { motion } from 'framer-motion';
import styles from './NavigationMobile.module.scss';
import NavigationProductButton from '../NavigationProductButton/NavigationProductButton';
import { NavItem } from '@/types';
import { usePathname, Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { randomString } from '@/utils/helpers';

const navigationVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.1, delay: i * 0.1 + 0.1 },
  }),
};

interface Props {
  navList: NavItem[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const NavigationMobile: FC<Props> = ({ navList, setIsOpen, isOpen }) => {
  const t = useTranslations();
  const pathName = usePathname();

  const handleClick = () => {
    setIsOpen(false);
  };

  return (
    <motion.nav
      variants={navigationVariants}
      initial="hidden"
      animate={isOpen ? 'show' : 'hidden'}
      aria-label="Main Navigation"
      className={`${styles.mobileNavigation} ${isOpen && styles.active}`}
    >
      <NavigationProductButton
        isMobile
        handleClick={handleClick}
        isMenuOpen={isOpen}
      />
      {navList.map((item: NavItem, index: number) => (
        <motion.div
          custom={index}
          variants={itemVariants}
          className={styles.linkContainerMobile}
          key={`item${index + Math.random()}`}
        >
          {!item.scrollId && !item.url ? (
            <motion.button
              custom={index}
              variants={itemVariants}
              onClick={handleClick}
              key={index + randomString()}
              className={styles.buttonMobile}
            >
              {t(item.text)}
            </motion.button>
          ) : (
            <motion.div variants={itemVariants} custom={index}>
              <Link
                onClick={handleClick}
                href={item.url ? item.url : `#${item.scrollId}`}
                key={index + randomString()}
                className={styles.buttonMobile}
              >
                {t(item.text)}
              </Link>
            </motion.div>
          )}
        </motion.div>
      ))}
      {pathName.length > 1 && (
        <motion.div
          custom={navList?.length}
          variants={itemVariants}
          className={`${styles.linkContainerMobile} ${styles.homepageLinkContainerMobile}`}
        >
          <Link
            onClick={handleClick}
            href={'/'}
            className={`${styles.buttonMobile} ${styles.homepageButton}`}
          >
            {t('navigation.homepage')}
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default NavigationMobile;
