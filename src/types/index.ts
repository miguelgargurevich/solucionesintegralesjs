export interface Project {
  id: string
  title: string
  client: string
  category: string
  description: string
  image: string
  year: string
  featured?: boolean
}

// Tipos para Sanity CMS
export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface SanityProject {
  _id: string
  title: string
  slug: string
  client: string
  category: string
  categorySlug?: string
  description: string
  fullDescription?: any[] // Portable Text
  mainImage: SanityImage
  gallery?: SanityImage[]
  videoUrl?: string
  year: string
  location?: string
  duration?: string
  scope?: string[]
  services?: string[]
  featured: boolean
  order?: number
}

export interface SanityCategory {
  _id: string
  title: string
  slug: string
  description?: string
  color?: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
}

export interface Client {
  id: string
  name: string
  logo: string
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  company: string
  service: string
  message: string
}

export interface AnimationConfig {
  initial: object
  animate: object
  exit?: object
  transition?: object
}
