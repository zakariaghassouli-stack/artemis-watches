import { redirect } from 'next/navigation';

// Wishlist lives at /wishlist — redirect there from /account/wishlist
export default function AccountWishlistPage() {
  redirect('/wishlist');
}
