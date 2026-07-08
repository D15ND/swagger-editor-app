'use client';

import type { ReactNode } from 'react';
import { ArrowLeft } from '@gravity-ui/icons';
import { Button } from '@gravity-ui/uikit';

import styles from './not-found.module.css';

type GoBackButtonProps = {
  children: ReactNode;
};

export function GoBackButton({ children }: GoBackButtonProps) {
  function handleGoBack() {
    window.history.back();
  }

  return (
    <Button view="outlined" size="xl" onClick={handleGoBack}>
      <span className={styles.buttonContent}>
        <ArrowLeft className={styles.smallIcon} />
        {children}
      </span>
    </Button>
  );
}
