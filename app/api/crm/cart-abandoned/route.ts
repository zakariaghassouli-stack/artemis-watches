import { NextResponse } from 'next/server';
import { updateContactProperty } from '@/lib/hubspot';

async function parseBody(request: Request) {
  const raw = await request.text();
  if (!raw) return {};

  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export async function POST(request: Request) {
  const { email, cartItems = [], cartTotal = 0 } = await parseBody(request);

  if (email) {
    await updateContactProperty(email, {
      artemis_source: 'abandoned_cart',
      artemis_cart_status: 'abandoned',
      artemis_cart_total: String(cartTotal),
      artemis_cart_items: Array.isArray(cartItems)
        ? cartItems.map((item: { name?: string }) => item.name).filter(Boolean).join(', ')
        : '',
      artemis_last_abandoned: new Date().toISOString(),
    });
  }

  return NextResponse.json({ success: true });
}
