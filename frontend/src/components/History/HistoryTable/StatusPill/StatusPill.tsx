'use client';

import { CircleExclamation } from '@gravity-ui/icons';
import { getStatusColor, getStatusBg } from '@/lib/colors';
import styles from './StatusPill.module.css';

type StatusPillProps = {
  status: number;
};

export default function StatusPill({ status }: StatusPillProps) {
  const color = getStatusColor(status);
  const bg = getStatusBg(status);
  const isError = status >= 400;

  return (
    <span className={styles.pill} style={{ color, background: bg, borderColor: color }}>
      {isError && <CircleExclamation width={14} height={14} />}
      {status}
    </span>
  );
}
