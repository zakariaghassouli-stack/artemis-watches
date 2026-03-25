declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __artemisPendingAnalytics?: Array<{
      eventName: string;
      params?: Record<string, unknown>;
    }>;
  }
}

type AnalyticsItem = {
  id: string;
  name: string;
  brand?: string;
  price: number;
  range?: string;
  quantity?: number;
};

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') {
    window.__artemisPendingAnalytics = window.__artemisPendingAnalytics ?? [];
    window.__artemisPendingAnalytics.push({ eventName, params });
    return;
  }
  window.gtag('event', eventName, params);
}

export const analytics = {
  viewItem(product: {
    id: string;
    name: string;
    brand: string;
    price: number;
    range: string;
  }) {
    trackEvent('view_item', {
      currency: 'CAD',
      value: product.price,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_brand: product.brand,
          item_category: product.range,
          price: product.price,
        },
      ],
    });
  },

  addToCart(product: {
    id: string;
    name: string;
    brand: string;
    price: number;
    range: string;
    quantity: number;
  }) {
    trackEvent('add_to_cart', {
      currency: 'CAD',
      value: product.price * product.quantity,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_brand: product.brand,
          item_category: product.range,
          price: product.price,
          quantity: product.quantity,
        },
      ],
    });
  },

  removeFromCart(product: { id: string; name: string; price: number }) {
    trackEvent('remove_from_cart', {
      currency: 'CAD',
      value: product.price,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          price: product.price,
        },
      ],
    });
  },

  beginCheckout(items: AnalyticsItem[], total: number) {
    trackEvent('begin_checkout', {
      currency: 'CAD',
      value: total,
      items: items.map((item) => ({
        item_id: item.id,
        item_name: item.name,
        item_brand: item.brand,
        item_category: item.range,
        price: item.price,
        quantity: item.quantity ?? 1,
      })),
    });
  },

  purchase(orderId: string, items: AnalyticsItem[], total: number) {
    trackEvent('purchase', {
      transaction_id: orderId,
      currency: 'CAD',
      value: total,
      items: items.map((item) => ({
        item_id: item.id,
        item_name: item.name,
        item_brand: item.brand,
        item_category: item.range,
        price: item.price,
        quantity: item.quantity ?? 1,
      })),
    });
  },

  signUp(method: string) {
    trackEvent('sign_up', { method });
  },

  whatsappClick(page: string, productId?: string) {
    trackEvent('whatsapp_click', {
      page,
      ...(productId ? { product_id: productId } : {}),
    });
  },

  viewCollection(brand: string, itemCount: number) {
    trackEvent('view_item_list', {
      item_list_id: brand,
      item_list_name: `${brand} Collection`,
      items: [
        {
          item_list_id: brand,
          item_list_name: `${brand} (${itemCount} pieces)`,
        },
      ],
    });
  },

  applyPromo(code: string, discount: number) {
    trackEvent('apply_promo', {
      coupon: code,
      discount_value: discount,
    });
  },

  popupShown() {
    trackEvent('popup_shown', { popup_type: '10_percent_welcome' });
  },

  popupConverted() {
    trackEvent('popup_converted', { popup_type: '10_percent_welcome' });
  },

  popupDismissed() {
    trackEvent('popup_dismissed', { popup_type: '10_percent_welcome' });
  },
};
