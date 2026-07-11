import type {
  HttpMethod,
  OpenApiDocument,
  OpenApiMediaType,
  OpenApiParameter,
  OpenApiRequestBody,
  OpenApiResponse,
} from '@/types/openapi';

export type {
  HttpMethod,
  OpenApiDocument,
  OpenApiMediaType,
  OpenApiParameter,
  OpenApiRequestBody,
  OpenApiResponse,
};

export type SwaggerEndpoint = {
  id: string;
  path: string;
  method: HttpMethod;
  summary?: string;
  description?: string;
  parameters: OpenApiParameter[];
  requestBody?: OpenApiRequestBody;
  responses: Record<string, OpenApiResponse>;
};
