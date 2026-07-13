'use client';

import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from '@gravity-ui/icons';
import { Button } from '@gravity-ui/uikit';

import styles from './GoBackButton.module.css';

type GoBackButtonProps = {
  children: ReactNode;
};

export function GoBackButton({ children }: GoBackButtonProps) {
  const router = useRouter();
  const handleGoBack = () => router.back();

  return (
    <Button view="outlined" size="xl" onClick={handleGoBack}>
      <span className={styles.buttonContent}>
        <ArrowLeft className={styles.smallIcon} />
        {children}
      </span>
    </Button>
  );
}
