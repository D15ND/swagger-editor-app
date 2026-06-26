import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import type { Metadata } from 'next';
import '../globals.css';
import { Providers } from '../Providers';
import I18nProvider from '@/providers/I18nProvider';
import LanguageSwitcher from '@/components/LanguageSwitcher';

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

  return (
    <html lang={lng}>
      <body>
        <Providers>
          <I18nProvider lng={lng}>
            <LanguageSwitcher />
            {children}
          </I18nProvider>
        </Providers>
      </body>
    </html>
  );
}
