'use client';

import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { supportedLngs } from '@/i18n/locales';

type UseLocaleSwitchResult = {
  current: string;
  next: () => string;
  href: (locale: string) => string;
};

export function useLocaleSwitch(): UseLocaleSwitchResult {
  const params = useParams<{ lng: string }>();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const qs = searchParams.toString();
  const query = qs ? `?${qs}` : '';

  const current = params.lng;

  const href = useCallback(
    (locale: string) => {
      if (locale === current) return `${pathname}${query}`;
      return `/${locale}${pathname.replace(/^\/[a-z]{2}/, '') || '/'}${query}`;
    },
    [current, pathname, query],
  );

  const next = useCallback(() => {
    const idx = supportedLngs.indexOf(current);
    return supportedLngs[(idx + 1) % supportedLngs.length];
  }, [current]);

  return useMemo(() => ({ current, next, href }), [current, next, href]);
}
