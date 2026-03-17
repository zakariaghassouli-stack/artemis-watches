import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function PATCH(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!prisma) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  const body = await request.json();
  const { firstName, lastName, address, city, province, postal } = body;

  await prisma.user.update({
    where: { email: session.user.email },
    data: {
      shippingFirstName: (firstName ?? '').trim() || null,
      shippingLastName: (lastName ?? '').trim() || null,
      shippingAddress: (address ?? '').trim() || null,
      shippingCity: (city ?? '').trim() || null,
      shippingProvince: (province ?? '').trim() || null,
      shippingPostal: (postal ?? '').trim() || null,
    },
  });

  return NextResponse.json({ success: true });
}
