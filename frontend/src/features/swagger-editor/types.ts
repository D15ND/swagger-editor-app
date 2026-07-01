export type SchemaFormat = 'json' | 'yaml';

export type OpenApiOperation = {
  summary?: string;
  description?: string;
  parameters?: unknown[];
  requestBody?: unknown;
  responses?: Record<string, unknown>;
};

export type OpenApiPathItem = Partial<
  Record<'get' | 'post' | 'put' | 'patch' | 'delete' | 'options' | 'head', OpenApiOperation>
>;

export type OpenApiDocument = {
  openapi?: string;
  swagger?: string;
  info?: {
    title?: string;
    version?: string;
    description?: string;
  };
  paths?: Record<string, OpenApiPathItem>;
};

export type SchemaState = {
  source: string;
  format: SchemaFormat;
  document: OpenApiDocument | null;
  errors: string[];
};
