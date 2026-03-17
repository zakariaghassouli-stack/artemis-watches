// Augment NextAuth types to include ARTEMIS custom fields
// Without this, session.user.id / promoCode / promoUsed require unsafe casts everywhere.

import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      promoCode?: string;
      promoUsed?: boolean;
    } & DefaultSession['user'];
  }

  interface User {
    promoCode?: string;
    promoUsed?: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    promoCode?: string;
    promoUsed?: boolean;
  }
}
