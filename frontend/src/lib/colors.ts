export function getStatusColor(status: number): string {
  if (status >= 200 && status < 300) return 'var(--se-status-success)';
  if (status >= 300 && status < 400) return 'var(--se-status-info)';
  return 'var(--se-status-error)';
}

export function getStatusBg(status: number): string {
  if (status >= 200 && status < 300) return 'var(--se-status-success-bg)';
  if (status >= 300 && status < 400) return 'var(--se-status-info-bg)';
  return 'var(--se-status-error-bg)';
}

export function getMethodColor(method: string): string {
  const map: Record<string, string> = {
    GET: 'var(--se-method-get)',
    POST: 'var(--se-method-post)',
    PUT: 'var(--se-method-put)',
    DELETE: 'var(--se-method-delete)',
    PATCH: 'var(--se-method-patch)',
    OPTIONS: 'var(--se-method-options)',
    HEAD: 'var(--se-method-head)',
  };
  return map[method] || 'var(--se-method-get)';
}

export function getMethodBg(method: string): string {
  const map: Record<string, string> = {
    GET: 'var(--se-method-get-bg)',
    POST: 'var(--se-method-post-bg)',
    PUT: 'var(--se-method-put-bg)',
    DELETE: 'var(--se-method-delete-bg)',
    PATCH: 'var(--se-method-patch-bg)',
    OPTIONS: 'var(--se-method-options-bg)',
    HEAD: 'var(--se-method-head-bg)',
  };
  return map[method] || 'var(--se-method-get-bg)';
}
