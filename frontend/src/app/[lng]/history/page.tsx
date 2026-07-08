import { getT } from 'next-i18next/server';
import dynamic from 'next/dynamic';
import { getSession } from '@/lib/auth';
import { fetchHistoryRows } from '@/lib/history/queries';
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
  const { t } = await getT('history', { lng });

  const session = await getSession();

  const entries = session
    ? (await fetchHistoryRows(session.supabase, session.user.id, 15).catch(() => [])).map(
        toHistoryEntry,
      )
    : [];

  const total = entries.length;
  const totalTime = entries.reduce((s, e) => s + e.duration, 0);
  const successful = entries.filter(
    (e) => e.responseStatus >= 200 && e.responseStatus < 300,
  ).length;
  const errored = entries.filter((e) => e.error !== null).length;
  const avg = total ? Math.round(totalTime / total) : 0;

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
