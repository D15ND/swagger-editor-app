import type { OpenApiDocument } from '@/types/openapi';

export type { OpenApiDocument } from '@/types/openapi';

export type SchemaFormat = 'json' | 'yaml';

export type SchemaState = {
  source: string;
  format: SchemaFormat;
  document: OpenApiDocument | null;
  errors: string[];
};
