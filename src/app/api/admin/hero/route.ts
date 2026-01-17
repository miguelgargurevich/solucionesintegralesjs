import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { verifyRequest } from '@/lib/auth'

// GET - Obtener contenido del hero (para admin, sin filtro de active)
export async function GET() {
  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('hero_content')
      .select('*')
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error fetching hero content:', error)
    return NextResponse.json(
      { success: false, error: 'Error al obtener contenido del hero' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar contenido del hero
export async function PUT(request: NextRequest) {
  try {
    if (!verifyRequest(request)) {
      return NextResponse.json({ success: false, error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID es requerido' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('hero_content')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error updating hero content:', error)
    return NextResponse.json(
      { success: false, error: 'Error al actualizar hero' },
      { status: 500 }
    )
  }
}
