'use client';

import { useEffect } from 'react';
import { useCartStore, selectCartTotal } from '@/store/cart';

const EMAIL_KEY = 'artemis_user_email';

export function useCartAbandonment() {
  const items = useCartStore((state) => state.items);
  const cartTotal = useCartStore(selectCartTotal);

  useEffect(() => {
    if (items.length === 0) return;

    const timer = window.setTimeout(async () => {
      const email = localStorage.getItem(EMAIL_KEY);
      if (!email || items.length === 0) return;

      await fetch('/api/crm/cart-abandoned', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          cartItems: items,
          cartTotal,
        }),
      }).catch(() => undefined);
    }, 30 * 60 * 1000);

    return () => window.clearTimeout(timer);
  }, [cartTotal, items]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (items.length === 0) return;

      const email = localStorage.getItem(EMAIL_KEY);
      if (!email) return;

      const payload = JSON.stringify({
        email,
        cartItems: items,
        cartTotal,
      });

      navigator.sendBeacon('/api/crm/cart-abandoned', payload);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [cartTotal, items]);
}
