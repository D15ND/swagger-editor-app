import { redirect } from 'next/navigation';
import { getT } from 'next-i18next/server';
import { createClient } from '@/lib/supabase/server';
import { toHistoryEntry } from '@/lib/history/mapper';
import HistoryContent from './HistoryContent';

export async function generateMetadata() {
  const { t } = await getT('history');
  return { title: t('title') };
}

export default async function HistoryPage({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(`/${lng}`);

  const { data: rows } = await supabase
    .from('request_logs')
    .select('*')
    .order('timestamp', { ascending: false });

  const entries = (rows ?? []).map(toHistoryEntry);

  return <HistoryContent entries={entries} lng={lng} />;
}
