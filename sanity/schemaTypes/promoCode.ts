import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'promoCode',
  title: 'Promo Code',
  type: 'document',
  fields: [
    defineField({
      name: 'code',
      title: 'Code',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'discountPercent',
      title: 'Discount (%)',
      type: 'number',
      validation: (rule) => rule.required().min(1).max(100),
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'expiresAt',
      title: 'Expires At',
      type: 'datetime',
      description: 'Leave empty for no expiration',
    }),
    defineField({
      name: 'usageLimit',
      title: 'Usage Limit',
      type: 'number',
      description: 'Leave empty for unlimited usage.',
    }),
    defineField({
      name: 'usageCount',
      title: 'Times Used',
      type: 'number',
      initialValue: 0,
      readOnly: true,
    }),
    defineField({
      name: 'createdFor',
      title: 'Created For (email)',
      type: 'string',
      description: 'Email address the one-time code was generated for.',
    }),
  ],
  preview: {
    select: {
      title: 'code',
      subtitle: 'discountPercent',
      active: 'active',
    },
    prepare({ title, subtitle, active }) {
      return {
        title: `${title} (${subtitle}%)`,
        subtitle: active ? 'Active' : 'Inactive',
      };
    },
  },
});
