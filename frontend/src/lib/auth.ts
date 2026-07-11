import { createClient } from './supabase/server';
import type { User } from '@supabase/supabase-js';

export async function getSession() {
  const supabase = await createClient();
  if (!supabase) return null;

  const response = await Promise.race([
    supabase.auth.getUser(),
    new Promise<{ data: { user: null }; error: null }>((resolve) =>
      setTimeout(() => resolve({ data: { user: null }, error: null }), 3000),
    ),
  ]);

  const user: User | null = response.data?.user ?? null;
  if (!user) return null;

  return { supabase, user };
}
