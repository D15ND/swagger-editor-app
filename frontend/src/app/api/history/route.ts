import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import type { HistoryCreate } from '@/lib/types';
import { validateCreate } from '@/lib/validation';
import { fetchHistoryRows, insertHistoryRow, deleteAllHistory } from '@/lib/history/queries';

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const raw = Number(request.nextUrl.searchParams.get('limit') ?? '15');
  const limit = Number.isNaN(raw) ? 15 : Math.min(raw, 50);

  try {
    const data = await fetchHistoryRows(session.supabase, session.user.id, limit);
    return NextResponse.json(data);
  } catch (error) {
    console.error('GET /api/history:', error);
    return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
  }
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

  try {
    await insertHistoryRow(session.supabase, session.user.id, {
      method: body.method,
      url: body.url,
      endpoint: body.endpoint,
      status: body.status,
      duration: body.duration,
      request_size: body.request_size,
      response_size: body.response_size,
      error: body.error ?? null,
    });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error('POST /api/history:', error);
    return NextResponse.json({ error: 'Failed to insert history' }, { status: 500 });
  }
}

export async function DELETE() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await deleteAllHistory(session.supabase, session.user.id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('DELETE /api/history:', error);
    return NextResponse.json({ error: 'Failed to clear history' }, { status: 500 });
  }
}
