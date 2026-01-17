// =============================================
// TIPOS LEGACY (compatibilidad)
// =============================================

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

// Los tipos de base de datos están definidos en @/lib/supabase.ts
// - DBProject
// - DBCategory

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

// =============================================
// TIPOS CMS - CONFIGURACIÓN DEL SITIO
// =============================================

export interface SiteBranding {
  companyName: string
  tagline: string
  logo: string
  favicon: string
}

export interface SiteColors {
  primary: string
  primaryLight: string
  primaryDark: string
  secondary: string
  secondaryLight: string
  secondaryDark: string
  accent: string
  background: string
  backgroundLight: string
  textPrimary: string
  textSecondary: string
}

export interface SiteContact {
  phone: string
  email: string
  address: string
  ruc: string
  coordinates: {
    lat: number
    lng: number
  }
}

export interface SiteSocialMedia {
  linkedin: string
  facebook: string
  instagram: string
  youtube: string
  whatsapp: string
}

export interface SiteSettings {
  branding: SiteBranding
  colors: SiteColors
  contact: SiteContact
  socialMedia: SiteSocialMedia
}

// =============================================
// TIPOS CMS - NAVEGACIÓN
// =============================================

export interface NavigationItem {
  id: string
  label: string
  href: string
  order_index: number
  visible: boolean
  is_cta: boolean
  created_at?: string
  updated_at?: string
}

// =============================================
// TIPOS CMS - HERO SECTION
// =============================================

export interface HeroContent {
  id: string
  title: string
  subtitle: string | null
  description: string | null
  cta_primary_text: string | null
  cta_primary_href: string | null
  cta_secondary_text: string | null
  cta_secondary_href: string | null
  background_type: 'video' | 'image' | '3d'
  background_url: string | null
  show_3d_scene: boolean
  active: boolean
  created_at?: string
  updated_at?: string
}

// =============================================
// TIPOS CMS - ABOUT SECTION
// =============================================

export interface AboutContent {
  id: string
  title: string
  subtitle: string | null
  description: string
  mission: string | null
  vision: string | null
  video_url: string | null
  video_thumbnail: string | null
  active: boolean
  created_at?: string
  updated_at?: string
}

export interface AboutStat {
  id: string
  icon: string
  value: string
  label: string
  order_index: number
  visible: boolean
  created_at?: string
}

// =============================================
// TIPOS CMS - SERVICIOS
// =============================================

export interface CMSService {
  id: string
  title: string
  slug: string
  description: string
  icon: string
  features: string[]
  image: string | null
  order_index: number
  visible: boolean
  created_at?: string
  updated_at?: string
}

// =============================================
// TIPOS CMS - CLIENTES
// =============================================

export interface CMSClient {
  id: string
  name: string
  slug: string
  logo: string | null
  website: string | null
  description: string | null
  order_index: number
  visible: boolean
  featured: boolean
  created_at?: string
  updated_at?: string
}

// =============================================
// TIPOS CMS - FOOTER
// =============================================

export interface FooterLink {
  id: string
  section: 'servicios' | 'empresa' | 'legal'
  label: string
  href: string
  order_index: number
  visible: boolean
  open_in_new_tab: boolean
  created_at?: string
}

// =============================================
// TIPOS CMS - SECCIONES
// =============================================

export interface Section {
  id: string
  name: string
  title: string | null
  subtitle: string | null
  visible: boolean
  order_index: number
  settings: Record<string, unknown>
  updated_at?: string
}

// =============================================
// TIPOS CMS - MÓDULOS DEL ADMIN
// =============================================

export type CMSModule = 
  | 'dashboard'
  | 'branding'
  | 'navigation'
  | 'hero'
  | 'about'
  | 'services'
  | 'projects'
  | 'clients'
  | 'contact'
  | 'footer'

export interface CMSModuleConfig {
  id: CMSModule
  label: string
  icon: string
  description: string
}
