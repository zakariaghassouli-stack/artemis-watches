import NextAuth from 'next-auth';
import { NextResponse, type NextRequest } from 'next/server';
import { authConfig } from '@/auth.config';

const { auth } = NextAuth(authConfig);

function isProtectedRoute(pathname: string): boolean {
  return /\/(fr\/)?account(?!\/(login|register))(\/|$)/.test(pathname);
}

function isAuthPage(pathname: string): boolean {
  return /\/(fr\/)?account\/(login|register)/.test(pathname);
}

export default auth(function proxy(req) {
  const session = (req as NextRequest & { auth: { user?: { email?: string | null } } | null }).auth;
  const isLoggedIn = !!session?.user?.email;
  const { pathname } = (req as NextRequest).nextUrl;

  // ── Auth guards (must run before locale routing) ──────────────
  if (isProtectedRoute(pathname) && !isLoggedIn) {
    const loginUrl = new URL('/account/login', req.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoggedIn && isAuthPage(pathname)) {
    return NextResponse.redirect(new URL('/account', req.url));
  }

  // ── Locale routing (manual — no next-intl middleware loops) ───
  //
  // Strategy (localePrefix: 'as-needed'):
  //   /fr/*        → FR locale, App Router handles [locale]=fr natively
  //   /en/*        → redirect to /* (canonical EN URL has no prefix)
  //   /* (no pfx)  → internal rewrite to /en/* so [locale] param = 'en'

  const isFr = pathname === '/fr' || pathname.startsWith('/fr/');
  if (isFr) {
    return NextResponse.next();
  }

  const isEnPrefixed = pathname === '/en' || pathname.startsWith('/en/');
  if (isEnPrefixed) {
    const url = (req as NextRequest).nextUrl.clone();
    url.pathname = pathname.slice(3) || '/';
    return NextResponse.redirect(url);
  }

  // Default: EN (no prefix in browser URL) — rewrite internally so
  // Next.js App Router resolves app/[locale]/... with locale='en'
  const url = (req as NextRequest).nextUrl.clone();
  url.pathname = '/en' + pathname;
  return NextResponse.rewrite(url);
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|images|fonts).*)',
  ],
};
