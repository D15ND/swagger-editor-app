import type { HttpMethod } from '@/lib/types';

export type HistoryEntry = {
  id: string;
  method: HttpMethod;
  url: string;
  responseStatus: number;
  duration: number;
  requestSize: number;
  responseSize: number;
  error: string | null;
  timestamp: number;
};
