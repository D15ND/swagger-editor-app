'use server';

import { createClient } from '@/lib/supabase/server';
import type { RequestLogInsert } from '@/lib/supabase/types';

type ExecuteRequestParams = {
  method: string;
  url: string;
  headers: Record<string, string>;
  body: string | null;
};

export async function executeRequest(params: ExecuteRequestParams) {
  const { method, url, headers, body } = params;

  const bodyToSend = method === 'GET' || method === 'HEAD' ? undefined : (body ?? undefined);

  const start = Date.now();

  try {
    const response = await fetch(url, { method, headers, body: bodyToSend });
    const duration = Date.now() - start;
    const responseBody = await response.text();
    const responseHeaders = Object.fromEntries(response.headers);

    const supabase = await createClient();
    const { data, error: claimsError } = await supabase.auth.getClaims();
    if (claimsError) console.warn('executeRequest getClaims error:', claimsError.message);
    const userId = data?.claims?.sub ?? null;

    if (userId) {
      const insert: RequestLogInsert = {
        user_id: userId,
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
      };

      await supabase.from('request_logs').insert(insert);
    }

    return { status: response.status, headers: responseHeaders, body: responseBody, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { status: 0, headers: {}, body: null, error: message };
  }
}
