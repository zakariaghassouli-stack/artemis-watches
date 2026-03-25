'use client';

import { useEffect } from 'react';
import { analytics } from '@/lib/analytics';

interface Props {
  brand: string;
  itemCount: number;
}

export function CollectionViewTracker({ brand, itemCount }: Props) {
  useEffect(() => {
    analytics.viewCollection(brand, itemCount);
  }, [brand, itemCount]);

  return null;
}
