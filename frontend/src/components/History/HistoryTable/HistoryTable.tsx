'use client';

import { Table, Text } from '@gravity-ui/uikit';
import { Clock } from '@gravity-ui/icons';
import type { TableColumnConfig } from '@gravity-ui/uikit';
import type { HistoryEntry } from '@/lib/history';
import {
  getRelativeTimeOptions,
  formatBytes,
  formatDuration,
  extractPath,
} from '@/lib/history';
import EmptyState from '@/components/History/EmptyState';
import MethodBadge from './MethodBadge';
import StatusPill from './StatusPill';
import styles from './HistoryTable.module.css';

type Labels = {
  method: string;
  endpoint: string;
  status: string;
  duration: string;
  requestSize: string;
  responseSize: string;
  time: string;
  error: string;
};

type HistoryTableProps = {
  entries: HistoryEntry[];
  lng: string;
  labels: Labels;
};

export default function HistoryTable({ entries, lng, labels }: HistoryTableProps) {
  const rtf = new Intl.RelativeTimeFormat(lng, { numeric: 'auto' });

  const columns: TableColumnConfig<HistoryEntry>[] = [
    {
      id: 'method',
      name: labels.method,
      width: 90,
      template: (item) => <MethodBadge method={item.method} />,
    },
    {
      id: 'endpoint',
      name: labels.endpoint,
      template: (item) => (
        <div className={styles.endpointCell}>
          <Text className={styles.path} as="span" color="primary">
            {extractPath(item.url)}
          </Text>
        </div>
      ),
    },
    {
      id: 'status',
      name: labels.status,
      width: 100,
      template: (item) => <StatusPill status={item.responseStatus} />,
    },
    {
      id: 'duration',
      name: labels.duration,
      width: 100,
      template: (item) => (
        <Text className={styles.mono} as="span" color="secondary">
          {formatDuration(item.duration)}
        </Text>
      ),
    },
    {
      id: 'requestSize',
      name: labels.requestSize,
      width: 100,
      template: (item) => (
        <Text className={styles.mono} as="span" color="secondary">
          {formatBytes(item.requestSize)}
        </Text>
      ),
    },
    {
      id: 'responseSize',
      name: labels.responseSize,
      width: 100,
      template: (item) => (
        <Text className={styles.mono} as="span" color="secondary">
          {formatBytes(item.responseSize)}
        </Text>
      ),
    },
    {
      id: 'time',
      name: labels.time,
      width: 160,
      template: (item) => {
        const opts = getRelativeTimeOptions(item.timestamp);
        return (
          <Text as="div" className={styles.timeCell} color="secondary">
            <Clock width={14} height={14} />
            <span suppressHydrationWarning>{rtf.format(opts.value, opts.unit)}</span>
          </Text>
        );
      },
    },
    {
      id: 'error',
      name: labels.error,
      width: 160,
      template: (item) => {
        if (!item.error) return <Text color="secondary">&mdash;</Text>;
        return <Text color="danger">{item.error}</Text>;
      },
    },
  ];

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
