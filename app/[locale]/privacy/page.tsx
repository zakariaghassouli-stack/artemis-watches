import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/LegalLayout';
import { getLocale } from 'next-intl/server';
import { getGeneralWhatsAppMessage, getWhatsAppUrl } from '@/lib/whatsapp';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return {
    title:
      locale === 'fr'
        ? 'Politique de confidentialite — ARTEMIS Watches'
        : 'Privacy Policy — ARTEMIS Watches',
    description:
      locale === 'fr'
        ? 'Politique de confidentialite ARTEMIS Watches. Comment nous recueillons, utilisons et protegons vos renseignements personnels.'
        : 'ARTEMIS Watches privacy policy. How we collect, use, and protect your personal information.',
  };
}

export default async function PrivacyPolicyPage() {
  const locale = await getLocale();
  const isFr = locale === 'fr';
  const whatsappUrl = getWhatsAppUrl(getGeneralWhatsAppMessage(locale));

  const sections = isFr
    ? [
        { id: 'overview', title: 'Vue d’ensemble' },
        { id: 'collection', title: 'Renseignements recueillis' },
        { id: 'use', title: 'Utilisation des donnees' },
        { id: 'sharing', title: 'Partage et divulgation' },
        { id: 'cookies', title: 'Temoins' },
        { id: 'retention', title: 'Conservation' },
        { id: 'rights', title: 'Vos droits' },
        { id: 'security', title: 'Securite' },
        { id: 'minors', title: 'Mineurs' },
        { id: 'contact', title: 'Contact' },
      ]
    : [
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

  return (
    <LegalLayout
      overline={isFr ? 'LEGAL' : 'LEGAL'}
      title={isFr ? 'Politique de confidentialite' : 'Privacy Policy'}
      lastUpdated={isFr ? '1 janvier 2025' : 'January 1, 2025'}
      sections={sections}
    >
      {isFr ? (
        <>
          <p>
            ARTEMIS Watches (&ldquo;ARTEMIS&rdquo;, &ldquo;nous&rdquo;, &ldquo;notre&rdquo;,
            &ldquo;nos&rdquo;) s&apos;engage a proteger votre vie privee. La presente Politique
            de confidentialite explique comment nous recueillons, utilisons, communiquons et
            protegons vos renseignements personnels lorsque vous visitez{' '}
            <strong>artemis-watches.com</strong> ou effectuez un achat chez nous.
          </p>
          <p>
            Cette politique vise a respecter les lois canadiennes applicables en matiere de
            protection des renseignements personnels, notamment la{' '}
            <em>Loi sur la protection des renseignements personnels et les documents electroniques</em>{' '}
            (LPRPDE) et la <em>Loi 25 du Quebec</em>.
          </p>

          <hr className="section-divider" />
          <h2 id="collection">1. Renseignements que nous recueillons</h2>
          <h3>Renseignements que vous nous fournissez directement</h3>
          <ul>
            <li>
              <strong>Renseignements de compte :</strong> nom, adresse courriel et mot de
              passe lors de la creation d&apos;un compte.
            </li>
            <li>
              <strong>Renseignements de commande :</strong> nom, adresse courriel, adresse de
              livraison et details de commande au moment d&apos;un achat.
            </li>
            <li>
              <strong>Communications :</strong> messages envoyes par courriel, WhatsApp ou
              formulaire de contact.
            </li>
          </ul>
          <h3>Renseignements recueillis automatiquement</h3>
          <ul>
            <li>
              <strong>Donnees d&apos;utilisation :</strong> pages visitees, temps passe sur le
              site, URL de provenance, type de navigateur et informations sur l&apos;appareil.
            </li>
            <li>
              <strong>Temoins et technologies similaires :</strong> voir la section Temoins
              ci-dessous.
            </li>
            <li>
              <strong>Adresse IP :</strong> utilisee a des fins de securite, de prevention
              de la fraude et d&apos;analyse.
            </li>
          </ul>
          <h3>Renseignements de paiement</h3>
          <p>
            Les donnees de carte sont traitees directement par <strong>Stripe</strong>.
            ARTEMIS ne recoit pas, ne stocke pas et n&apos;a pas acces a votre numero de
            carte complet, au CVV ni a d&apos;autres donnees sensibles de paiement. Nous ne
            conservons qu&apos;une reference tokenisee et des metadonnees transactionnelles
            de base comme le montant, la devise et le statut.
          </p>

          <hr className="section-divider" />
          <h2 id="use">2. Comment nous utilisons vos renseignements</h2>
          <p>Nous utilisons les renseignements recueillis pour :</p>
          <ul>
            <li>traiter et executer vos commandes, y compris la livraison;</li>
            <li>envoyer des courriels transactionnels et des avis lies au compte;</li>
            <li>repondre a vos questions et offrir du soutien client;</li>
            <li>emettre votre code promotionnel et gerer les avantages de compte;</li>
            <li>detecter, enqueter et prevenir la fraude et les abus;</li>
            <li>analyser l&apos;utilisation du site pour ameliorer l&apos;experience;</li>
            <li>respecter nos obligations legales.</li>
          </ul>
          <h3>Communications marketing</h3>
          <p>
            Nous pouvons vous envoyer des courriels marketing au sujet des nouveautes,
            promotions et evenements si vous avez choisi de les recevoir. Vous pouvez vous
            desabonner en tout temps en cliquant sur le lien de desabonnement present dans
            nos courriels ou en nous contactant directement.
          </p>
          <p>
            Nous n&apos;envoyons pas de messages marketing non sollicites sur WhatsApp. Toute
            communication sur WhatsApp est initiee par vous.
          </p>

          <hr className="section-divider" />
          <h2 id="sharing">3. Partage et divulgation</h2>
          <p>
            Nous ne vendons, ne louons et n&apos;echangeons pas vos renseignements personnels
            avec des tiers. Nous pouvons toutefois les communiquer dans les circonstances
            limitees suivantes :
          </p>
          <ul>
            <li>
              <strong>Fournisseurs de services :</strong> nous travaillons avec des
              partenaires de confiance qui nous aident a exploiter le site et a executer les
              commandes, notamment Stripe (paiements), Vercel (hebergement), Resend
              (courriels transactionnels) et Supabase (base de donnees). Ces fournisseurs
              sont soumis a des obligations de confidentialite.
            </li>
            <li>
              <strong>Transporteurs :</strong> votre nom et votre adresse de livraison sont
              communiques au transporteur pour permettre l&apos;expedition.
            </li>
            <li>
              <strong>Obligations legales :</strong> nous pouvons divulguer vos renseignements
              si la loi, un tribunal ou une autorite gouvernementale l&apos;exige, ou pour
              proteger les droits, les biens ou la securite d&apos;ARTEMIS, de ses clients ou de
              tiers.
            </li>
            <li>
              <strong>Transfert d&apos;entreprise :</strong> dans le cadre d&apos;une fusion,
              acquisition ou vente d&apos;actifs, vos renseignements pourraient etre transferes
              avec l&apos;entreprise. Nous vous en informerions dans un delai raisonnable.
            </li>
          </ul>

          <hr className="section-divider" />
          <h2 id="cookies">4. Temoins</h2>
          <p>
            Nous utilisons des temoins et des technologies similaires pour ameliorer votre
            experience sur le site. Les temoins sont de petits fichiers texte stockes sur
            votre appareil.
          </p>
          <h3>Types de temoins utilises</h3>
          <ul>
            <li>
              <strong>Temoins essentiels :</strong> necessaires au fonctionnement du site,
              notamment pour la session, l&apos;authentification et la persistance du panier.
            </li>
            <li>
              <strong>Temoins analytiques :</strong> nous aident a comprendre comment les
              visiteurs utilisent le site. Les donnees sont agregees et anonymisees lorsque
              cela est possible.
            </li>
            <li>
              <strong>Temoins de preference :</strong> memorisent certains choix comme la
              langue ou certains elements du panier.
            </li>
          </ul>
          <h3>Gestion des temoins</h3>
          <p>
            Vous pouvez controler ou supprimer les temoins a partir des parametres de votre
            navigateur. La desactivation de certains temoins peut affecter le fonctionnement
            du site. Notre bandeau de temoins vous permet aussi de gerer les temoins non
            essentiels lors de votre premiere visite.
          </p>

          <hr className="section-divider" />
          <h2 id="retention">5. Conservation des donnees</h2>
          <p>
            Nous conservons vos renseignements personnels aussi longtemps que necessaire pour
            remplir les objectifs decrits dans la presente politique, sauf si une duree de
            conservation plus longue est requise ou permise par la loi.
          </p>
          <ul>
            <li>
              <strong>Donnees de commande :</strong> conservees au moins 7 ans pour les
              exigences fiscales et legales.
            </li>
            <li>
              <strong>Donnees de compte :</strong> conservees pendant la duree de vie du
              compte puis jusqu&apos;a 2 ans apres sa suppression.
            </li>
            <li>
              <strong>Historique de communication :</strong> conserve jusqu&apos;a 3 ans.
            </li>
            <li>
              <strong>Donnees analytiques :</strong> conservees sous forme agregee et
              anonymisee pour une duree indeterminee.
            </li>
          </ul>
          <p>
            Vous pouvez demander la suppression de vos renseignements personnels en tout
            temps, sous reserve de nos obligations legales de conservation.
          </p>

          <hr className="section-divider" />
          <h2 id="rights">6. Vos droits</h2>
          <p>
            En vertu des lois canadiennes applicables, vous disposez notamment des droits
            suivants a l&apos;egard de vos renseignements personnels :
          </p>
          <ul>
            <li>
              <strong>Acces :</strong> demander une copie des renseignements que nous
              detenons a votre sujet.
            </li>
            <li>
              <strong>Rectification :</strong> demander la correction de renseignements
              inexacts ou incomplets.
            </li>
            <li>
              <strong>Suppression :</strong> demander l&apos;effacement de vos renseignements,
              sous reserve des obligations de conservation legales.
            </li>
            <li>
              <strong>Retrait du consentement :</strong> retirer votre consentement lorsque
              celui-ci constitue la base juridique du traitement.
            </li>
            <li>
              <strong>Portabilite :</strong> recevoir vos donnees dans un format structure et
              lisible par machine, lorsque cela est techniquement possible.
            </li>
            <li>
              <strong>Opposition :</strong> vous opposer a certains usages, notamment le
              marketing direct.
            </li>
          </ul>
          <p>
            Pour exercer ces droits, ecrivez-nous a{' '}
            <a href="mailto:artemismtl101@gmail.com">artemismtl101@gmail.com</a>. Nous
            repondrons dans un delai de 30 jours suivant la reception de votre demande et
            pourrons verifier votre identite avant d&apos;y donner suite.
          </p>
          <p>
            Si vous estimez que vos droits n&apos;ont pas ete respectes, vous pouvez deposer une
            plainte aupres du Commissariat a la protection de la vie privee du Canada ou de
            la Commission d&apos;acces a l&apos;information du Quebec.
          </p>

          <hr className="section-divider" />
          <h2 id="security">7. Securite</h2>
          <p>
            Nous mettons en place des mesures techniques et organisationnelles appropriees
            pour proteger vos renseignements personnels contre l&apos;acces non permis, la
            divulgation, l&apos;alteration ou la destruction.
          </p>
          <ul>
            <li>chiffrement HTTPS pour toutes les donnees transmises;</li>
            <li>
              stockage chiffre des mots de passe (hachage bcrypt, jamais en clair);
            </li>
            <li>controle d&apos;acces limite au sein d&apos;ARTEMIS;</li>
            <li>traitement des paiements conforme PCI-DSS via Stripe.</li>
          </ul>
          <p>
            Aucune methode de transmission sur internet ni aucun systeme de stockage
            electronique n&apos;offre une securite absolue. En cas d&apos;incident susceptible
            d&apos;affecter vos droits, nous vous aviserons ainsi que les autorites competentes,
            conformement a la loi applicable.
          </p>

          <hr className="section-divider" />
          <h2 id="minors">8. Mineurs</h2>
          <p>
            Le site s&apos;adresse aux personnes agees de 18 ans ou plus. Nous ne recueillons
            pas sciemment de renseignements personnels aupres de mineurs. Si nous apprenons
            qu&apos;une telle collecte a eu lieu sans consentement approprie, nous supprimerons
            ces renseignements dans les meilleurs delais.
          </p>

          <hr className="section-divider" />
          <h2 id="contact">9. Contact et responsable de la confidentialite</h2>
          <p>
            Pour toute question, demande ou plainte relative a cette politique ou a nos
            pratiques en matiere de donnees :
          </p>
          <ul>
            <li>
              <strong>Courriel :</strong>{' '}
              <a href="mailto:artemismtl101@gmail.com">artemismtl101@gmail.com</a>
            </li>
            <li>
              <strong>WhatsApp :</strong>{' '}
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                514-560-9765
              </a>
            </li>
            <li>
              <strong>Emplacement :</strong> Montreal, QC, Canada
            </li>
          </ul>
          <p>
            Nous nous engageons a traiter toute preoccupation en matiere de confidentialite
            avec diligence. Si notre reponse ne vous satisfait pas, vous pouvez vous adresser
            a l&apos;autorite competente dans votre ressort.
          </p>
        </>
      ) : (
        <>
          <p>
            ARTEMIS Watches (&ldquo;ARTEMIS&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;,
            &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your personal information
            when you visit <strong>artemis-watches.com</strong> or make a purchase from us.
          </p>
          <p>
            This policy is intended to comply with applicable Canadian privacy legislation,
            including the <em>Personal Information Protection and Electronic Documents Act</em>{' '}
            (PIPEDA) and Quebec&apos;s{' '}
            <em>Act respecting the protection of personal information in the private sector</em>{' '}
            (Law 25).
          </p>

          <hr className="section-divider" />
          <h2 id="collection">1. Information We Collect</h2>
          <h3>Information you provide directly</h3>
          <ul>
            <li>
              <strong>Account information:</strong> name, email address, and password when
              you create an account.
            </li>
            <li>
              <strong>Order information:</strong> name, email address, shipping address, and
              order details when you make a purchase.
            </li>
            <li>
              <strong>Communications:</strong> messages sent to us via email, WhatsApp, or
              our contact form.
            </li>
          </ul>
          <h3>Information collected automatically</h3>
          <ul>
            <li>
              <strong>Usage data:</strong> pages visited, time on site, referring URLs,
              browser type, and device information.
            </li>
            <li>
              <strong>Cookies and similar technologies:</strong> see the Cookies section
              below.
            </li>
            <li>
              <strong>IP address:</strong> used for security, fraud prevention, and
              analytics.
            </li>
          </ul>
          <h3>Payment information</h3>
          <p>
            Payment card details are processed directly by <strong>Stripe</strong>. ARTEMIS
            does not receive, store, or have access to your full card number, CVV, or other
            sensitive payment credentials. Only a tokenized reference and basic transaction
            metadata are stored by us.
          </p>

          <hr className="section-divider" />
          <h2 id="use">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>process and fulfill your orders, including shipping and delivery;</li>
            <li>send transactional emails and account-related notices;</li>
            <li>respond to your inquiries and provide customer support;</li>
            <li>issue your promotional code and manage account benefits;</li>
            <li>detect, investigate, and prevent fraud or abuse;</li>
            <li>analyze site usage to improve our products and user experience;</li>
            <li>comply with legal obligations.</li>
          </ul>
          <h3>Marketing communications</h3>
          <p>
            We may send you marketing emails about new arrivals, promotions, and events if
            you have opted in to such communications. You may unsubscribe at any time by
            clicking the unsubscribe link in any marketing email, or by contacting us
            directly.
          </p>
          <p>
            We do not send unsolicited marketing messages via WhatsApp. Any WhatsApp
            communication is initiated by you.
          </p>

          <hr className="section-divider" />
          <h2 id="sharing">3. Sharing &amp; Disclosure</h2>
          <p>
            We do not sell, rent, or trade your personal information to third parties. We
            may share your information only in the following limited circumstances:
          </p>
          <ul>
            <li>
              <strong>Service providers:</strong> we work with trusted third-party service
              providers who help us operate the Site and fulfill orders, including Stripe
              (payments), Vercel (hosting), Resend (transactional email), and Supabase
              (database).
            </li>
            <li>
              <strong>Shipping carriers:</strong> your name and delivery address are shared
              with shipping carriers to fulfill your order.
            </li>
            <li>
              <strong>Legal obligations:</strong> we may disclose your information if
              required by law, court order, or government authority, or to protect the
              rights, property, or safety of ARTEMIS, our clients, or others.
            </li>
            <li>
              <strong>Business transfer:</strong> in the event of a merger, acquisition, or
              sale of assets, your information may be transferred as part of that
              transaction.
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
              <strong>Essential cookies:</strong> required for the Site to function,
              including session management, authentication, and cart persistence.
            </li>
            <li>
              <strong>Analytics cookies:</strong> help us understand how visitors interact
              with the Site. Data is aggregated and anonymized where possible.
            </li>
            <li>
              <strong>Preference cookies:</strong> remember your settings and preferences,
              such as language and cart contents.
            </li>
          </ul>
          <h3>Managing cookies</h3>
          <p>
            You can control and delete cookies through your browser settings. Disabling
            certain cookies may affect site functionality. Our cookie banner also allows you
            to manage non-essential cookies on your first visit.
          </p>

          <hr className="section-divider" />
          <h2 id="retention">5. Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to fulfill the
            purposes described in this policy, unless a longer retention period is required
            or permitted by law.
          </p>
          <ul>
            <li>
              <strong>Order data:</strong> retained for a minimum of 7 years for tax and
              legal compliance purposes.
            </li>
            <li>
              <strong>Account data:</strong> retained for the duration of your account, plus
              2 years after deletion.
            </li>
            <li>
              <strong>Communication records:</strong> retained for up to 3 years.
            </li>
            <li>
              <strong>Analytics data:</strong> retained in aggregated, anonymized form.
            </li>
          </ul>
          <p>
            You may request deletion of your personal data at any time, subject to our legal
            retention obligations.
          </p>

          <hr className="section-divider" />
          <h2 id="rights">6. Your Rights</h2>
          <p>
            Under applicable Canadian privacy law, you have the following rights regarding
            your personal information:
          </p>
          <ul>
            <li>
              <strong>Access:</strong> request a copy of the personal information we hold
              about you.
            </li>
            <li>
              <strong>Correction:</strong> request correction of inaccurate or incomplete
              information.
            </li>
            <li>
              <strong>Deletion:</strong> request deletion of your personal information,
              subject to legal retention obligations.
            </li>
            <li>
              <strong>Withdrawal of consent:</strong> withdraw consent where consent is the
              legal basis for processing.
            </li>
            <li>
              <strong>Portability:</strong> receive your data in a structured,
              machine-readable format where technically feasible.
            </li>
            <li>
              <strong>Objection:</strong> object to certain uses of your data, including
              direct marketing.
            </li>
          </ul>
          <p>
            To exercise any of these rights, contact us at{' '}
            <a href="mailto:artemismtl101@gmail.com">artemismtl101@gmail.com</a>. We
            will respond within 30 days of receiving your request and may need to verify
            your identity before acting on it.
          </p>
          <p>
            If you believe your privacy rights have not been respected, you may file a
            complaint with the Office of the Privacy Commissioner of Canada or the Quebec
            Commission d&apos;acces a l&apos;information.
          </p>

          <hr className="section-divider" />
          <h2 id="security">7. Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your
            personal information against improper access, disclosure, alteration, or
            destruction.
          </p>
          <ul>
            <li>HTTPS encryption for all transmitted data;</li>
            <li>encrypted password storage using bcrypt hashing;</li>
            <li>access controls limiting internal access to personal data;</li>
            <li>PCI-DSS compliant payment processing through Stripe.</li>
          </ul>
          <p>
            No method of transmission over the internet or electronic storage is completely
            secure. If a breach affects your rights and freedoms, we will notify you and the
            relevant authorities as required by law.
          </p>

          <hr className="section-divider" />
          <h2 id="minors">8. Minors</h2>
          <p>
            The Site is intended for users who are 18 years of age or older. We do not
            knowingly collect personal information from minors. If we become aware that we
            have collected such data without appropriate consent, we will delete it promptly.
          </p>

          <hr className="section-divider" />
          <h2 id="contact">9. Contact &amp; Privacy Officer</h2>
          <p>
            Questions, requests, or complaints regarding this Privacy Policy or our data
            practices should be addressed to:
          </p>
          <ul>
            <li>
              <strong>Email:</strong>{' '}
              <a href="mailto:artemismtl101@gmail.com">artemismtl101@gmail.com</a>
            </li>
            <li>
              <strong>WhatsApp:</strong>{' '}
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                514-560-9765
              </a>
            </li>
            <li>
              <strong>Location:</strong> Montreal, QC, Canada
            </li>
          </ul>
          <p>
            We are committed to addressing privacy concerns promptly. If our response does
            not resolve your concern, you may escalate the matter to the relevant authority
            in your jurisdiction.
          </p>
        </>
      )}
    </LegalLayout>
  );
}
