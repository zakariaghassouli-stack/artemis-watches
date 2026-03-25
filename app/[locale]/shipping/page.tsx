import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/LegalLayout';
import { getLocale } from 'next-intl/server';
import { getGeneralWhatsAppMessage, getWhatsAppUrl } from '@/lib/whatsapp';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return {
    title:
      locale === 'fr'
        ? 'Politique d’expedition — ARTEMIS Watches'
        : 'Shipping Policy — ARTEMIS Watches',
    description:
      locale === 'fr'
        ? 'Politique d’expedition ARTEMIS. Livraison suivie au Canada, expedition internationale, suivi et delais de traitement.'
        : 'ARTEMIS shipping policy. Tracked Canada shipping, international delivery, tracking, and processing times.',
  };
}

export default async function ShippingPolicyPage() {
  const locale = await getLocale();
  const isFr = locale === 'fr';
  const whatsappUrl = getWhatsAppUrl(getGeneralWhatsAppMessage(locale));

  const sections = isFr
    ? [
        { id: 'overview', title: 'Vue d’ensemble' },
        { id: 'processing', title: 'Traitement des commandes' },
        { id: 'canada', title: 'Livraison au Canada' },
        { id: 'international', title: 'Livraison internationale' },
        { id: 'tracking', title: 'Suivi' },
        { id: 'packaging', title: 'Emballage et securite' },
        { id: 'delays', title: 'Retards et incidents' },
        { id: 'contact', title: 'Nous joindre' },
      ]
    : [
        { id: 'overview', title: 'Overview' },
        { id: 'processing', title: 'Order Processing' },
        { id: 'canada', title: 'Canadian Shipping' },
        { id: 'international', title: 'International Shipping' },
        { id: 'tracking', title: 'Tracking' },
        { id: 'packaging', title: 'Packaging & Security' },
        { id: 'delays', title: 'Delays & Issues' },
        { id: 'contact', title: 'Contact Us' },
      ];

  return (
    <LegalLayout
      overline="LEGAL"
      title={isFr ? "Politique d'expedition" : 'Shipping Policy'}
      lastUpdated={isFr ? '1 janvier 2025' : 'January 1, 2025'}
      sections={sections}
    >
      {isFr ? (
        <>
          <h2 id="overview">Vue d&apos;ensemble</h2>
          <div className="legal-highlight">
            <p>
              <strong>Livraison suivie gratuite sur toutes les commandes canadiennes.</strong>{' '}
              Chaque commande est soigneusement emballee et expediée depuis notre atelier de
              Montreal dans un delai de 1 a 2 jours ouvrables. L&apos;expedition internationale
              est offerte vers la majorite des destinations.
            </p>
          </div>
          <p>
            Nous expedions par l&apos;intermediaire de transporteurs nationaux et
            internationaux de confiance afin que votre montre arrive en toute securite, a
            temps et en parfait etat. Toutes les expeditions incluent un numero de suivi.
          </p>

          <hr className="section-divider" />
          <h2 id="processing">Traitement des commandes</h2>
          <p>
            Les commandes sont traitees dans un delai de <strong>1 a 2 jours ouvrables</strong>{' '}
            suivant la confirmation du paiement. Les jours ouvrables vont du lundi au
            vendredi, a l&apos;exclusion des jours feries federaux canadiens.
          </p>
          <p>
            Les commandes passees la fin de semaine ou un jour ferie sont prises en charge
            le prochain jour ouvrable. Vous recevrez un courriel de confirmation
            d&apos;expedition avec votre numero de suivi des que votre commande sera remise au
            transporteur.
          </p>
          <p>
            Pour une commande urgente ou une expedition acceleree, contactez-nous sur
            WhatsApp au 514-560-9765 avant de passer la commande. Nous ferons notre possible
            pour nous adapter.
          </p>

          <hr className="section-divider" />
          <h2 id="canada">Livraison au Canada</h2>
          <h3>Tarifs</h3>
          <ul>
            <li>
              <strong>Livraison suivie gratuite</strong> sur toutes les commandes expediees
              au Canada, sans minimum d&apos;achat.
            </li>
            <li>Des options accelerees peuvent etre proposees a la caisse moyennant des frais supplementaires.</li>
          </ul>

          <h3>Delais de livraison</h3>
          <p>Estimations apres expedition, en jours ouvrables :</p>
          <ul>
            <li>
              <strong>Quebec et Ontario :</strong> 2 a 4 jours ouvrables
            </li>
            <li>
              <strong>Ouest canadien (C.-B., Alb., Sask., Man.) :</strong> 3 a 6 jours
              ouvrables
            </li>
            <li>
              <strong>Canada atlantique :</strong> 4 a 7 jours ouvrables
            </li>
            <li>
              <strong>Territoires du Nord :</strong> 5 a 10 jours ouvrables
            </li>
          </ul>
          <p>
            Ces delais sont indicatifs et ne constituent pas une garantie de livraison. Des
            retards peuvent survenir en periode de pointe, notamment pendant les fetes.
          </p>

          <hr className="section-divider" />
          <h2 id="international">Livraison internationale</h2>
          <p>
            ARTEMIS expedie vers la majorite des pays. Les frais et delais de livraison
            internationale sont calcules a la caisse selon la destination et le poids du
            colis.
          </p>
          <h3>Delais estimes</h3>
          <ul>
            <li>
              <strong>Etats-Unis :</strong> 4 a 8 jours ouvrables
            </li>
            <li>
              <strong>Europe :</strong> 7 a 14 jours ouvrables
            </li>
            <li>
              <strong>Reste du monde :</strong> 10 a 21 jours ouvrables
            </li>
          </ul>
          <h3>Droits, taxes et douanes</h3>
          <p>
            Les commandes internationales peuvent etre assujetties a des droits de douane,
            taxes d&apos;importation ou autres frais imposes par le pays de destination. Ces
            frais sont a la charge exclusive du destinataire et ne sont pas inclus dans le
            total de la commande.
          </p>
          <p>
            ARTEMIS n&apos;est pas responsable des retards lies au traitement douanier. Nous vous
            recommandons de verifier les regles d&apos;importation de votre pays avant de
            commander.
          </p>
          <h3>Pays non desservis</h3>
          <p>
            Nous n&apos;expedions pas vers les pays vises par des sanctions commerciales
            canadiennes ou internationales. Si votre pays n&apos;apparait pas a la caisse,
            contactez-nous et nous vous indiquerons les options possibles.
          </p>

          <hr className="section-divider" />
          <h2 id="tracking">Suivi</h2>
          <p>
            Chaque commande passee sur artemis-watches.com comprend un numero de suivi. Une
            fois la commande expediee, vous recevrez un courriel contenant :
          </p>
          <ul>
            <li>votre numero de suivi;</li>
            <li>le nom du transporteur;</li>
            <li>un lien direct vers le portail de suivi.</li>
          </ul>
          <p>
            Vous pouvez aussi suivre votre commande depuis votre compte ARTEMIS, dans la
            section <strong>Historique des commandes</strong>, ou en nous ecrivant sur
            WhatsApp avec votre numero de commande.
          </p>

          <hr className="section-divider" />
          <h2 id="packaging">Emballage et securite</h2>
          <p>Chaque commande ARTEMIS est preparee selon les priorites suivantes :</p>
          <ul>
            <li>
              <strong>Emballage externe discret :</strong> aucun nom de marque, reference de
              montre ou indication explicite du contenu n&apos;apparait sur la boite externe.
            </li>
            <li>
              <strong>Protection interne renforcee :</strong> la montre est maintenue en
              place avec rembourrage et protection adaptes pour eviter mouvements et rayures.
            </li>
            <li>
              <strong>Scellement visible :</strong> l&apos;emballage est prepare de facon a
              rendre toute alteration apparente a la reception.
            </li>
          </ul>
          <p>
            Si votre colis arrive visiblement endommage, photographiez l&apos;emballage avant
            ouverture et contactez-nous immediatement.
          </p>

          <hr className="section-divider" />
          <h2 id="delays">Retards et incidents</h2>
          <h3>Ma commande n&apos;est pas arrivee</h3>
          <p>
            Si le suivi indique une livraison mais que vous n&apos;avez rien recu, ou si le
            suivi n&apos;a pas evolue depuis plus de 5 jours ouvrables, contactez-nous. Nous
            ouvrirons une demande d&apos;enquete aupres du transporteur.
          </p>
          <h3>Colis perdu ou vole</h3>
          <p>
            Dans le cas rare ou un colis est confirme perdu par le transporteur, ARTEMIS
            expediera a nouveau la commande, sous reserve de disponibilite, ou procedera a
            un remboursement integral. Nous ne sommes pas responsables des colis marques
            comme livres a la bonne adresse mais declares non recus par l&apos;acheteur.
          </p>
          <h3>Adresse incorrecte</h3>
          <p>
            Veuillez verifier attentivement votre adresse de livraison a la caisse. ARTEMIS
            n&apos;est pas responsable des commandes expediees a une adresse erronee fournie par
            l&apos;acheteur. Si vous constatez une erreur apres l&apos;achat, contactez-nous
            immediatement sur WhatsApp.
          </p>

          <hr className="section-divider" />
          <h2 id="contact">Nous joindre</h2>
          <p>Pour toute question relative a l&apos;expedition :</p>
          <ul>
            <li>
              <strong>WhatsApp :</strong>{' '}
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                514-560-9765
              </a>{' '}
              - echange direct
            </li>
            <li>
              <strong>Courriel :</strong>{' '}
              <a href="mailto:artemismtl101@gmail.com">artemismtl101@gmail.com</a>
            </li>
          </ul>
          <p>
            WhatsApp reste le moyen le plus direct pour nous joindre pendant les heures
            d&apos;ouverture, du lundi au samedi, de 9 h a 20 h HNE.
          </p>
        </>
      ) : (
        <>
          <h2 id="overview">Overview</h2>
          <div className="legal-highlight">
            <p>
              <strong>Free tracked shipping on all Canadian orders.</strong> Every order is
              carefully packaged and dispatched from our Montreal atelier within 1 to 2
              business days. International shipping is available to most countries
              worldwide.
            </p>
          </div>
          <p>
            We ship via trusted national and international carriers to ensure your timepiece
            arrives safely, on time, and in perfect condition. All shipments include a
            tracking number.
          </p>

          <hr className="section-divider" />
          <h2 id="processing">Order Processing</h2>
          <p>
            Orders are processed within <strong>1 to 2 business days</strong> of payment
            confirmation. Business days are Monday through Friday, excluding Canadian
            federal holidays.
          </p>
          <p>
            Orders placed on weekends or holidays begin processing on the next business day.
            You will receive a shipping confirmation email with your tracking number once
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
            <li>
              <strong>Free tracked shipping</strong> on all orders shipped within Canada, no
              minimum order value.
            </li>
            <li>Expedited options may be available at checkout for an additional fee.</li>
          </ul>

          <h3>Delivery Timeframes</h3>
          <p>Estimated delivery times after dispatch, in business days:</p>
          <ul>
            <li>
              <strong>Quebec and Ontario:</strong> 2 to 4 business days
            </li>
            <li>
              <strong>Western Canada (BC, AB, SK, MB):</strong> 3 to 6 business days
            </li>
            <li>
              <strong>Atlantic Canada:</strong> 4 to 7 business days
            </li>
            <li>
              <strong>Northern territories:</strong> 5 to 10 business days
            </li>
          </ul>
          <p>
            These are estimates only and do not constitute guaranteed delivery dates.
            Delays may occur during peak periods such as holiday season.
          </p>

          <hr className="section-divider" />
          <h2 id="international">International Shipping</h2>
          <p>
            ARTEMIS ships internationally to most countries. International shipping rates
            and estimated delivery times are calculated at checkout based on destination and
            package weight.
          </p>
          <h3>Estimated Delivery Times</h3>
          <ul>
            <li>
              <strong>United States:</strong> 4 to 8 business days
            </li>
            <li>
              <strong>Europe:</strong> 7 to 14 business days
            </li>
            <li>
              <strong>Rest of World:</strong> 10 to 21 business days
            </li>
          </ul>
          <h3>Customs, Duties &amp; Taxes</h3>
          <p>
            International orders may be subject to customs duties, import taxes, or other
            fees levied by the destination country. These charges are the sole
            responsibility of the recipient and are not included in the order total.
          </p>
          <p>
            ARTEMIS is not responsible for delays caused by customs processing. We recommend
            reviewing your country&apos;s import regulations before placing an order.
          </p>
          <h3>Restricted Countries</h3>
          <p>
            We do not ship to countries subject to Canadian or international trade
            sanctions. If your country is unavailable at checkout, contact us and we will
            advise on possible options.
          </p>

          <hr className="section-divider" />
          <h2 id="tracking">Tracking</h2>
          <p>
            Every order placed on artemis-watches.com includes a tracking number. Once your
            order is dispatched, you will receive a shipping confirmation email containing:
          </p>
          <ul>
            <li>your tracking number;</li>
            <li>the carrier name;</li>
            <li>a direct link to the carrier&apos;s tracking portal.</li>
          </ul>
          <p>
            You can also track your order by logging into your ARTEMIS account under{' '}
            <strong>Order History</strong>, or by contacting us on WhatsApp with your order
            number.
          </p>

          <hr className="section-divider" />
          <h2 id="packaging">Packaging &amp; Security</h2>
          <p>Each ARTEMIS order is packaged according to the following priorities:</p>
          <ul>
            <li>
              <strong>Discreet outer packaging:</strong> the external box does not display
              brand names, watch references, or any explicit indication of the contents.
            </li>
            <li>
              <strong>Protective inner packaging:</strong> the watch is secured with foam
              inserts and protective wrapping to prevent movement and scratching.
            </li>
            <li>
              <strong>Tamper-evident sealing:</strong> packages are sealed in a way that
              makes tampering visible upon delivery.
            </li>
          </ul>
          <p>
            If your package arrives with visible damage, photograph the outer packaging
            before opening it and contact us immediately.
          </p>

          <hr className="section-divider" />
          <h2 id="delays">Delays &amp; Issues</h2>
          <h3>My order has not arrived</h3>
          <p>
            If your tracking shows your order as delivered but you have not received it, or
            if tracking has not updated for more than 5 business days, contact us. We will
            open an investigation with the carrier on your behalf.
          </p>
          <h3>Lost or stolen packages</h3>
          <p>
            In the rare event that a package is confirmed lost by the carrier, ARTEMIS will
            either reship the order, subject to availability, or issue a full refund. We
            are not responsible for packages marked delivered to the correct address but
            reported missing by the buyer.
          </p>
          <h3>Incorrect address</h3>
          <p>
            Please ensure your shipping address is correct at checkout. ARTEMIS is not
            responsible for orders shipped to an incorrect address supplied by the buyer. If
            you notice an error after placing your order, contact us immediately on
            WhatsApp.
          </p>

          <hr className="section-divider" />
          <h2 id="contact">Contact Us</h2>
          <p>For any shipping questions or concerns:</p>
          <ul>
            <li>
              <strong>WhatsApp:</strong>{' '}
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                514-560-9765
              </a>{' '}
              - direct contact
            </li>
            <li>
              <strong>Email:</strong>{' '}
              <a href="mailto:artemismtl101@gmail.com">artemismtl101@gmail.com</a>
            </li>
          </ul>
          <p>
            WhatsApp is the most direct way to reach us during business hours, Monday
            through Saturday, 9am to 8pm EST.
          </p>
        </>
      )}
    </LegalLayout>
  );
}
