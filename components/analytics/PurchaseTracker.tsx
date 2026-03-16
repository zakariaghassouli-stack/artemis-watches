'use client';

import { useEffect } from 'react';
import { pixel } from '@/lib/pixel';

interface Props {
  total: number;
  numItems: number;
  contentIds: string[];
}

export function PurchaseTracker({ total, numItems, contentIds }: Props) {
  useEffect(() => {
    pixel.purchase({
      value: total,
      currency: 'CAD',
      num_items: numItems,
      content_ids: contentIds,
      content_type: 'product',
    });
  }, []); // fires once on mount — order success page is only visited once

  return null;
}
