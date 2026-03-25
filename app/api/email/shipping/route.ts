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

  const { email, customerName, trackingNumber, trackingUrl, estimatedDelivery } =
    await request.json();

  if (!email || !trackingNumber) {
    return NextResponse.json(
      { success: false, error: 'Email and trackingNumber are required' },
      { status: 400 }
    );
  }

  const resend = new Resend(resendKey);
  const from = getEnv('RESEND_FROM_EMAIL') ?? 'Artemis Watches <artemismtl101@gmail.com>';

  await resend.emails.send({
    from,
    to: email,
    subject: 'Your Artemis timepiece is on its way',
    html: `
      <div style="font-family:-apple-system,sans-serif;max-width:600px;margin:0 auto;background:#0A0A0A;color:#F5F3EF;padding:40px;">
        <h1 style="font-size:24px;font-weight:300;letter-spacing:-0.02em;margin-bottom:24px;">Your Artemis timepiece is on its way.</h1>
        <p style="color:#A8A5A0;font-size:16px;line-height:1.7;">Hi${customerName ? ` ${customerName}` : ''}, your order has left Montreal and is now in transit.</p>
        <div style="margin:32px 0;padding:24px;background:#141414;border-radius:12px;">
          <p style="margin:0 0 10px;color:#A8A5A0;">Tracking number</p>
          <p style="margin:0;font-size:20px;color:#C9A96E;font-weight:600;">${trackingNumber}</p>
          ${
            estimatedDelivery
              ? `<p style="margin:16px 0 0;color:#A8A5A0;">Estimated delivery: ${estimatedDelivery}</p>`
              : ''
          }
        </div>
        ${
          trackingUrl
            ? `<a href="${trackingUrl}" style="display:block;text-align:center;padding:16px 32px;background:#F5F3EF;color:#0A0A0A;text-decoration:none;font-weight:500;letter-spacing:1px;text-transform:uppercase;margin:32px 0;">Track Shipment</a>`
            : ''
        }
        <p style="color:#A8A5A0;font-size:13px;text-align:center;margin-top:24px;">Questions? WhatsApp us at +1 514 560 9765.</p>
      </div>
    `,
  });

  return NextResponse.json({ success: true });
}
