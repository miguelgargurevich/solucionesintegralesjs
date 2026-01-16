import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Cliente para el navegador (con anon key)
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Tipos para la base de datos
export interface DBProject {
  id: string
  title: string
  slug: string
  client: string
  category: string
  description: string
  full_description?: string
  main_image: string
  gallery?: string[]
  video_url?: string
  year: string
  location?: string
  duration?: string
  featured: boolean
  published: boolean
  order_index: number
  created_at: string
  updated_at: string
}

export interface DBCategory {
  id: string
  title: string
  slug: string
  description?: string
  color?: string
  created_at: string
}

// ============== FUNCIONES DE FETCH ==============

export async function getProjects(publishedOnly: boolean = true): Promise<DBProject[]> {
  if (!supabase) {
    console.log('Supabase no configurado, usando datos locales')
    return []
  }
  
  try {
    let query = supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true })
      .order('year', { ascending: false })
    
    if (publishedOnly) {
      query = query.eq('published', true)
    }
    
    const { data, error } = await query
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export async function getProjectBySlug(slug: string): Promise<DBProject | null> {
  if (!supabase) return null
  
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

export async function getCategories(): Promise<DBCategory[]> {
  if (!supabase) return []
  
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('title', { ascending: true })
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

// ============== FUNCIONES ADMIN ==============

export async function getAllProjects(): Promise<DBProject[]> {
  if (!supabase) {
    console.error('Supabase client no está inicializado')
    return []
  }
  
  try {
    console.log('Consultando todos los proyectos...')
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true })
    
    if (error) {
      console.error('Error de Supabase:', error)
      throw error
    }
    
    console.log('Proyectos obtenidos de Supabase:', data?.length || 0)
    return data || []
  } catch (error) {
    console.error('Error fetching all projects:', error)
    return []
  }
}

export async function createProject(project: Omit<DBProject, 'id' | 'created_at' | 'updated_at'>): Promise<DBProject | null> {
  if (!supabase) return null
  
  try {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creating project:', error)
    return null
  }
}

export async function updateProject(id: string, updates: Partial<DBProject>): Promise<DBProject | null> {
  if (!supabase) return null
  
  try {
    const { data, error } = await supabase
      .from('projects')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error updating project:', error)
    return null
  }
}

export async function deleteProject(id: string): Promise<boolean> {
  if (!supabase) return false
  
  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  } catch (error) {
    console.error('Error deleting project:', error)
    return false
  }
}

// ============== STORAGE (Imágenes) ==============

export async function uploadImage(file: File | Blob, fileName: string, folder: string = 'projects'): Promise<string | null> {
  if (!supabase) return null
  
  try {
    const filePath = `${folder}/${fileName}`
    
    const { error } = await supabase.storage
      .from('images')
      .upload(filePath, file)
    
    if (error) throw error
    
    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath)
    
    return data.publicUrl
  } catch (error) {
    console.error('Error uploading image:', error)
    return null
  }
}

export async function deleteImage(url: string): Promise<boolean> {
  if (!supabase) return false
  
  try {
    // Extraer el path del URL
    const path = url.split('/images/')[1]
    if (!path) return false
    
    const { error } = await supabase.storage
      .from('images')
      .remove([path])
    
    if (error) throw error
    return true
  } catch (error) {
    console.error('Error deleting image:', error)
    return false
  }
}
