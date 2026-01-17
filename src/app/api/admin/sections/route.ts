import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { verifyRequest } from '@/lib/auth'

// GET - Obtener configuración de secciones
export async function GET() {
  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('sections')
      .select('*')
      .order('order_index', { ascending: true })

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error fetching sections:', error)
    return NextResponse.json(
      { success: false, error: 'Error al obtener secciones' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar sección
export async function PUT(request: NextRequest) {
  try {
    if (!verifyRequest(request)) {
      return NextResponse.json({ success: false, error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { id, name, ...updates } = body

    if (!id && !name) {
      return NextResponse.json(
        { success: false, error: 'ID o name es requerido' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseAdmin()
    let query = supabase.from('sections').update(updates)
    
    if (id) {
      query = query.eq('id', id)
    } else {
      query = query.eq('name', name)
    }

    const { data, error } = await query.select().single()

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error updating section:', error)
    return NextResponse.json(
      { success: false, error: 'Error al actualizar sección' },
      { status: 500 }
    )
  }
}
