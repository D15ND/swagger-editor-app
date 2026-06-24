import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './Providers';

export const metadata: Metadata = {
  title: 'Swagger Editor App',
  description: 'Edit and preview Swagger documentation',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
