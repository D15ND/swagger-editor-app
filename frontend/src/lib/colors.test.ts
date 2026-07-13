import { describe, it, expect } from 'vitest';
import { getStatusColor, getStatusBg, getMethodColor, getMethodBg } from './colors';

describe('getStatusColor', () => {
  it('returns correct color for status codes', () => {
    expect(getStatusColor(200)).toBe('var(--se-status-success)');
    expect(getStatusColor(301)).toBe('var(--se-status-info)');
    expect(getStatusColor(404)).toBe('var(--se-status-error)');
    expect(getStatusColor(500)).toBe('var(--se-status-error)');
  });
});

describe('getStatusBg', () => {
  it('returns correct bg for status codes', () => {
    expect(getStatusBg(200)).toBe('var(--se-status-success-bg)');
    expect(getStatusBg(301)).toBe('var(--se-status-info-bg)');
    expect(getStatusBg(404)).toBe('var(--se-status-error-bg)');
    expect(getStatusBg(500)).toBe('var(--se-status-error-bg)');
  });
});

describe('getMethodColor', () => {
  it('returns correct color for methods', () => {
    expect(getMethodColor('GET')).toBe('var(--se-method-get)');
    expect(getMethodColor('POST')).toBe('var(--se-method-post)');
    expect(getMethodColor('DELETE')).toBe('var(--se-method-delete)');
    expect(getMethodColor('UNKNOWN')).toBe('var(--se-method-get)');
  });
});

describe('getMethodBg', () => {
  it('returns correct bg for methods', () => {
    expect(getMethodBg('GET')).toBe('var(--se-method-get-bg)');
    expect(getMethodBg('POST')).toBe('var(--se-method-post-bg)');
    expect(getMethodBg('DELETE')).toBe('var(--se-method-delete-bg)');
    expect(getMethodBg('UNKNOWN')).toBe('var(--se-method-get-bg)');
  });
});
