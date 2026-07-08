import type { HttpMethod } from '../types';

const DISALLOWED_HEADERS = new Set(['content-length', 'content-type']);

function shellEscape(value: string): string {
  return value.replace(/'/g, "'\\''");
}

export function generateCurlCommand(
  method: HttpMethod,
  url: string,
  headers: Record<string, string>,
  body: string | null,
): string {
  const parts: string[] = ['curl'];

  if (method !== 'GET') {
    parts.push(`-X ${method}`);
  }

  for (const [key, value] of Object.entries(headers)) {
    if (!key) continue;
    if (DISALLOWED_HEADERS.has(key.toLowerCase())) continue;
    parts.push(`-H '${key}: ${shellEscape(value)}'`);
  }

  if (body && method !== 'GET' && method !== 'HEAD') {
    parts.push(`-d '${shellEscape(body)}'`);
  }

  parts.push(`'${shellEscape(url)}'`);

  return parts.join(' \\\n  ');
}
