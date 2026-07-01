import { redirect } from 'next/navigation';
import { getT } from 'next-i18next/server';
import dynamic from 'next/dynamic';

const HistoryContent = dynamic(() => import('./HistoryContent'), {
  loading: () => null,
});

export async function generateMetadata() {
  const { t } = await getT('common');
  return { title: t('nav.history') };
}

export default async function HistoryPage({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params;

  // TODO: replace with real auth check once JWT auth is implemented
  const isAuthenticated = true;

  if (!isAuthenticated) {
    redirect(`/${lng}`);
  }

  return <HistoryContent />;
}
