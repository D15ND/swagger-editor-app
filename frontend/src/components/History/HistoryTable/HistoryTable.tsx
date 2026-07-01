'use client';

import { useMemo } from 'react';
import { Table, Text } from '@gravity-ui/uikit';
import { useT } from 'next-i18next/client';
import { Clock } from '@gravity-ui/icons';
import type { TableColumnConfig } from '@gravity-ui/uikit';
import type { HistoryEntry } from '@/lib/history';
import { formatBytes, formatDuration, formatRelativeTime, extractPath } from '@/lib/history';
import EmptyState from '@/components/History/EmptyState';
import MethodBadge from './MethodBadge';
import StatusPill from './StatusPill';
import styles from './HistoryTable.module.css';

type HistoryTableProps = {
  entries: HistoryEntry[];
};

export default function HistoryTable({ entries }: HistoryTableProps) {
  const { t } = useT('common');

  const columns = useMemo<TableColumnConfig<HistoryEntry>[]>(
    () => [
      {
        id: 'method',
        name: t('history.analytics.method'),
        width: 90,
        template: (item) => <MethodBadge method={item.method} />,
      },
      {
        id: 'endpoint',
        name: t('history.analytics.endpoint'),
        template: (item) => (
          <div className={styles.endpointCell}>
            <Text className={styles.path} as="span" color="primary">
              {extractPath(item.url)}
            </Text>
          </div>
        ),
      },
      {
        id: 'url',
        name: t('history.analytics.url'),
        width: 200,
        template: (item) => (
          <Text className={styles.path} as="span" color="secondary">
            {item.url}
          </Text>
        ),
      },
      {
        id: 'status',
        name: t('history.analytics.status'),
        width: 100,
        template: (item) => <StatusPill status={item.responseStatus} />,
      },
      {
        id: 'duration',
        name: t('history.analytics.duration'),
        width: 100,
        template: (item) => (
          <Text className={styles.mono} as="span" color="secondary">
            {formatDuration(item.duration)}
          </Text>
        ),
      },
      {
        id: 'size',
        name: t('history.analytics.size'),
        width: 100,
        template: (item) => (
          <Text className={styles.mono} as="span" color="secondary">
            {formatBytes(item.responseSize)}
          </Text>
        ),
      },
      {
        id: 'time',
        name: t('history.analytics.time'),
        width: 160,
        template: (item) => (
          <Text as="div" className={styles.timeCell} color="secondary">
            <Clock width={14} height={14} />
            <span suppressHydrationWarning>{formatRelativeTime(item.timestamp)}</span>
          </Text>
        ),
      },
      {
        id: 'error',
        name: t('history.analytics.error'),
        width: 160,
        template: (item) => {
          if (!item.error) return <Text color="secondary">—</Text>;
          return <Text color="danger">{item.error}</Text>;
        },
      },
    ],
    [t],
  );

  if (entries.length === 0) return <EmptyState />;

  return (
    <div className={styles.card}>
      <Table
        data={entries}
        columns={columns}
        verticalAlign="middle"
        edgePadding
        stickyHorizontalScroll
        getRowDescriptor={(item) => ({ id: item.id })}
      />
    </div>
  );
}
