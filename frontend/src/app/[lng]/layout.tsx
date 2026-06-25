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
    <html lang={lng} suppressHydrationWarning>
      <body className="g-root" suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('theme');
                  if (t !== 'dark' && t !== 'light') {
                    t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  document.body.className = 'g-root g-root_theme_' + t;
                  document.documentElement.style.colorScheme = t;
                } catch(e) {}
              })();
            `,
          }}
        />
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
