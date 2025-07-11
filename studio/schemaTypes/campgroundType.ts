import {defineField, defineType} from 'sanity'
import {attributeType} from './attributeType'
import {priceType} from './priceType'
import {distanceType} from './distanceType'

export const campgroundType = defineType({
  name: 'campground',
  title: 'Campground',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'location',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      type: priceType.name,
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: attributeType.name}],
        },
      ],
    }),
    defineField({
      name: 'distance',
      title: 'Distance',
      type: 'reference',
      to: [{type: distanceType.name}],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Image caption',
              description: 'Caption displayed below the image.',
            }
          ],
        },
      ],
    }),
  ],
})
