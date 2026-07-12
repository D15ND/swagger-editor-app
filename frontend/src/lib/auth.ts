import { createClient } from './supabase/server';
import type { User } from '@supabase/supabase-js';
import { timeoutSignal } from '@/lib/timeoutSignal';

export async function getSession() {
  const supabase = await createClient();
  if (!supabase) return null;

  const response = await Promise.race([
    supabase.auth.getUser(),
    timeoutSignal<{ data: { user: null }; error: null }>({ data: { user: null }, error: null }),
  ]);

  const user: User | null = response.data?.user ?? null;
  if (!user) return null;

  return { supabase, user };
}
