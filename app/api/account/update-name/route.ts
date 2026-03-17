import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function PATCH(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!prisma) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  let name: string;
  try {
    const body = await request.json();
    name = (body.name ?? '').trim();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!name || name.length < 2 || name.length > 80) {
    return NextResponse.json({ error: 'Name must be 2–80 characters' }, { status: 400 });
  }

  await prisma.user.update({
    where: { email: session.user.email },
    data: { name },
  });

  return NextResponse.json({ ok: true });
}
