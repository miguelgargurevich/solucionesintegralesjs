import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Categorías',
  type: 'document',
  icon: () => '📁',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre de la Categoría',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'color',
      title: 'Color (para badges)',
      type: 'string',
      options: {
        list: [
          { title: 'Azul Industrial', value: 'industrial-blue' },
          { title: 'Amarillo Seguridad', value: 'safety-yellow' },
          { title: 'Gris Metal', value: 'metal-gray' },
          { title: 'Verde', value: 'green' },
          { title: 'Rojo', value: 'red' },
        ],
      },
      initialValue: 'industrial-blue',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title,
        subtitle: 'Categoría',
      }
    },
  },
})
