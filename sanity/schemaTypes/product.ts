import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'legacyId',
      title: 'Legacy ID',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'string',
      options: {
        list: [
          { title: 'Rolex', value: 'Rolex' },
          { title: 'Cartier', value: 'Cartier' },
          { title: 'Audemars Piguet', value: 'Audemars Piguet' },
          { title: 'Patek Philippe', value: 'Patek Philippe' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'collection',
      title: 'Collection',
      type: 'string',
      description: 'Ex. Submariner, Datejust, Santos, Royal Oak',
    }),
    defineField({
      name: 'variant',
      title: 'Variant / Dial',
      type: 'string',
      description: 'Ex. Black Dial, Hulk - Green Dial & Bezel',
    }),
    defineField({
      name: 'range',
      title: 'Range',
      type: 'string',
      options: {
        list: [
          { title: 'Essential', value: 'essential' },
          { title: 'Premium', value: 'premium' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (CAD)',
      type: 'number',
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: 'compareAtPrice',
      title: 'Compare-at Price (CAD)',
      type: 'number',
      description: 'Leave empty if not on sale',
    }),
    defineField({
      name: 'essentialPrice',
      title: 'Essential Price (CAD)',
      type: 'number',
      description: 'Optional helper for Premium pages that also show an Essential entry point.',
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'CAD',
      readOnly: true,
    }),
    defineField({
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'stockCount',
      title: 'Stock Count',
      type: 'number',
      initialValue: 5,
    }),
    defineField({
      name: 'stockStatus',
      title: 'Stock Status',
      type: 'string',
      description:
        'Drives the StockBadge on PDP, collection cards, and cart drawer. Essential defaults in_stock, Premium defaults on_order. Datejust 2tone + Chocolate are on_order regardless of range.',
      options: {
        list: [
          { title: 'In stock', value: 'in_stock' },
          { title: 'On order', value: 'on_order' },
          { title: 'Out of stock', value: 'out_of_stock' },
        ],
        layout: 'radio',
      },
      initialValue: 'in_stock',
    }),
    defineField({
      name: 'leadTimeDays',
      title: 'Lead Time (days)',
      type: 'number',
      description:
        'Used when stockStatus is on_order to render a precise window. Falls back to 10-14 days when empty.',
    }),
    defineField({
      name: 'stockLabel',
      title: 'Stock Label Override',
      type: 'string',
      description:
        'Optional custom label that bypasses the default StockBadge copy. Use sparingly - most pieces should rely on stockStatus + leadTimeDays.',
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: '' },
          { title: 'Client Favourite', value: 'client-favourite' },
          { title: 'New Arrival', value: 'new-arrival' },
          { title: 'Versatile Pick', value: 'versatile-pick' },
          { title: 'Popular Gift', value: 'popular-gift' },
        ],
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured on site',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'bestSeller',
      title: 'Best seller',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: '1st = face, then side/back/detail. Drag to reorder.',
      validation: (rule) => [
        rule.min(1),
        rule
          .custom((images) =>
            !images || images.length < 4
              ? 'Recommandé: 4 photos minimum (face, côté gauche, côté droit, dos)'
              : true
          )
          .warning(),
      ],
    }),
    defineField({
      name: 'video',
      title: 'Product Video',
      type: 'file',
      options: { accept: 'video/mp4' },
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description (EN)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'shortDescriptionFr',
      title: 'Short Description (FR)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'longDescription',
      title: 'Long Description (EN)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'longDescriptionFr',
      title: 'Long Description (FR)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights (EN)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Used in the “Included with your order” section.',
    }),
    defineField({
      name: 'highlightsFr',
      title: 'Highlights (FR)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'specs',
      title: 'Specifications',
      type: 'object',
      fields: [
        defineField({ name: 'movement', title: 'Movement', type: 'string' }),
        defineField({ name: 'caseDiameter', title: 'Case Diameter', type: 'string' }),
        defineField({ name: 'caseThickness', title: 'Case Thickness', type: 'string' }),
        defineField({ name: 'caseMaterial', title: 'Case Material', type: 'string' }),
        defineField({ name: 'material', title: 'Material', type: 'string' }),
        defineField({ name: 'dialColor', title: 'Dial Color', type: 'string' }),
        defineField({ name: 'crystal', title: 'Crystal', type: 'string' }),
        defineField({ name: 'bracelet', title: 'Bracelet', type: 'string' }),
        defineField({ name: 'waterResistance', title: 'Water Resistance', type: 'string' }),
        defineField({ name: 'bezel', title: 'Bezel', type: 'string' }),
        defineField({ name: 'clasp', title: 'Clasp', type: 'string' }),
        defineField({ name: 'lume', title: 'Lume', type: 'string' }),
        defineField({ name: 'powerReserve', title: 'Power Reserve', type: 'string' }),
        defineField({ name: 'weight', title: 'Weight', type: 'string', description: 'Ex. "152g"' }),
        defineField({ name: 'hourMarkers', title: 'Hour Markers', type: 'string', description: 'Ex. "Applied index, white gold"' }),
        defineField({ name: 'hands', title: 'Hands', type: 'string', description: 'Ex. "Mercedes, luminescent"' }),
        defineField({ name: 'glassTreatment', title: 'Glass Treatment', type: 'string', description: 'Ex. "Anti-reflective coating, both sides"' }),
        defineField({ name: 'dialFinish', title: 'Dial Finish', type: 'string', description: 'Ex. "Sunburst", "Grené", "Matte"' }),
      ],
    }),
    defineField({
      name: 'availableSizes',
      title: 'Available Sizes',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'factoryOptions',
      title: 'Factory Options (Premium only)',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              { title: 'VSF', value: 'VSF' },
              { title: 'ARF', value: 'ARF' },
              { title: 'Clean', value: 'Clean' },
              { title: 'ZF', value: 'ZF' },
              { title: 'APSF', value: 'APSF' },
              { title: 'AF', value: 'AF' },
            ],
          },
        },
      ],
      hidden: ({ document }) => document?.range !== 'premium',
      description: 'Factories this Premium piece may ship from. Used for the SpecsTable Factory row.',
    }),
    defineField({
      name: 'factoryChoice',
      title: 'Factory Choice Mode',
      type: 'string',
      options: {
        list: [
          { title: 'Subject to availability', value: 'subject-to-availability' },
          { title: 'Customer choice', value: 'customer-choice' },
        ],
      },
      hidden: ({ document }) => document?.range !== 'premium',
      description: 'How to label multi-factory Premium pieces in SpecsTable. Leave empty for single-factory.',
    }),
    defineField({
      name: 'availableColors',
      title: 'Available Colors',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'boxAndPapersPrice',
      title: 'Box & Papers Price (CAD)',
      type: 'number',
      initialValue: 49,
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title (EN)',
      type: 'string',
    }),
    defineField({
      name: 'seoTitleFr',
      title: 'SEO Title (FR)',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description (EN)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'seoDescriptionFr',
      title: 'SEO Description (FR)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'reviews',
      title: 'Reviews',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'id', title: 'Review ID', type: 'string' }),
            defineField({ name: 'rating', title: 'Rating', type: 'number' }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 3 }),
            defineField({ name: 'author', title: 'Author', type: 'string' }),
            defineField({ name: 'city', title: 'City', type: 'string' }),
            defineField({ name: 'verified', title: 'Verified', type: 'boolean' }),
            defineField({ name: 'date', title: 'Date', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'relatedProducts',
      title: 'Related Products',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    }),
  ],
  orderings: [
    { title: 'Brand', name: 'brand', by: [{ field: 'brand', direction: 'asc' }] },
    { title: 'Price', name: 'price', by: [{ field: 'price', direction: 'asc' }] },
    { title: 'Range', name: 'range', by: [{ field: 'range', direction: 'asc' }] },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'brand',
      media: 'images.0',
      price: 'price',
      range: 'range',
    },
    prepare({ title, subtitle, media, price, range }) {
      return {
        title: `${title}`,
        subtitle: `${subtitle} · ${range} · $${price} CAD`,
        media,
      };
    },
  },
});
