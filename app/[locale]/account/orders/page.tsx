import { getLocale } from 'next-intl/server';
import { redirect } from '@/i18n/navigation';

// /account/orders redirects to /account — order history lives in the main dashboard
export default async function OrdersPage() {
  const locale = await getLocale();
  redirect({ href: '/account', locale });
}
