import { parse, stringify } from 'yaml';

import type { OpenApiDocument, SchemaFormat, SchemaState } from './types';
import { validateOpenApiDocument } from './validation';

export function detectSchemaFormat(value: string): SchemaFormat {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return 'json';
  }

  try {
    JSON.parse(trimmedValue);
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

export function parseSchemaState(source: string): SchemaState {
  const format = detectSchemaFormat(source);

  try {
    const document = parseSchema(source);
    const errors = validateOpenApiDocument(document);

    return {
      source,
      format,
      document: errors.length > 0 ? null : document,
      errors,
    };
  } catch (error) {
    return {
      source,
      format,
      document: null,
      errors: [error instanceof Error ? error.message : 'Invalid schema.'],
    };
  }
}

export function convertSchemaFormat(document: OpenApiDocument, targetFormat: SchemaFormat): string {
  if (targetFormat === 'json') {
    return JSON.stringify(document, null, 2);
  }

  return stringify(document);
}

export function getNextSchemaFormat(format: SchemaFormat): SchemaFormat {
  return format === 'json' ? 'yaml' : 'json';
}
