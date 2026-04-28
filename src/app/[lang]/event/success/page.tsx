import { setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import Success from '@/components/sections/Success/Success';

export default async function SuccessPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  setRequestLocale(lang);
  return (
    <main className='successPage'>
      <Suspense>
        <Success />
      </Suspense>
    </main>
  );
}
