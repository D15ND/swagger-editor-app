import type { HistoryCreate } from '@/lib/types';

export function validateCreate(body: HistoryCreate): string | null {
  if (!body.method) return 'method is required';
  if (!body.url) return 'url is required';
  if (typeof body.status !== 'number') return 'status must be a number';
  return null;
}
