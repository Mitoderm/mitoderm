'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import styles from './AdminSidebar.module.scss';

export function AdminSidebar({ onLogout }: { onLogout?: () => void }) {
  const pathname = usePathname();
  const locale = useLocale();

  const navItems = [
    {
      to: `/${locale}/admin/programs/`,
      icon: '/images/icons/calendar.svg',
      label: 'Programs',
      desc: 'Training & workshops',
    },
    {
      to: `/${locale}/admin/doctors`,
      icon: '/images/icons/content.svg',
      label: 'Doctors',
      desc: 'List of Doctors',
    },
  ];

  return (
    <aside className={styles.aside}>
      <div className={styles.logoSection}>
        <div className={styles.logoRow}>
          <div className={styles.logoMark}>
            <span className={styles.logoLetter}>M</span>
          </div>
          <div>
            <h1 className={styles.title}>MITODERM</h1>
            <p className={styles.subtitle}>Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className={styles.nav}>
        <p className={styles.navSectionLabel}>Management</p>
        {navItems.map((item) => {
          const isActive =
            pathname === item.to || pathname.startsWith(item.to + '/');
          return (
            <Link
              key={item.to}
              href={item.to}
              className={`${styles.navLink} ${isActive ? styles.navLinkActive : styles.navLinkInactive}`}
            >
              <div
                className={`${styles.iconWrap} ${isActive ? styles.iconWrapActive : styles.iconWrapInactive}`}
              >
                <Image
                  src={item.icon}
                  className={styles.navIcon}
                  width={18}
                  height={18}
                  alt={item.label}
                />
              </div>
              <div>
                <span className={styles.navLabel}>{item.label}</span>
                <span
                  className={`${styles.navDesc} ${isActive ? styles.navDescActive : styles.navDescInactive}`}
                >
                  {item.desc}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className={styles.footer}>
        <div className={styles.userRow}>
          <div className={styles.avatar}>AD</div>
          <div className={styles.userMeta}>
            <p className={styles.userName}>Admin</p>
            <p className={styles.userEmail}>admin@mitoderm.com</p>
          </div>
        </div>
        <button type="button" onClick={onLogout} className={styles.signOut}>
          <Image
            src="/images/icons/logOutIcon.svg"
            className={styles.signOutIcon}
            width={16}
            height={16}
            alt="sign out"
          />{' '}
          Sign Out
        </button>
      </div>
    </aside>
  );
}
