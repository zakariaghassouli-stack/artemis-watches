import { NextResponse } from 'next/server';
import { sendOrderConfirmation, type SendOrderConfirmationArgs } from '@/lib/email';

export async function POST(request: Request) {
  const body = (await request.json()) as SendOrderConfirmationArgs;

  if (!body.to || !body.orderId) {
    return NextResponse.json(
      { success: false, error: 'Order email payload is incomplete' },
      { status: 400 }
    );
  }

  await sendOrderConfirmation(body);
  return NextResponse.json({ success: true });
}
