import { parse, stringify } from 'yaml';

import type { OpenApiDocument, SchemaFormat } from './types';

export function detectSchemaFormat(value: string): SchemaFormat {
  try {
    JSON.parse(value);
    return 'json';
  } catch {
    return 'yaml';
  }
}

export function parseSchema(value: string): OpenApiDocument {
  const format = detectSchemaFormat(value);

  if (format === 'json') {
    return JSON.parse(value) as OpenApiDocument;
  }

  return parse(value) as OpenApiDocument;
}

export function convertSchemaFormat(document: OpenApiDocument, targetFormat: SchemaFormat): string {
  if (targetFormat === 'json') {
    return JSON.stringify(document, null, 2);
  }

  return stringify(document);
}
