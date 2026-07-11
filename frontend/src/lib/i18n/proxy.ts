import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { supportedLngs, DEFAULT_LNG } from '@/i18n/locales';

type LanguageResult = {
  lng: string;
  redirect?: NextResponse;
};

export function detectLanguage(request: NextRequest): LanguageResult {
  const { pathname, search } = request.nextUrl;

  const match = pathname.match(/^\/([^/]+)/);
  const lng = match && supportedLngs.includes(match[1]) ? match[1] : '';

  if (!lng) {
    return {
      lng: '',
      redirect: NextResponse.redirect(new URL(`/${DEFAULT_LNG}${pathname}${search}`, request.url)),
    };
  }

  return { lng };
}
