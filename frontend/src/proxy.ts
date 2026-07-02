import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { supportedLngs, DEFAULT_LNG } from '@/i18n/locales';
import { STORAGE_KEY, HEADER_KEY, THEME_DARK, THEME_LIGHT } from '@/shared/theme';
import { updateSession } from '@/lib/supabase/proxy';

const privateRoutes = ['/history'];
const authRoutes = ['/signin', '/signup'];

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const match = pathname.match(/^\/([^/]+)/);
  const lng = match && supportedLngs.includes(match[1]) ? match[1] : '';

  if (!lng) {
    return NextResponse.redirect(new URL(`/${DEFAULT_LNG}${pathname}${search}`, request.url));
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-i18next-current-language', lng);

  const theme = request.cookies.get(STORAGE_KEY)?.value;
  if (theme === THEME_DARK || theme === THEME_LIGHT) {
    requestHeaders.set(HEADER_KEY, theme);
  }

  const stripped = pathname.replace(`/${lng}`, '') || '/';
  const isPrivate = privateRoutes.some((r) => stripped.startsWith(r));
  const isAuth = authRoutes.some((r) => stripped.startsWith(r));

  if (isPrivate || isAuth) {
    const { user, supabaseResponse } = await updateSession(request);

    if (!user && isPrivate) {
      const url = request.nextUrl.clone();
      url.pathname = `/${lng}`;
      return NextResponse.redirect(url);
    }

    if (user && isAuth) {
      const url = request.nextUrl.clone();
      url.pathname = `/${lng}`;
      return NextResponse.redirect(url);
    }

    const response = NextResponse.next({ request, headers: requestHeaders });
    supabaseResponse.cookies.getAll().forEach((c) => response.cookies.set(c.name, c.value));
    return response;
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
