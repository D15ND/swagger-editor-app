import { describe, expect, it } from 'vitest';

import { validateOpenApiDocument } from './validation';

describe('validateOpenApiDocument', () => {
  it('returns no errors for a valid OpenAPI document', () => {
    const document = {
      openapi: '3.0.0',
      info: {
        title: 'Test API',
        version: '1.0.0',
      },
      paths: {},
    };

    expect(validateOpenApiDocument(document)).toEqual([]);
  });

  it('returns no errors for a valid Swagger document', () => {
    const document = {
      swagger: '2.0',
      info: {
        title: 'Test API',
        version: '1.0.0',
      },
      paths: {},
    };

    expect(validateOpenApiDocument(document)).toEqual([]);
  });

  it('returns error when schema is not an object', () => {
    expect(validateOpenApiDocument(null)).toEqual(['Schema must be an object.']);
    expect(validateOpenApiDocument('wrong')).toEqual(['Schema must be an object.']);
  });

  it('returns required field errors', () => {
    const document = {};

    expect(validateOpenApiDocument(document)).toEqual([
      'Schema must contain "openapi" or "swagger" version.',
      'Schema must contain "info" object.',
      'Schema must contain "paths" object.',
    ]);
  });

  it('returns info title and version errors', () => {
    const document = {
      openapi: '3.0.0',
      info: {},
      paths: {},
    };

    expect(validateOpenApiDocument(document)).toEqual([
      'Schema info must contain "title".',
      'Schema info must contain "version".',
    ]);
  });
});
