'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@gravity-ui/uikit';
import styles from './HistoryActions.module.css';

type Props = {
  clearAllLabel: string;
};

export default function HistoryActions({ clearAllLabel }: Props) {
  const router = useRouter();

  const handleClear = useCallback(async () => {
    try {
      const res = await fetch('/api/history', { method: 'DELETE' });
      if (res.ok) router.refresh();
    } catch (err) {
      console.error('Clear history failed:', err);
    }
  }, [router]);

  return (
    <Button view="flat-danger" size="m" onClick={handleClear} className={styles.clearButton}>
      {clearAllLabel}
    </Button>
  );
}
