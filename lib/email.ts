import { Resend } from 'resend';
import { getEnv } from '@/lib/env';

// ── Client ──────────────────────────────────────────────────────────────────
const resend = getEnv('RESEND_API_KEY')
  ? new Resend(getEnv('RESEND_API_KEY') as string)
  : null;

const FROM = getEnv('RESEND_FROM_EMAIL') ?? 'ARTEMIS Montres <orders@artemis-watches.com>';
const FALLBACK_FROM = 'ARTEMIS Watches <onboarding@resend.dev>';
const SITE_URL = getEnv('NEXT_PUBLIC_APP_URL') ?? 'https://artemis-watches.com';

// ── Types ────────────────────────────────────────────────────────────────────
export interface OrderEmailItem {
  name: string;
  variant: string;
  brand: string;
  price: number;
  qty: number;
  boxAndPapers?: boolean;
}

export interface SendOrderConfirmationArgs {
  to: string;
  customerName: string | null;
  orderId: string;
  items: OrderEmailItem[];
  subtotal: number;
  shipping: number;
  promoCode: string | null;
  total: number;
  shippingAddress: {
    name: string | null;
    line1: string | null;
    city: string | null;
    province: string | null;
    postal: string | null;
    country: string | null;
  };
}

export interface SendWelcomeEmailArgs {
  to: string;
  name: string | null;
  promoCode: string;
}

