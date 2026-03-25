import { NextResponse } from 'next/server';
import { upsertContact } from '@/lib/hubspot';

export async function POST(request: Request) {
  const { email, name, source } = await request.json();

  if (!email) {
    return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
  }

  const contact = await upsertContact({
    email,
    firstname: name?.split(' ')[0],
    lastname: name?.split(' ').slice(1).join(' '),
    source: source || 'signup_10_percent',
  });

  return NextResponse.json({ success: true, contact });
}
