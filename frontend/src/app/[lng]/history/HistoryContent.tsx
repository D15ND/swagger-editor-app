import { getT } from 'next-i18next/server';
import type { HistoryEntry } from '@/lib/history';
import HistoryTable from '@/components/History/HistoryTable';
import styles from './history.module.css';

type Props = {
  entries: HistoryEntry[];
  lng: string;
};

export default async function HistoryContent({ entries, lng }: Props) {
  const { t } = await getT('history', { lng });
  const labels = {
    method: t('analytics.method'),
    endpoint: t('analytics.endpoint'),
    status: t('analytics.status'),
    duration: t('analytics.duration'),
    requestSize: t('analytics.requestSize'),
    responseSize: t('analytics.responseSize'),
    time: t('analytics.time'),
    error: t('analytics.error'),
  };

  return (
    <main className={styles.page}>
      <div className={styles.main}>
        <h1 className={styles.title}>{t('title')}</h1>
        <HistoryTable entries={entries} lng={lng} labels={labels} />
      </div>
    </main>
  );
}
