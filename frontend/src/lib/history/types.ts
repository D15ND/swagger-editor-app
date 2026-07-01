import type { HttpMethod } from '@/lib/types';

export type HistoryEntry = {
  id: string;
  method: HttpMethod;
  url: string;
  requestBody: string | null;
  requestHeaders: Record<string, string>;
  responseStatus: number;
  responseBody: string | null;
  responseHeaders: Record<string, string>;
  duration: number;
  requestSize: number;
  responseSize: number;
  error: string | null;
  timestamp: number;
};
