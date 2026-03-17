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

  const { emailMarketing } = await request.json();

  await prisma.user.update({
    where: { email: session.user.email },
    data: { emailMarketing: Boolean(emailMarketing) },
  });

  return NextResponse.json({ success: true });
}
