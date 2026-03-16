'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/store/cart';

// Clears the cart after a successful checkout — mounted on the success page
export function CartClearer() {
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return null;
}
