import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { SettingsClient } from './SettingsClient';

export default async function SettingsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let session: any;
  try {
    session = await auth();
  } catch {
    redirect('/account/login');
  }

  if (!session?.user?.email) redirect('/account/login');

  let userData = {
    name: session.user.name ?? '',
    email: session.user.email as string,
    emailMarketing: true,
    shippingFirstName: null as string | null,
    shippingLastName: null as string | null,
    shippingAddress: null as string | null,
    shippingCity: null as string | null,
    shippingProvince: null as string | null,
    shippingPostal: null as string | null,
  };

  if (prisma) {
    try {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: {
          name: true,
          email: true,
          emailMarketing: true,
          shippingFirstName: true,
          shippingLastName: true,
          shippingAddress: true,
          shippingCity: true,
          shippingProvince: true,
          shippingPostal: true,
        },
      });
      if (user) userData = { ...userData, ...user, name: user.name ?? '', email: user.email ?? session.user.email };
    } catch {
      // render with session data only
    }
  }

  return <SettingsClient user={userData} />;
}
