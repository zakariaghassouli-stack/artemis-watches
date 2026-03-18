import NextAuth from 'next-auth';
import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { authConfig } from '@/auth.config';
import { routing } from '@/i18n/routing';

const { auth } = NextAuth(authConfig);

// Pass localeDetection: false directly to createMiddleware (not via defineRouting)
// so next-intl never redirects based on Accept-Language headers.
const intlMiddleware = createMiddleware({
  ...routing,
  localeDetection: false,
});

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

  // ── Auth guards ───────────────────────────────────────────────
  if (isProtectedRoute(pathname) && !isLoggedIn) {
    const loginUrl = new URL('/account/login', req.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoggedIn && isAuthPage(pathname)) {
    return NextResponse.redirect(new URL('/account', req.url));
  }

  // ── Locale middleware ─────────────────────────────────────────
  const response = intlMiddleware(req as NextRequest);

  // Guard: if intlMiddleware returns any redirect that targets the same
  // pathname (self-redirect), break the loop by passing through instead.
  // We compare by pathname only to handle host/protocol differences on Vercel edge.
  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get('location');
    if (location) {
      try {
        const target = new URL(location, 'http://n'); // neutral base to parse relative URLs
        if (target.pathname === pathname) {
          return NextResponse.next();
        }
      } catch {
        // ignore malformed location headers
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
