import {defineField, defineType} from 'sanity'

export const priceType = defineType({
  name: 'price',
  type: 'object',
  title: 'Price',
  fields: [
    defineField({
      name: 'perNight',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'notes',
      type: 'text',
    }),
  ],
})
