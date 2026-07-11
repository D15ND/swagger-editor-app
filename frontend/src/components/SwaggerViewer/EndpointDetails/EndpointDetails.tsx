'use client';

import { useT } from 'next-i18next/client';
import { SchemaBlock } from '../SchemaBlock';
import TryItOutPanel from '../TryItOutPanel';
import type { OpenApiMediaType, OpenApiParameter, SwaggerEndpoint } from '../types';
import { groupParametersByLocation } from '../utils';
import styles from './EndpointDetails.module.css';
import { Card, Text } from '@gravity-ui/uikit';

type EndpointDetailsProps = {
  endpoint: SwaggerEndpoint;
  baseUrl: string;
};

type Translate = (key: string) => string;

function renderMediaTypeBlocks(
  content: Record<string, OpenApiMediaType> | undefined,
  t: Translate,
) {
  if (!content) {
    return <p className={styles.emptyText}>{t('media.empty')}</p>;
  }

  return Object.entries(content).map(([contentType, mediaType]) => (
    <div className={styles.mediaType} key={contentType}>
      <span className={styles.contentType}>{contentType}</span>
      <SchemaBlock title={t('media.schema')} value={mediaType.schema} />
      <SchemaBlock title={t('media.example')} value={mediaType.example} />
      <SchemaBlock title={t('media.examples')} value={mediaType.examples} />
    </div>
  ));
}

function ParameterTable({ parameters, t }: { parameters: OpenApiParameter[]; t: Translate }) {
  if (parameters.length === 0) {
    return <p className={styles.emptyText}>{t('parameters.empty')}</p>;
  }

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>{t('parameters.name')}</th>
            <th>{t('parameters.required')}</th>
            <th>{t('parameters.schema')}</th>
            <th>{t('parameters.description')}</th>
          </tr>
        </thead>

        <tbody>
          {parameters.map((parameter) => (
            <tr key={`${parameter.in}-${parameter.name}`}>
              <td>{parameter.name || '-'}</td>
              <td>{parameter.required ? t('parameters.yes') : t('parameters.no')}</td>
              <td>
                <code>{parameter.schema ? JSON.stringify(parameter.schema) : '-'}</code>
              </td>
              <td>{parameter.description || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function EndpointDetails({ endpoint, baseUrl }: EndpointDetailsProps) {
  const { t } = useT('swaggerViewer');
  const groupedParameters = groupParametersByLocation(endpoint.parameters);
  const responseEntries = Object.entries(endpoint.responses);

  return (
    <div className={styles.details}>
      {endpoint.description && <p className={styles.description}>{endpoint.description}</p>}

      <section className={styles.section}>
        <Text as="h3" variant="header-1">
          {t('parameters.title')}
        </Text>

        <div className={styles.parameterGroups}>
          {groupedParameters.map(({ location, parameters }) => (
            <div className={styles.parameterGroup} key={location}>
              <Text as="h4" variant="subheader-1" className={styles.locationTitle}>
                {t(`parameters.${location}`)}
              </Text>
              <ParameterTable parameters={parameters} t={t} />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h3>{t('requestBody.title')}</h3>

        {endpoint.requestBody ? (
          <div className={styles.requestBody}>
            {endpoint.requestBody.description && <p>{endpoint.requestBody.description}</p>}
            {endpoint.requestBody.required && (
              <span className={styles.required}>{t('requestBody.required')}</span>
            )}
            {renderMediaTypeBlocks(endpoint.requestBody.content, t)}
          </div>
        ) : (
          <p className={styles.emptyText}>{t('requestBody.empty')}</p>
        )}
      </section>

      <section className={styles.section}>
        <h3>{t('responses.title')}</h3>

        {responseEntries.length > 0 ? (
          <div className={styles.responses}>
            {responseEntries.map(([statusCode, response]) => (
              <Card view="outlined" size="m" className={styles.responseCard} key={statusCode}>
                <div className={styles.responseHeader}>
                  <span className={styles.statusCode}>{statusCode}</span>
                  <Text as="p" variant="body-2">
                    {response.description || t('endpoint.noDescription')}
                  </Text>
                </div>

                {renderMediaTypeBlocks(response.content, t)}
              </Card>
            ))}
          </div>
        ) : (
          <p className={styles.emptyText}>{t('responses.empty')}</p>
        )}
      </section>

      <TryItOutPanel key={`${baseUrl}-${endpoint.id}`} endpoint={endpoint} baseUrl={baseUrl} />
    </div>
  );
}
