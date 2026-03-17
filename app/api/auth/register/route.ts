import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { sendWelcomeEmail } from '@/lib/email';

// Generate a unique ARTEMIS-XXXX promo code
function generatePromoCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Unambiguous chars (no 0/O, 1/I)
  let code = 'ARTEMIS-';
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

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

  // Generate a unique promo code (retry on collision, extremely unlikely)
  let promoCode: string;
  let attempts = 0;
  do {
    promoCode = generatePromoCode();
    const clash = await prisma.user.findUnique({ where: { promoCode } });
    if (!clash) break;
    attempts++;
  } while (attempts < 5);

  // Create user
  const user = await prisma.user.create({
    data: {
      name: name || null,
      email,
      passwordHash,
      promoCode,
    },
  });

  // Send welcome email — non-blocking, never crash the registration
  sendWelcomeEmail({
    to: user.email!,
    name: user.name,
    promoCode: user.promoCode!,
  }).catch((err) => console.error('[register] Welcome email failed:', err));

  return NextResponse.json({
    success: true,
    promoCode: user.promoCode,
    message: `Account created. Your exclusive code: ${user.promoCode}`,
  });
}
