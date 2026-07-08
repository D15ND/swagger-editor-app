import { EndpointCard } from './EndpointCard';
import type { OpenApiDocument } from './types';
import { getBaseUrl, getDocumentTitle, getDocumentVersion, getEndpoints } from './utils';
import styles from './SwaggerViewer.module.css';

type SwaggerViewerProps = {
  document: OpenApiDocument | null;
};

export function SwaggerViewer({ document }: SwaggerViewerProps) {
  if (!document) {
    return (
      <section className={styles.empty}>
        <h2>Swagger Viewer</h2>
        <p>Load a valid OpenAPI or Swagger schema to view endpoints.</p>
      </section>
    );
  }

  const endpoints = getEndpoints(document);

  return (
    <section className={styles.viewer}>
      <div className={styles.apiCard}>
        <div className={styles.apiHeader}>
          <h2>{getDocumentTitle(document)}</h2>
          <span>{getDocumentVersion(document)}</span>
        </div>

        {document.info?.description && <p>{document.info.description}</p>}

        <div className={styles.baseUrl}>
          <strong>Base URL</strong>
          <code>{getBaseUrl(document)}</code>
        </div>
      </div>

      <div className={styles.endpointList}>
        {endpoints.length > 0 ? (
          endpoints.map((endpoint) => <EndpointCard endpoint={endpoint} key={endpoint.id} />)
        ) : (
          <p className={styles.noEndpoints}>No endpoints found in schema.</p>
        )}
      </div>
    </section>
  );
}
