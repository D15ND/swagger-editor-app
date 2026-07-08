import type { SupabaseClient } from '@supabase/supabase-js';

export async function fetchHistoryRows(supabase: SupabaseClient, userId: string, limit = 15) {
  const { data, error } = await supabase
    .from('request_logs')
    .select('*')
    .eq('user_id', userId)
    .order('timestamp', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function deleteAllHistory(supabase: SupabaseClient, userId: string) {
  const { error } = await supabase.from('request_logs').delete().eq('user_id', userId);
  if (error) throw error;
}

export async function insertHistoryRow(
  supabase: SupabaseClient,
  userId: string,
  row: {
    method: string;
    url: string;
    endpoint: string;
    status: number;
    duration: number;
    request_size: number;
    response_size: number;
    error: string | null;
  },
) {
  const { error } = await supabase.from('request_logs').insert({ user_id: userId, ...row });
  if (error) throw error;
}
