import {defineField, defineType} from 'sanity'

export const distanceType = defineType({
  name: 'distance',
  title: 'Distance',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'string',
    }),
  ],
})
