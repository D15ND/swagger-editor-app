import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { fetchSavedSchema, upsertSavedSchema } from '@/lib/schema/queries';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const schema = await fetchSavedSchema(session.supabase, session.user.id);
    return NextResponse.json(schema);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch schema' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { content } = body;

    if (typeof content !== 'string') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    await upsertSavedSchema(session.supabase, session.user.id, content);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to save schema' }, { status: 500 });
  }
}
