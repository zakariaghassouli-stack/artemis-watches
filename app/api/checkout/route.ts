import { NextRequest, NextResponse } from 'next/server';
import { getEnv } from '@/lib/env';
import { getStripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import {
  getProductBySlugFresh,
  getSiteSettingsFresh,
  validatePromoCodeFresh,
} from '@/lib/queries';
import type { CartItem } from '@/store/cart';

function resolveLocale(request: NextRequest, requestedLocale?: string): 'en' | 'fr' {
  if (requestedLocale === 'fr' || requestedLocale === 'en') {
    return requestedLocale;
  }

  const referer = request.headers.get('referer');
  if (referer) {
    try {
      const pathname = new URL(referer).pathname;
      if (pathname.startsWith('/en')) return 'en';
    } catch {
      // Ignore malformed referer and fall back to French.
    }
  }

  return 'fr';
}

async function resolveCanonicalCheckoutItem(item: CartItem) {
  const product = await getProductBySlugFresh(item.slug);

  if (!product) {
    throw new Error(`Unknown product slug: ${item.slug}`);
  }

  if (!product.inStock) {
    throw new Error(`Product is out of stock: ${item.slug}`);
  }

  const requestedRange = item.range ?? product.range;

  let baseUnitPrice: number | null = null;
  if (requestedRange === 'essential') {
    baseUnitPrice =
      product.range === 'essential' ? product.price : (product.essentialPrice ?? null);
  } else if (requestedRange === 'premium') {
    baseUnitPrice = product.range === 'premium' ? product.price : null;
  }

  if (baseUnitPrice === null) {
    throw new Error(`Invalid range selection for ${item.slug}`);
  }

  const includesBoxAndPapers = requestedRange === 'premium';
  const resolvedBoxAndPapers = includesBoxAndPapers || Boolean(item.boxAndPapers);
  const boxAndPapersPrice =
    resolvedBoxAndPapers && !includesBoxAndPapers ? product.boxAndPapersPrice : 0;
  const finalUnitPrice = baseUnitPrice + boxAndPapersPrice;

  return {
    ...item,
    id: product.id,
    brand: product.brand,
    name: product.name,
    variant: product.variant,
    brandSlug: product.brandSlug,
    collectionSlug: product.collectionSlug,
    range: requestedRange,
    quantity: Math.max(1, item.quantity || 1),
    price: finalUnitPrice,
    boxAndPapers: resolvedBoxAndPapers,
  };
}

export async function POST(request: NextRequest) {
  let items: CartItem[];
  let promoCode: string | undefined;
  let promoEmail: string | undefined;
  let presentationSet = false;
  let locale: 'en' | 'fr' = 'en';

  try {
    const body = await request.json();
    items = body.items;
    promoCode = body.promoCode;
    promoEmail =
      typeof body.promoEmail === 'string' ? body.promoEmail.trim().toLowerCase() : undefined;
    presentationSet = Boolean(body.presentationSet);
    locale = resolveLocale(request, body.locale);
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!items || items.length === 0) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
  }

  const appUrl =
    getEnv('NEXT_PUBLIC_APP_URL') || request.nextUrl.origin || 'http://localhost:3000';
  const localePrefix = locale === 'fr' ? '' : `/${locale}`;

  const siteSettings = await getSiteSettingsFresh();
  const welcomeDiscountPercent = siteSettings?.welcomeDiscountPercent ?? 10;
  const presentationSetPrice = siteSettings?.boxAndPapersPrice ?? 49;
  let canonicalItems: Awaited<ReturnType<typeof resolveCanonicalCheckoutItem>>[];

  try {
    canonicalItems = await Promise.all(items.map(resolveCanonicalCheckoutItem));
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Invalid cart items' },
      { status: 400 }
    );
  }

  let validatedPromo: string | undefined;
  let discountPercent = 0;

  if (promoCode) {
    const cmsPromo = await validatePromoCodeFresh(promoCode);
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
        Boolean(promoEmail) &&
        cmsPromo.createdFor?.toLowerCase() !== promoEmail;

      if (expired) {
        return NextResponse.json({ error: 'This welcome code has expired' }, { status: 400 });
      }

      if (usageLimitReached) {
        return NextResponse.json({ error: 'This welcome code has already been used' }, { status: 400 });
      }

      if (ownerMismatch) {
        return NextResponse.json(
          { error: 'This welcome code is tied to another account' },
          { status: 400 }
        );
      }

      validatedPromo = promoCode;
      discountPercent = cmsPromo.discountPercent;
    } else if (prisma) {
      const user = await prisma.user.findUnique({
        where: { promoCode },
        select: { email: true, promoUsed: true },
      });

      if (user?.promoUsed) {
        return NextResponse.json({ error: 'This welcome code has already been used' }, { status: 400 });
      }

      if (user) {
        if (promoEmail && user.email?.toLowerCase() !== promoEmail) {
          return NextResponse.json(
            { error: 'This welcome code is tied to another account' },
            { status: 400 }
          );
        }
        validatedPromo = promoCode;
        discountPercent = welcomeDiscountPercent;
      }
    }
  }

  const discountMultiplier = 1 - discountPercent / 100;
  const effectivePresentationSet =
    presentationSet && !canonicalItems.some((item) => item.boxAndPapers);

  try {
    const stripe = getStripe();
    const presentationLineItem = effectivePresentationSet
      ? [{
          price_data: {
            currency: 'cad',
            unit_amount: Math.round(presentationSetPrice * discountMultiplier * 100),
            product_data: {
              name: 'Artemis Box & Papers Set',
              description: 'Branded presentation box and matching documentation.',
            },
          },
          quantity: 1,
        }]
      : [];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',

      line_items: [
        ...canonicalItems.map((item) => ({
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
        ...presentationLineItem,
      ],

      shipping_address_collection: {
        allowed_countries: ['CA', 'US', 'GB', 'FR', 'DE', 'AU', 'CH', 'BE', 'NL'],
      },

      metadata: {
        items: JSON.stringify(
          canonicalItems.map((i) => ({
            id: i.id,
            name: i.name,
            variant: i.variant,
            brand: i.brand,
            price: i.price,
            qty: i.quantity,
            range: i.range,
            slug: i.slug,
            boxAndPapers: i.boxAndPapers,
          }))
        ),
        promoCode: validatedPromo ?? '',
        discountPercent: String(discountPercent),
        presentationSet: effectivePresentationSet ? 'true' : '',
        presentationSetPrice: String(presentationSetPrice),
      },

      success_url: `${appUrl}${localePrefix}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}${localePrefix}/collections`,
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
