'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import { STORAGE_KEY, THEME_DARK, THEME_LIGHT, type Theme } from '@/shared/theme';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

function getStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === THEME_DARK || stored === THEME_LIGHT) return stored;
  } catch {}
  if (typeof window === 'undefined') return THEME_LIGHT;

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEME_DARK : THEME_LIGHT;
}

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getStoredTheme);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
      localStorage.setItem(STORAGE_KEY, next);
      document.cookie = `${STORAGE_KEY}=${next}; path=/; max-age=31536000; SameSite=Lax`;
      return next;
    });
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeContextProvider');
  return ctx;
}
