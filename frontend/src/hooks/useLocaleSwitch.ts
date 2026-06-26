'use client';

import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { supportedLngs } from '@/i18n/locales';

type LocaleItem = {
  code: string;
  href: string;
  isActive: boolean;
};

export function useLocaleSwitch(): LocaleItem[] {
  const params = useParams<{ lng: string }>();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const qs = searchParams.toString();
  const query = qs ? `?${qs}` : '';

  return supportedLngs.map((locale) => {
    const isActive = params.lng === locale;
    const href = isActive
      ? `${pathname}${query}`
      : `/${locale}${pathname.replace(/^\/[a-z]{2}/, '') || '/'}${query}`;

    return { code: locale, href, isActive };
  });
}
