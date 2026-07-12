'use client';

import { useMemo, useState } from 'react';
import { Button, Text } from '@gravity-ui/uikit';
import { useT } from 'next-i18next/client';
import type { HttpMethod } from '@/lib/types';
import type { SwaggerEndpoint } from '../types';
import LiveResponse from './LiveResponse';
import styles from './TryItOutPanel.module.css';
import type { ProxyResponse, RequestState } from './types';
import { buildRequest, type ParameterDef } from '@/lib/build-request';

type TryItOutPanelProps = {
  endpoint: SwaggerEndpoint;
  baseUrl: string;
};

function joinUrl(baseUrl: string, path: string) {
  const trimmedBase = baseUrl.replace(/\/+$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${trimmedBase}${normalizedPath}`;
}

function getParameterDefs(endpoint: SwaggerEndpoint): ParameterDef[] {
  return endpoint.parameters
    .filter((parameter): parameter is Required<Pick<ParameterDef, 'name' | 'in'>> & ParameterDef =>
      Boolean(parameter.name && parameter.in),
    )
    .map((parameter) => ({
      name: parameter.name,
      in: parameter.in,
      required: parameter.required,
    }));
}

function resolveRequestUrl(value: string) {
  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value;
  }

  return new URL(value, window.location.origin).toString();
}

function getInitialBody(endpoint: SwaggerEndpoint): string {
  const jsonMediaType = endpoint.requestBody?.content?.['application/json'];

  if (jsonMediaType?.example !== undefined) {
    return JSON.stringify(jsonMediaType.example, null, 2);
  }

  const firstExample = Object.values(jsonMediaType?.examples ?? {})[0]?.value;

  if (firstExample !== undefined) {
    return JSON.stringify(firstExample, null, 2);
  }

  return '';
}

function normalizeHeaders(value: string): Record<string, string> {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .reduce<Record<string, string>>((headers, line) => {
      const separatorIndex = line.indexOf(':');

      if (separatorIndex === -1) {
        return headers;
      }

      const key = line.slice(0, separatorIndex).trim();
      const headerValue = line.slice(separatorIndex + 1).trim();

      if (key) {
        headers[key] = headerValue;
      }

      return headers;
    }, {});
}

export default function TryItOutPanel({ endpoint, baseUrl }: TryItOutPanelProps) {
  const method = endpoint.method.toUpperCase() as HttpMethod;
  const initialUrl = useMemo(() => joinUrl(baseUrl, endpoint.path), [baseUrl, endpoint.path]);
  const [url, setUrl] = useState(initialUrl);
  const [headers, setHeaders] = useState('Accept: application/json');
  const [body, setBody] = useState(() => getInitialBody(endpoint));
  const [request, setRequest] = useState<RequestState | null>(null);
  const [response, setResponse] = useState<ProxyResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const canSendBody = method !== 'GET' && method !== 'HEAD';
  const { t } = useT('swaggerViewer');

  const parameterDefs = useMemo(() => getParameterDefs(endpoint), [endpoint]);
  const [parameterValues, setParameterValues] = useState<Record<string, string>>({});

  function handleParameterChange(name: string, value: string) {
    setParameterValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  async function handleSend() {
    const builtRequest = buildRequest(
      url,
      parameterDefs,
      parameterValues,
      normalizeHeaders(headers),
    );

    const nextRequest: RequestState = {
      method,
      url: resolveRequestUrl(builtRequest.url),
      headers: builtRequest.headers,
      body: canSendBody && body.trim() ? body : null,
    };

    setRequest(nextRequest);
    setResponse(null);
    setIsLoading(true);

    try {
      const proxyResponse = await fetch('/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nextRequest),
      });
      const data = (await proxyResponse.json()) as ProxyResponse | { error: string };

      if ('status' in data) {
        setResponse(data);
      } else {
        setResponse({
          status: 0,
          headers: {},
          body: null,
          error: data.error,
        });
      }
    } catch (error) {
      setResponse({
        status: 0,
        headers: {},
        body: null,
        error: error instanceof Error ? error.message : t('tryItOut.requestFailed'),
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className={styles.panel}>
      <div className={styles.header}>
        <Text as="h3" variant="header-1">
          {t('tryItOut.title')}
        </Text>

        <Button view="action" size="m" loading={isLoading} onClick={handleSend}>
          {t('tryItOut.send')}
        </Button>
      </div>

      <label className={styles.field}>
        <span>{t('tryItOut.requestUrl')}</span>
        <input value={url} onChange={(event) => setUrl(event.target.value)} />
      </label>

      {endpoint.parameters.length > 0 && (
        <div className={styles.parameters}>
          <Text as="h4" variant="subheader-1">
            {t('parameters.title')}
          </Text>

          {endpoint.parameters
            .filter((parameter) => parameter.name && parameter.in)
            .map((parameter) => (
              <label className={styles.field} key={`${parameter.in}-${parameter.name}`}>
                <span>
                  {parameter.name} ({t(`parameters.${parameter.in}`)})
                  {parameter.required ? ' *' : ''}
                </span>

                <input
                  value={parameterValues[parameter.name as string] ?? ''}
                  placeholder={parameter.description || String(parameter.example ?? '')}
                  onChange={(event) =>
                    handleParameterChange(parameter.name as string, event.target.value)
                  }
                />
              </label>
            ))}
        </div>
      )}

      <label className={styles.field}>
        <span>{t('tryItOut.headers')}</span>
        <textarea
          rows={3}
          value={headers}
          spellCheck={false}
          onChange={(event) => setHeaders(event.target.value)}
        />
      </label>

      {canSendBody && (
        <label className={styles.field}>
          <span>{t('tryItOut.body')}</span>
          <textarea
            rows={6}
            value={body}
            spellCheck={false}
            onChange={(event) => setBody(event.target.value)}
          />
        </label>
      )}

      {request && response && <LiveResponse request={request} response={response} />}
    </section>
  );
}
