import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/LegalLayout';

export const metadata: Metadata = {
  title: 'Terms & Conditions — ARTEMIS Watches',
  description:
    'Terms and conditions governing purchases and use of the ARTEMIS Watches website.',
};

const SECTIONS = [
  { id: 'acceptance', title: 'Acceptance of Terms' },
  { id: 'products', title: 'Products & Pricing' },
  { id: 'orders', title: 'Orders & Payment' },
  { id: 'authenticity', title: 'Authenticity Statement' },
  { id: 'account', title: 'Your Account' },
  { id: 'promo', title: 'Promotional Codes' },
  { id: 'ip', title: 'Intellectual Property' },
  { id: 'liability', title: 'Limitation of Liability' },
  { id: 'governing', title: 'Governing Law' },
  { id: 'contact', title: 'Contact' },
];

export default function TermsPage() {
  return (
    <LegalLayout
      overline="LEGAL"
      title="Terms & Conditions"
      lastUpdated="January 1, 2025"
      sections={SECTIONS}
    >
      <p>
        Please read these Terms and Conditions (&ldquo;Terms&rdquo;) carefully before
        using the ARTEMIS Watches website located at{' '}
        <strong>artemis-watches.com</strong> (the &ldquo;Site&rdquo;) or making a
        purchase from ARTEMIS Watches (&ldquo;ARTEMIS&rdquo;, &ldquo;we&rdquo;,
        &ldquo;us&rdquo;, or &ldquo;our&rdquo;).
      </p>

      <hr className="section-divider" />
      <h2 id="acceptance">1. Acceptance of Terms</h2>
      <p>
        By accessing or using the Site, creating an account, or placing an order, you
        agree to be bound by these Terms and our Privacy Policy. If you do not agree
        to these Terms, please do not use the Site.
      </p>
      <p>
        We reserve the right to update these Terms at any time. Changes take effect
        upon posting to the Site. Continued use of the Site after any change constitutes
        your acceptance of the revised Terms. The &ldquo;Last Updated&rdquo; date at the
        top of this page reflects the most recent revision.
      </p>

      <hr className="section-divider" />
      <h2 id="products">2. Products &amp; Pricing</h2>
      <h3>Product Descriptions</h3>
      <p>
        We make every effort to accurately describe and photograph our products. Colours
        may vary slightly due to monitor calibration and photographic lighting. Product
        descriptions, specifications, and availability are subject to change without notice.
      </p>
      <h3>Pricing</h3>
      <p>
        All prices are displayed in <strong>Canadian dollars (CAD)</strong> and are
        inclusive of applicable taxes where required by law. Prices are subject to change
        at any time without notice. The price applicable to your order is the price
        displayed at the time you complete checkout.
      </p>
      <p>
        In the event of a pricing error, we reserve the right to cancel orders placed at
        the incorrect price. We will notify you promptly and issue a full refund if
        applicable.
      </p>
      <h3>Availability</h3>
      <p>
        All products are subject to availability. We reserve the right to limit quantities
        or discontinue any product at any time. If an item you ordered becomes unavailable
        after purchase, we will notify you and issue a full refund.
      </p>

      <hr className="section-divider" />
      <h2 id="orders">3. Orders &amp; Payment</h2>
      <h3>Order Acceptance</h3>
      <p>
        Placing an order constitutes an offer to purchase. All orders are subject to
        acceptance by ARTEMIS. We reserve the right to refuse or cancel any order at our
        discretion, including orders that appear fraudulent or that we are unable to fulfil.
      </p>
      <p>
        You will receive an order confirmation email upon successful payment. This
        confirmation represents acceptance of your order.
      </p>
      <h3>Payment</h3>
      <p>
        Payments are processed securely through <strong>Stripe</strong>, a PCI-DSS
        compliant payment processor. We accept Visa, Mastercard, American Express,
        Apple Pay, Google Pay, and other methods displayed at checkout.
      </p>
      <p>
        By providing your payment details, you confirm that you are authorised to use
        the payment method and that the information provided is accurate. ARTEMIS does
        not store your full payment card information.
      </p>
      <h3>Installment Payments</h3>
      <p>
        Where available, installment payment options are subject to the terms and
        conditions of the applicable third-party payment provider.
      </p>

      <hr className="section-divider" />
      <h2 id="authenticity">4. Authenticity Statement</h2>
      <div className="legal-highlight">
        <p>
          ARTEMIS warrants that every timepiece sold through our platform has been
          personally inspected and verified for authenticity prior to listing. We do
          not knowingly sell counterfeit goods. Each watch is authenticated based on
          movement, case markings, dial characteristics, bracelet engravings, and
          other brand-specific indicators.
        </p>
      </div>
      <p>
        Our authenticity guarantee is backed by our 30-day return policy. If, following
        purchase, a timepiece is determined by a credentialed watchmaker or authorised
        dealer to be non-authentic, ARTEMIS will issue a full refund upon return of the
        item, regardless of the time elapsed since purchase.
      </p>
      <p>
        ARTEMIS is an independent reseller and is not affiliated with, endorsed by, or
        authorised by Rolex, Cartier, Audemars Piguet, Patek Philippe, or any of their
        parent companies or subsidiaries.
      </p>

      <hr className="section-divider" />
      <h2 id="account">5. Your Account</h2>
      <p>
        You may create an account on the Site to access account features, order history,
        and promotional benefits. You are responsible for maintaining the confidentiality
        of your login credentials and for all activity that occurs under your account.
      </p>
      <p>
        You agree to provide accurate, current, and complete information when creating
        your account and to update this information as necessary. We reserve the right
        to suspend or terminate accounts that violate these Terms or are used for
        fraudulent purposes.
      </p>

      <hr className="section-divider" />
      <h2 id="promo">6. Promotional Codes</h2>
      <p>
        Promotional codes issued by ARTEMIS (including the welcome 10% discount) are
        subject to the following conditions:
      </p>
      <ul>
        <li>Codes are personal, non-transferable, and valid for one-time use only.</li>
        <li>Codes may not be combined with other active promotions unless explicitly stated.</li>
        <li>Codes apply to product prices and do not reduce shipping charges.</li>
        <li>ARTEMIS reserves the right to modify or revoke promotional codes at any time.</li>
        <li>Codes obtained through unauthorised channels (e.g., resale, scraping) are void.</li>
      </ul>

      <hr className="section-divider" />
      <h2 id="ip">7. Intellectual Property</h2>
      <p>
        All content on the Site — including text, photography, design, logos, icons,
        and software — is the property of ARTEMIS or its content suppliers and is
        protected by applicable copyright, trademark, and other intellectual property laws.
      </p>
      <p>
        You may not reproduce, distribute, modify, display, or create derivative works
        from any content on the Site without prior written permission from ARTEMIS.
      </p>
      <p>
        Brand names and trademarks appearing on product listings (Rolex, Cartier,
        Audemars Piguet, Patek Philippe) belong to their respective owners and are used
        solely for descriptive identification purposes.
      </p>

      <hr className="section-divider" />
      <h2 id="liability">8. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by applicable law, ARTEMIS and its directors,
        employees, and agents shall not be liable for any indirect, incidental, special,
        consequential, or punitive damages arising from your use of the Site or purchase
        of products, even if ARTEMIS has been advised of the possibility of such damages.
      </p>
      <p>
        Our total liability to you for any claim arising from a purchase shall not exceed
        the amount paid by you for the product giving rise to the claim.
      </p>
      <p>
        Nothing in these Terms limits or excludes liability that cannot be limited or
        excluded under applicable Canadian consumer protection legislation.
      </p>

      <hr className="section-divider" />
      <h2 id="governing">9. Governing Law</h2>
      <p>
        These Terms are governed by and construed in accordance with the laws of the
        Province of <strong>Québec</strong> and the federal laws of Canada applicable
        therein. Any dispute arising under these Terms shall be subject to the exclusive
        jurisdiction of the courts of Québec.
      </p>
      <p>
        If you are a consumer, you may also benefit from mandatory provisions of the
        consumer protection laws applicable in your jurisdiction.
      </p>

      <hr className="section-divider" />
      <h2 id="contact">10. Contact</h2>
      <p>
        For questions about these Terms, please contact us:
      </p>
      <ul>
        <li><strong>WhatsApp:</strong>{' '}
          <a href="https://wa.me/15145609765" target="_blank" rel="noopener noreferrer">514-560-9765</a>
        </li>
        <li><strong>Email:</strong>{' '}
          <a href="mailto:hello@artemis-watches.com">hello@artemis-watches.com</a>
        </li>
        <li><strong>Location:</strong> Montréal, QC, Canada</li>
      </ul>
    </LegalLayout>
  );
}
