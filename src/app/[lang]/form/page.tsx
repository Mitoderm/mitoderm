import { setRequestLocale } from 'next-intl/server';
import MainForm from '@/components/forms/MainForm';

export default async function FormPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  setRequestLocale(lang);
  return (
    <main className='formPage'>
      <MainForm />
    </main>
  );
}
