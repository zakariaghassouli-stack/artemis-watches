import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { sendWelcomeEmail } from '@/lib/email';
import { upsertContact } from '@/lib/hubspot';
import { getSiteSettingsFresh } from '@/lib/queries';
import { createSanityPromoCode, generateUniquePromoCode } from '@/lib/promo';

export async function POST(request: NextRequest) {
  if (!prisma) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  let name: string, email: string, password: string;
  try {
    const body = await request.json();
    name = (body.name ?? '').trim();
    email = (body.email ?? '').trim().toLowerCase();
    password = body.password ?? '';
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
  }

  // Check for existing user
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 12);

  const welcomeDiscountPercent = (await getSiteSettingsFresh())?.welcomeDiscountPercent ?? 10;

  let promoCode = '';
  let user: Awaited<ReturnType<typeof prisma.user.create>> | null = null;

  for (let attempt = 0; attempt < 6; attempt += 1) {
    promoCode = await generateUniquePromoCode();

    try {
      user = await prisma.user.create({
        data: {
          name: name || null,
          email,
          passwordHash,
          promoCode,
        },
      });
      break;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002' &&
        attempt < 5
      ) {
        continue;
      }

      throw error;
    }
  }

  if (!user) {
    return NextResponse.json({ error: 'Unable to create account right now' }, { status: 500 });
  }

  createSanityPromoCode({
    code: promoCode,
    email,
    discountPercent: welcomeDiscountPercent,
  }).catch((err) => console.error('[register] Sanity promo sync failed:', err));

  // Send welcome email — non-blocking, never crash the registration
  sendWelcomeEmail({
    to: user.email!,
    name: user.name,
    promoCode: user.promoCode!,
  }).catch((err) => console.error('[register] Welcome email failed:', err));

  upsertContact({
    email: user.email!,
    firstname: user.name?.split(' ')[0],
    lastname: user.name?.split(' ').slice(1).join(' '),
    source: 'signup_10_percent',
  }).catch((err) => console.error('[register] HubSpot sync failed:', err));

  return NextResponse.json({
    success: true,
    promoCode: user.promoCode,
    message: `Account created. Your welcome code: ${user.promoCode}`,
  });
}
