type RelativeTimeUnit = 'second' | 'minute' | 'hour' | 'day';

export function getRelativeTimeOptions(ts: number): { value: number; unit: RelativeTimeUnit } {
  const diff = Date.now() - ts;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return { value: -seconds, unit: 'second' };
  if (minutes < 60) return { value: -minutes, unit: 'minute' };
  if (hours < 24) return { value: -hours, unit: 'hour' };
  return { value: -days, unit: 'day' };
}

type BytesUnit = 'byte' | 'kilobyte' | 'megabyte';

export function getBytesOptions(bytes: number): { value: number; unit: BytesUnit } {
  if (bytes < 1024) return { value: bytes, unit: 'byte' };
  if (bytes < 1024 * 1024) return { value: +(bytes / 1024).toFixed(1), unit: 'kilobyte' };
  return { value: +(bytes / (1024 * 1024)).toFixed(1), unit: 'megabyte' };
}

type DurationUnit = 'millisecond' | 'second';

export function getDurationOptions(ms: number): { value: number; unit: DurationUnit } {
  if (ms < 1000) return { value: ms, unit: 'millisecond' };
  return { value: +(ms / 1000).toFixed(2), unit: 'second' };
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

export function extractPath(url: string): string {
  try {
    return new URL(url).pathname;
  } catch {
    return url;
  }
}
