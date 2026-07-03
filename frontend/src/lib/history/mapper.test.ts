import { describe, it, expect } from 'vitest';
import { toHistoryEntry } from '.';
import type { RequestLogRow } from '@/lib/supabase/types';

const baseRow: RequestLogRow = {
  id: 'abc-123',
  user_id: 'user-1',
  method: 'POST',
  url: 'https://api.example.com/data',
  endpoint: '/data',
  status: 201,
  duration: 450,
  request_size: 128,
  response_size: 1024,
  error: null,
  timestamp: '2025-06-15T10:30:00Z',
};

describe('toHistoryEntry', () => {
  it('maps DB row to HistoryEntry', () => {
    const entry = toHistoryEntry(baseRow);

    expect(entry).toEqual({
      id: 'abc-123',
      method: 'POST',
      url: 'https://api.example.com/data',
      responseStatus: 201,
      duration: 450,
      requestSize: 128,
      responseSize: 1024,
      error: null,
      timestamp: Date.parse('2025-06-15T10:30:00Z'),
    });
  });

  it('maps error string when present', () => {
    const row: RequestLogRow = { ...baseRow, error: 'Timeout' };

    const entry = toHistoryEntry(row);

    expect(entry.error).toBe('Timeout');
  });

  it('parses timestamp string to number', () => {
    const row: RequestLogRow = { ...baseRow, timestamp: '2025-01-01T00:00:00Z' };

    const entry = toHistoryEntry(row);

    expect(entry.timestamp).toBe(Date.parse('2025-01-01T00:00:00Z'));
  });

  it('handles GET method', () => {
    const row: RequestLogRow = { ...baseRow, method: 'GET' };

    const entry = toHistoryEntry(row);

    expect(entry.method).toBe('GET');
  });

  it('handles zero duration', () => {
    const row: RequestLogRow = { ...baseRow, duration: 0 };

    const entry = toHistoryEntry(row);

    expect(entry.duration).toBe(0);
  });
});
