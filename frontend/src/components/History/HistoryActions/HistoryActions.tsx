'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useT } from 'next-i18next/client';
import { Button } from '@gravity-ui/uikit';
import { useNotify } from '@/hooks/useNotify';
import styles from './HistoryActions.module.css';

type Props = {
  clearAllLabel: string;
};

export default function HistoryActions({ clearAllLabel }: Props) {
  const router = useRouter();
  const { t } = useT('history');
  const { success, error } = useNotify();

  const handleClear = useCallback(async () => {
    try {
      const res = await fetch('/api/history', { method: 'DELETE' });
      if (res.ok) {
        success(t('clearSuccess'));
        router.refresh();
      } else {
        error(t('clearError'));
      }
    } catch {
      error(t('clearError'));
    }
  }, [router, t, success, error]);

  return (
    <Button view="flat-danger" size="m" onClick={handleClear} className={styles.clearButton}>
      {clearAllLabel}
    </Button>
  );
}
