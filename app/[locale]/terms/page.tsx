import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/LegalLayout';
import { getLocale } from 'next-intl/server';
import { getGeneralWhatsAppMessage, getWhatsAppUrl } from '@/lib/whatsapp';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return {
    title:
      locale === 'fr'
        ? 'Conditions generales — ARTEMIS Watches'
        : 'Terms & Conditions — ARTEMIS Watches',
    description:
      locale === 'fr'
        ? "Conditions generales regissant les achats et l'utilisation du site web d'ARTEMIS Watches."
        : 'Terms and conditions governing purchases and use of the ARTEMIS Watches website.',
  };
}

export default async function TermsPage() {
  const locale = await getLocale();
  const isFr = locale === 'fr';
  const whatsappUrl = getWhatsAppUrl(getGeneralWhatsAppMessage(locale));

  const sections = isFr
    ? [
        { id: 'acceptance', title: 'Acceptation des conditions' },
        { id: 'products', title: 'Produits et prix' },
        { id: 'orders', title: 'Commandes et paiement' },
        { id: 'authenticity', title: 'Declaration d’authenticite' },
        { id: 'account', title: 'Votre compte' },
        { id: 'promo', title: 'Codes promotionnels' },
        { id: 'ip', title: 'Propriete intellectuelle' },
        { id: 'liability', title: 'Limitation de responsabilite' },
        { id: 'governing', title: 'Droit applicable' },
        { id: 'contact', title: 'Contact' },
      ]
    : [
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

  return (
    <LegalLayout
      overline="LEGAL"
      title={isFr ? 'Conditions generales' : 'Terms & Conditions'}
      lastUpdated={isFr ? '1 janvier 2025' : 'January 1, 2025'}
      sections={sections}
    >
      {isFr ? (
        <>
          <p>
            Veuillez lire attentivement les presentes conditions generales
            (&ldquo;conditions&rdquo;) avant d&apos;utiliser le site web d&apos;ARTEMIS Watches
            situe a <strong>artemis-watches.com</strong> (le &ldquo;site&rdquo;) ou
            d&apos;effectuer un achat aupres d&apos;ARTEMIS Watches (&ldquo;ARTEMIS&rdquo;,
            &ldquo;nous&rdquo;, &ldquo;notre&rdquo;, &ldquo;nos&rdquo;).
          </p>

          <hr className="section-divider" />
          <h2 id="acceptance">1. Acceptation des conditions</h2>
          <p>
            En accedant au site, en creant un compte ou en passant une commande, vous
            acceptez d&apos;etre lie par les presentes conditions et par notre Politique de
            confidentialite. Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser
            le site.
          </p>
          <p>
            Nous nous reservons le droit de modifier ces conditions en tout temps. Les
            changements prennent effet des leur publication sur le site. Votre utilisation
            continue du site apres modification vaut acceptation des conditions revisees.
          </p>

          <hr className="section-divider" />
          <h2 id="products">2. Produits et prix</h2>
          <h3>Description des produits</h3>
          <p>
            Nous faisons tous les efforts raisonnables pour decrire et photographier nos
            produits avec precision. Les couleurs peuvent varier legerement selon l&apos;ecran,
            la calibration et l&apos;eclairage. Les descriptions, specifications et la
            disponibilite peuvent changer sans preavis.
          </p>
          <h3>Prix</h3>
          <p>
            Tous les prix sont affiches en <strong>dollars canadiens (CAD)</strong> et
            incluent les taxes lorsque la loi l&apos;exige. Les prix peuvent etre modifies sans
            preavis. Le prix applicable a votre commande est celui affiche au moment ou vous
            finalisez votre achat.
          </p>
          <p>
            En cas d&apos;erreur de prix, nous nous reservons le droit d&apos;annuler la commande
            concernee. Le cas echeant, nous vous en informerons rapidement et procederons a
            un remboursement integral.
          </p>
          <h3>Disponibilite</h3>
          <p>
            Tous les produits sont proposes sous reserve de disponibilite. Nous pouvons
            limiter les quantites ou retirer un produit a tout moment. Si une piece devient
            indisponible apres votre achat, nous vous en informerons et vous rembourserons
            integralement.
          </p>

          <hr className="section-divider" />
          <h2 id="orders">3. Commandes et paiement</h2>
          <h3>Acceptation des commandes</h3>
          <p>
            Le fait de passer une commande constitue une offre d&apos;achat. Toutes les
            commandes sont soumises a l&apos;acceptation d&apos;ARTEMIS. Nous nous reservons le droit
            de refuser ou d&apos;annuler toute commande a notre discretion, notamment en cas de
            suspicion de fraude ou d&apos;impossibilite d&apos;execution.
          </p>
          <p>
            Vous recevrez un courriel de confirmation apres paiement reussi. Cette
            confirmation constitue l&apos;acceptation de votre commande.
          </p>
          <h3>Paiement</h3>
          <p>
            Les paiements sont traites de facon securisee par <strong>Stripe</strong>,
            processeur conforme PCI-DSS. Nous acceptons Visa, Mastercard, American Express,
            Apple Pay, Google Pay et les autres modes de paiement affiches a la caisse.
          </p>
          <p>
            En fournissant vos donnees de paiement, vous confirmez etre habilite a utiliser
            le mode de paiement choisi et que les renseignements fournis sont exacts.
            ARTEMIS ne stocke pas vos informations bancaires completes.
          </p>
          <h3>Paiements en plusieurs versements</h3>
          <p>
            Lorsqu&apos;elles sont offertes, les options de paiement echelonne demeurent soumises
            aux conditions du fournisseur tiers applicable.
          </p>

          <hr className="section-divider" />
          <h2 id="authenticity">4. Declaration d&apos;authenticite</h2>
          <div className="legal-highlight">
            <p>
              ARTEMIS garantit que chaque montre vendue sur sa plateforme est inspectee et
              verifiee pour son authenticite avant d&apos;etre mise en ligne. Nous ne vendons pas
              sciemment de contrefacons. Chaque piece est evaluee selon le mouvement, les
              marquages du boitier, les caracteristiques du cadran, les gravures du bracelet
              et d&apos;autres indices propres a la marque.
            </p>
          </div>
          <p>
            Notre garantie d&apos;authenticite s&apos;appuie sur notre politique de retour de 30
            jours. Si, apres achat, une montre est jugee non authentique par un horloger
            qualifie ou un expert independant credible, ARTEMIS remboursera integralement la
            commande a la reception de la piece retournee, peu importe le delai ecoule depuis
            l&apos;achat.
          </p>
          <p>
            ARTEMIS agit comme revendeur independant et n&apos;entretient aucun lien
            d&apos;affiliation, de commandite ou d&apos;approbation avec Rolex, Cartier, Audemars
            Piguet, Patek Philippe, ni avec leurs societes mères ou filiales.
          </p>

          <hr className="section-divider" />
          <h2 id="account">5. Votre compte</h2>
          <p>
            Vous pouvez creer un compte afin d&apos;acceder a certaines fonctionnalites,
            consulter votre historique de commandes et profiter d&apos;avantages promotionnels.
            Vous etes responsable de la confidentialite de vos identifiants ainsi que de
            toute activite effectuee sous votre compte.
          </p>
          <p>
            Vous acceptez de fournir des renseignements exacts, a jour et complets lors de la
            creation de votre compte, et de les mettre a jour au besoin. Nous pouvons
            suspendre ou fermer tout compte contrevenant aux presentes conditions ou utilise
            a des fins frauduleuses.
          </p>

          <hr className="section-divider" />
          <h2 id="promo">6. Codes promotionnels</h2>
          <p>
            Les codes promotionnels emis par ARTEMIS, y compris le rabais de bienvenue de
            10 %, sont soumis aux conditions suivantes :
          </p>
          <ul>
            <li>ils sont personnels, non transferables et a usage unique;</li>
            <li>ils ne peuvent etre combines, sauf indication expresse contraire;</li>
            <li>ils s&apos;appliquent au prix des produits et non aux frais de livraison;</li>
            <li>ARTEMIS peut modifier ou retirer un code en tout temps;</li>
            <li>tout code obtenu par un canal non legitime est nul.</li>
          </ul>

          <hr className="section-divider" />
          <h2 id="ip">7. Propriete intellectuelle</h2>
          <p>
            Tout le contenu du site, y compris les textes, photographies, elements visuels,
            logos, icones et logiciels, appartient a ARTEMIS ou a ses fournisseurs de
            contenu et est protege par les lois applicables en matiere de propriete
            intellectuelle.
          </p>
          <p>
            Vous ne pouvez reproduire, distribuer, modifier, afficher ou exploiter le
            contenu du site sans l&apos;autorisation ecrite prealable d&apos;ARTEMIS.
          </p>
          <p>
            Les noms de marque et signes distinctifs apparaissant sur les fiches produit
            appartiennent a leurs proprietaires respectifs et sont utilises uniquement a des
            fins descriptives d&apos;identification.
          </p>

          <hr className="section-divider" />
          <h2 id="liability">8. Limitation de responsabilite</h2>
          <p>
            Dans la mesure maximale permise par la loi applicable, ARTEMIS, ses dirigeants,
            employes et mandataires ne pourront etre tenus responsables des dommages
            indirects, accessoires, particuliers, consecutifs ou punitifs decoulant de
            l&apos;utilisation du site ou de l&apos;achat d&apos;un produit, meme si la possibilite de
            tels dommages avait ete portee a leur connaissance.
          </p>
          <p>
            Notre responsabilite totale a votre egard pour toute reclamation decoulant d&apos;un
            achat ne depassera pas le montant paye pour le produit a l&apos;origine de la
            reclamation.
          </p>
          <p>
            Rien dans les presentes conditions ne limite une responsabilite qui ne peut etre
            exclue en vertu des lois canadiennes applicables en matiere de protection du
            consommateur.
          </p>

          <hr className="section-divider" />
          <h2 id="governing">9. Droit applicable</h2>
          <p>
            Les presentes conditions sont regies et interpretees conformement aux lois de la
            province de <strong>Quebec</strong> et aux lois federales du Canada qui s&apos;y
            appliquent. Tout litige decoulant des presentes conditions relevera de la
            competence exclusive des tribunaux du Quebec.
          </p>
          <p>
            Si vous etes consommateur, vous pouvez egalement beneficier de dispositions
            imperatives de protection du consommateur applicables dans votre territoire.
          </p>

          <hr className="section-divider" />
          <h2 id="contact">10. Contact</h2>
          <p>Pour toute question relative a ces conditions, veuillez nous joindre :</p>
          <ul>
            <li>
              <strong>WhatsApp :</strong>{' '}
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                514-560-9765
              </a>
            </li>
            <li>
              <strong>Courriel :</strong>{' '}
              <a href="mailto:hello@artemis-watches.com">hello@artemis-watches.com</a>
            </li>
            <li>
              <strong>Emplacement :</strong> Montreal, QC, Canada
            </li>
          </ul>
        </>
      ) : (
        <>
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
            agree to be bound by these Terms and our Privacy Policy. If you do not agree to
            these Terms, please do not use the Site.
          </p>
          <p>
            We reserve the right to update these Terms at any time. Changes take effect upon
            posting to the Site. Continued use of the Site after any change constitutes your
            acceptance of the revised Terms.
          </p>

          <hr className="section-divider" />
          <h2 id="products">2. Products &amp; Pricing</h2>
          <h3>Product Descriptions</h3>
          <p>
            We make every effort to accurately describe and photograph our products. Colors
            may vary slightly due to monitor calibration and photographic lighting. Product
            descriptions, specifications, and availability are subject to change without
            notice.
          </p>
          <h3>Pricing</h3>
          <p>
            All prices are displayed in <strong>Canadian dollars (CAD)</strong> and are
            inclusive of applicable taxes where required by law. Prices are subject to
            change at any time without notice.
          </p>
          <p>
            In the event of a pricing error, we reserve the right to cancel orders placed at
            the incorrect price. We will notify you promptly and issue a full refund if
            applicable.
          </p>
          <h3>Availability</h3>
          <p>
            All products are subject to availability. We reserve the right to limit
            quantities or discontinue any product at any time. If an item you ordered
            becomes unavailable after purchase, we will notify you and issue a full refund.
          </p>

          <hr className="section-divider" />
          <h2 id="orders">3. Orders &amp; Payment</h2>
          <h3>Order Acceptance</h3>
          <p>
            Placing an order constitutes an offer to purchase. All orders are subject to
            acceptance by ARTEMIS. We reserve the right to refuse or cancel any order at our
            discretion, including orders that appear fraudulent or that we are unable to
            fulfill.
          </p>
          <p>
            You will receive an order confirmation email upon successful payment. This
            confirmation represents acceptance of your order.
          </p>
          <h3>Payment</h3>
          <p>
            Payments are processed securely through <strong>Stripe</strong>, a PCI-DSS
            compliant payment processor. We accept Visa, Mastercard, American Express, Apple
            Pay, Google Pay, and other methods displayed at checkout.
          </p>
          <p>
            By providing your payment details, you confirm that you are entitled to use the
            chosen payment method and that the information provided is accurate. ARTEMIS does
            not store your full payment card information.
          </p>
          <h3>Installment Payments</h3>
          <p>
            Where available, installment payment options remain subject to the terms and
            conditions of the applicable third-party payment provider.
          </p>

          <hr className="section-divider" />
          <h2 id="authenticity">4. Authenticity Statement</h2>
          <div className="legal-highlight">
            <p>
              ARTEMIS warrants that every timepiece sold through our platform has been
              personally inspected and verified for authenticity prior to listing. We do not
              knowingly sell counterfeit goods. Each watch is reviewed based on movement,
              case markings, dial characteristics, bracelet engravings, and other
              brand-specific indicators.
            </p>
          </div>
          <p>
            Our authenticity guarantee is backed by our 30-day return policy. If, following
            purchase, a timepiece is determined by a qualified watchmaker or credible
            independent expert to be non-authentic, ARTEMIS will issue a full refund upon
            return of the item.
          </p>
          <p>
            ARTEMIS operates as an independent reseller and has no affiliation, sponsorship,
            or endorsement relationship with Rolex, Cartier, Audemars Piguet, Patek
            Philippe, or any of their parent companies or subsidiaries.
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
            to suspend or terminate accounts used in breach of these Terms or for fraudulent
            purposes.
          </p>

          <hr className="section-divider" />
          <h2 id="promo">6. Promotional Codes</h2>
          <p>
            Promotional codes issued by ARTEMIS, including the welcome 10% discount, are
            subject to the following conditions:
          </p>
          <ul>
            <li>codes are personal, non-transferable, and valid for one-time use only;</li>
            <li>codes may not be combined unless explicitly stated;</li>
            <li>codes apply to product prices and not to shipping charges;</li>
            <li>ARTEMIS may modify or revoke promotional codes at any time;</li>
            <li>codes obtained through illegitimate channels are void.</li>
          </ul>

          <hr className="section-divider" />
          <h2 id="ip">7. Intellectual Property</h2>
          <p>
            All content on the Site, including text, photography, design, logos, icons, and
            software, is the property of ARTEMIS or its content suppliers and is protected
            by applicable intellectual property laws.
          </p>
          <p>
            You may not reproduce, distribute, modify, display, or create derivative works
            from any content on the Site without prior written permission from ARTEMIS.
          </p>
          <p>
            Brand names and trademarks appearing on product listings belong to their
            respective owners and are used solely for descriptive identification purposes.
          </p>

          <hr className="section-divider" />
          <h2 id="liability">8. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, ARTEMIS and its directors,
            employees, and agents shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages arising from your use of the Site or
            purchase of products.
          </p>
          <p>
            Our total liability to you for any claim arising from a purchase shall not exceed
            the amount paid by you for the product giving rise to the claim.
          </p>
          <p>
            Nothing in these Terms limits or excludes liability that cannot be limited or
            excluded under applicable Canadian consumer protection law.
          </p>

          <hr className="section-divider" />
          <h2 id="governing">9. Governing Law</h2>
          <p>
            These Terms are governed by and construed in accordance with the laws of the
            Province of <strong>Quebec</strong> and the federal laws of Canada applicable
            therein. Any dispute arising under these Terms shall be subject to the exclusive
            jurisdiction of the courts of Quebec.
          </p>
          <p>
            If you are a consumer, you may also benefit from mandatory consumer protection
            provisions applicable in your jurisdiction.
          </p>

          <hr className="section-divider" />
          <h2 id="contact">10. Contact</h2>
          <p>For questions about these Terms, please contact us:</p>
          <ul>
            <li>
              <strong>WhatsApp:</strong>{' '}
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                514-560-9765
              </a>
            </li>
            <li>
              <strong>Email:</strong>{' '}
              <a href="mailto:hello@artemis-watches.com">hello@artemis-watches.com</a>
            </li>
            <li>
              <strong>Location:</strong> Montreal, QC, Canada
            </li>
          </ul>
        </>
      )}
    </LegalLayout>
  );
}
