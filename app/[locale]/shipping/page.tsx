import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/LegalLayout';

export const metadata: Metadata = {
  title: 'Shipping Policy — ARTEMIS Watches',
  description:
    'ARTEMIS shipping policy. Free shipping across Canada, international delivery, tracking, and processing times.',
};

const SECTIONS = [
  { id: 'overview', title: 'Overview' },
  { id: 'processing', title: 'Order Processing' },
  { id: 'canada', title: 'Canadian Shipping' },
  { id: 'international', title: 'International Shipping' },
  { id: 'tracking', title: 'Tracking' },
  { id: 'packaging', title: 'Packaging & Security' },
  { id: 'delays', title: 'Delays & Issues' },
  { id: 'contact', title: 'Contact Us' },
];

export default function ShippingPolicyPage() {
  return (
    <LegalLayout
      overline="LEGAL"
      title="Shipping Policy"
      lastUpdated="January 1, 2025"
      sections={SECTIONS}
    >
      <h2 id="overview">Overview</h2>
      <div className="legal-highlight">
        <p>
          <strong>Free tracked shipping on all Canadian orders.</strong> Every order is
          carefully packaged and dispatched from our Montréal atelier within 1–2 business
          days. International shipping is available to most countries worldwide.
        </p>
      </div>
      <p>
        We ship via trusted national and international carriers to ensure your timepiece
        arrives safely, on time, and in perfect condition. All shipments include a tracking
        number.
      </p>

      <hr className="section-divider" />
      <h2 id="processing">Order Processing</h2>
      <p>
        Orders are processed within <strong>1–2 business days</strong> of payment
        confirmation. Business days are Monday through Friday, excluding Canadian federal
        holidays.
      </p>
      <p>
        Orders placed on weekends or holidays will begin processing on the next business
        day. You will receive a shipping confirmation email with your tracking number once
        your order has been dispatched.
      </p>
      <p>
        For time-sensitive orders or expedited dispatch, contact us on WhatsApp at
        514-560-9765 before placing your order and we will do our best to accommodate.
      </p>

      <hr className="section-divider" />
      <h2 id="canada">Canadian Shipping</h2>
      <h3>Rates</h3>
      <ul>
        <li><strong>Free tracked shipping</strong> on all orders shipped within Canada — no minimum order value.</li>
        <li>Expedited options may be available at checkout for an additional fee.</li>
      </ul>

      <h3>Delivery Timeframes</h3>
      <p>
        Estimated delivery times after dispatch (business days):
      </p>
      <ul>
        <li><strong>Québec &amp; Ontario:</strong> 2–4 business days</li>
        <li><strong>Western Canada (BC, AB, SK, MB):</strong> 3–6 business days</li>
        <li><strong>Atlantic Canada:</strong> 4–7 business days</li>
        <li><strong>Northern territories:</strong> 5–10 business days</li>
      </ul>
      <p>
        These are estimates based on standard carrier performance and do not constitute
        guaranteed delivery dates. Delays may occur during peak periods (e.g., holiday season).
      </p>

      <hr className="section-divider" />
      <h2 id="international">International Shipping</h2>
      <p>
        ARTEMIS ships internationally to most countries. International shipping rates and
        estimated delivery times are calculated at checkout based on the destination country
        and package weight.
      </p>
      <h3>Estimated Delivery Times</h3>
      <ul>
        <li><strong>United States:</strong> 4–8 business days</li>
        <li><strong>Europe:</strong> 7–14 business days</li>
        <li><strong>Rest of World:</strong> 10–21 business days</li>
      </ul>
      <h3>Customs, Duties &amp; Taxes</h3>
      <p>
        International orders may be subject to customs duties, import taxes, or other fees
        levied by the destination country. These charges are the sole responsibility of the
        recipient and are not included in the order total at checkout.
      </p>
      <p>
        ARTEMIS is not responsible for delays caused by customs processing. We recommend
        checking your country's import regulations before placing an order.
      </p>
      <h3>Restricted Countries</h3>
      <p>
        We currently do not ship to countries subject to Canadian or international trade
        sanctions. If your country is not available at checkout, please contact us —
        we will advise on available options.
      </p>

      <hr className="section-divider" />
      <h2 id="tracking">Order Tracking</h2>
      <p>
        Every order placed on artemis-watches.com includes a tracking number. Once your
        order is dispatched, you will receive a shipping confirmation email containing:
      </p>
      <ul>
        <li>Your tracking number</li>
        <li>The carrier name</li>
        <li>A direct link to the carrier's tracking portal</li>
      </ul>
      <p>
        You can also track your order by logging into your ARTEMIS account under
        <strong> Order History</strong>, or by contacting us on WhatsApp with your order number.
      </p>

      <hr className="section-divider" />
      <h2 id="packaging">Packaging &amp; Security</h2>
      <p>
        Each ARTEMIS order is packaged with the following priorities:
      </p>
      <ul>
        <li>
          <strong>Discreet outer packaging:</strong> The external box does not display
          brand names, watch references, or any indication of the contents — minimising
          the risk of theft in transit.
        </li>
        <li>
          <strong>Protective inner packaging:</strong> The watch is secured with foam
          inserts and protective wrapping to prevent movement and scratching during transit.
        </li>
        <li>
          <strong>Tamper-evident sealing:</strong> Packages are sealed in a way that
          makes tampering visible upon delivery.
        </li>
      </ul>
      <p>
        If your package arrives with visible damage to the outer box, please photograph
        the condition before opening and contact us immediately.
      </p>

      <hr className="section-divider" />
      <h2 id="delays">Delays &amp; Issues</h2>
      <h3>My order hasn't arrived</h3>
      <p>
        If your tracking shows your order as delivered but you have not received it, or if
        your tracking has not updated for more than 5 business days, please contact us.
        We will open an investigation with the carrier on your behalf.
      </p>
      <h3>Lost or stolen packages</h3>
      <p>
        In the rare event that a package is confirmed lost by the carrier, ARTEMIS will
        either reship the order (subject to availability) or issue a full refund. We are
        not responsible for packages marked as delivered to the correct address but not
        received by the buyer.
      </p>
      <h3>Incorrect address</h3>
      <p>
        Please ensure your shipping address is correct at checkout. ARTEMIS is not
        responsible for orders shipped to incorrect addresses provided by the buyer.
        If you notice an error after placing your order, contact us immediately on WhatsApp
        — we will attempt to redirect the shipment if it has not yet been dispatched.
      </p>

      <hr className="section-divider" />
      <h2 id="contact">Contact Us</h2>
      <p>
        For any shipping questions or concerns:
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
        We respond on WhatsApp within minutes during business hours
        (Monday–Saturday, 9am–8pm EST).
      </p>
    </LegalLayout>
  );
}
