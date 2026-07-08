import { getT } from 'next-i18next/server';
import dynamic from 'next/dynamic';
import { getSession } from '@/lib/auth';
import { fetchHistoryRows } from '@/lib/history/queries';
import { toHistoryEntry } from '@/lib/history/mapper';
import AnalyticsCards from '@/components/History/AnalyticsCards';
import HistoryActions from '@/components/History/HistoryActions';

const HistoryContent = dynamic(() => import('@/components/History/HistoryContent'), {
  loading: () => (
    <div
      style={{
        height: 320,
        background: 'var(--g-color-base-generic)',
        borderRadius: 'var(--se-radius-xl)',
      }}
    />
  ),
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
    <main style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--g-spacing-6)',
          maxWidth: 800,
          width: '100%',
          margin: '0 auto',
          padding: 'var(--se-space-12) var(--g-spacing-6) var(--g-spacing-6)',
        }}
      >
        <h1 style={{ margin: 0 }}>{t('title')}</h1>
        <p
          style={{
            margin: 0,
            color: 'var(--g-color-text-secondary)',
            fontSize: 'var(--se-font-size-sm)',
          }}
        >
          {t('subtitle')}
        </p>

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
