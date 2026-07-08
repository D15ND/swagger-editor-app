import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];
const TIMEOUT_MS = 30_000;
const MAX_BODY_BYTES = 10 * 1024 * 1024;

type ProxyRequest = {
  method: string;
  url: string;
  headers?: Record<string, string>;
  body?: string | null;
};

type ProxyResponse = {
  status: number;
  headers: Record<string, string>;
  body: string | null;
  error: string | null;
};

export async function POST(request: NextRequest) {
  let params: ProxyRequest;
  try {
    params = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { method, url, headers: reqHeaders = {}, body } = params;

  if (typeof url !== 'string' || (!url.startsWith('http://') && !url.startsWith('https://'))) {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  const normalizedMethod = method?.toUpperCase();
  if (!normalizedMethod || !ALLOWED_METHODS.includes(normalizedMethod)) {
    return NextResponse.json({ error: `Invalid method: ${method}` }, { status: 400 });
  }

  const bodyToSend =
    normalizedMethod === 'GET' || normalizedMethod === 'HEAD' ? undefined : (body ?? undefined);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: normalizedMethod,
      headers: reqHeaders,
      body: bodyToSend,
      signal: controller.signal,
    });

    const contentLength = response.headers.get('content-length');
    if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
      return NextResponse.json({
        status: 0,
        headers: {},
        body: null,
        error: 'Response too large',
      } satisfies ProxyResponse);
    }

    const responseBody = await response.text();
    if (responseBody.length > MAX_BODY_BYTES) {
      return NextResponse.json({
        status: 0,
        headers: {},
        body: null,
        error: 'Response too large',
      } satisfies ProxyResponse);
    }

    const responseHeaders = Object.fromEntries(response.headers);

    const result: ProxyResponse = {
      status: response.status,
      headers: responseHeaders,
      body: responseBody,
      error: null,
    };

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    const result: ProxyResponse = {
      status: 0,
      headers: {},
      body: null,
      error: message,
    };
    return NextResponse.json(result);
  } finally {
    clearTimeout(timeout);
  }
}
