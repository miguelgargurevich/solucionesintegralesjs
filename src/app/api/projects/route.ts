import { NextResponse } from 'next/server'
import { getProjects } from '@/lib/supabase'

// GET - Lista proyectos públicos (solo publicados)
export async function GET() {
  try {
    const projects = await getProjects(true) // true = solo publicados
    
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
