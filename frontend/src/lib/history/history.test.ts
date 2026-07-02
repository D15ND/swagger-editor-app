import { describe, it, expect } from 'vitest';
import { formatBytes, formatDuration, toHistoryEntry } from '.';
import type { RequestLogRow } from '@/lib/supabase/types';

describe('formatBytes', () => {
  it('formats bytes', () => {
    expect(formatBytes(0)).toBe('0 B');
    expect(formatBytes(500)).toBe('500 B');
    expect(formatBytes(1024)).toBe('1.0 KB');
    expect(formatBytes(1536)).toBe('1.5 KB');
    expect(formatBytes(1048576)).toBe('1.0 MB');
  });
});

describe('formatDuration', () => {
  it('formats duration', () => {
    expect(formatDuration(0)).toBe('0ms');
    expect(formatDuration(500)).toBe('500ms');
    expect(formatDuration(1500)).toBe('1.50s');
    expect(formatDuration(3200)).toBe('3.20s');
  });
});

describe('toHistoryEntry', () => {
  const row: RequestLogRow = {
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

  it('maps DB row to HistoryEntry', () => {
    const entry = toHistoryEntry(row);

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
});
