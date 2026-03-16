import { redirect } from 'next/navigation';

// /account/orders redirects to /account — order history lives in the main dashboard
export default function OrdersPage() {
  redirect('/account');
}
