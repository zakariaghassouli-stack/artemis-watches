import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  if (!prisma) {
    return NextResponse.json({ valid: false, error: 'Database not configured' }, { status: 503 });
  }

  const code = request.nextUrl.searchParams.get('code')?.trim().toUpperCase();

  if (!code) {
    return NextResponse.json({ valid: false, error: 'No code provided' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { promoCode: code } });

  if (!user) {
    return NextResponse.json({ valid: false, error: 'Invalid promo code' });
  }

  if (user.promoUsed) {
    return NextResponse.json({ valid: false, error: 'This promo code has already been used' });
  }

  return NextResponse.json({
    valid: true,
    discount: 10, // 10% off
    label: `${code} — 10% off applied`,
  });
}
