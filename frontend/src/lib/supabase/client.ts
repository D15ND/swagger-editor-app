import { createBrowserClient } from '@supabase/ssr';
import { getSupabaseConfig } from './constants';

export function createClient() {
  const { url, publishableKey } = getSupabaseConfig();

  if (!url || !publishableKey) {
    return null;
  }

  return createBrowserClient(url, publishableKey);
}
