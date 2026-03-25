'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

const EMAIL_KEY = 'artemis_user_email';

export function SessionEmailSync() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') return;

    try {
      const email = session?.user?.email;
      if (email) {
        localStorage.setItem(EMAIL_KEY, email);
      }
    } catch {}
  }, [session?.user?.email, status]);

  return null;
}
