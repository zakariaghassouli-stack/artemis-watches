import { randomBytes } from 'crypto';
import { prisma } from '@/lib/prisma';
import { serverClient, writeClient } from '@/lib/sanity';

const PROMO_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function randomPromoSuffix(length = 6): string {
  const bytes = randomBytes(length);
  let output = '';
  for (let index = 0; index < length; index += 1) {
    output += PROMO_CHARS[bytes[index] % PROMO_CHARS.length];
  }
  return output;
}

async function sanityCodeExists(code: string): Promise<boolean> {
  if (!serverClient) return false;

  const count = await serverClient.fetch<number>(
    'count(*[_type == "promoCode" && code == $code])',
    { code }
  );

  return count > 0;
}

export async function generateUniquePromoCode(): Promise<string> {
  for (let attempt = 0; attempt < 12; attempt += 1) {
    const code = `ARTEMIS-${randomPromoSuffix(6)}`;
    const [user, sanityExists] = await Promise.all([
      prisma?.user.findUnique({ where: { promoCode: code }, select: { id: true } }) ?? null,
      sanityCodeExists(code),
    ]);

    if (!user && !sanityExists) {
      return code;
    }
  }

  throw new Error('Unable to generate a unique promo code.');
}

export async function createSanityPromoCode(input: {
  code: string;
  email: string;
  discountPercent: number;
}): Promise<void> {
  if (!writeClient) return;
  const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();

  const existingId = await writeClient.fetch<string | null>(
    '*[_type == "promoCode" && code == $code][0]._id',
    { code: input.code }
  );

  if (existingId) {
    await writeClient
      .patch(existingId)
      .set({
        discountPercent: input.discountPercent,
        active: true,
        usageLimit: 1,
        usageCount: 0,
        createdFor: input.email,
        expiresAt,
      })
      .commit({ autoGenerateArrayKeys: true });
    return;
  }

  await writeClient.create({
    _type: 'promoCode',
    code: input.code,
    discountPercent: input.discountPercent,
    active: true,
    usageLimit: 1,
    usageCount: 0,
    createdFor: input.email,
    expiresAt,
  });
}

export async function markSanityPromoCodeUsed(code: string): Promise<void> {
  if (!writeClient) return;

  const existing = await writeClient.fetch<{
    _id: string;
    usageCount?: number | null;
    usageLimit?: number | null;
    active?: boolean;
  } | null>(
    '*[_type == "promoCode" && code == $code][0]{_id, usageCount, usageLimit, active}',
    { code }
  );

  if (!existing?._id) return;

  const nextUsageCount = (existing.usageCount ?? 0) + 1;
  const nextActive =
    typeof existing.usageLimit === 'number'
      ? nextUsageCount < existing.usageLimit
      : existing.active ?? true;

  await writeClient
    .patch(existing._id)
    .set({
      usageCount: nextUsageCount,
      active: nextActive,
    })
    .commit({ autoGenerateArrayKeys: true });
}
