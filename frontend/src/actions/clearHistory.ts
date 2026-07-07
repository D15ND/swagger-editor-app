'use server';

import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { DEFAULT_LNG } from '@/i18n/locales';

export async function clearHistory() {
  const supabase = await createClient();
  const { data, error: claimsError } = await supabase.auth.getClaims();
  if (claimsError) console.error('clearHistory getClaims error:', claimsError.message);
  const userId = data?.claims?.sub ?? null;
  if (!userId) throw new Error('Not authenticated');

  const { error } = await supabase.from('request_logs').delete().eq('user_id', userId);
  if (error) throw error;

  const lng = (await headers()).get('x-i18next-current-language') ?? DEFAULT_LNG;
  revalidatePath(`/${lng}/history`, 'page');
}
