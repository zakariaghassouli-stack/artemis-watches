'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity/sanity.config';

export function StudioApp() {
  return <NextStudio config={config} />;
}
