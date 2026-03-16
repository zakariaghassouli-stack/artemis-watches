import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/LegalLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy — ARTEMIS Watches',
  description:
    'ARTEMIS Watches privacy policy. How we collect, use, and protect your personal information.',
};

const SECTIONS = [
  { id: 'overview', title: 'Overview' },
  { id: 'collection', title: 'Information We Collect' },
  { id: 'use', title: 'How We Use Your Data' },
  { id: 'sharing', title: 'Sharing & Disclosure' },
  { id: 'cookies', title: 'Cookies' },
  { id: 'retention', title: 'Data Retention' },
  { id: 'rights', title: 'Your Rights' },
  { id: 'security', title: 'Security' },
  { id: 'minors', title: 'Minors' },
  { id: 'contact', title: 'Contact' },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      overline="LEGAL"
      title="Privacy Policy"
      lastUpdated="January 1, 2025"
      sections={SECTIONS}
    >
      <p>
        ARTEMIS Watches (&ldquo;ARTEMIS&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;,
        &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy Policy
        explains how we collect, use, disclose, and safeguard your personal information
        when you visit <strong>artemis-watches.com</strong> or make a purchase from us.
      </p>
      <p>
        This policy is intended to comply with applicable Canadian privacy legislation,
        including the <em>Personal Information Protection and Electronic Documents Act</em>{' '}
        (PIPEDA) and Québec&apos;s <em>Act respecting the protection of personal information
        in the private sector</em> (Law 25).
      </p>

      <hr className="section-divider" />
      <h2 id="collection">1. Information We Collect</h2>
      <h3>Information you provide directly</h3>
      <ul>
        <li><strong>Account information:</strong> name, email address, and password when you create an account.</li>
        <li><strong>Order information:</strong> name, email address, shipping address, and order details when you make a purchase.</li>
        <li><strong>Communications:</strong> messages sent to us via email, WhatsApp, or our contact form.</li>
      </ul>
      <h3>Information collected automatically</h3>
      <ul>
        <li><strong>Usage data:</strong> pages visited, time on site, referring URLs, browser type, and device information.</li>
        <li><strong>Cookies and similar technologies:</strong> see the Cookies section below.</li>
        <li><strong>IP address:</strong> used for security, fraud prevention, and analytics.</li>
      </ul>
      <h3>Payment information</h3>
      <p>
        Payment card details are processed directly by <strong>Stripe</strong>. ARTEMIS
        does not receive, store, or have access to your full card number, CVV, or other
        sensitive payment credentials. Only a tokenised reference and basic transaction
        metadata (amount, currency, status) are stored by us.
      </p>

      <hr className="section-divider" />
      <h2 id="use">2. How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Process and fulfil your orders, including shipping and delivery.</li>
        <li>Send transactional emails (order confirmation, shipping updates, account-related notices).</li>
        <li>Respond to your inquiries and provide customer support.</li>
        <li>Issue your promotional code and manage account benefits.</li>
        <li>Detect, investigate, and prevent fraudulent transactions and abuse.</li>
        <li>Analyse Site usage to improve our products, content, and user experience.</li>
        <li>Comply with legal obligations.</li>
      </ul>
      <h3>Marketing communications</h3>
      <p>
        We may send you marketing emails about new arrivals, promotions, and events if
        you have opted in to such communications. You may unsubscribe at any time by
        clicking the &ldquo;unsubscribe&rdquo; link in any marketing email, or by
        contacting us directly.
      </p>
      <p>
        We do not send unsolicited marketing messages via WhatsApp. Any WhatsApp
        communication is initiated by you.
      </p>

      <hr className="section-divider" />
      <h2 id="sharing">3. Sharing &amp; Disclosure</h2>
      <p>
        We do not sell, rent, or trade your personal information to third parties.
        We may share your information in the following limited circumstances:
      </p>
      <ul>
        <li>
          <strong>Service providers:</strong> We share data with trusted third-party
          service providers who assist us in operating the Site and fulfilling orders.
          These include: Stripe (payments), Vercel (hosting), Resend (transactional email),
          and Supabase (database). These providers are bound by confidentiality obligations
          and may only use your data to provide services to us.
        </li>
        <li>
          <strong>Shipping carriers:</strong> Your name and delivery address are shared
          with shipping carriers to fulfil your order.
        </li>
        <li>
          <strong>Legal obligations:</strong> We may disclose your information if required
          by law, court order, or government authority, or to protect the rights, property,
          or safety of ARTEMIS, our clients, or others.
        </li>
        <li>
          <strong>Business transfer:</strong> In the event of a merger, acquisition, or
          sale of assets, your information may be transferred as part of that transaction.
          You will be notified via email and/or a prominent notice on the Site.
        </li>
      </ul>

      <hr className="section-divider" />
      <h2 id="cookies">4. Cookies</h2>
      <p>
        We use cookies and similar tracking technologies to enhance your experience on
        the Site. Cookies are small text files stored on your device.
      </p>
      <h3>Types of cookies we use</h3>
      <ul>
        <li>
          <strong>Essential cookies:</strong> Required for the Site to function (e.g.,
          session management, authentication, cart persistence). These cannot be disabled.
        </li>
        <li>
          <strong>Analytics cookies:</strong> Help us understand how visitors interact
          with the Site (e.g., pages viewed, session duration). Data is aggregated
          and anonymised where possible.
        </li>
        <li>
          <strong>Preference cookies:</strong> Remember your settings and preferences
          (e.g., language, cart contents).
        </li>
      </ul>
      <h3>Managing cookies</h3>
      <p>
        You can control and delete cookies through your browser settings. Disabling
        certain cookies may affect the functionality of the Site. Our cookie banner
        allows you to manage non-essential cookies upon your first visit.
      </p>

      <hr className="section-divider" />
      <h2 id="retention">5. Data Retention</h2>
      <p>
        We retain your personal information for as long as necessary to fulfil the
        purposes described in this policy, unless a longer retention period is required
        or permitted by law.
      </p>
      <ul>
        <li><strong>Order data:</strong> retained for a minimum of 7 years for tax and legal compliance purposes.</li>
        <li><strong>Account data:</strong> retained for the duration of your account, plus 2 years after deletion.</li>
        <li><strong>Communication records:</strong> retained for up to 3 years.</li>
        <li><strong>Analytics data:</strong> retained in aggregated, anonymised form indefinitely.</li>
      </ul>
      <p>
        You may request deletion of your personal data at any time (see Your Rights below).
        We will comply to the extent not limited by legal obligations.
      </p>

      <hr className="section-divider" />
      <h2 id="rights">6. Your Rights</h2>
      <p>
        Under applicable Canadian privacy law, you have the following rights regarding
        your personal information:
      </p>
      <ul>
        <li><strong>Access:</strong> request a copy of the personal information we hold about you.</li>
        <li><strong>Correction:</strong> request correction of inaccurate or incomplete information.</li>
        <li><strong>Deletion:</strong> request deletion of your personal information, subject to legal retention obligations.</li>
        <li><strong>Withdrawal of consent:</strong> withdraw consent to processing where consent is the legal basis.</li>
        <li><strong>Portability:</strong> receive your data in a structured, machine-readable format (where technically feasible).</li>
        <li><strong>Objection:</strong> object to certain uses of your data, including direct marketing.</li>
      </ul>
      <p>
        To exercise any of these rights, contact us at{' '}
        <a href="mailto:hello@artemis-watches.com">hello@artemis-watches.com</a>. We will
        respond within 30 days of receiving your request. We may need to verify your
        identity before acting on your request.
      </p>
      <p>
        If you believe your privacy rights have not been respected, you have the right to
        file a complaint with the Office of the Privacy Commissioner of Canada or the
        Commission d&apos;accès à l&apos;information du Québec.
      </p>

      <hr className="section-divider" />
      <h2 id="security">7. Security</h2>
      <p>
        We implement appropriate technical and organisational measures to protect your
        personal information against unauthorised access, disclosure, alteration, or
        destruction. These measures include:
      </p>
      <ul>
        <li>HTTPS encryption for all data transmitted between your browser and our servers.</li>
        <li>Encrypted storage of passwords (bcrypt hashing — plaintext passwords are never stored).</li>
        <li>Access controls limiting who within ARTEMIS can access personal data.</li>
        <li>PCI-DSS compliant payment processing via Stripe.</li>
      </ul>
      <p>
        No method of transmission over the internet or electronic storage is 100% secure.
        While we strive to protect your data, we cannot guarantee absolute security.
        In the event of a data breach affecting your rights and freedoms, we will notify
        you and the relevant authorities as required by applicable law.
      </p>

      <hr className="section-divider" />
      <h2 id="minors">8. Minors</h2>
      <p>
        The Site is intended for users who are 18 years of age or older. We do not
        knowingly collect personal information from minors. If we become aware that we
        have collected data from a person under 18 without appropriate consent, we will
        delete that information promptly.
      </p>

      <hr className="section-divider" />
      <h2 id="contact">9. Contact &amp; Privacy Officer</h2>
      <p>
        Questions, requests, or complaints regarding this Privacy Policy or our data
        practices should be addressed to:
      </p>
      <ul>
        <li><strong>Email:</strong>{' '}
          <a href="mailto:hello@artemis-watches.com">hello@artemis-watches.com</a>
        </li>
        <li><strong>WhatsApp:</strong>{' '}
          <a href="https://wa.me/15145609765" target="_blank" rel="noopener noreferrer">514-560-9765</a>
        </li>
        <li><strong>Location:</strong> Montréal, QC, Canada</li>
      </ul>
      <p>
        We are committed to resolving privacy concerns promptly. If you are unsatisfied
        with our response, you may escalate your complaint to the relevant privacy
        authority in your jurisdiction.
      </p>
    </LegalLayout>
  );
}
