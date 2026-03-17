'use client';

import { useEffect, useRef } from 'react';
import { AnnouncementBar } from './AnnouncementBar';
import { Navbar } from './Navbar';

export function SiteHeader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set initial value immediately
    document.documentElement.style.setProperty('--header-h', el.offsetHeight + 'px');

    // Update whenever height changes (bar dismissed, resize, etc.)
    const ro = new ResizeObserver(() => {
      document.documentElement.style.setProperty('--header-h', el.offsetHeight + 'px');
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
      }}
    >
      <AnnouncementBar />
      <Navbar />
    </div>
  );
}
