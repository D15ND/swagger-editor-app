import type { SupabaseClient } from '@supabase/supabase-js';
import { SCHEMA_TABLE } from '../supabase/constants';
import type { SavedSchemaRow } from '../supabase/types';

export async function fetchSavedSchema(
  supabase: SupabaseClient,
  userId: string,
): Promise<SavedSchemaRow | null> {
  const { data, error } = await supabase
    .from(SCHEMA_TABLE)
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function upsertSavedSchema(
  supabase: SupabaseClient,
  userId: string,
  content: string,
): Promise<void> {
  const { error } = await supabase
    .from(SCHEMA_TABLE)
    .upsert({ user_id: userId, content }, { onConflict: 'user_id' });

  if (error) throw error;
}
