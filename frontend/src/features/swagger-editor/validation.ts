import type { OpenApiDocument } from '@/types/openapi';

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function validateOpenApiDocument(document: unknown): string[] {
  const errors: string[] = [];

  if (!isObject(document)) {
    return ['Schema must be an object.'];
  }

  const schema = document as OpenApiDocument;

  if (!schema.openapi && !schema.swagger) {
    errors.push('Schema must contain "openapi" or "swagger" version.');
  }

  if (!isObject(schema.info)) {
    errors.push('Schema must contain "info" object.');
  } else {
    if (!schema.info.title) {
      errors.push('Schema info must contain "title".');
    }

    if (!schema.info.version) {
      errors.push('Schema info must contain "version".');
    }
  }

  if (!isObject(schema.paths)) {
    errors.push('Schema must contain "paths" object.');
  }

  return errors;
}
