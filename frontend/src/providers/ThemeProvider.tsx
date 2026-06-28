'use client';

import { ThemeProvider as GravityThemeProvider } from '@gravity-ui/uikit';
import { ThemeContextProvider, useTheme } from '@/contexts/ThemeContext';

function ThemeBridge({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return <GravityThemeProvider theme={theme}>{children}</GravityThemeProvider>;
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContextProvider>
      <ThemeBridge>{children}</ThemeBridge>
    </ThemeContextProvider>
  );
}
