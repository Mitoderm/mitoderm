'use client';

import { FC } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

const AdminPage: FC = () => {
  const session = useSession();
  const router = useRouter();
  const locale = useLocale();
  const user: any = session.data?.user;
  if (user?.role === 'admin') {
    router.push(`../${locale}/admin/programs`);
  }
  return null;
};

export default AdminPage;
