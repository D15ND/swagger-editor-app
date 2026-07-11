'use client';

import { useT } from 'next-i18next/client';

import { EndpointCard } from './EndpointCard';
import type { OpenApiDocument } from './types';
import { getBaseUrl, getDocumentTitle, getDocumentVersion, getEndpoints } from './utils';
import styles from './SwaggerViewer.module.css';

type SwaggerViewerProps = {
  document: OpenApiDocument | null;
};

export function SwaggerViewer({ document }: SwaggerViewerProps) {
  const { t } = useT('swaggerViewer');

  if (!document) {
    return (
      <section className={styles.empty}>
        <h2>{t('title')}</h2>
        <p>{t('empty.description')}</p>
      </section>
    );
  }

  const endpoints = getEndpoints(document);
  const baseUrl = getBaseUrl(document);

  return (
    <section className={styles.viewer}>
      <div className={styles.apiCard}>
        <div className={styles.apiHeader}>
          <h2>{getDocumentTitle(document)}</h2>
          <span>{getDocumentVersion(document)}</span>
        </div>

        {document.info?.description && <p>{document.info.description}</p>}

        <div className={styles.baseUrl}>
          <strong>{t('api.baseUrl')}</strong>
          <code>{baseUrl}</code>
        </div>
      </div>

      <div className={styles.endpointList}>
        {endpoints.length > 0 ? (
          endpoints.map((endpoint) => (
            <EndpointCard endpoint={endpoint} baseUrl={baseUrl} key={endpoint.id} />
          ))
        ) : (
          <p className={styles.noEndpoints}>{t('api.noEndpoints')}</p>
        )}
      </div>
    </section>
  );
}
