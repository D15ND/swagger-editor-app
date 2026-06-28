'use client';

import '@gravity-ui/uikit/styles/styles.css';
import ThemeProvider from '@/providers/ThemeProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
