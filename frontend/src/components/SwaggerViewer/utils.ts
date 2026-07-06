import type {
  HttpMethod,
  OpenApiDocument,
  OpenApiParameter,
  OpenApiPathItem,
  OpenApiOperation,
  SwaggerEndpoint,
} from './types';

export const HTTP_METHODS: HttpMethod[] = [
  'get',
  'post',
  'put',
  'patch',
  'delete',
  'options',
  'head',
];

export const PARAMETER_LOCATIONS = ['path', 'query', 'header', 'cookie'] as const;

export function isHttpMethod(value: string): value is HttpMethod {
  return HTTP_METHODS.includes(value as HttpMethod);
}

export function getMethodLabel(method: HttpMethod): string {
  return method.toUpperCase();
}

export function getDocumentTitle(document: OpenApiDocument): string {
  return document.info?.title || 'Untitled API';
}

export function getDocumentVersion(document: OpenApiDocument): string {
  return document.info?.version || document.openapi || document.swagger || 'Unknown';
}

export function getBaseUrl(document: OpenApiDocument): string {
  return document.servers?.[0]?.url || '/';
}

export function mergeParameters(
  pathParameters: OpenApiParameter[] | undefined,
  operationParameters: OpenApiParameter[] | undefined,
): OpenApiParameter[] {
  const map = new Map<string, OpenApiParameter>();

  [...(pathParameters ?? []), ...(operationParameters ?? [])].forEach((parameter) => {
    const key = `${parameter.in ?? 'unknown'}:${parameter.name ?? 'unknown'}`;
    map.set(key, parameter);
  });

  return Array.from(map.values());
}

export function getEndpoints(document: OpenApiDocument | null): SwaggerEndpoint[] {
  if (!document?.paths) {
    return [];
  }

  return Object.entries(document.paths).flatMap(([path, pathItem]) => {
    const item = pathItem as OpenApiPathItem;

    return Object.entries(item)
      .filter((entry): entry is [HttpMethod, OpenApiOperation] => isHttpMethod(entry[0]))
      .map(([method, operation]) => {
        const typedMethod = method as HttpMethod;

        return {
          id: `${typedMethod}:${path}`,
          path,
          method: typedMethod,
          summary: operation?.summary,
          description: operation?.description,
          parameters: mergeParameters(item.parameters, operation?.parameters),
          requestBody: operation?.requestBody,
          responses: operation?.responses ?? {},
        };
      });
  });
}

export function groupParametersByLocation(parameters: OpenApiParameter[]) {
  return PARAMETER_LOCATIONS.map((location) => ({
    location,
    parameters: parameters.filter((parameter) => parameter.in === location),
  }));
}

export function formatJson(value: unknown): string {
  return JSON.stringify(value, null, 2);
}
