import { describe, it, expect } from 'vitest';
import { generateCurlCommand } from './generate-curl';

describe('generateCurlCommand', () => {
  it('returns curl with URL for GET', () => {
    const method = 'GET';
    const url = 'https://api.example.com/users';

    const result = generateCurlCommand(method, url, {}, null);

    expect(result).toBe("curl \\\n  'https://api.example.com/users'");
  });

  it('adds -X for non-GET methods', () => {
    const method = 'POST';
    const url = 'https://api.example.com/users';

    const result = generateCurlCommand(method, url, {}, null);

    expect(result).toContain('-X POST');
  });

  it('includes headers', () => {
    const method = 'GET';
    const url = 'https://api.example.com/users';
    const headers = { Authorization: 'Bearer token' };

    const result = generateCurlCommand(method, url, headers, null);

    expect(result).toContain("-H 'Authorization: Bearer token'");
  });

  it('includes body for POST', () => {
    const method = 'POST';
    const url = 'https://api.example.com/users';
    const headers = {};
    const body = JSON.stringify({ name: 'test' });

    const result = generateCurlCommand(method, url, headers, body);

    expect(result).toContain('-d \'{"name":"test"}\'');
  });

  it('omits body for GET', () => {
    const method = 'GET';
    const url = 'https://api.example.com/users';
    const body = '{"name":"test"}';

    const result = generateCurlCommand(method, url, {}, body);

    expect(result).not.toContain('-d ');
  });

  it('omits body for HEAD', () => {
    const method = 'HEAD';
    const url = 'https://api.example.com/users';
    const body = '{"name":"test"}';

    const result = generateCurlCommand(method, url, {}, body);

    expect(result).not.toContain('-d ');
  });

  it('escapes single quotes in URL', () => {
    const method = 'GET';
    const url = "https://example.com?q=John's";

    const result = generateCurlCommand(method, url, {}, null);

    expect(result).toBe("curl \\\n  'https://example.com?q=John'\\''s'");
  });

  it('escapes single quotes in header values', () => {
    const method = 'GET';
    const url = 'https://api.example.com';
    const headers = { 'X-Custom': "it's" };

    const result = generateCurlCommand(method, url, headers, null);

    expect(result).toContain("-H 'X-Custom: it'\\''s'");
  });

  it('escapes single quotes in body', () => {
    const method = 'POST';
    const url = 'https://api.example.com';
    const headers = {};
    const body = "it's";

    const result = generateCurlCommand(method, url, headers, body);

    expect(result).toContain("-d 'it'\\''s'");
  });

  it('filters out content-length header', () => {
    const method = 'POST';
    const url = 'https://api.example.com';
    const headers = { 'Content-Length': '42', Authorization: 'Bearer x' };
    const body = '{}';

    const result = generateCurlCommand(method, url, headers, body);

    expect(result).not.toContain('Content-Length');
    expect(result).toContain('Authorization: Bearer x');
  });

  it('filters out content-type header', () => {
    const method = 'POST';
    const url = 'https://api.example.com';
    const headers = { 'content-type': 'application/json' };
    const body = '{}';

    const result = generateCurlCommand(method, url, headers, body);

    expect(result).not.toContain('content-type');
  });

  it('skips entries with empty key', () => {
    const method = 'GET';
    const url = 'https://api.example.com';
    const headers = { '': 'value' };

    const result = generateCurlCommand(method, url, headers, null);

    expect(result).not.toContain(': value');
  });

  it('allows empty header values', () => {
    const method = 'GET';
    const url = 'https://api.example.com';
    const headers = { 'X-Empty': '' };

    const result = generateCurlCommand(method, url, headers, null);

    expect(result).toContain("-H 'X-Empty: '");
  });

  it('puts URL last', () => {
    const method = 'POST';
    const url = 'https://api.example.com/users';
    const headers = { Authorization: 'Bearer x' };
    const body = '{}';

    const result = generateCurlCommand(method, url, headers, body);

    const lines = result.split(' \\\n  ');
    expect(lines[lines.length - 1]).toBe("'https://api.example.com/users'");
  });

  it('does not add -X for GET', () => {
    const method = 'GET';
    const url = 'https://api.example.com';

    const result = generateCurlCommand(method, url, {}, null);

    expect(result).not.toContain('-X');
  });
});
