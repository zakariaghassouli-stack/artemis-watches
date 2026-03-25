import { NextResponse } from 'next/server';
import { createDeal, updateContactProperty, upsertContact } from '@/lib/hubspot';

export async function POST(request: Request) {
  const { email, name, orderId, items = [], total = 0 } = await request.json();

  if (!email || !orderId) {
    return NextResponse.json(
      { success: false, error: 'Email and orderId are required' },
      { status: 400 }
    );
  }

  await upsertContact({
    email,
    firstname: name?.split(' ')[0],
    lastname: name?.split(' ').slice(1).join(' '),
    source: 'purchase',
  });

  await updateContactProperty(email, {
    artemis_cart_status: 'purchased',
    artemis_total_spent: String(total),
    artemis_last_purchase: new Date().toISOString(),
    hs_lead_status: 'CUSTOMER',
  });

  await createDeal({
    contactEmail: email,
    dealName: `Order ${orderId}`,
    amount: total,
    stage: 'payment_completed',
    products: Array.isArray(items)
      ? items
          .map((item: { name?: string }) => item.name)
          .filter((name): name is string => Boolean(name))
      : [],
  });

  return NextResponse.json({ success: true });
}
