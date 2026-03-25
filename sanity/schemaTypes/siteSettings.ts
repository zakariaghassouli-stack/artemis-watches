import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'announcementBar',
      title: 'Announcement Bar',
      type: 'object',
      fields: [
        defineField({ name: 'en', title: 'English', type: 'string' }),
        defineField({ name: 'fr', title: 'French', type: 'string' }),
        defineField({
          name: 'enabled',
          title: 'Enabled',
          type: 'boolean',
          initialValue: true,
        }),
      ],
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'object',
      fields: [
        defineField({ name: 'en', title: 'English', type: 'string' }),
        defineField({ name: 'fr', title: 'French', type: 'string' }),
      ],
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'object',
      fields: [
        defineField({ name: 'en', title: 'English', type: 'text', rows: 3 }),
        defineField({ name: 'fr', title: 'French', type: 'text', rows: 3 }),
      ],
    }),
    defineField({
      name: 'welcomeDiscountPercent',
      title: 'Welcome Discount (%)',
      type: 'number',
      initialValue: 10,
      description:
        'The discount shown to new clients. The frontend can read this centrally.',
    }),
    defineField({
      name: 'boxAndPapersPrice',
      title: 'Box & Papers Price (CAD)',
      type: 'number',
      initialValue: 49,
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      initialValue: '15145609765',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' };
    },
  },
});
