// auth.config.ts — Edge-safe NextAuth configuration
// This file is imported by middleware (Edge Runtime) and must NOT import
// bcryptjs, @prisma/client, or any other Node.js-only modules.
// The full auth config (with Credentials provider) lives in auth.ts.

import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  session: { strategy: 'jwt' as const },

  pages: {
    signIn: '/account/login',
    error: '/account/login',
  },

  // Providers are added in auth.ts — none here (Credentials uses bcrypt/prisma)
  providers: [],

  callbacks: {
    // Persist custom fields into the JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.promoCode = user.promoCode;
        token.promoUsed = user.promoUsed;
      }
      return token;
    },

    // Expose custom fields on the session object
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.promoCode = token.promoCode;
        session.user.promoUsed = token.promoUsed;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
