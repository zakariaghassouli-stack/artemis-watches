// The next-intl middleware handles all locale routing.
// This file acts as a safety fallback — it should never be reached in production.
import { notFound } from 'next/navigation';

export default function RootPage() {
  notFound();
}
