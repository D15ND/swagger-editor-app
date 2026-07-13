import { parse, stringify } from 'yaml';

import type { OpenApiDocument } from '@/types/openapi';
import type { SchemaFormat, SchemaState } from './types';
import { validateOpenApiDocument } from './validation';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isOptionalString(value: unknown): value is string | undefined {
  return value === undefined || typeof value === 'string';
}

function isOpenApiDocument(value: unknown): value is OpenApiDocument {
  if (!isRecord(value)) {
    return false;
  }

  if (!isOptionalString(value.openapi)) {
    return false;
  }

  if (!isOptionalString(value.swagger)) {
    return false;
  }

  if (value.info !== undefined && !isRecord(value.info)) {
    return false;
  }

  if (value.paths !== undefined && !isRecord(value.paths)) {
    return false;
  }

  return true;
}

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
  const parsedValue: unknown = format === 'json' ? JSON.parse(value) : parse(value);

  if (!isOpenApiDocument(parsedValue)) {
    throw new Error('Schema must be an OpenAPI/Swagger object.');
  }

  return parsedValue;
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
