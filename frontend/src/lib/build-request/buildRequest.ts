export type ParameterDef = {
  name: string;
  in: 'path' | 'query' | 'header' | 'cookie';
  required?: boolean;
};

function stripControl(value: string): string {
  return value.replace(/[\r\n]/g, '');
}

export function buildRequest(
  urlTemplate: string,
  params: ParameterDef[],
  values: Record<string, string | number | boolean>,
  baseHeaders: Record<string, string> = {},
): { url: string; headers: Record<string, string> } {
  let url = urlTemplate;
  const query = new URLSearchParams();
  const headers = { ...baseHeaders };

  for (const param of params) {
    const value = values[param.name];

    if (value === undefined || value === '') {
      if (param.required) {
        throw new Error(`Missing required parameter: ${param.name}`);
      }
      continue;
    }

    const strValue = stripControl(String(value));

    switch (param.in) {
      case 'path':
        url = url.split(`{${param.name}}`).join(encodeURIComponent(strValue));
        break;
      case 'query':
        query.append(param.name, strValue);
        break;
      case 'header':
        headers[param.name] = strValue;
        break;
      case 'cookie':
        const cookie = `${encodeURIComponent(param.name)}=${encodeURIComponent(strValue)}`;
        const existing = headers['Cookie'] ?? '';
        headers['Cookie'] = existing ? `${existing}; ${cookie}` : cookie;
        break;
      default:
        const _exhaustive: never = param.in;
        throw new Error(`Unknown parameter location: ${_exhaustive}`);
    }
  }

  const qs = query.toString();
  if (qs) {
    url = url.includes('?') ? `${url}&${qs}` : `${url}?${qs}`;
  }

  return { url, headers };
}
