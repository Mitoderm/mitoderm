// 'use client';

import { useState } from 'react';
import { AdminSidebar } from '@/components/Admin/AdminSidebar/AdminSidebar';
import { AdminLoginPage } from '@/components/Admin/AdminLoginPage/AdminLoginPage';
import styles from './layout.module.scss';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [loggedIn, setLoggedIn] = useState(false);

  // if (true) {
  //   return <AdminLoginPage onLogin={() => setLoggedIn(true)} />;
  //   return <AdminLoginPage onLogin={() => {}} />;
  // }

  return (
    <div className={styles.root}>
      {/* <AdminSidebar onLogout={() => setLoggedIn(false)} /> */}
      <AdminSidebar />
      <main className={styles.main}>
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
}
