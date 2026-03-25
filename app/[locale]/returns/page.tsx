import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal/LegalLayout';
import { getLocale } from 'next-intl/server';
import { getGeneralWhatsAppMessage, getWhatsAppUrl } from '@/lib/whatsapp';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return {
    title:
      locale === 'fr'
        ? 'Politique de retour — ARTEMIS Watches'
        : 'Return Policy — ARTEMIS Watches',
    description:
      locale === 'fr'
        ? 'Politique de retour de 30 jours ARTEMIS. Remboursement integral, sans complication. Voici comment demander un retour.'
        : 'ARTEMIS 30-day return policy. Full refund, no questions asked. Learn how to initiate a return and what to expect.',
  };
}

export default async function ReturnPolicyPage() {
  const locale = await getLocale();
  const isFr = locale === 'fr';
  const whatsappUrl = getWhatsAppUrl(getGeneralWhatsAppMessage(locale));

  const sections = isFr
    ? [
        { id: 'overview', title: 'Garantie de 30 jours' },
        { id: 'eligibility', title: 'Admissibilite' },
        { id: 'how-to-return', title: 'Procedure de retour' },
        { id: 'condition', title: 'Etat requis' },
        { id: 'refunds', title: 'Remboursement' },
        { id: 'exchanges', title: 'Echanges' },
        { id: 'exceptions', title: 'Exceptions' },
        { id: 'contact', title: 'Nous joindre' },
      ]
    : [
        { id: 'overview', title: '30-Day Guarantee' },
        { id: 'eligibility', title: 'Eligibility' },
        { id: 'how-to-return', title: 'How to Return' },
        { id: 'condition', title: 'Condition Requirements' },
        { id: 'refunds', title: 'Refund Process' },
        { id: 'exchanges', title: 'Exchanges' },
        { id: 'exceptions', title: 'Exceptions' },
        { id: 'contact', title: 'Contact Us' },
      ];

  return (
    <LegalLayout
      overline="LEGAL"
      title={isFr ? 'Politique de retour' : 'Return Policy'}
      lastUpdated={isFr ? '1 janvier 2025' : 'January 1, 2025'}
      sections={sections}
    >
      {isFr ? (
        <>
          <h2 id="overview">Garantie satisfait ou rembourse de 30 jours</h2>
          <div className="legal-highlight">
            <p>
              <strong>ARTEMIS assume chaque piece vendue.</strong> Si vous n&apos;etes pas
              pleinement satisfait de votre achat, pour quelque raison que ce soit, vous
              pouvez le retourner dans les 30 jours suivant la date de livraison pour un
              remboursement integral.
            </p>
          </div>
          <p>
            Nous voulons que chaque client se sente en confiance au moment d&apos;acheter chez
            ARTEMIS. Cette garantie existe parce que nous croyons a la qualite de nos pieces
            et a la transparence de notre approche. Si une montre ne correspond pas a vos
            attentes, nous corrigerons la situation.
          </p>

          <hr className="section-divider" />
          <h2 id="eligibility">Admissibilite au retour</h2>
          <p>Pour etre admissible, les conditions suivantes doivent etre respectees :</p>
          <ul>
            <li>la demande doit etre initiee dans les <strong>30 jours calendaires</strong> suivant la livraison confirmee;</li>
            <li>la montre doit etre retournee dans son etat d&apos;origine ou equivalent;</li>
            <li>tous les emballages, accessoires et documents inclus doivent etre retournes;</li>
            <li>la commande doit avoir ete passee directement sur <strong>artemis-watches.com</strong>.</li>
          </ul>
          <p>
            Les achats effectues via des canaux tiers, comme Facebook Marketplace, Snapchat
            ou une vente privee, sont regis par les conditions propres a cette transaction.
          </p>

          <hr className="section-divider" />
          <h2 id="how-to-return">Comment demander un retour</h2>
          <h3>Etape 1 - Nous contacter</h3>
          <p>Communiquez avec nous dans les 30 jours suivant la livraison par l&apos;un des canaux suivants :</p>
          <ul>
            <li>
              <strong>WhatsApp :</strong>{' '}
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                514-560-9765
              </a>{' '}
              - reponse la plus rapide
            </li>
            <li>
              <strong>Courriel :</strong>{' '}
              <a href="mailto:artemismtl101@gmail.com">artemismtl101@gmail.com</a>
            </li>
          </ul>
          <p>
            Veuillez inclure votre numero de commande et une courte explication du retour.
            Nous confirmerons la reception de votre demande et vous enverrons les
            instructions dans un delai d&apos;un jour ouvrable.
          </p>

          <h3>Etape 2 - Emballer et expedier</h3>
          <p>
            Une fois le retour approuve, nous vous fournirons une <strong>etiquette de retour prepayee</strong>.
            Emballez la montre de facon securitaire dans son emballage d&apos;origine, puis
            deposez le colis au point de service indique.
          </p>

          <h3>Etape 3 - Remboursement emis</h3>
          <p>
            Des que nous recevons et inspectons l&apos;article retourne, generalement dans un
            delai de 1 a 2 jours ouvrables, nous traitons votre remboursement.
          </p>

          <hr className="section-divider" />
          <h2 id="condition">Etat requis</h2>
          <p>
            Nous demandons que les montres retournees soient essentiellement dans le meme
            etat que lors de l&apos;expedition. Plus precisement :
          </p>
          <ul>
            <li>la montre peut avoir ete portee uniquement pour inspection ou essayage;</li>
            <li>aucun dommage physique, rayure importante ou alteration ne doit etre present;</li>
            <li>l&apos;outil d&apos;ajustement de bracelet, si inclus, doit etre retourne;</li>
            <li>tout accessoire boite et papiers doit etre retourne en bon etat.</li>
          </ul>
          <p>
            Nous nous reservons le droit d&apos;evaluer l&apos;etat de l&apos;article retourne et, en
            cas d&apos;usure ou de dommage important apparu apres livraison, de deduire un
            montant raisonnable du remboursement ou de refuser le retour. Nous vous
            informerons toujours avant toute decision.
          </p>

          <hr className="section-divider" />
          <h2 id="refunds">Remboursement</h2>
          <p>
            Les remboursements approuves sont emis sur le <strong>mode de paiement
            original</strong> utilise lors de la commande. Le remboursement est lance dans un
            delai de <strong>5 a 7 jours ouvrables</strong> suivant la reception et
            l&apos;inspection de l&apos;article.
          </p>
          <p>
            Une fois le remboursement initie, le delai d&apos;apparition sur votre compte depend
            de votre institution financiere ou du fournisseur de paiement. Delais habituels :
          </p>
          <ul>
            <li>
              <strong>Carte de credit ou debit :</strong> 3 a 10 jours ouvrables
            </li>
            <li>
              <strong>Apple Pay ou Google Pay :</strong> 3 a 5 jours ouvrables
            </li>
          </ul>
          <p>
            Les <strong>frais de livraison ne sont pas remboursables</strong>, sauf si le
            retour resulte d&apos;une erreur de notre part, par exemple un mauvais article ou un
            produit non conforme a la description.
          </p>
          <p>
            Les etiquettes de retour prepayees fournies par ARTEMIS sont sans frais pour les
            retours approuves.
          </p>

          <hr className="section-divider" />
          <h2 id="exchanges">Echanges</h2>
          <p>
            Nous ne traitons pas les echanges directs pour le moment. Si vous souhaitez
            remplacer une montre par une autre piece, veuillez retourner la commande initiale
            puis passer une nouvelle commande pour le modele desire.
          </p>
          <p>
            Si vous souhaitez trouver une piece equivalente ou alternative, ecrivez-nous sur
            WhatsApp. Nous vous aiderons avec plaisir a choisir la bonne montre.
          </p>

          <hr className="section-divider" />
          <h2 id="exceptions">Exceptions</h2>
          <p>Les articles suivants ne sont pas admissibles au retour :</p>
          <ul>
            <li>les articles retournes plus de 30 jours apres la livraison confirmee;</li>
            <li>les articles presentant des dommages visibles causes apres livraison;</li>
            <li>les articles ajustes, reparés ou modifies par un tiers apres livraison;</li>
            <li>les pieces reservees ou speciales identifiees comme vente finale.</li>
          </ul>

          <hr className="section-divider" />
          <h2 id="contact">Nous joindre</h2>
          <p>
            Pour toute question concernant cette politique ou pour obtenir de l&apos;aide avec un
            retour :
          </p>
          <ul>
            <li>
              <strong>WhatsApp :</strong>{' '}
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                514-560-9765
              </a>
            </li>
            <li>
              <strong>Courriel :</strong>{' '}
              <a href="mailto:artemismtl101@gmail.com">artemismtl101@gmail.com</a>
            </li>
            <li>
              <strong>Emplacement :</strong> Montreal, QC, Canada
            </li>
          </ul>
          <p>
            WhatsApp reste le moyen le plus direct pour nous joindre pendant les heures
            d&apos;ouverture, du lundi au samedi, de 9 h a 20 h HNE.
          </p>
        </>
      ) : (
        <>
          <h2 id="overview">30-Day Returns</h2>
          <div className="legal-highlight">
            <p>
              <strong>If the piece is not right for you,</strong> you may return it within
              30 days of the delivery date according to the terms below.
            </p>
          </div>
          <p>
            The policy is designed to keep the process clear: if the watch does not suit
            you, contact us within the return window and we will guide you through the
            next steps.
          </p>

          <hr className="section-divider" />
          <h2 id="eligibility">Return Eligibility</h2>
          <p>To be eligible for a return, the following conditions must be met:</p>
          <ul>
            <li>the request must be initiated within <strong>30 calendar days</strong> of confirmed delivery;</li>
            <li>the watch must be returned in its original or equivalent condition;</li>
            <li>all original packaging, accessories, and documentation must be returned;</li>
            <li>the order must have been placed directly through <strong>artemis-watches.com</strong>.</li>
          </ul>
          <p>
            Returns purchased through third-party channels such as Facebook Marketplace,
            Snapchat, or private sale are governed by the terms of that specific
            transaction.
          </p>

          <hr className="section-divider" />
          <h2 id="how-to-return">How to Initiate a Return</h2>
          <h3>Step 1 - Contact us</h3>
          <p>Reach out to us within 30 days of delivery through one of the following channels:</p>
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
            Please include your order number and a brief description of the reason for your
            return. We will confirm receipt and send return instructions within 1 business
            day.
          </p>

          <h3>Step 2 - Pack and ship</h3>
          <p>
            Once your return is approved, we will provide a <strong>prepaid return shipping label</strong>.
            Pack the watch securely in its original packaging and drop it off at the
            designated carrier location shown on the label.
          </p>

          <h3>Step 3 - Refund issued</h3>
          <p>
            Once we receive and inspect the returned item, typically within 1 to 2 business
            days, we will process your refund.
          </p>

          <hr className="section-divider" />
          <h2 id="condition">Condition Requirements</h2>
          <p>
            Returned watches must be in substantially the same condition as when shipped to
            you. Specifically:
          </p>
          <ul>
            <li>the watch may only have been worn for inspection or evaluation purposes;</li>
            <li>no physical damage, major scratches, or alterations should be present;</li>
            <li>the bracelet adjustment tool, if included, must be returned;</li>
            <li>any box and papers accessory must be returned in original condition.</li>
          </ul>
          <p>
            We reserve the right to assess the condition of the returned item and, where
            significant wear or damage occurred after delivery, deduct a reasonable amount
            from the refund or decline the return. We will always communicate our assessment
            before acting.
          </p>

          <hr className="section-divider" />
          <h2 id="refunds">Refund Process</h2>
          <p>
            Approved refunds are processed to the <strong>original payment method</strong>{' '}
            used at checkout. Refunds are initiated within <strong>5 to 7 business days</strong>{' '}
            of our receipt and inspection of the returned item.
          </p>
          <p>
            Once initiated, the time for the refund to appear in your account depends on
            your bank or payment provider. Typical processing times:
          </p>
          <ul>
            <li>
              <strong>Credit or debit card:</strong> 3 to 10 business days
            </li>
            <li>
              <strong>Apple Pay or Google Pay:</strong> 3 to 5 business days
            </li>
          </ul>
          <p>
            <strong>Shipping costs are non-refundable</strong>, except where the return is
            due to an error on our part, such as the wrong item being shipped or a product
            not matching its description.
          </p>
          <p>
            Prepaid return labels provided by ARTEMIS are free of charge for approved
            returns.
          </p>

          <hr className="section-divider" />
          <h2 id="exchanges">Exchanges</h2>
          <p>
            We do not process direct exchanges at this time. If you wish to exchange a watch
            for a different piece, please return the original order and place a new order
            for the desired item.
          </p>
          <p>
            For assistance selecting an equivalent or alternative timepiece, contact us on
            WhatsApp and we will be happy to help.
          </p>

          <hr className="section-divider" />
          <h2 id="exceptions">Exceptions</h2>
          <p>The following items are not eligible for return:</p>
          <ul>
            <li>items returned more than 30 days after confirmed delivery;</li>
            <li>items with visible damage caused after delivery;</li>
            <li>items serviced, resized, or altered by a third party after delivery;</li>
            <li>special-order or reserved pieces marked as final sale at purchase.</li>
          </ul>

          <hr className="section-divider" />
          <h2 id="contact">Contact Us</h2>
          <p>If you have any questions about this policy or need assistance with a return:</p>
          <ul>
            <li>
              <strong>WhatsApp:</strong>{' '}
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                514-560-9765
              </a>
            </li>
            <li>
              <strong>Email:</strong>{' '}
              <a href="mailto:artemismtl101@gmail.com">artemismtl101@gmail.com</a>
            </li>
            <li>
              <strong>Location:</strong> Montreal, QC, Canada
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
