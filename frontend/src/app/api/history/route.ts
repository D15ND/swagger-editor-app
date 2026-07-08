import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import type { HistoryCreate } from '@/lib/types';
import { validateCreate } from '@/lib/validation';

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const raw = Number(request.nextUrl.searchParams.get('limit') ?? '15');
  const limit = Number.isNaN(raw) ? 15 : Math.min(raw, 50);

  const { data, error } = await session.supabase
    .from('request_logs')
    .select('*')
    .eq('user_id', session.user.id)
    .order('timestamp', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('GET /api/history supabase error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let body: HistoryCreate;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const validationError = validateCreate(body);
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 });

  const { error } = await session.supabase.from('request_logs').insert({
    user_id: session.user.id,
    method: body.method,
    url: body.url,
    endpoint: body.endpoint,
    status: body.status,
    duration: body.duration,
    request_size: body.request_size,
    response_size: body.response_size,
    error: body.error ?? null,
  });

  if (error) {
    console.error('POST /api/history supabase error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true }, { status: 201 });
}
