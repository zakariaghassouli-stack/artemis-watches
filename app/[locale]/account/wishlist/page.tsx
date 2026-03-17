import { getLocale } from 'next-intl/server';
import { redirect } from '@/i18n/navigation';

// Wishlist lives at /wishlist — redirect there from /account/wishlist
export default async function AccountWishlistPage() {
  const locale = await getLocale();
  redirect({ href: '/wishlist', locale });
}
