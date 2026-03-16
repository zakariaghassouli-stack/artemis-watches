// Typed wrapper for Meta Pixel (fbq)
// Guards against SSR and unloaded script — safe to call anywhere.

declare global {
  interface Window {
    fbq: (method: string, event: string, params?: Record<string, unknown>) => void;
  }
}

function call(method: string, event: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
  window.fbq(method, event, params);
}

export const pixel = {
  pageView(): void {
    call('track', 'PageView');
  },

  viewContent(params: {
    content_ids: string[];
    content_name: string;
    content_type: 'product';
    value: number;
    currency: string;
  }): void {
    call('track', 'ViewContent', params);
  },

  addToCart(params: {
    content_ids: string[];
    content_name: string;
    content_type: 'product';
    value: number;
    currency: string;
  }): void {
    call('track', 'AddToCart', params);
  },

  purchase(params: {
    value: number;
    currency: string;
    num_items: number;
    content_ids: string[];
    content_type: 'product';
  }): void {
    call('track', 'Purchase', params);
  },
};
