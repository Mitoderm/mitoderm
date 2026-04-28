import { setRequestLocale } from 'next-intl/server';
import EventForm from '@/components/forms/EventForm';

export default async function EventFormPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  setRequestLocale(lang);
  return (
    <main className='formPage'>
      <EventForm />
    </main>
  );
}
