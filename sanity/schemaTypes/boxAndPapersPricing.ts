import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'boxAndPapersPricing',
  title: 'Box & Papers Pricing',
  type: 'document',
  // Singleton: enforce one document via Studio desk structure (Zaki creates
  // the single instance in the Studio; the document _id stays stable).
  fields: [
    defineField({
      name: 'essentialPrice',
      title: 'Essential - Add-on Price (CAD)',
      type: 'number',
      initialValue: 49,
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: 'premiumPrice',
      title: 'Premium - Add-on Price (CAD)',
      type: 'number',
      initialValue: 120,
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: 'essentialDescription',
      title: 'Essential - Description',
      type: 'object',
      fields: [
        defineField({ name: 'en', title: 'English', type: 'text', rows: 2 }),
        defineField({ name: 'fr', title: 'French', type: 'text', rows: 2 }),
      ],
    }),
    defineField({
      name: 'premiumDescription',
      title: 'Premium - Description',
      type: 'object',
      fields: [
        defineField({ name: 'en', title: 'English', type: 'text', rows: 2 }),
        defineField({ name: 'fr', title: 'French', type: 'text', rows: 2 }),
      ],
    }),
    defineField({
      name: 'inclusionsBullets',
      title: 'Inclusions (shared bullets)',
      type: 'array',
      description:
        'Short common inclusions shown under both tier cards. Localized strings, one per locale per bullet.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'en', title: 'English', type: 'string' }),
            defineField({ name: 'fr', title: 'French', type: 'string' }),
          ],
          preview: { select: { title: 'en', subtitle: 'fr' } },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Box & Papers Pricing' };
    },
  },
});