export interface SendPasswordResetCodeArgs {
  to: string;
  code: string;
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function fmt(amount: number): string {
  return `$${amount.toFixed(0)} CAD`;
}

function year(): number {
  return new Date().getFullYear();
}

async function sendWithFallback(params: {
  to: string;
  subject: string;
  html: string;
}): Promise<boolean> {
  if (!resend) {
    return false;
  }

  const primary = await resend.emails.send({
    from: FROM,
    to: params.to,
    subject: params.subject,
    html: params.html,
  });

  if (!primary.error) {
    return true;
  }

  console.error('[email] Primary sender failed, retrying with fallback sender:', primary.error);

  const fallback = await resend.emails.send({
    from: FALLBACK_FROM,
    to: params.to,
    subject: params.subject,
    html: params.html,
  });

  if (fallback.error) {
    console.error('[email] Fallback sender also failed:', fallback.error);
    return false;
  }

  return true;
}

// ── HTML Templates ───────────────────────────────────────────────────────────
function buildOrderConfirmationHtml(args: SendOrderConfirmationArgs): string {
  const { customerName, orderId, items, subtotal, shipping, promoCode, total, shippingAddress } =
    args;
  const firstName = customerName?.split(' ')[0] ?? 'Valued Customer';
  const shortId = orderId.slice(-8).toUpperCase();

  const itemRows = items
    .map(
      (item) => `
      <tr>
        <td style="padding:14px 0;border-bottom:1px solid #1C1C1C;">
          <div style="color:#F5F3EF;font-size:14px;font-weight:600;">${item.brand} ${item.name}</div>
          <div style="color:#6B6965;font-size:12px;margin-top:3px;">${item.variant}${item.boxAndPapers ? ' &nbsp;·&nbsp; Box &amp; Papers' : ''} &nbsp;·&nbsp; Qty: ${item.qty}</div>
        </td>
        <td style="padding:14px 0;border-bottom:1px solid #1C1C1C;text-align:right;vertical-align:top;white-space:nowrap;">
          <span style="color:#C9A96E;font-size:14px;font-weight:600;">${fmt(item.price * item.qty)}</span>
        </td>
      </tr>`
    )
    .join('');

  const addressLine = [
    shippingAddress.name,
    shippingAddress.line1,
    shippingAddress.city,
    shippingAddress.province,
    shippingAddress.postal,
    shippingAddress.country,
  ]
    .filter(Boolean)
    .join(', ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>Order Confirmed — ARTEMIS</title>
</head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;padding:48px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Wordmark -->
        <tr>
          <td style="padding-bottom:28px;text-align:center;">
            <div style="font-size:20px;font-weight:700;letter-spacing:0.22em;color:#C9A96E;text-transform:uppercase;">ARTEMIS</div>
            <div style="font-size:9px;letter-spacing:0.32em;color:#3A3835;text-transform:uppercase;margin-top:5px;">Luxury Watches · Montréal</div>
          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td style="padding-bottom:32px;">
            <table width="100%" cellpadding="0" cellspacing="0"><tr>
              <td width="20%" style="border-bottom:1px solid #1C1C1C;"></td>
              <td width="60%" style="border-bottom:1px solid #C9A96E;opacity:0.4;"></td>
              <td width="20%" style="border-bottom:1px solid #1C1C1C;"></td>
            </tr></table>
          </td>
        </tr>

        <!-- Headline -->
        <tr>
          <td style="padding-bottom:28px;">
            <div style="font-size:26px;font-weight:600;color:#F5F3EF;line-height:1.2;">Your order is confirmed.</div>
            <div style="font-size:14px;color:#A8A5A0;margin-top:10px;line-height:1.6;">Thank you, ${firstName}. Your timepiece is in our hands and will be prepared with care.</div>
            <div style="font-size:11px;color:#3A3835;margin-top:8px;letter-spacing:0.1em;text-transform:uppercase;">Order ref. #${shortId}</div>
          </td>
        </tr>

        <!-- Items card -->
        <tr>
          <td style="padding-bottom:20px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#141414;border:1px solid #1C1C1C;border-radius:3px;">
              <tr><td style="padding:20px 24px;">

                <!-- Items -->
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${itemRows}
                </table>

                <!-- Summary -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;padding-top:4px;">
                  <tr>
                    <td style="padding:5px 0;font-size:13px;color:#6B6965;">Subtotal</td>
                    <td style="padding:5px 0;text-align:right;font-size:13px;color:#6B6965;">${fmt(subtotal)}</td>
                  </tr>
                  ${
                    promoCode
                      ? `<tr>
                    <td style="padding:5px 0;font-size:13px;color:#6B6965;">Promo (${promoCode})</td>
                    <td style="padding:5px 0;text-align:right;font-size:13px;color:#4ADE80;">−10%</td>
                  </tr>`
                      : ''
                  }
                  <tr>
                    <td style="padding:5px 0;font-size:13px;color:#6B6965;">Shipping</td>
                    <td style="padding:5px 0;text-align:right;font-size:13px;color:#6B6965;">${shipping === 0 ? 'Free' : fmt(shipping)}</td>
                  </tr>
                  <tr>
                    <td style="padding-top:14px;border-top:1px solid #1C1C1C;font-size:15px;font-weight:700;color:#F5F3EF;">Total</td>
                    <td style="padding-top:14px;border-top:1px solid #1C1C1C;text-align:right;font-size:16px;font-weight:700;color:#C9A96E;">${fmt(total)}</td>
                  </tr>
                </table>

              </td></tr>
            </table>
          </td>
        </tr>

        <!-- Shipping address -->
        ${
          addressLine
            ? `<tr>
          <td style="padding-bottom:20px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#141414;border:1px solid #1C1C1C;border-radius:3px;">
              <tr><td style="padding:16px 24px;">
                <div style="font-size:9px;letter-spacing:0.16em;color:#3A3835;text-transform:uppercase;margin-bottom:8px;">Shipping to</div>
                <div style="font-size:13px;color:#A8A5A0;">${addressLine}</div>
              </td></tr>
            </table>
          </td>
        </tr>`
            : ''
        }

        <!-- Trust signals -->
        <tr>
          <td style="padding-bottom:28px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="text-align:center;padding:0 6px;">
                  <div style="font-size:10px;letter-spacing:0.1em;color:#3A3835;text-transform:uppercase;">30-Day Guarantee</div>
                </td>
                <td style="text-align:center;padding:0 6px;">
                  <div style="font-size:10px;letter-spacing:0.1em;color:#3A3835;text-transform:uppercase;">Authenticity Verified</div>
                </td>
                <td style="text-align:center;padding:0 6px;">
                  <div style="font-size:10px;letter-spacing:0.1em;color:#3A3835;text-transform:uppercase;">Tracked Shipping</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Contact -->
        <tr>
          <td style="padding-bottom:32px;text-align:center;">
            <div style="font-size:13px;color:#6B6965;">Questions? WhatsApp us at <a href="https://wa.me/15145609765" style="color:#C9A96E;text-decoration:none;">+1 514 560-9765</a></div>
          </td>
        </tr>

        <!-- Footer divider -->
        <tr>
          <td style="padding-bottom:20px;">
            <table width="100%" cellpadding="0" cellspacing="0"><tr>
              <td width="20%" style="border-bottom:1px solid #141414;"></td>
              <td width="60%" style="border-bottom:1px solid #1C1C1C;"></td>
              <td width="20%" style="border-bottom:1px solid #141414;"></td>
            </tr></table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="text-align:center;">
            <div style="font-size:11px;color:#2A2825;">© ${year()} Artemis Montres · Montréal, Québec</div>
            <div style="font-size:11px;color:#2A2825;margin-top:4px;">You received this email because you placed an order.</div>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildWelcomeEmailHtml({ name, promoCode }: { name: string | null; promoCode: string }): string {
  const firstName = name?.split(' ')[0] ?? 'there';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>Welcome to ARTEMIS</title>
</head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;padding:48px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Wordmark -->
        <tr>
          <td style="padding-bottom:28px;text-align:center;">
            <div style="font-size:20px;font-weight:700;letter-spacing:0.22em;color:#C9A96E;text-transform:uppercase;">ARTEMIS</div>
            <div style="font-size:9px;letter-spacing:0.32em;color:#3A3835;text-transform:uppercase;margin-top:5px;">Luxury Watches · Montréal</div>
          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td style="padding-bottom:32px;">
            <table width="100%" cellpadding="0" cellspacing="0"><tr>
              <td width="20%" style="border-bottom:1px solid #1C1C1C;"></td>
              <td width="60%" style="border-bottom:1px solid #C9A96E;opacity:0.4;"></td>
              <td width="20%" style="border-bottom:1px solid #1C1C1C;"></td>
            </tr></table>
          </td>
        </tr>

        <!-- Headline -->
        <tr>
          <td style="padding-bottom:28px;">
            <div style="font-size:26px;font-weight:600;color:#F5F3EF;line-height:1.2;">Welcome to ARTEMIS, ${firstName}.</div>
            <div style="font-size:14px;color:#A8A5A0;margin-top:12px;line-height:1.7;">Your account is ready. Below is your welcome code for a first order, along with the details you may want to keep on hand.</div>
          </td>
        </tr>

        <!-- Promo code card -->
        <tr>
          <td style="padding-bottom:28px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#141414;border:1px solid #C9A96E;border-color:rgba(201,169,110,0.3);border-radius:3px;">
              <tr><td style="padding:28px 24px;text-align:center;">
                <div style="font-size:9px;letter-spacing:0.2em;color:#A8A5A0;text-transform:uppercase;margin-bottom:16px;">Your welcome code</div>
                <table cellpadding="0" cellspacing="0" align="center">
                  <tr>
                    <td style="background:rgba(201,169,110,0.08);border:1px solid rgba(201,169,110,0.25);border-radius:2px;padding:13px 28px;">
                      <span style="font-size:22px;font-weight:700;letter-spacing:0.15em;color:#C9A96E;">${promoCode}</span>
                    </td>
                  </tr>
                </table>
                <div style="font-size:12px;color:#3A3835;margin-top:14px;">Available on a first order. One-time use. Expires in 48 hours.</div>
              </td></tr>
            </table>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="padding-bottom:28px;text-align:center;">
            <a href="${SITE_URL}/en/collections" style="display:inline-block;background:#C9A96E;color:#0A0A0A;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;text-decoration:none;padding:14px 34px;border-radius:1px;">
              View the Collection &rarr;
            </a>
          </td>
        </tr>

        <!-- What to expect -->
        <tr>
          <td style="padding-bottom:28px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#141414;border:1px solid #1C1C1C;border-radius:3px;">
              <tr><td style="padding:20px 24px;">
                <div style="font-size:9px;letter-spacing:0.16em;color:#3A3835;text-transform:uppercase;margin-bottom:14px;">What to expect</div>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr><td style="padding:5px 0;font-size:13px;color:#A8A5A0;">→&nbsp; Each piece is reviewed before shipment</td></tr>
                  <tr><td style="padding:5px 0;font-size:13px;color:#A8A5A0;">→&nbsp; Tracked shipping across Canada</td></tr>
                  <tr><td style="padding:5px 0;font-size:13px;color:#A8A5A0;">→&nbsp; 30-day return window</td></tr>
                  <tr><td style="padding:5px 0;font-size:13px;color:#A8A5A0;">→&nbsp; Direct support by WhatsApp or email</td></tr>
                </table>
              </td></tr>
            </table>
          </td>
        </tr>

        <!-- Contact -->
        <tr>
          <td style="padding-bottom:32px;text-align:center;">
            <div style="font-size:13px;color:#6B6965;">WhatsApp us anytime at <a href="https://wa.me/15145609765" style="color:#C9A96E;text-decoration:none;">+1 514 560-9765</a></div>
          </td>
        </tr>

        <!-- Footer divider -->
        <tr>
          <td style="padding-bottom:20px;">
            <table width="100%" cellpadding="0" cellspacing="0"><tr>
              <td width="20%" style="border-bottom:1px solid #141414;"></td>
              <td width="60%" style="border-bottom:1px solid #1C1C1C;"></td>
              <td width="20%" style="border-bottom:1px solid #141414;"></td>
            </tr></table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="text-align:center;">
            <div style="font-size:11px;color:#2A2825;">© ${year()} Artemis Montres · Montréal, Québec</div>
            <div style="font-size:11px;color:#2A2825;margin-top:4px;">You received this because you created an account at artemis-watches.com</div>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildPasswordResetEmailHtml({ code }: { code: string }): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>Password reset — ARTEMIS</title>
</head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;padding:48px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr>
          <td style="padding-bottom:28px;text-align:center;">
            <div style="font-size:20px;font-weight:700;letter-spacing:0.22em;color:#C9A96E;text-transform:uppercase;">ARTEMIS</div>
            <div style="font-size:9px;letter-spacing:0.32em;color:#3A3835;text-transform:uppercase;margin-top:5px;">Luxury Watches · Montréal</div>
          </td>
        </tr>
        <tr>
          <td style="padding-bottom:28px;">
            <div style="font-size:26px;font-weight:600;color:#F5F3EF;line-height:1.2;">Your Artemis password reset code</div>
            <div style="font-size:14px;color:#A8A5A0;margin-top:12px;line-height:1.7;">Use the 6-digit code below to reset your password. This code expires in 15 minutes.</div>
          </td>
        </tr>
        <tr>
          <td style="padding-bottom:28px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#141414;border:1px solid rgba(201,169,110,0.3);border-radius:3px;">
              <tr><td style="padding:28px 24px;text-align:center;">
                <div style="font-size:9px;letter-spacing:0.2em;color:#A8A5A0;text-transform:uppercase;margin-bottom:16px;">Reset code</div>
                <span style="font-size:28px;font-weight:700;letter-spacing:0.35em;color:#C9A96E;">${code}</span>
              </td></tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding-bottom:20px;text-align:center;">
            <div style="font-size:13px;color:#6B6965;">If you didn't request this, you can ignore this email.</div>
          </td>
        </tr>
        <tr>
          <td style="text-align:center;">
            <div style="font-size:11px;color:#2A2825;">© ${year()} Artemis Montres · Montréal, Québec</div>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── Public send functions ────────────────────────────────────────────────────
export async function sendOrderConfirmation(args: SendOrderConfirmationArgs): Promise<void> {
  if (!resend) {
    console.warn('[email] RESEND_API_KEY not set — skipping order confirmation email');
    return;
  }

  const shortId = args.orderId.slice(-8).toUpperCase();

  const sent = await sendWithFallback({
    to: args.to,
    subject: `Order confirmed — ARTEMIS #${shortId}`,
    html: buildOrderConfirmationHtml(args),
  });

  if (!sent) {
    console.error('[email] Failed to send order confirmation.');
  }
}

export async function sendWelcomeEmail(args: SendWelcomeEmailArgs): Promise<void> {
  if (!resend) {
    console.warn('[email] RESEND_API_KEY not set — skipping welcome email');
    return;
  }

  const sent = await sendWithFallback({
    to: args.to,
    subject: 'Welcome to ARTEMIS — Your welcome code',
    html: buildWelcomeEmailHtml(args),
  });

  if (!sent) {
    console.error('[email] Failed to send welcome email.');
  }
}

export async function sendPasswordResetCodeEmail(
  args: SendPasswordResetCodeArgs
): Promise<boolean> {
  if (!resend) {
    console.warn('[email] RESEND_API_KEY not set — skipping password reset email');
    return false;
  }

  return sendWithFallback({
    to: args.to,
    subject: 'Your Artemis password reset code',
    html: buildPasswordResetEmailHtml(args),
  });
}
