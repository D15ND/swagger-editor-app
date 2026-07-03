import { getT } from 'next-i18next/server';

import { SwaggerEditorContainer } from '@/features/swagger-editor/components/SwaggerEditorContainer';

export async function generateMetadata() {
  const { t } = await getT('home');

  return {
    title: t('title'),
  };
}

export default function Home() {
  return <SwaggerEditorContainer />;
}
