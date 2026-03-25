import { createHash } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

function hashResetCode(code: string): string {
  return createHash('sha256').update(code).digest('hex');
}

export async function POST(request: NextRequest) {
  if (!prisma) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  const email = String(body?.email ?? '').trim().toLowerCase();
  const code = String(body?.code ?? '').trim();
  const password = String(body?.password ?? '');
  const confirmPassword = String(body?.confirmPassword ?? '');

  if (!email || !code || !password || !confirmPassword) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  if (password !== confirmPassword) {
    return NextResponse.json({ error: 'PASSWORD_MISMATCH' }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json({ error: 'PASSWORD_TOO_SHORT' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ error: 'INVALID_CODE' }, { status: 400 });
  }

  const resetCode = await prisma.passwordResetCode.findFirst({
    where: {
      userId: user.id,
      email,
      codeHash: hashResetCode(code),
      usedAt: null,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: 'desc' },
  });

  if (!resetCode) {
    return NextResponse.json({ error: 'INVALID_CODE' }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: { passwordHash },
    }),
    prisma.passwordResetCode.update({
      where: { id: resetCode.id },
      data: { usedAt: new Date() },
    }),
  ]);

  return NextResponse.json({ success: true });
}
