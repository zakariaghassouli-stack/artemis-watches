import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

function isAuthorized(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET?.trim();
  if (!secret) return false;

  return request.nextUrl.searchParams.get('secret') === secret;
}

function runRevalidation() {
  const paths = [
    '/',
    '/en',
    '/collections',
    '/en/collections',
    '/reviews',
    '/en/reviews',
  ];

  for (const path of paths) {
    revalidatePath(path);
  }
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ revalidated: false, error: 'Invalid secret' }, { status: 401 });
  }

  runRevalidation();
  return NextResponse.json({ revalidated: true, mode: 'manual' });
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ revalidated: false, error: 'Invalid secret' }, { status: 401 });
  }

  runRevalidation();
  return NextResponse.json({ revalidated: true, mode: 'webhook' });
}
