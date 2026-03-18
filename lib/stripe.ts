import Stripe from 'stripe';
import { requireEnv } from '@/lib/env';

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  if (stripeClient) {
    return stripeClient;
  }

  const apiKey = requireEnv('STRIPE_SECRET_KEY');
  stripeClient = new Stripe(apiKey, {
    apiVersion: '2026-02-25.clover',
    typescript: true,
  });

  return stripeClient;
}
