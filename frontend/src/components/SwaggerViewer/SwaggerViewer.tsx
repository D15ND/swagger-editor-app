'use client';

import { useT } from 'next-i18next/client';

import { EndpointCard } from './EndpointCard';
import type { OpenApiDocument } from './types';
import { getBaseUrl, getDocumentTitle, getDocumentVersion, getEndpoints } from './utils';
import styles from './SwaggerViewer.module.css';
import { Text } from '@gravity-ui/uikit';

type SwaggerViewerProps = {
  document: OpenApiDocument | null;
};

export function SwaggerViewer({ document }: SwaggerViewerProps) {
  const { t } = useT('swaggerViewer');

  if (!document) {
    return (
      <section className={styles.empty}>
        <Text as="h2" variant="header-1">
          {t('title')}
        </Text>
        <Text as="p" variant="body-1">
          {t('empty.description')}
        </Text>
      </section>
    );
  }

  const endpoints = getEndpoints(document);
  const baseUrl = getBaseUrl(document);

  return (
    <section className={styles.viewer}>
      <div className={styles.apiCard}>
        <div className={styles.apiHeader}>
          <Text as="h2" variant="header-1">
            {getDocumentTitle(document)}
          </Text>
          <span>{getDocumentVersion(document)}</span>
        </div>

        {document.info?.description && (
          <Text as="p" variant="body-1">
            {document.info.description}
          </Text>
        )}

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
