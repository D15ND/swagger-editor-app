'use client';

import { useCallback, useState } from 'react';
import { ThemeProvider as GravityThemeProvider } from '@gravity-ui/uikit';
import { ThemeContext } from '@/contexts/ThemeContext';
import { STORAGE_KEY, THEME_DARK, THEME_LIGHT, type Theme } from '@/shared/theme';

function getStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === THEME_DARK || stored === THEME_LIGHT) return stored;
  } catch {}
  if (typeof window === 'undefined') return THEME_LIGHT;

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEME_DARK : THEME_LIGHT;
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getStoredTheme);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
      localStorage.setItem(STORAGE_KEY, next);
      document.cookie = `${STORAGE_KEY}=${next}; path=/; max-age=31536000; SameSite=Lax`;
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <GravityThemeProvider theme={theme}>{children}</GravityThemeProvider>
    </ThemeContext.Provider>
  );
}
