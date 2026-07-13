import { createBrowserClient } from '@supabase/ssr';
import { getSupabaseConfig } from './constants';

export function createClient() {
  const config = getSupabaseConfig();

  if (!config) return null;

  return createBrowserClient(config.url, config.publishableKey);
}
