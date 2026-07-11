import { getT } from 'next-i18next/server';

import { SwaggerWorkspace } from '@/components/SwaggerWorkspace';

export async function generateMetadata() {
  const { t } = await getT('home');

  return {
    title: t('title'),
  };
}

export default function Home() {
  return <SwaggerWorkspace />;
}
