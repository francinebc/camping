import {defineType, defineField} from 'sanity'

export const attributeType = defineType({
  name: 'attribute',
  title: 'Attribute',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})
