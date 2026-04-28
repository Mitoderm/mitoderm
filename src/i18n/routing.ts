import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'he', 'ru'],
  defaultLocale: 'en'
});

// ✅ new API
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);