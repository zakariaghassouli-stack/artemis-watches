export const WHATSAPP_NUMBER = '15145609765';

export function getWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getNavWhatsAppMessage(locale: string): string {
  return locale === 'fr'
    ? "Bonjour ARTEMIS, j'ai besoin d'aide."
    : 'Hello ARTEMIS, I need assistance.';
}

export function getGeneralWhatsAppMessage(locale: string): string {
  return locale === 'fr'
    ? "Bonjour ARTEMIS ! J'aimerais en savoir plus sur votre collection."
    : "Hello ARTEMIS! I'd like to learn more about your collection.";
}

export function getFooterWhatsAppMessage(locale: string): string {
  return locale === 'fr'
    ? "Bonjour ! J'ai une question concernant Artemis Watches."
    : 'Hello! I have a question about Artemis Watches.';
}

export function getMovementsWhatsAppMessage(locale: string): string {
  return locale === 'fr'
    ? "Bonjour ARTEMIS, j'ai lu votre comparatif des mouvements et j'aimerais discuter d'une pièce."
    : 'Hello ARTEMIS, I read your movements comparison and would like to discuss a piece.';
}

export function getApproachWhatsAppMessage(locale: string): string {
  return locale === 'fr'
    ? "Bonjour ARTEMIS, j'ai lu votre page Notre approche et j'aimerais discuter d'une pièce."
    : 'Hello ARTEMIS, I read your Our Approach page and would like to discuss a piece.';
}

export function getProductWhatsAppMessage(input: {
  locale: string;
  productName: string;
  variant: string;
  price: string;
  range?: 'essential' | 'premium';
  size?: string;
  boxAndPapers?: boolean;
}): string {
  const { locale, productName, variant, price, range, size, boxAndPapers } = input;

  const rangeLabel = range
    ? locale === 'fr'
      ? range === 'premium'
        ? 'gamme Premium'
        : 'gamme Essential (Miyota)'
      : range === 'premium'
        ? 'Premium range'
        : 'Essential range (Miyota)'
    : null;

  const sizePart = size ? ` ${size}` : '';
  const boxPart = boxAndPapers
    ? locale === 'fr'
      ? ' avec box & papers'
      : ' with box & papers'
    : '';

  if (locale === 'fr') {
    const rangeSentence = rangeLabel ? ` en ${rangeLabel}` : '';
    return `Bonjour ! Je suis intéressé(e) par ${productName} (${variant})${sizePart}${rangeSentence}${boxPart}, ${price} CAD. Est-elle encore disponible ?`;
  }
  const rangeSentence = rangeLabel ? `, ${rangeLabel}` : '';
  return `Hi! I'm interested in the ${productName} (${variant})${sizePart}${rangeSentence}${boxPart}, ${price} CAD. Is it still available?`;
}

export interface CartWhatsAppItem {
  brand: string;
  name: string;
  variant?: string;
  size?: string;
  range?: 'essential' | 'premium';
  boxAndPapers?: boolean;
  price: number;
  quantity: number;
}

/**
 * Builds the prefilled WhatsApp message for the cart "Finalize on WhatsApp"
 * CTA used during the Pivot V2 stand-by. Lists each cart item with brand,
 * model, variant, size, range, optional Box & Papers flag, and unit price.
 * Closes with the estimated total and a request for availability + timing.
 *
 * The total is what the customer sees in the drawer (subtotal minus any
 * applied promo); Artemis confirms the actual price + timing in the chat.
 */
export function getCartWhatsAppMessage(input: {
  locale: string;
  items: CartWhatsAppItem[];
  total: number;
}): string {
  const { locale, items, total } = input;
  const isFr = locale === 'fr';

  const intro = isFr
    ? 'Bonjour ARTEMIS, je souhaite commander :'
    : 'Hello ARTEMIS, I would like to order:';

  const lines = items.map((it) => {
    const sizePart = it.size ? ` ${it.size}` : '';
    const variantPart = it.variant ? ` (${it.variant})` : '';
    const rangeLabel = it.range
      ? isFr
        ? it.range === 'premium'
          ? ' · gamme Premium'
          : ' · gamme Essential (Miyota)'
        : it.range === 'premium'
          ? ' · Premium range'
          : ' · Essential range (Miyota)'
      : '';
    const boxPart = it.boxAndPapers ? (isFr ? ' + Box & Papers' : ' + Box & Papers') : '';
    const qtyPart = it.quantity > 1 ? `${it.quantity}× ` : '';
    const linePrice = it.price * it.quantity;
    return `- ${qtyPart}${it.brand} ${it.name}${variantPart}${sizePart}${rangeLabel}${boxPart} · ${linePrice} CAD`;
  });

  const totalLine = isFr
    ? `Total estimé : ${total} CAD`
    : `Estimated total: ${total} CAD`;
  const closing = isFr
    ? 'Disponibilité et délai SVP ?'
    : 'Can you confirm availability and timing?';

  return `${intro}\n${lines.join('\n')}\n\n${totalLine}\n\n${closing}`;
}

export function getOrderWhatsAppMessage(locale: string, orderId?: string): string {
  if (locale === 'fr') {
    return orderId
      ? `Bonjour ARTEMIS, j'ai une question concernant la commande #${orderId}.`
      : "Bonjour ARTEMIS, j'ai besoin d'aide avec ma commande.";
  }

  return orderId
    ? `Hello ARTEMIS, I have a question about order #${orderId}.`
    : 'Hello ARTEMIS, I need help with my order.';
}
