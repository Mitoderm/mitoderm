'use client';

import { FC, CSSProperties } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from './AdminSidebar.module.scss';
import { useSession } from 'next-auth/react';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const asideVariants = {
  hidden: { width: 86 },
  show: {
    width: 500,
    transition: {
      duration: 0.3,
    },
  },
};

const asideContentDisabledStyles: CSSProperties = {
  pointerEvents: 'none',
};

interface Props {
  onLogout: () => void;
}

const AdminSidebar: FC<Props> = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();
  const pathname = usePathname();
  const locale = useLocale();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const session = useSession();
  const user = session.data?.user;

  const asideDisablingStyles = isOpen ? {} : asideContentDisabledStyles;

  const navItems = [
    {
      to: `/${locale}/admin/programs`,
      icon: '/images/icons/calendar.svg',
      label: t('admin.programs'),
      desc: t('admin.programsDesc'),
    },
    {
      to: `/${locale}/admin/doctors`,
      icon: '/images/icons/content.svg',
      label: t('admin.doctors'),
      desc: t('admin.doctorsDesc'),
    },
  ];

  const contentVariants = {
    hidden: { opacity: 0, x: locale === 'he' ? -100 : 100 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  useEffect(() => {
    if (!isMobile) {
      setIsOpen(true);
    }
  }, [isMobile]);

  const handleClick = () => {
    isMobile ? setIsOpen((state) => !state) : null;
  };

  return (
    <motion.aside
      variants={asideVariants}
      initial={isMobile ? 'hidden' : 'show'}
      animate={isOpen ? 'show' : 'hidden'}
      aria-label="Main Navigation"
      onClick={handleClick}
      className={`${styles.aside} ${isMobile ? styles.asideMobile : ''} ${locale === 'he' && styles.he}`}
    >
      <div className={styles.logoSection} style={asideDisablingStyles}>
        <div className={styles.logoRow}>
          <div className={styles.logoMark}>
            <span className={styles.logoLetter}>M</span>
          </div>
          <div>
            <motion.h1
              variants={contentVariants}
              initial="hidden"
              animate={isOpen ? 'show' : 'hidden'}
              className={styles.title}
            >
              MITODERM
            </motion.h1>
            <motion.p
              variants={contentVariants}
              initial="hidden"
              animate={isOpen ? 'show' : 'hidden'}
              className={styles.subtitle}
            >
              {t('admin.adminPanel')}
            </motion.p>
          </div>
        </div>
      </div>

      <nav className={styles.nav}>
        <motion.p
          variants={contentVariants}
          initial="hidden"
          animate={isOpen ? 'show' : 'hidden'}
          className={styles.navSectionLabel}
        >
          {t('admin.managementPanel')}
        </motion.p>
        {navItems.map((item) => {
          const isActive = pathname === item.to;
          return (
            <Link
              style={asideDisablingStyles}
              key={item.to}
              href={item.to}
              className={`${styles.navLink} ${isActive ? styles.navLinkActive : styles.navLinkInactive}`}
            >
              <div
                className={`${styles.iconWrap} ${isActive ? styles.iconWrapActive : styles.iconWrapInactive}`}
              >
                <Image
                  src={item.icon}
                  className={`${styles.navIcon} ${isActive ? styles.navIconActive : ''}`}
                  width={18}
                  height={18}
                  alt={item.label}
                />
              </div>
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate={isOpen ? 'show' : 'hidden'}
                className={styles.navLabelContainer}
              >
                <span className={styles.navLabel}>{item.label}</span>
                <span className={styles.navDesc}>{item.desc}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className={styles.footer}>
        <div className={styles.userRow}>
          <div className={styles.avatar} style={asideDisablingStyles}>
            AD
          </div>
          <div className={styles.userMeta}>
            <motion.p
              variants={contentVariants}
              initial="hidden"
              animate={isOpen ? 'show' : 'hidden'}
              className={styles.userName}
            >
              {t('admin.admin')}
            </motion.p>
            <motion.p
              variants={contentVariants}
              initial="hidden"
              animate={isOpen ? 'show' : 'hidden'}
              className={styles.userEmail}
            >
              {user?.email}
            </motion.p>
          </div>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className={styles.signOut}
          style={asideDisablingStyles}
        >
          <Image
            src="/images/icons/logOutIcon.svg"
            className={styles.signOutIcon}
            width={16}
            height={16}
            alt="sign out"
          />{' '}
          <motion.span
            variants={contentVariants}
            initial="hidden"
            animate={isOpen ? 'show' : 'hidden'}
          >
            {t('admin.signOut')}
          </motion.span>
        </button>
      </div>
    </motion.aside>
  );
};

export default AdminSidebar;
