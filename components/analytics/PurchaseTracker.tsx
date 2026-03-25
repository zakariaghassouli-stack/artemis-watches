'use client';

import { useEffect } from 'react';
import { analytics } from '@/lib/analytics';
import { pixel } from '@/lib/pixel';

interface Props {
  orderId: string;
  total: number;
  numItems: number;
  contentIds: string[];
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    brand?: string;
    range?: string;
  }>;
}

export function PurchaseTracker({ orderId, total, numItems, contentIds, items }: Props) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storageKey = `artemis_purchase_tracked_${orderId}`;
      if (window.sessionStorage.getItem(storageKey) === '1') {
        return;
      }
      window.sessionStorage.setItem(storageKey, '1');
    }

    pixel.purchase({
      value: total,
      currency: 'CAD',
      num_items: numItems,
      content_ids: contentIds,
      content_type: 'product',
    });
    analytics.purchase(orderId, items, total);
  }, [contentIds, items, numItems, orderId, total]);

  return null;
}
