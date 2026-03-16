'use client';

import { useEffect } from 'react';
import { pixel } from '@/lib/pixel';

interface Props {
  productId: string;
  productName: string;
  price: number;
}

export function ViewContentTracker({ productId, productName, price }: Props) {
  useEffect(() => {
    pixel.viewContent({
      content_ids: [productId],
      content_name: productName,
      content_type: 'product',
      value: price,
      currency: 'CAD',
    });
  }, [productId]); // fires once per product page — productId is stable

  return null;
}
