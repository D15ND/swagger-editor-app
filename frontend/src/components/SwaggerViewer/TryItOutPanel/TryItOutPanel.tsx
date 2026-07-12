'use client';

import { useMemo, useState } from 'react';
import { Button, Text } from '@gravity-ui/uikit';
import { useT } from 'next-i18next/client';
import { useAuth } from '@/contexts/AuthContext';
import { useNotify } from '@/hooks/useNotify';
import { extractPath } from '@/lib/history';
import type { HttpMethod } from '@/lib/types';
import type { SwaggerEndpoint } from '../types';
import LiveResponse from './LiveResponse';
import styles from './TryItOutPanel.module.css';
import type { ProxyResponse, RequestState } from './types';

type TryItOutPanelProps = {
  endpoint: SwaggerEndpoint;
  baseUrl: string;
};

function joinUrl(baseUrl: string, path: string) {
  const trimmedBase = baseUrl.replace(/\/+$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${trimmedBase}${normalizedPath}`;
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
  const { user } = useAuth();
  const { success: notifySuccess, error: notifyError } = useNotify();
  async function logToHistory(duration: number, req: RequestState, res: ProxyResponse) {
    const requestSize = new Blob([JSON.stringify(req)]).size;
    const responseSize = res.body ? new Blob([res.body]).size : 0;
    const endpoint = extractPath(req.url);

    try {
      const historyRes = await fetch('/api/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: req.method,
          url: req.url,
          endpoint,
          status: res.status,
          duration,
          request_size: requestSize,
          response_size: responseSize,
          error: res.error,
        }),
      });

      if (historyRes.ok) {
        notifySuccess(t('tryItOut.historySaved'));
      } else {
        notifyError(t('tryItOut.historySaveFailed'));
      }
    } catch {
      notifyError(t('tryItOut.historySaveFailed'));
    }
  }

  async function handleSend() {
    const nextRequest: RequestState = {
      method,
      url: resolveRequestUrl(url),
      headers: normalizeHeaders(headers),
      body: canSendBody && body.trim() ? body : null,
    };

    setRequest(nextRequest);
    setResponse(null);
    setIsLoading(true);

    const startTime = performance.now();

    try {
      const proxyResponse = await fetch('/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nextRequest),
      });
      const duration = performance.now() - startTime;
      const data = (await proxyResponse.json()) as ProxyResponse | { error: string };

      const parsedResponse: ProxyResponse =
        'status' in data ? data : { status: 0, headers: {}, body: null, error: data.error };

      setResponse(parsedResponse);
      if (user) {
        logToHistory(Math.round(duration), nextRequest, parsedResponse);
      }
    } catch (error) {
      const duration = performance.now() - startTime;
      const errorResponse: ProxyResponse = {
        status: 0,
        headers: {},
        body: null,
        error: error instanceof Error ? error.message : t('tryItOut.requestFailed'),
      };

      setResponse(errorResponse);
      if (user) {
        logToHistory(Math.round(duration), nextRequest, errorResponse);
      }
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
