import type { HttpMethod } from '@/lib/types';
import type { HistoryEntry } from './types';
import type { LogRow } from '@/lib/supabase/types';

export function toHistoryEntry(row: LogRow): HistoryEntry {
  return {
    id: row.id,
    method: row.method as HttpMethod,
    url: row.url,
    responseStatus: row.status,
    duration: row.duration,
    requestSize: row.request_size,
    responseSize: row.response_size,
    error: row.error,
    timestamp: Date.parse(row.timestamp),
  };
}
