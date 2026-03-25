'use client';

import { useEffect } from 'react';
import { analytics } from '@/lib/analytics';
import { pixel } from '@/lib/pixel';

interface Props {
  productId: string;
  productName: string;
  brand: string;
  price: number;
  range: string;
}

export function ViewContentTracker({
  productId,
  productName,
  brand,
  price,
  range,
}: Props) {
  useEffect(() => {
    pixel.viewContent({
      content_ids: [productId],
      content_name: productName,
      content_type: 'product',
      value: price,
      currency: 'CAD',
    });
    analytics.viewItem({
      id: productId,
      name: productName,
      brand,
      price,
      range,
    });
  }, [brand, price, productId, productName, range]);

  return null;
}
