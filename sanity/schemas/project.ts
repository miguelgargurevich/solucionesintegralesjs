import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Proyectos',
  type: 'document',
  icon: () => '🏗️',
  groups: [
    { name: 'info', title: 'Información General', default: true },
    { name: 'media', title: 'Imágenes y Videos' },
    { name: 'details', title: 'Detalles Técnicos' },
    { name: 'settings', title: 'Configuración' },
  ],
  fields: [
    // === INFORMACIÓN GENERAL ===
    defineField({
      name: 'title',
      title: 'Título del Proyecto',
      type: 'string',
      group: 'info',
      validation: (Rule) => Rule.required().min(5).max(100),
      description: 'Nombre descriptivo del proyecto',
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'info',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: 'URL amigable generada automáticamente',
    }),
    defineField({
      name: 'client',
      title: 'Cliente',
      type: 'string',
      group: 'info',
      validation: (Rule) => Rule.required(),
      description: 'Nombre de la empresa cliente',
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      to: [{ type: 'category' }],
      group: 'info',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción Corta',
      type: 'text',
      rows: 3,
      group: 'info',
      validation: (Rule) => Rule.required().min(20).max(300),
      description: 'Resumen breve del proyecto (para tarjetas)',
    }),
    defineField({
      name: 'fullDescription',
      title: 'Descripción Completa',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        },
      ],
      group: 'info',
      description: 'Descripción detallada del proyecto (para página individual)',
    }),

    // === MEDIA ===
    defineField({
      name: 'mainImage',
      title: 'Imagen Principal',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true, // Permite seleccionar punto focal
      },
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto Alternativo',
          description: 'Importante para accesibilidad y SEO',
        },
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Galería de Imágenes',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texto Alternativo',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Descripción de la imagen',
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
      description: 'Imágenes adicionales del proyecto',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video (YouTube/Vimeo)',
      type: 'url',
      group: 'media',
      description: 'URL del video del proyecto (opcional)',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),

    // === DETALLES TÉCNICOS ===
    defineField({
      name: 'year',
      title: 'Año del Proyecto',
      type: 'string',
      group: 'details',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: '2026', value: '2026' },
          { title: '2025', value: '2025' },
          { title: '2024', value: '2024' },
          { title: '2023', value: '2023' },
          { title: '2022', value: '2022' },
          { title: '2021', value: '2021' },
          { title: '2020', value: '2020' },
        ],
      },
    }),
    defineField({
      name: 'location',
      title: 'Ubicación',
      type: 'string',
      group: 'details',
      description: 'Ciudad o dirección del proyecto',
    }),
    defineField({
      name: 'duration',
      title: 'Duración del Proyecto',
      type: 'string',
      group: 'details',
      description: 'Ej: "3 meses", "6 semanas"',
    }),
    defineField({
      name: 'scope',
      title: 'Alcance / Métricas',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'details',
      description: 'Ej: "2,500 m²", "15,000 litros", "80 toneladas"',
    }),
    defineField({
      name: 'services',
      title: 'Servicios Aplicados',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'details',
      options: {
        list: [
          { title: 'Diseño Estructural', value: 'diseno-estructural' },
          { title: 'Fabricación', value: 'fabricacion' },
          { title: 'Montaje', value: 'montaje' },
          { title: 'Piping', value: 'piping' },
          { title: 'Obras Civiles', value: 'obras-civiles' },
          { title: 'Señalización', value: 'senalizacion' },
          { title: 'Mantenimiento', value: 'mantenimiento' },
        ],
      },
    }),

    // === CONFIGURACIÓN ===
    defineField({
      name: 'featured',
      title: 'Proyecto Destacado',
      type: 'boolean',
      group: 'settings',
      initialValue: false,
      description: 'Los proyectos destacados aparecen más grandes en la galería',
    }),
    defineField({
      name: 'order',
      title: 'Orden de Aparición',
      type: 'number',
      group: 'settings',
      initialValue: 0,
      description: 'Número menor = aparece primero',
    }),
    defineField({
      name: 'published',
      title: 'Publicado',
      type: 'boolean',
      group: 'settings',
      initialValue: true,
      description: 'Desmarcar para ocultar el proyecto del sitio',
    }),
  ],
  
  orderings: [
    {
      title: 'Año (Más reciente)',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
    {
      title: 'Orden manual',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Cliente A-Z',
      name: 'clientAsc',
      by: [{ field: 'client', direction: 'asc' }],
    },
  ],
  
  preview: {
    select: {
      title: 'title',
      client: 'client',
      year: 'year',
      featured: 'featured',
      published: 'published',
      media: 'mainImage',
    },
    prepare({ title, client, year, featured, published, media }) {
      const status = !published ? '🔴 ' : featured ? '⭐ ' : ''
      return {
        title: `${status}${title}`,
        subtitle: `${client} • ${year}`,
        media,
      }
    },
  },
})
