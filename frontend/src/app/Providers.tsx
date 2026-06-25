import { ReactNode } from 'react';
import ThemeProvider from '@/providers/ThemeProvider';

export function Providers({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
