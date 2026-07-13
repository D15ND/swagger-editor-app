export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options' | 'head';

export type ParameterLocation = 'path' | 'query' | 'header' | 'cookie';

export type OpenApiSchema = Record<string, unknown>;

export type OpenApiExample = {
  summary?: string;
  description?: string;
  value?: unknown;
};

export type OpenApiMediaType = {
  schema?: OpenApiSchema;
  example?: unknown;
  examples?: Record<string, OpenApiExample>;
};

export type OpenApiParameter = {
  name?: string;
  in?: ParameterLocation;
  description?: string;
  required?: boolean;
  schema?: OpenApiSchema;
  example?: unknown;
  examples?: Record<string, OpenApiExample>;
};

export type OpenApiRequestBody = {
  description?: string;
  required?: boolean;
  content?: Record<string, OpenApiMediaType>;
};

export type OpenApiResponse = {
  description?: string;
  content?: Record<string, OpenApiMediaType>;
};

export type OpenApiOperation = {
  summary?: string;
  description?: string;
  parameters?: OpenApiParameter[];
  requestBody?: OpenApiRequestBody;
  responses?: Record<string, OpenApiResponse>;
};

export type OpenApiPathItem = Partial<Record<HttpMethod, OpenApiOperation>> & {
  parameters?: OpenApiParameter[];
};

export type OpenApiDocument = {
  openapi?: string;
  swagger?: string;
  info?: {
    title?: string;
    version?: string;
    description?: string;
  };
  servers?: Array<{
    url?: string;
    description?: string;
  }>;
  paths?: Record<string, OpenApiPathItem>;
};
