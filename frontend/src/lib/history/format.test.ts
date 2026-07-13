import { describe, it, expect } from 'vitest';
import {
  formatBytes,
  formatDuration,
  getRelativeTimeOptions,
  getBytesOptions,
  getDurationOptions,
  extractPath,
} from '.';

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
    const ts = Date.now() - 30_000;

    const { value, unit } = getRelativeTimeOptions(ts);

    expect(unit).toBe('second');
    expect(value).toBe(-30);
  });

  it('returns minutes for diff < 60m', () => {
    const ts = Date.now() - 120_000;

    const { value, unit } = getRelativeTimeOptions(ts);

    expect(unit).toBe('minute');
    expect(value).toBe(-2);
  });

  it('returns hours for diff < 24h', () => {
    const ts = Date.now() - 3_600_000 * 5;

    const { value, unit } = getRelativeTimeOptions(ts);

    expect(unit).toBe('hour');
    expect(value).toBe(-5);
  });

  it('returns days for diff >= 24h', () => {
    const ts = Date.now() - 86_400_000 * 3;

    const { value, unit } = getRelativeTimeOptions(ts);

    expect(unit).toBe('day');
    expect(value).toBe(-3);
  });
});

describe('getBytesOptions', () => {
  it('returns bytes for < 1024', () => {
    const result = getBytesOptions(500);

    expect(result).toEqual({ value: 500, unit: 'byte' });
  });

  it('returns kilobytes for < 1MB', () => {
    const result = getBytesOptions(2048);

    expect(result).toEqual({ value: 2.0, unit: 'kilobyte' });
  });

  it('returns megabytes for >= 1MB', () => {
    const result = getBytesOptions(1_048_576);

    expect(result).toEqual({ value: 1.0, unit: 'megabyte' });
  });
});

describe('getDurationOptions', () => {
  it('returns milliseconds for < 1000ms', () => {
    const result = getDurationOptions(500);

    expect(result).toEqual({ value: 500, unit: 'millisecond' });
  });

  it('returns seconds for >= 1000ms', () => {
    const result = getDurationOptions(2500);

    expect(result).toEqual({ value: 2.5, unit: 'second' });
  });
});

describe('extractPath', () => {
  it('extracts pathname from URL', () => {
    const result = extractPath('https://api.example.com/data/123');

    expect(result).toBe('/data/123');
  });

  it('returns input when URL is invalid', () => {
    const result = extractPath('not-a-url');

    expect(result).toBe('not-a-url');
  });
});
