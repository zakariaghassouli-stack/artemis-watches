import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() ||
  process.env.SANITY_STUDIO_DATASET?.trim() ||
  'production';
const apiVersion = '2024-01-01';

export const sanityEnabled = Boolean(projectId);

export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: 'published',
    })
  : null;

export const serverClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      perspective: 'published',
    })
  : null;

export const writeClient =
  projectId && process.env.SANITY_API_TOKEN?.trim()
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        token: process.env.SANITY_API_TOKEN.trim(),
        useCdn: false,
        perspective: 'published',
      })
    : null;

const builder = client ? createImageUrlBuilder(client) : null;

export const urlFor = (source: unknown) => {
  const activeBuilder = builder;

  if (!activeBuilder) {
    throw new Error('Sanity image builder is not configured.');
  }

  return activeBuilder.image(source as Parameters<typeof activeBuilder.image>[0]);
};

export function assertSanityWriteAccess() {
  if (!writeClient) {
    throw new Error(
      'Sanity write client is not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN first.'
    );
  }

  return writeClient;
}

export const sanityConfig = {
  projectId,
  dataset,
  apiVersion,
};
