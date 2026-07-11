import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { getSupabaseConfig } from './constants';

function hasAuthCookie(request: NextRequest) {
  return request.cookies.getAll().some((c) => /^sb-.+-auth-token(-\d+)?$/.test(c.name));
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });
  const config = getSupabaseConfig();

  if (!config) return { supabase: null, supabaseResponse, user: null, timedOut: false };

  if (!hasAuthCookie(request)) {
    return { supabase: null, supabaseResponse, user: null, timedOut: false };
  }

  let timedOut = false;
  const supabase = createServerClient(config.url, config.publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
        Object.entries(headers).forEach(([key, value]) => supabaseResponse.headers.set(key, value));
      },
    },
  });
  const { data } = await Promise.race([
    supabase.auth.getClaims(),
    new Promise<{ data: null }>((resolve) => setTimeout(() => resolve({ data: null }), 3000)),
  ]);

  const user = data?.claims?.sub ? { id: data.claims.sub } : null;
  timedOut = !user;

  return { supabase, supabaseResponse, user, timedOut };
}
