import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: prisma ? PrismaAdapter(prisma) : undefined,

  // JWT strategy — sessions stored client-side, no DB session table needed
  session: { strategy: 'jwt' },

  pages: {
    signIn: '/account/login',
    error: '/account/login',
  },

  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!prisma) return null;

        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.passwordHash) return null;

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          promoCode: user.promoCode,
          promoUsed: user.promoUsed,
        };
      },
    }),
  ],

  callbacks: {
    // Persist custom fields into the JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.promoCode = (user as { promoCode?: string }).promoCode;
        token.promoUsed = (user as { promoUsed?: boolean }).promoUsed;
      }
      return token;
    },
    // Expose custom fields on the session object
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        (session.user as { promoCode?: string }).promoCode = token.promoCode as string | undefined;
        (session.user as { promoUsed?: boolean }).promoUsed = token.promoUsed as boolean | undefined;
      }
      return session;
    },
  },
});
