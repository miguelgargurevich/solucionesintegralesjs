import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

// Tipo para imágenes de Sanity
type SanityImageSource = {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
}

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dummy-project-id'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

// Solo crear el cliente si tenemos un projectId válido
export const client = projectId !== 'dummy-project-id' 
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === 'production',
    })
  : null

// Generador de URLs para imágenes
const builder = client ? createImageUrlBuilder(client) : null

export function urlFor(source: SanityImageSource) {
  if (!builder) {
    // Retornar una URL vacía si Sanity no está configurado
    return { url: () => '' } as any
  }
  return builder.image(source)
}

// ============== QUERIES GROQ ==============

// Obtener todos los proyectos publicados
export const projectsQuery = `*[_type == "project" && published == true] | order(order asc, year desc) {
  _id,
  title,
  "slug": slug.current,
  client,
  "category": category->title,
  "categorySlug": category->slug.current,
  description,
  mainImage,
  gallery,
  videoUrl,
  year,
  location,
  duration,
  scope,
  services,
  featured,
  order
}`

// Obtener proyectos destacados
export const featuredProjectsQuery = `*[_type == "project" && published == true && featured == true] | order(order asc, year desc) {
  _id,
  title,
  "slug": slug.current,
  client,
  "category": category->title,
  description,
  mainImage,
  year,
  featured
}`

// Obtener un proyecto por slug
export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug && published == true][0] {
  _id,
  title,
  "slug": slug.current,
  client,
  "category": category->title,
  "categorySlug": category->slug.current,
  description,
  fullDescription,
  mainImage,
  gallery,
  videoUrl,
  year,
  location,
  duration,
  scope,
  services,
  featured
}`

// Obtener proyectos por categoría
export const projectsByCategoryQuery = `*[_type == "project" && published == true && category->slug.current == $categorySlug] | order(order asc, year desc) {
  _id,
  title,
  "slug": slug.current,
  client,
  "category": category->title,
  description,
  mainImage,
  year,
  featured
}`

// Obtener todas las categorías
export const categoriesQuery = `*[_type == "category"] | order(title asc) {
  _id,
  title,
  "slug": slug.current,
  description,
  color
}`

// ============== FUNCIONES DE FETCH ==============

export async function getProjects() {
  if (!client) return []
  try {
    return await client.fetch(projectsQuery)
  } catch (error) {
    console.error('Error fetching projects from Sanity:', error)
    return []
  }
}

export async function getFeaturedProjects() {
  if (!client) return []
  try {
    return await client.fetch(featuredProjectsQuery)
  } catch (error) {
    console.error('Error fetching featured projects from Sanity:', error)
    return []
  }
}

export async function getProjectBySlug(slug: string) {
  if (!client) return null
  try {
    return await client.fetch(projectBySlugQuery, { slug })
  } catch (error) {
    console.error('Error fetching project from Sanity:', error)
    return null
  }
}

export async function getProjectsByCategory(categorySlug: string) {
  if (!client) return []
  try {
    return await client.fetch(projectsByCategoryQuery, { categorySlug })
  } catch (error) {
    console.error('Error fetching projects by category from Sanity:', error)
    return []
  }
}

export async function getCategories() {
  if (!client) return []
  try {
    return await client.fetch(categoriesQuery)
  } catch (error) {
    console.error('Error fetching categories from Sanity:', error)
    return []
  }
}
