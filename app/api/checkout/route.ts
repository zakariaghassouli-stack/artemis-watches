import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import type { CartItem } from '@/store/cart';

export async function POST(request: NextRequest) {
  let items: CartItem[];
  let promoCode: string | undefined;

  try {
    const body = await request.json();
    items = body.items;
    promoCode = body.promoCode;
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!items || items.length === 0) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

  // Validate promo code server-side
  let validatedPromo: string | undefined;
  if (promoCode && prisma) {
    const user = await prisma.user.findUnique({ where: { promoCode } });
    if (user && !user.promoUsed) {
      validatedPromo = promoCode;
    }
  }

  const discountMultiplier = validatedPromo ? 0.9 : 1; // 10% off

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',

      line_items: items.map((item) => ({
        price_data: {
          currency: 'cad',
          unit_amount: Math.round(item.price * discountMultiplier * 100),
          product_data: {
            name: `${item.brand} ${item.name}${item.boxAndPapers ? ' + Box & Papers' : ''}`,
            description: item.variant,
          },
        },
        quantity: item.quantity,
      })),

      shipping_address_collection: {
        allowed_countries: ['CA', 'US', 'GB', 'FR', 'DE', 'AU', 'CH', 'BE', 'NL'],
      },

      metadata: {
        items: JSON.stringify(
          items.map((i) => ({
            id: i.id,
            name: i.name,
            variant: i.variant,
            brand: i.brand,
            price: i.price,
            qty: i.quantity,
            boxAndPapers: i.boxAndPapers,
          }))
        ),
        promoCode: validatedPromo ?? '',
      },

      success_url: `${appUrl}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/collections`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
