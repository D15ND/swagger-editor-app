'use client';

import { useState } from 'react';
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
    <article className={`${styles.card} ${styles[endpoint.method]}`}>
      <button className={styles.header} type="button" onClick={() => setIsOpen((value) => !value)}>
        <span className={styles.method}>{getMethodLabel(endpoint.method)}</span>
        <span className={styles.path}>{endpoint.path}</span>
        <span className={styles.summary}>{endpoint.summary || t('endpoint.noSummary')}</span>
        <span className={styles.chevron}>{isOpen ? '−' : '+'}</span>
      </button>

      {isOpen && <EndpointDetails endpoint={endpoint} baseUrl={baseUrl} />}
    </article>
  );
}
