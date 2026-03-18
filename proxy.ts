import NextAuth from 'next-auth';
import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { authConfig } from '@/auth.config';
import { routing } from '@/i18n/routing';

const { auth } = NextAuth(authConfig);
const intlMiddleware = createMiddleware(routing);

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

  if (isProtectedRoute(pathname) && !isLoggedIn) {
    const loginUrl = new URL('/account/login', req.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoggedIn && isAuthPage(pathname)) {
    return NextResponse.redirect(new URL('/account', req.url));
  }

  const response = intlMiddleware(req as NextRequest);

  // Guard: prevent self-redirect loops (Vercel edge + localePrefix: 'as-needed' can cause / → /)
  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get('location');
    if (location) {
      try {
        const redirectUrl = new URL(location, req.url);
        if (redirectUrl.pathname === pathname) {
          return NextResponse.next();
        }
      } catch {
        // ignore malformed location header
      }
    }
  }

  return response;
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|images|fonts).*)',
  ],
};
