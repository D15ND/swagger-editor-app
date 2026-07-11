import ThemeProvider from '@/providers/ThemeProvider';
import { AuthProvider } from '@/providers/AuthProvider';
import I18nProvider from '@/providers/I18nProvider';

export function Providers({ children, lng }: { children: React.ReactNode; lng: string }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <I18nProvider lng={lng}>{children}</I18nProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
