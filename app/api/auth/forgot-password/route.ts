import { createHash, randomInt } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendPasswordResetCodeEmail } from '@/lib/email';

function hashResetCode(code: string): string {
  return createHash('sha256').update(code).digest('hex');
}

function generateResetCode(): string {
  return String(randomInt(0, 1_000_000)).padStart(6, '0');
}

export async function POST(request: NextRequest) {
  if (!prisma) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  const { email } = await request.json().catch(() => ({ email: '' }));
  const normalizedEmail = String(email ?? '').trim().toLowerCase();

  if (!normalizedEmail) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
    select: { id: true, email: true },
  });

  if (!user?.email) {
    return NextResponse.json({ success: true });
  }

  const code = generateResetCode();
  const codeHash = hashResetCode(code);
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  await prisma.passwordResetCode.updateMany({
    where: { userId: user.id, usedAt: null },
    data: { usedAt: new Date() },
  });

  await prisma.passwordResetCode.create({
    data: {
      userId: user.id,
      email: user.email,
      codeHash,
      expiresAt,
    },
  });

  const sent = await sendPasswordResetCodeEmail({
    to: user.email,
    code,
  });

  if (!sent) {
    await prisma.passwordResetCode.deleteMany({
      where: { userId: user.id, email: user.email, codeHash },
    });
    return NextResponse.json({ error: 'Unable to send reset email' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
