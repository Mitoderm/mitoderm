'use client';

import { FC, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

const AdminPage: FC = () => {
  const session = useSession();
  const router = useRouter();
  const locale = useLocale();
  const user: any = session.data?.user;

  useEffect(() => {
    if (user?.role === 'admin') {
      router.replace(`/${locale}/admin/programs`);
    }
  }, [user?.role, router, locale]);

  return null;
};

export default AdminPage;
