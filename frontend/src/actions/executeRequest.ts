'use server';

import { createClient } from '@/lib/supabase/server';

type ExecuteRequestParams = {
  method: string;
  url: string;
  headers: Record<string, string>;
  body: string | null;
};

export async function executeRequest(params: ExecuteRequestParams) {
  const { method, url, headers, body } = params;

  const bodyToSend =
    method === 'GET' || method === 'HEAD'
      ? undefined
      : body ?? undefined;

  const start = Date.now();

  try {
    const response = await fetch(url, { method, headers, body: bodyToSend });
    const duration = Date.now() - start;
    const responseBody = await response.text();
    const responseHeaders = Object.fromEntries(response.headers);

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      await supabase.from('request_logs').insert({
        user_id: user.id,
        method,
        url,
        endpoint: new URL(url).pathname,
        status: response.status,
        duration,
        request_size: bodyToSend?.length ?? 0,
        response_size: responseHeaders['content-length']
          ? Number(responseHeaders['content-length'])
          : responseBody.length,
        error: null,
      });
    }

    return { status: response.status, headers: responseHeaders, body: responseBody, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { status: 0, headers: {}, body: null, error: message };
  }
}
