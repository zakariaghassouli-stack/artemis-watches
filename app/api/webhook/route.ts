import { NextRequest, NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { getEnv } from '@/lib/env';
import { getStripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { sendOrderConfirmation, type OrderEmailItem } from '@/lib/email';
import { createDeal, updateContactProperty, upsertContact } from '@/lib/hubspot';
import { markSanityPromoCodeUsed } from '@/lib/promo';

// Next.js App Router — read raw body for Stripe signature verification
export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');
  const webhookSecret = getEnv('STRIPE_WEBHOOK_SECRET');

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    await handleCheckoutComplete(session);
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const subtotal = (session.amount_subtotal ?? session.amount_total ?? 0) / 100;
  const total = (session.amount_total ?? 0) / 100;
  const shippingCost = (session.shipping_cost?.amount_total ?? 0) / 100;
  const shipping = session.collected_information?.shipping_details;
  const customer = session.customer_details;

  if (!prisma) {
    console.warn('Prisma not configured — skipping order DB write for session', session.id);
    return;
  }

  const usedPromoCode = session.metadata?.promoCode || null;
  const presentationSet = session.metadata?.presentationSet === 'true';
  const presentationSetPrice = Number(session.metadata?.presentationSetPrice ?? '49') || 49;
  const metadataItems = (() => {
    try {
      const parsed = JSON.parse(session.metadata?.items ?? '[]') as Array<Record<string, unknown>>;
      if (presentationSet) {
        parsed.push({
          name: 'Artemis Box & Papers Set',
          variant: 'Branded presentation box and matching documentation.',
          brand: 'ARTEMIS',
          price: presentationSetPrice,
          qty: 1,
          boxAndPapers: false,
        });
      }
      return JSON.stringify(parsed);
    } catch {
      return session.metadata?.items ?? '[]';
    }
  })();

  // Find the user by email to link the order to their account
  let userId: string | undefined;
  if (customer?.email) {
    try {
      const user = await prisma.user.findUnique({
        where: { email: customer.email },
        select: { id: true },
      });
      userId = user?.id;
    } catch {
      // Non-blocking — order still created without userId
    }
  }

  try {
    await prisma.order.create({
      data: {
        userId: userId ?? null,
        stripeSessionId: session.id,
        status: 'PAID',
        items: metadataItems,
        subtotal,
        total,
        shipping: shippingCost,
        promoCodeUsed: usedPromoCode,
        shippingName: shipping?.name ?? customer?.name ?? null,
        shippingEmail: customer?.email ?? null,
        shippingAddress: shipping?.address.line1 ?? null,
        shippingCity: shipping?.address.city ?? null,
        shippingProvince: shipping?.address.state ?? null,
        shippingPostal: shipping?.address.postal_code ?? null,
        shippingCountry: shipping?.address.country ?? 'CA',
      },
    });

    // Mark the promo code as used so it can't be redeemed again
    if (usedPromoCode) {
      await prisma.user.updateMany({
        where: { promoCode: usedPromoCode },
        data: { promoUsed: true },
      });
      await markSanityPromoCodeUsed(usedPromoCode).catch((err) =>
        console.error('Sanity promo usage update failed for session', session.id, err)
      );
    }
  } catch (err) {
    // Log but don't fail the webhook — Stripe will retry on 5xx errors
    console.error('DB write failed for session', session.id, err);
  }

  // Send order confirmation email (non-blocking — email failure must not affect webhook response)
  if (customer?.email) {
    let parsedItems: OrderEmailItem[] = [];
    try {
      parsedItems = JSON.parse(session.metadata?.items ?? '[]') as OrderEmailItem[];
      if (presentationSet) {
        parsedItems.push({
          name: 'Artemis Box & Papers Set',
          variant: 'Branded presentation box and matching documentation.',
          brand: 'ARTEMIS',
          price: presentationSetPrice,
          qty: 1,
          boxAndPapers: false,
        });
      }
    } catch {
      // malformed metadata — send email with empty items rather than skip
    }

    await sendOrderConfirmation({
      to: customer.email,
      customerName: customer.name ?? shipping?.name ?? null,
      orderId: session.id,
      items: parsedItems,
      subtotal,
      shipping: shippingCost,
      promoCode: usedPromoCode,
      total,
      shippingAddress: {
        name: shipping?.name ?? customer.name ?? null,
        line1: shipping?.address.line1 ?? null,
        city: shipping?.address.city ?? null,
        province: shipping?.address.state ?? null,
        postal: shipping?.address.postal_code ?? null,
        country: shipping?.address.country ?? null,
      },
    });

    await upsertContact({
      email: customer.email,
      firstname: (customer.name ?? shipping?.name ?? '').split(' ')[0],
      lastname: (customer.name ?? shipping?.name ?? '').split(' ').slice(1).join(' '),
      source: 'purchase',
    });

    await updateContactProperty(customer.email, {
      artemis_cart_status: 'purchased',
      artemis_total_spent: String(total),
      artemis_last_purchase: new Date().toISOString(),
      hs_lead_status: 'CUSTOMER',
    });

    await createDeal({
      contactEmail: customer.email,
      dealName: `Order ${session.id}`,
      amount: total,
      stage: 'payment_completed',
      products: parsedItems.map((item) => `${item.brand} ${item.name}`),
    });
  }
}
