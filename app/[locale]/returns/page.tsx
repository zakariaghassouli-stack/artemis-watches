import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/LegalLayout';

export const metadata: Metadata = {
  title: 'Return Policy — ARTEMIS Watches',
  description:
    'ARTEMIS 30-day return policy. Full refund, no questions asked. Learn how to initiate a return and what to expect.',
};

const SECTIONS = [
  { id: 'overview', title: '30-Day Guarantee' },
  { id: 'eligibility', title: 'Eligibility' },
  { id: 'how-to-return', title: 'How to Return' },
  { id: 'condition', title: 'Condition Requirements' },
  { id: 'refunds', title: 'Refund Process' },
  { id: 'exchanges', title: 'Exchanges' },
  { id: 'exceptions', title: 'Exceptions' },
  { id: 'contact', title: 'Contact Us' },
];

export default function ReturnPolicyPage() {
  return (
    <LegalLayout
      overline="LEGAL"
      title="Return Policy"
      lastUpdated="January 1, 2025"
      sections={SECTIONS}
    >
      <h2 id="overview">30-Day Money-Back Guarantee</h2>
      <div className="legal-highlight">
        <p>
          <strong>ARTEMIS stands behind every piece we sell.</strong> If you are not
          completely satisfied with your purchase for any reason, you may return it within
          30 days of the delivery date for a full refund — no questions asked.
        </p>
      </div>
      <p>
        We want every client to feel confident purchasing from ARTEMIS. The 30-day guarantee
        exists because we are confident in the quality of our timepieces and in our
        commitment to transparency. If a watch does not meet your expectations, we will
        make it right.
      </p>

      <hr className="section-divider" />
      <h2 id="eligibility">Return Eligibility</h2>
      <p>To be eligible for a return, the following conditions must be met:</p>
      <ul>
        <li>The return request must be initiated within <strong>30 calendar days</strong> of the confirmed delivery date.</li>
        <li>The watch must be returned in its original or equivalent condition (see Condition Requirements below).</li>
        <li>All original packaging, accessories, and documentation included with your order must be returned.</li>
        <li>The order must have been placed directly through <strong>artemis-watches.com</strong>.</li>
      </ul>
      <p>
        Returns purchased through third-party channels (Facebook Marketplace, Snapchat,
        private sale) are governed by the terms of that specific transaction.
      </p>

      <hr className="section-divider" />
      <h2 id="how-to-return">How to Initiate a Return</h2>
      <h3>Step 1 — Contact us</h3>
      <p>
        Reach out to us within 30 days of delivery via one of the following channels:
      </p>
      <ul>
        <li>
          <strong>WhatsApp:</strong>{' '}
          <a href="https://wa.me/15145609765" target="_blank" rel="noopener noreferrer">
            514-560-9765
          </a>{' '}
          — fastest response
        </li>
        <li>
          <strong>Email:</strong>{' '}
          <a href="mailto:hello@artemis-watches.com">hello@artemis-watches.com</a>
        </li>
      </ul>
      <p>
        Please include your order number and a brief description of the reason for your
        return. We will confirm receipt and send you return instructions within 1 business
        day.
      </p>

      <h3>Step 2 — Pack and ship</h3>
      <p>
        Once your return is approved, we will provide a <strong>prepaid return shipping label</strong>.
        Pack the watch securely in its original packaging. Drop off at the designated carrier
        location shown on the label.
      </p>

      <h3>Step 3 — Refund issued</h3>
      <p>
        Once we receive and inspect the returned item (typically 1–2 business days after
        receipt), we will process your refund. See the Refund Process section below for timing.
      </p>

      <hr className="section-divider" />
      <h2 id="condition">Condition Requirements</h2>
      <p>
        We ask that returned watches be in substantially the same condition as when they
        were shipped to you. Specifically:
      </p>
      <ul>
        <li>The watch may have been worn for <strong>inspection and evaluation purposes</strong> only.</li>
        <li>No physical damage, scratches, or alterations beyond normal handling should be present.</li>
        <li>The bracelet adjustment tool, if included, must be returned.</li>
        <li>Any included Box &amp; Papers accessory must be returned in original condition.</li>
      </ul>
      <p>
        We reserve the right to assess the condition of the returned item and, in cases of
        significant wear or damage that was not present at time of shipment, to deduct a
        reasonable amount from the refund or decline the return. We will always communicate
        our assessment before acting.
      </p>

      <hr className="section-divider" />
      <h2 id="refunds">Refund Process</h2>
      <p>
        Approved refunds are processed to the <strong>original payment method</strong> used
        at checkout. Refunds are initiated within <strong>5–7 business days</strong> of our
        receipt and inspection of the returned item.
      </p>
      <p>
        Once initiated, the time for the refund to appear in your account depends on your
        bank or payment provider. Typical processing times:
      </p>
      <ul>
        <li><strong>Credit / debit card:</strong> 3–10 business days</li>
        <li><strong>Apple Pay / Google Pay:</strong> 3–5 business days</li>
      </ul>
      <p>
        <strong>Shipping costs are non-refundable</strong>, except in cases where the return
        is due to an error on our part (wrong item shipped, item not as described).
      </p>
      <p>
        Prepaid return labels provided by ARTEMIS are free of charge for all approved returns.
      </p>

      <hr className="section-divider" />
      <h2 id="exchanges">Exchanges</h2>
      <p>
        We do not process direct exchanges at this time. If you wish to exchange a watch for
        a different model or reference, please initiate a return for your original order and
        place a new order for the desired piece. This ensures you are not subject to
        inventory availability delays.
      </p>
      <p>
        For assistance finding an equivalent or alternative timepiece, contact us on WhatsApp
        — we are happy to help you find the right piece.
      </p>

      <hr className="section-divider" />
      <h2 id="exceptions">Exceptions</h2>
      <p>The following items are not eligible for return:</p>
      <ul>
        <li>Items returned more than 30 days after confirmed delivery.</li>
        <li>Items with visible damage caused by the buyer after delivery.</li>
        <li>Items that have been serviced, sized, or altered by a third party after delivery.</li>
        <li>Special-order or reserved pieces explicitly marked as final sale at time of purchase.</li>
      </ul>

      <hr className="section-divider" />
      <h2 id="contact">Contact Us</h2>
      <p>
        If you have any questions about this policy or need assistance with a return,
        please reach out:
      </p>
      <ul>
        <li>
          <strong>WhatsApp:</strong>{' '}
          <a href="https://wa.me/15145609765" target="_blank" rel="noopener noreferrer">514-560-9765</a>
        </li>
        <li>
          <strong>Email:</strong>{' '}
          <a href="mailto:hello@artemis-watches.com">hello@artemis-watches.com</a>
        </li>
        <li><strong>Location:</strong> Montréal, QC, Canada</li>
      </ul>
      <p>
        Our team responds on WhatsApp within minutes during business hours
        (Monday–Saturday, 9am–8pm EST).
      </p>
    </LegalLayout>
  );
}
