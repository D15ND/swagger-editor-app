import { getT } from 'next-i18next/server';
import dynamic from 'next/dynamic';
import { createClient } from '@/lib/supabase/server';
import { toHistoryEntry } from '@/lib/history/mapper';
import HistoryActions from './HistoryActions';
import AnalyticsCards from './AnalyticsCards';
import styles from './history.module.css';

const HistoryContent = dynamic(() => import('./HistoryContent'), {
  loading: () => <div className={styles.skeleton} />,
});

export async function generateMetadata() {
  const { t } = await getT('history');
  return { title: t('title') };
}

export default async function HistoryPage({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params;

  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getClaims();
  const userId = authData?.claims?.sub ?? null;

  const { data: rows } = await supabase
    .from('request_logs')
    .select('*')
    .eq('user_id', userId ?? '')
    .order('timestamp', { ascending: false })
    .limit(15);

  const entries = (rows ?? []).map(toHistoryEntry);

  const total = entries.length;
  const totalTime = entries.reduce((s, e) => s + e.duration, 0);
  const successful = entries.filter(
    (e) => e.responseStatus >= 200 && e.responseStatus < 300,
  ).length;
  const errored = entries.filter((e) => e.error !== null).length;
  const avg = total ? Math.round(totalTime / total) : 0;

  const { t } = await getT('history', { lng });

  return (
    <main className={styles.page}>
      <div className={styles.main}>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.subtitle}>{t('subtitle')}</p>

        {total > 0 && (
          <>
            <AnalyticsCards
              totalRequests={t('totalRequests', { count: total })}
              successful={successful}
              errored={errored}
              totalTime={totalTime}
              avgDuration={avg}
              successfulLabel={t('analytics.successful')}
              failedLabel={t('analytics.failed')}
              totalTimeLabel={t('analytics.totalTime')}
              avgDurationLabel={t('analytics.avgDuration')}
            />
            <HistoryActions clearAllLabel={t('clearAll')} />
          </>
        )}

        <HistoryContent entries={entries} lng={lng} />
      </div>
    </main>
  );
}
