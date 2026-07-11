import { getT } from 'next-i18next/server';

import { getSession } from '@/lib/auth';
import { fetchSavedSchema } from '@/lib/schema/queries';
import { SwaggerEditorContainer } from '@/features/swagger-editor/components/SwaggerEditorContainer';

export async function generateMetadata() {
  const { t } = await getT('home');

  return {
    title: t('title'),
  };
}

export default async function Home() {
  const session = await getSession();

  let initialSchema: string | undefined;

  if (session) {
    const saved = await fetchSavedSchema(session.supabase, session.user.id);
    if (saved) {
      initialSchema = saved.content;
    }
  }

  return <SwaggerEditorContainer initialSchema={initialSchema} />;
}
