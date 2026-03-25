import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSiteSettingsFresh, validatePromoCodeFresh } from '@/lib/queries';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')?.trim().toUpperCase();
  const email = request.nextUrl.searchParams.get('email')?.trim().toLowerCase() ?? '';
  const siteSettings = await getSiteSettingsFresh();
  const welcomeDiscountPercent = siteSettings?.welcomeDiscountPercent ?? 10;

  if (!code) {
    return NextResponse.json({ valid: false, error: 'No code provided' }, { status: 400 });
  }

  const cmsPromo = await validatePromoCodeFresh(code);
  if (cmsPromo) {
    const expired = cmsPromo.expiresAt
      ? new Date(cmsPromo.expiresAt).getTime() < Date.now()
      : false;
    const usageLimitReached =
      cmsPromo.usageLimit !== null &&
      cmsPromo.usageLimit !== undefined &&
      (cmsPromo.usageCount ?? 0) >= cmsPromo.usageLimit;
    const ownerMismatch =
      Boolean(cmsPromo.createdFor) &&
      (!email || cmsPromo.createdFor?.toLowerCase() !== email);

    if (expired) {
      return NextResponse.json({ valid: false, error: 'This welcome code has expired' });
    }

    if (usageLimitReached) {
      return NextResponse.json({ valid: false, error: 'This welcome code has already been used' });
    }

    if (ownerMismatch) {
      return NextResponse.json({ valid: false, error: 'This welcome code is tied to another account' });
    }

    return NextResponse.json({
      valid: true,
      discount: cmsPromo.discountPercent,
      label: `${code} — promo code applied`,
    });
  }

  if (!prisma) {
    return NextResponse.json({ valid: false, error: 'Database not configured' }, { status: 503 });
  }

  const user = await prisma.user.findUnique({
    where: { promoCode: code },
    select: { email: true, promoUsed: true },
  });

  if (!user) {
    return NextResponse.json({ valid: false, error: 'Invalid welcome code' });
  }

  if (!email || user.email?.toLowerCase() !== email) {
    return NextResponse.json({ valid: false, error: 'This welcome code is tied to another account' });
  }

  if (user.promoUsed) {
    return NextResponse.json({ valid: false, error: 'This welcome code has already been used' });
  }

  return NextResponse.json({
    valid: true,
    discount: welcomeDiscountPercent,
    label: `${code} — welcome code applied`,
  });
}
