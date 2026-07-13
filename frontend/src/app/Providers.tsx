import ThemeProvider from '@/providers/ThemeProvider';
import ToastProvider from '@/providers/ToastProvider';
import I18nProvider from '@/providers/I18nProvider';
import { AuthProvider } from '@/providers/AuthProvider';

export function Providers({ children, lng }: { children: React.ReactNode; lng: string }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <I18nProvider lng={lng}>
          <ToastProvider>{children}</ToastProvider>
        </I18nProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
