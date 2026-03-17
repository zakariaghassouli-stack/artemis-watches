import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await auth();
    return NextResponse.json({ ok: true, session });
  } catch (err) {
    const error = err as Error;
    return NextResponse.json({
      ok: false,
      message: error.message,
      name: error.name,
      stack: error.stack?.split('\n').slice(0, 8).join('\n'),
    }, { status: 500 });
  }
}
