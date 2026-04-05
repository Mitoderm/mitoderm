'use client';

import { useState } from 'react';
import { AdminSidebar } from '../AdminSidebar/AdminSidebar';
import { AdminLoginPage } from '../AdminLoginPage/AdminLoginPage';
import styles from './AdminSessionWrapper.module.scss';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return <AdminLoginPage onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div className={styles.root}>
      <AdminSidebar onLogout={() => setLoggedIn(false)} />
      <main className={styles.main}>
        <div className={styles.mainInner}>{children}</div>
      </main>
    </div>
  );
}
