'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import type { Currency } from '@/lib/currency';
import { CURRENCY_COOKIE } from '@/lib/currency';

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (c: Currency) => void;
}

const CurrencyContext = createContext<CurrencyContextValue>({
  currency: 'CAD',
  setCurrency: () => {},
});

export function useCurrency(): CurrencyContextValue {
  return useContext(CurrencyContext);
}

export function CurrencyProvider({
  children,
  initial = 'CAD',
}: {
  children: React.ReactNode;
  initial?: Currency;
}) {
  const [currency, setCurrencyState] = useState<Currency>(initial);

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
    document.cookie = `${CURRENCY_COOKIE}=${c};path=/;max-age=31536000;SameSite=Lax`;
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}
