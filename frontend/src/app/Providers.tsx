'use client';

import { ThemeProvider } from '@gravity-ui/uikit';
import '@gravity-ui/uikit/styles/styles.css';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [theme, _setTheme] = useState<'light' | 'dark'>('light');

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
