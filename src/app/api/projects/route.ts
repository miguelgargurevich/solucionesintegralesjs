import { NextResponse } from 'next/server'
import { getProjects } from '@/lib/supabase'

// Evita respuestas cacheadas en Vercel para reflejar cambios del CMS al instante.
export const dynamic = 'force-dynamic'
export const revalidate = 0

// GET - Lista proyectos públicos (solo publicados)
export async function GET() {
  try {
    const projects = await getProjects(true) // true = solo publicados

    console.log('[api/projects] returning projects', {
      count: projects.length,
      sampleImageHost: projects[0]?.main_image ? new URL(projects[0].main_image).host : null,
      sampleSlug: projects[0]?.slug || null,
    })
    
    return NextResponse.json({ 
      projects,
      success: true 
    })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json({ 
      error: 'Error al obtener proyectos',
      projects: [] 
    }, { status: 500 })
  }
}
