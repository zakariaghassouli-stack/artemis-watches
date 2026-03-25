import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getEnv } from '@/lib/env';

export async function POST(request: Request) {
  const resendKey = getEnv('RESEND_API_KEY');
  if (!resendKey) {
    return NextResponse.json(
      { success: false, error: 'RESEND_API_KEY is not configured' },
      { status: 503 }
    );
  }

  const { email, name, cartItems = [], cartTotal = 0, promoCode } = await request.json();
  if (!email) {
    return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
  }

  const resend = new Resend(resendKey);
  const from = getEnv('RESEND_FROM_EMAIL') ?? 'Artemis Watches <hello@artemis-watches.com>';
  const appUrl = getEnv('NEXT_PUBLIC_APP_URL') ?? 'https://artemis-sigma-tan.vercel.app';

  await resend.emails.send({
    from,
    to: email,
    subject: 'You left something behind — your selection is still available',
    html: `
      <div style="font-family:-apple-system,sans-serif;max-width:600px;margin:0 auto;background:#0A0A0A;color:#F5F3EF;padding:40px;">
        <h1 style="font-size:24px;font-weight:300;letter-spacing:-0.02em;margin-bottom:24px;">Your selection is waiting.</h1>
        <p style="color:#A8A5A0;font-size:16px;line-height:1.7;">Hi${name ? ` ${name}` : ''}, you were looking at something worth coming back to.</p>
        <div style="margin:32px 0;padding:24px;background:#141414;border-radius:12px;">
          <p style="color:#C9A96E;font-size:12px;text-transform:uppercase;letter-spacing:2px;margin-bottom:16px;">Your Selection</p>
          ${cartItems
            .map(
              (item: { brand?: string; name?: string; price?: number }) => `
                <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #1F1F1F;">
                  <span style="color:#F5F3EF;">${item.brand ?? ''} ${item.name ?? ''}</span>
                  <span style="color:#A8A5A0;">$${item.price ?? 0} CAD</span>
                </div>
              `
            )
            .join('')}
          <div style="display:flex;justify-content:space-between;padding:16px 0 0;font-weight:500;">
            <span>Total</span>
            <span>$${cartTotal} CAD</span>
          </div>
        </div>
        ${
          promoCode
            ? `
          <div style="margin:24px 0;padding:16px;background:#C9A96E15;border:1px solid #C9A96E30;border-radius:8px;text-align:center;">
            <p style="color:#C9A96E;font-size:14px;margin-bottom:8px;">As a thank you for coming back:</p>
            <p style="font-size:20px;font-weight:500;color:#F5F3EF;">Use code ${promoCode} for 5% off</p>
          </div>
        `
            : ''
        }
        <a href="${appUrl}/collections"
           style="display:block;text-align:center;padding:16px 32px;background:#F5F3EF;color:#0A0A0A;text-decoration:none;font-weight:500;letter-spacing:1px;text-transform:uppercase;margin:32px 0;">
          COMPLETE YOUR ORDER
        </a>
        <p style="color:#A8A5A0;font-size:13px;text-align:center;margin-top:24px;">30-day returns · Tracked shipping · Secure Stripe checkout</p>
      </div>
    `,
  });

  return NextResponse.json({ success: true });
}
