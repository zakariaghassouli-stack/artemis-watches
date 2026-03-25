import { NextResponse } from 'next/server';
import { sendWelcomeEmail } from '@/lib/email';

export async function POST(request: Request) {
  const { email, name, promoCode } = await request.json();

  if (!email || !promoCode) {
    return NextResponse.json(
      { success: false, error: 'Email and promoCode are required' },
      { status: 400 }
    );
  }

  await sendWelcomeEmail({
    to: email,
    name: name || null,
    promoCode,
  });

  return NextResponse.json({ success: true });
}
