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

export function getProductWhatsAppMessage(input: {
  locale: string;
  productName: string;
  variant: string;
  price: string;
}): string {
  const { locale, productName, variant, price } = input;

  return locale === 'fr'
    ? `Bonjour ! Je suis intéressé(e) par ${productName} (${variant}), ${price} CAD. Est-elle encore disponible ?`
    : `Hi! I'm interested in the ${productName} (${variant}), ${price} CAD. Is it still available?`;
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
