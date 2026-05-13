'use client';

import { useEffect, useRef } from 'react';
import { track } from '@vercel/analytics';

const THRESHOLDS = [25, 50, 75, 100] as const;

export function ScrollDepthTracker() {
  const firedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollable = documentHeight - viewportHeight;
      if (scrollable <= 0) return;
      const depth = Math.floor((scrollTop / scrollable) * 100);

      for (const threshold of THRESHOLDS) {
        if (depth >= threshold && !firedRef.current.has(threshold)) {
          firedRef.current.add(threshold);
          track('scroll_depth', { depth: threshold });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
}
