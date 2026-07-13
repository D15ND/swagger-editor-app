'use client';

import { useState } from 'react';
import { Button, Card, Text } from '@gravity-ui/uikit';
import { useT } from 'next-i18next/client';

import { EndpointDetails } from '../EndpointDetails';
import type { SwaggerEndpoint } from '../types';
import { getMethodLabel } from '../utils';
import styles from './EndpointCard.module.css';

type EndpointCardProps = {
  endpoint: SwaggerEndpoint;
  baseUrl: string;
};

export function EndpointCard({ endpoint, baseUrl }: EndpointCardProps) {
  const { t } = useT('swaggerViewer');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card view="outlined" size="l" className={`${styles.card} ${styles[endpoint.method]}`}>
      <Button
        view="flat"
        size="xl"
        width="max"
        className={styles.header}
        onClick={() => setIsOpen((value) => !value)}
      >
        <span className={styles.method}>{getMethodLabel(endpoint.method)}</span>

        <Text as="span" variant="body-2" className={styles.path}>
          {endpoint.path}
        </Text>

        <Text as="span" variant="body-1" className={styles.summary}>
          {endpoint.summary || t('endpoint.noSummary')}
        </Text>

        <span className={styles.chevron}>{isOpen ? '-' : '+'}</span>
      </Button>

      {isOpen && <EndpointDetails endpoint={endpoint} baseUrl={baseUrl} />}
    </Card>
  );
}
