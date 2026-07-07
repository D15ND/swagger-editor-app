import { createBrowserClient } from '@supabase/ssr';
import { supabaseConfig } from './constants';

export function createClient() {
  return createBrowserClient(supabaseConfig.url, supabaseConfig.publishableKey);
}
