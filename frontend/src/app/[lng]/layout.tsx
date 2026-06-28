import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import type { Metadata } from 'next';
import { cookies, headers } from 'next/headers';
import '../globals.css';
import { Providers } from '../Providers';
import I18nProvider from '@/providers/I18nProvider';
import Header from '@/components/Header';
import { STORAGE_KEY, HEADER_KEY, THEME_LIGHT, getThemeClass, type Theme } from '@/shared/theme';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Swagger Editor App',
  description: 'Edit and preview Swagger documentation',
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}>) {
  const { lng } = await params;
  const cookieStore = await cookies();
  const cookieTheme = cookieStore.get(STORAGE_KEY)?.value;
  const headersList = await headers();
  const headerTheme = headersList.get(HEADER_KEY);
  const rawTheme = cookieTheme || headerTheme;
  const theme: Theme = rawTheme === 'dark' || rawTheme === 'light' ? rawTheme : THEME_LIGHT;
  const themeClass = getThemeClass(theme);

  return (
    <html lang={lng}>
      <body className={themeClass}>
        <Providers>
          <I18nProvider lng={lng}>
            <Header />
            {children}
            <Footer />
          </I18nProvider>
        </Providers>
      </body>
    </html>
  );
}
