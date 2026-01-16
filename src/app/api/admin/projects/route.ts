import { NextRequest, NextResponse } from 'next/server'
import { getAllProjects, createProject, updateProject, deleteProject } from '@/lib/supabase'
import { createHash } from 'crypto'

// Verificar autenticación
const verifyAuth = (request: NextRequest): boolean => {
  const authHeader = request.headers.get('Authorization')
  const token = authHeader?.replace('Bearer ', '')
  
  if (!token) return false
  
  const secret = process.env.ADMIN_SECRET || 'super-secret-key-solucionesjs'
  const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'solucionesjs2024'
  const today = Math.floor(Date.now() / (1000 * 60 * 60 * 24))
  
  const todayToken = createHash('sha256')
    .update(`${ADMIN_USERNAME}:${ADMIN_PASSWORD}:${today}:${secret}`)
    .digest('hex')
  
  const yesterdayToken = createHash('sha256')
    .update(`${ADMIN_USERNAME}:${ADMIN_PASSWORD}:${today - 1}:${secret}`)
    .digest('hex')
  
  return token === todayToken || token === yesterdayToken
}

// GET - Lista todos los proyectos (incluyendo no publicados para admin)
export async function GET(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const projects = await getAllProjects()
    console.log('getAllProjects devolvió:', projects?.length || 0, 'proyectos')
    return NextResponse.json({ projects: projects || [] })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json({ error: 'Error al obtener proyectos', projects: [] }, { status: 500 })
  }
}

// POST - Crear nuevo proyecto
export async function POST(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const data = await request.json()
    
    // Generar ID único si no existe
    const projectData = {
      title: data.title,
      slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      client: data.client,
      category: data.category,
      description: data.description,
      full_description: data.full_description,
      main_image: data.main_image,
      gallery: data.gallery || [],
      video_url: data.video_url,
      year: data.year,
      location: data.location,
      duration: data.duration,
      featured: data.featured || false,
      published: data.published ?? true,
      order_index: data.order_index || 0,
    }
    
    const result = await createProject(projectData)
    
    if (!result) {
      throw new Error('Error creating project')
    }
    
    return NextResponse.json({ project: result, success: true })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json({ error: 'Error al crear proyecto' }, { status: 500 })
  }
}

// PUT - Actualizar proyecto
export async function PUT(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const data = await request.json()
    const { id, ...updateData } = data
    
    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 })
    }
    
    const result = await updateProject(id, updateData)
    
    if (!result) {
      throw new Error('Error updating project')
    }
    
    return NextResponse.json({ project: result, success: true })
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json({ error: 'Error al actualizar proyecto' }, { status: 500 })
  }
}

// DELETE - Eliminar proyecto
export async function DELETE(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const { id } = await request.json()
    
    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 })
    }
    
    await deleteProject(id)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json({ error: 'Error al eliminar proyecto' }, { status: 500 })
  }
}
