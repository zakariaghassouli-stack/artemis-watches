'use client';

import { Heart } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlist';

interface Props {
  productId: string;
  label?: string;
  size?: 'sm' | 'md';
}

export function WishlistButton({ productId, label, size = 'md' }: Props) {
  const toggle = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(productId));

  const iconSize = size === 'sm' ? 14 : 18;

  return (
    <button
      onClick={(e) => {
        e.preventDefault(); // prevent link navigation when inside a card
        e.stopPropagation();
        toggle(productId);
      }}
      aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
      aria-pressed={isWishlisted}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: size === 'sm' ? '4px' : '6px',
        color: isWishlisted ? '#C9A96E' : '#6B6965',
        transition: 'color 0.2s, transform 0.15s',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color = isWishlisted ? '#E8C87E' : '#A8A5A0';
        (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color = isWishlisted ? '#C9A96E' : '#6B6965';
        (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
      }}
    >
      <Heart
        size={iconSize}
        fill={isWishlisted ? '#C9A96E' : 'none'}
        strokeWidth={1.5}
      />
      {label && (
        <span
          style={{
            fontSize: '0.72rem',
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </span>
      )}
    </button>
  );
}
