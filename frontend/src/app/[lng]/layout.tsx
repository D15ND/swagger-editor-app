import type { Metadata } from 'next';
import { headers } from 'next/headers';
import '../globals.css';
import { Providers } from '../Providers';
import I18nProvider from '@/providers/I18nProvider';
import Header from '@/components/Header';

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
  const headersList = await headers();
  const theme = headersList.get('x-theme');
  const themeClass = theme === 'dark' || theme === 'light' ? ` g-root_theme_${theme}` : '';

  return (
    <html lang={lng} className={`g-root${themeClass}`} suppressHydrationWarning>
      <body>
        <Providers>
          <I18nProvider lng={lng}>
            <Header />
            {children}
          </I18nProvider>
        </Providers>
      </body>
    </html>
  );
}
