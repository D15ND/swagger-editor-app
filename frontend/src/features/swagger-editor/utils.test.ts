import { describe, expect, it } from 'vitest';

import { DEFAULT_SCHEMA } from './constants';
import { convertSchemaFormat, detectSchemaFormat, parseSchema } from './utils';

const yamlSchema = `
openapi: 3.0.0
info:
  title: Test API
  version: 1.0.0
paths: {}
`;

describe('swagger editor utils', () => {
  it('detects JSON format', () => {
    expect(detectSchemaFormat(DEFAULT_SCHEMA)).toBe('json');
  });

  it('detects YAML format', () => {
    expect(detectSchemaFormat(yamlSchema)).toBe('yaml');
  });

  it('parses JSON schema', () => {
    const document = parseSchema(DEFAULT_SCHEMA);

    expect(document.openapi).toBe('3.0.0');
    expect(document.info?.title).toBe('Sample Pet Store App');
  });

  it('parses YAML schema', () => {
    const document = parseSchema(yamlSchema);

    expect(document.openapi).toBe('3.0.0');
    expect(document.info?.title).toBe('Test API');
  });

  it('converts JSON document to YAML', () => {
    const document = parseSchema(DEFAULT_SCHEMA);
    const yaml = convertSchemaFormat(document, 'yaml');

    expect(yaml).toContain('openapi: 3.0.0');
    expect(yaml).toContain('title: Sample Pet Store App');
  });

  it('converts YAML document to JSON', () => {
    const document = parseSchema(yamlSchema);
    const json = convertSchemaFormat(document, 'json');

    expect(json).toContain('"openapi": "3.0.0"');
    expect(json).toContain('"title": "Test API"');
  });
});
