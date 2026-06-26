import type { Metadata } from 'next';
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

  return (
    <html lang={lng} className="g-root" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('swagger-editor-theme');
                  if (t !== 'dark' && t !== 'light') {
                    t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  document.documentElement.className = 'g-root g-root_theme_' + t;
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
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
