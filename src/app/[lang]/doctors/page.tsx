import { FC } from 'react';
import { getDoctors } from '@/lib/mongodb';
import { unstable_setRequestLocale } from 'next-intl/server';
import DoctorListSessionWrapper from '@/components/sections/DoctorList/DoctorListSessionWrapper/DoctorListSessionWrapper';

const DoctorPage: FC = async ({ params: { lang } }: any) => {
  unstable_setRequestLocale(lang);
  const initialDoctorList = await getDoctors();

  return <DoctorListSessionWrapper doctors={initialDoctorList} />;
};

export default DoctorPage;
