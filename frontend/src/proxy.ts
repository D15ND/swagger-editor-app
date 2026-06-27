import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { supportedLngs } from '@/i18n/locales';

const fallbackLng = 'en';

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const match = pathname.match(/^\/([^/]+)/);
  const lng = match && supportedLngs.includes(match[1]) ? match[1] : '';

  if (!lng) {
    return NextResponse.redirect(new URL(`/${fallbackLng}${pathname}${search}`, request.url));
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-i18next-current-language', lng);

  const theme = request.cookies.get('swagger-editor-theme')?.value;
  if (theme === 'dark' || theme === 'light') {
    requestHeaders.set('x-theme', theme);
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
