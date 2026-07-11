import type { NextRequest } from 'next/server';
import { STORAGE_KEY, THEME_DARK, THEME_LIGHT } from '@/lib/theme/shared';

export function detectTheme(request: NextRequest): string | null {
  const theme = request.cookies.get(STORAGE_KEY)?.value;
  return theme === THEME_DARK || theme === THEME_LIGHT ? theme : null;
}
