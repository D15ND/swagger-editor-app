import { describe, it, expect } from 'vitest';
import { buildRequest } from './buildRequest';

describe('buildRequest', () => {
  it('replaces path params in URL template', () => {
    const { url } = buildRequest('/pet/{petId}', [{ name: 'petId', in: 'path' }], { petId: '42' });
    expect(url).toBe('/pet/42');
  });

  it('throws for missing required param', () => {
    expect(() =>
      buildRequest('/pet/{petId}', [{ name: 'petId', in: 'path', required: true }], {}),
    ).toThrow('Missing required parameter: petId');
  });

  it('skips missing optional param', () => {
    const { url } = buildRequest('/pet/{petId}', [{ name: 'petId', in: 'path' }], {});
    expect(url).toBe('/pet/{petId}');
  });

  it('appends query params', () => {
    const { url } = buildRequest('/pet/findByStatus', [{ name: 'status', in: 'query' }], {
      status: 'available',
    });
    expect(url).toBe('/pet/findByStatus?status=available');
  });

  it('appends multiple query params', () => {
    const { url } = buildRequest(
      '/pet/findByStatus',
      [
        { name: 'status', in: 'query' },
        { name: 'limit', in: 'query' },
      ],
      { status: 'available', limit: '10' },
    );
    expect(url).toBe('/pet/findByStatus?status=available&limit=10');
  });

  it('appends to existing query string', () => {
    const { url } = buildRequest('/pet?foo=1', [{ name: 'bar', in: 'query' }], { bar: '2' });
    expect(url).toBe('/pet?foo=1&bar=2');
  });

  it('adds header params', () => {
    const { headers } = buildRequest('/pet/42', [{ name: 'X-API-Key', in: 'header' }], {
      'X-API-Key': 'secret',
    });
    expect(headers['X-API-Key']).toBe('secret');
  });

  it('merges with existing headers', () => {
    const { headers } = buildRequest(
      '/pet/42',
      [{ name: 'Authorization', in: 'header' }],
      { Authorization: 'Bearer token' },
      { 'Content-Type': 'application/json' },
    );
    expect(headers).toEqual({
      'Content-Type': 'application/json',
      Authorization: 'Bearer token',
    });
  });

  it('adds cookie params', () => {
    const { headers } = buildRequest('/pet/42', [{ name: 'session', in: 'cookie' }], {
      session: 'abc123',
    });
    expect(headers['Cookie']).toBe('session=abc123');
  });

  it('appends to existing cookie header', () => {
    const { headers } = buildRequest(
      '/pet/42',
      [{ name: 'csrf', in: 'cookie' }],
      { csrf: 'xyz' },
      { Cookie: 'session=abc' },
    );
    expect(headers['Cookie']).toBe('session=abc; csrf=xyz');
  });

  it('handles mixed param locations', () => {
    const result = buildRequest(
      '/store/order/{orderId}',
      [
        { name: 'orderId', in: 'path' },
        { name: 'fields', in: 'query' },
        { name: 'X-Idempotency-Key', in: 'header' },
      ],
      { orderId: '123', fields: 'id,status', 'X-Idempotency-Key': 'abc-def' },
    );
    expect(result.url).toBe('/store/order/123?fields=id%2Cstatus');
    expect(result.headers['X-Idempotency-Key']).toBe('abc-def');
  });
});
