
import type { Metadata } from 'next';
import Link from 'next/link';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { FAQPageAccordion } from '@/components/faq/FAQPageAccordion';

export const metadata: Metadata = {
  title: 'FAQ — ARTEMIS Watches',
  description:
    'Frequently asked questions about ARTEMIS. Shipping, returns, product authenticity, payments, and more.',
};

const FAQ_CATEGORIES = [
  {
    id: 'shipping',
    label: 'Shipping',
    items: [
      {
        q: 'How long does shipping take?',
        a: 'Canadian orders typically arrive in 3–7 business days via tracked courier. International orders take 7–14 business days. All orders include a tracking number sent to your email upon dispatch.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'Yes. We ship to most countries worldwide. International shipping rates are calculated at checkout based on destination. Some restrictions may apply for certain regions — contact us on WhatsApp if you are unsure.',
      },
      {
        q: 'Is shipping free?',
        a: 'Free shipping is available on all Canadian orders. International shipping costs vary by destination and are shown at checkout.',
      },
      {
        q: 'Can I track my order?',
        a: 'Absolutely. Once your order is dispatched, you will receive a tracking number by email. You can track your shipment in real-time through the courier\'s website.',
      },
      {
        q: 'How is the watch packaged?',
        a: 'Every watch is packaged with care in a secure, discreet box with protective padding. Presentation is premium — nothing visually identifies the contents from the outside for security reasons.',
      },
    ],
  },
  {
    id: 'returns',
    label: 'Returns & Guarantee',
    items: [
      {
        q: 'What is the 30-day guarantee?',
        a: 'If your watch does not meet your expectations for any reason — condition, aesthetics, anything — you can return it within 30 days of receipt for a full refund. No restocking fees. No questions asked.',
      },
      {
        q: 'How do I initiate a return?',
        a: 'Simply contact us on WhatsApp or by email at hello@artemis-watches.com within 30 days of receiving your order. We will send you a prepaid return label and process your refund within 5–7 business days of receiving the watch.',
      },
      {
        q: 'In what condition should I return the watch?',
        a: 'The watch should be returned in the same condition as received — unworn or worn only for inspection — with all original packaging included. We will not accept returns on pieces that show clear signs of extended wear beyond reasonable inspection.',
      },
      {
        q: 'How long does a refund take?',
        a: 'Once we receive and inspect the returned watch, refunds are processed within 5–7 business days. The amount will appear on your original payment method.',
      },
    ],
  },
  {
    id: 'products',
    label: 'Products & Authenticity',
    items: [
      {
        q: 'Are the watches authentic?',
        a: 'Yes. Authenticity is our absolute standard. Every watch is hand-inspected before listing. We verify movement accuracy, case markings, dial details, bracelet engravings, and all other authenticity indicators specific to each brand and model.',
      },
      {
        q: 'What brands do you carry?',
        a: 'We carry four of the most prestigious watchmaking Maisons in the world: Rolex (Submariner, Datejust, GMT-Master II, Daytona), Cartier (Santos de Cartier, Panthère de Cartier), Audemars Piguet (Royal Oak), and Patek Philippe (Nautilus, Aquanaut).',
      },
      {
        q: 'What is the difference between Essential and Premium ranges?',
        a: 'The Essential Range ($300–$350 CAD) includes entry-level luxury timepieces with excellent value. The Premium Range ($900–$1,600 CAD) features iconic references with higher desirability and rarity. Both ranges are held to the same strict inspection standard.',
      },
      {
        q: 'Do the watches come with box and papers?',
        a: 'Box and papers are available as an optional add-on for $49 CAD at checkout, where available. Not all pieces include original documentation — check the individual product listing for details.',
      },
      {
        q: 'What is included with every order?',
        a: 'Every ARTEMIS order includes: the watch, a professional bracelet adjustment tool, premium protective packaging, and a digital authenticity confirmation. Some pieces may also include original box and papers.',
      },
      {
        q: 'Can I see the watch in person before buying?',
        a: 'Yes. Montreal-based clients can arrange a private in-person viewing. Contact us on WhatsApp at 514-560-9765 to schedule an appointment.',
      },
    ],
  },
  {
    id: 'payment',
    label: 'Payments',
    items: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit and debit cards (Visa, Mastercard, American Express), Apple Pay, Google Pay, and other methods available through our Stripe checkout. All payments are processed securely.',
      },
      {
        q: 'Is my payment information secure?',
        a: 'Yes. All payments are processed through Stripe, one of the world\'s most trusted payment processors. ARTEMIS never stores your credit card information — all data is handled by Stripe\'s PCI-compliant infrastructure.',
      },
      {
        q: 'Can I pay in installments?',
        a: 'Installment options (4x payments) are available at checkout through eligible payment methods. The option will appear automatically if your order and payment method qualify.',
      },
      {
        q: 'Do you accept PayPal?',
        a: 'PayPal is not currently available at checkout, but you can pay securely with Visa, Mastercard, or any card supported by Stripe. If you have a specific payment need, contact us on WhatsApp.',
      },
    ],
  },
  {
    id: 'account',
    label: 'Account & Promo',
    items: [
      {
        q: 'How does the 10% discount work?',
        a: 'Create an account at artemis-watches.com and your unique 10% promo code is sent to you instantly by email. The code is valid on any timepiece in any range — no minimum purchase required. It is one-time use.',
      },
      {
        q: 'Can I use my promo code more than once?',
        a: 'No. Each promo code is unique and valid for one order only. Once used, it expires automatically.',
      },
      {
        q: 'I created an account but did not receive my promo code — what do I do?',
        a: 'Check your spam or junk folder first. If the code is not there within a few minutes, contact us at hello@artemis-watches.com or on WhatsApp and we will send it to you directly.',
      },
      {
        q: 'Can I combine my promo code with other offers?',
        a: 'Promo codes cannot be combined with other active promotions. They apply to the product price before shipping.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        style={{
          background: '#0A0A0A',
          padding: 'clamp(96px, 14vw, 160px) 24px clamp(64px, 10vw, 112px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '-20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 500,
            height: 500,
            background: 'radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative' }}>
          <ScrollReveal delay={0}>
            <p
              style={{
                fontSize: '0.68rem',
                fontWeight: 600,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#C9A96E',
                marginBottom: 24,
              }}
            >
              FAQ
            </p>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h1
              style={{
                fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)',
                fontWeight: 600,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                color: '#F5F3EF',
                marginBottom: 24,
              }}
            >
              Frequently Asked
              <br />
              Questions.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p
              style={{
                fontSize: '1rem',
                color: '#A8A5A0',
                lineHeight: 1.75,
              }}
            >
              Everything you need to know about ordering, shipping, returns, and
              authenticity. Can&apos;t find your answer? We&apos;re one message away.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Accordion ── */}
      <section
        style={{
          background: '#0A0A0A',
          padding: 'clamp(64px, 9vw, 104px) 24px',
        }}
      >
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <FAQPageAccordion categories={FAQ_CATEGORIES} />
        </div>
      </section>

      {/* ── Still have questions ── */}
      <section
        style={{
          background: '#111',
          padding: 'clamp(64px, 9vw, 96px) 24px',
          textAlign: 'center',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <ScrollReveal delay={0}>
            <p
              style={{
                fontSize: '0.68rem',
                fontWeight: 600,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#C9A96E',
                marginBottom: 20,
              }}
            >
              STILL HAVE QUESTIONS?
            </p>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h2
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: '#F5F3EF',
                marginBottom: 16,
              }}
            >
              We&apos;re one message away.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={140}>
            <p
              style={{
                fontSize: '0.9rem',
                color: '#A8A5A0',
                lineHeight: 1.75,
                marginBottom: 36,
              }}
            >
              Our team responds on WhatsApp within minutes during business hours.
              No bots. No ticket queues. Just real answers from real people.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={180}>
            <style>{`
              .faq-btn-whatsapp {
                display: inline-block;
                padding: 14px 32px;
                background: #F5F3EF;
                color: #0A0A0A;
                font-size: 0.78rem;
                font-weight: 700;
                letter-spacing: 0.12em;
                text-transform: uppercase;
                text-decoration: none;
                transition: background 0.2s;
              }
              .faq-btn-whatsapp:hover {
                background: #C9A96E;
              }
              .faq-btn-contact {
                display: inline-block;
                padding: 14px 32px;
                border: 1px solid rgba(255,255,255,0.1);
                color: #A8A5A0;
                font-size: 0.78rem;
                font-weight: 600;
                letter-spacing: 0.12em;
                text-transform: uppercase;
                text-decoration: none;
                transition: border-color 0.2s, color 0.2s;
              }
              .faq-btn-contact:hover {
                border-color: rgba(201,169,110,0.4);
                color: #C9A96E;
              }
            `}</style>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="https://wa.me/15145609765?text=Hello%20ARTEMIS%2C%20I%20have%20a%20question."
                target="_blank"
                rel="noopener noreferrer"
                className="faq-btn-whatsapp"
              >
                WhatsApp Us →
              </a>
              <Link
                href="/contact"
                className="faq-btn-contact"
              >
                Contact Page
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
