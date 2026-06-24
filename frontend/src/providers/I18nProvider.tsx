import { initServerI18next, getT, getResources } from 'next-i18next/server';
import { I18nProvider as NextI18nProvider } from 'next-i18next/client';
import i18nConfig from '@/i18n/config';

initServerI18next(i18nConfig);

export default async function I18nProvider({
  children,
  lng,
}: {
  children: React.ReactNode;
  lng: string;
}) {
  const { i18n } = await getT();
  const resources = getResources(i18n);

  return (
    <NextI18nProvider language={lng} resources={resources}>
      {children}
    </NextI18nProvider>
  );
}
