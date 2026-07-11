import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { HEADER_KEY } from '@/lib/theme/shared';
import { updateSession } from '@/lib/supabase/proxy';
import { detectLanguage } from '@/lib/i18n/proxy';
import { detectTheme } from '@/lib/theme/proxy';
import { LANGUAGE_HEADER } from '@/lib/i18n/shared';

const privateRoutes = ['/history'];
const authRoutes = ['/signin', '/signup'];

export async function proxy(request: NextRequest) {
  const { lng, redirect } = detectLanguage(request);
  if (redirect) return redirect;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LANGUAGE_HEADER, lng);

  const theme = detectTheme(request);
  if (theme) requestHeaders.set(HEADER_KEY, theme);

  const { pathname } = request.nextUrl;
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

    const response = NextResponse.next({ request: { headers: requestHeaders } });
    supabaseResponse.cookies.getAll().forEach((c) => response.cookies.set(c.name, c.value));
    return response;
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
