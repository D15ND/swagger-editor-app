import type {
  HttpMethod,
  OpenApiParameter,
  OpenApiRequestBody,
  OpenApiResponse,
} from '@/types/openapi';

export type {
  HttpMethod,
  OpenApiDocument,
  OpenApiExample,
  OpenApiMediaType,
  OpenApiOperation,
  OpenApiParameter,
  OpenApiPathItem,
  OpenApiRequestBody,
  OpenApiResponse,
  OpenApiSchema,
  ParameterLocation,
} from '@/types/openapi';

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
