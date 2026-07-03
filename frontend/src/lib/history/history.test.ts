import { describe, it, expect, vi } from 'vitest';
import {
  formatBytes,
  formatDuration,
  getRelativeTimeOptions,
  getBytesOptions,
  getDurationOptions,
  extractPath,
  toHistoryEntry,
} from '.';
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

describe('getRelativeTimeOptions', () => {
  it('returns seconds for diff < 60s', () => {
    const now = Date.now();
    const { value, unit } = getRelativeTimeOptions(now - 30_000);
    expect(unit).toBe('second');
    expect(value).toBe(-30);
  });

  it('returns minutes for diff < 60m', () => {
    const now = Date.now();
    const { value, unit } = getRelativeTimeOptions(now - 120_000);
    expect(unit).toBe('minute');
    expect(value).toBe(-2);
  });

  it('returns hours for diff < 24h', () => {
    const now = Date.now();
    const { value, unit } = getRelativeTimeOptions(now - 3_600_000 * 5);
    expect(unit).toBe('hour');
    expect(value).toBe(-5);
  });

  it('returns days for diff >= 24h', () => {
    const now = Date.now();
    const { value, unit } = getRelativeTimeOptions(now - 86_400_000 * 3);
    expect(unit).toBe('day');
    expect(value).toBe(-3);
  });
});

describe('getBytesOptions', () => {
  it('returns bytes for < 1024', () => {
    expect(getBytesOptions(500)).toEqual({ value: 500, unit: 'byte' });
  });

  it('returns kilobytes for < 1MB', () => {
    expect(getBytesOptions(2048)).toEqual({ value: 2.0, unit: 'kilobyte' });
  });

  it('returns megabytes for >= 1MB', () => {
    expect(getBytesOptions(1_048_576)).toEqual({ value: 1.0, unit: 'megabyte' });
  });
});

describe('getDurationOptions', () => {
  it('returns milliseconds for < 1000ms', () => {
    expect(getDurationOptions(500)).toEqual({ value: 500, unit: 'millisecond' });
  });

  it('returns seconds for >= 1000ms', () => {
    expect(getDurationOptions(2500)).toEqual({ value: 2.5, unit: 'second' });
  });
});

describe('extractPath', () => {
  it('extracts pathname from URL', () => {
    expect(extractPath('https://api.example.com/data/123')).toBe('/data/123');
  });

  it('returns input when URL is invalid', () => {
    expect(extractPath('not-a-url')).toBe('not-a-url');
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
