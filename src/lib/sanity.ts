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

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
})

// Generador de URLs para imágenes
const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
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
  return await client.fetch(projectsQuery)
}

export async function getFeaturedProjects() {
  return await client.fetch(featuredProjectsQuery)
}

export async function getProjectBySlug(slug: string) {
  return await client.fetch(projectBySlugQuery, { slug })
}

export async function getProjectsByCategory(categorySlug: string) {
  return await client.fetch(projectsByCategoryQuery, { categorySlug })
}

export async function getCategories() {
  return await client.fetch(categoriesQuery)
}
