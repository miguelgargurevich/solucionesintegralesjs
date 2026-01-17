import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

// GET - Obtener contenido de about y estadísticas (para admin, sin filtros de visible)
export async function GET() {
  try {
    const supabase = getSupabaseAdmin()
    const [contentResult, statsResult] = await Promise.all([
      supabase
        .from('about_content')
        .select('*')
        .limit(1)
        .single(),
      supabase
        .from('about_stats')
        .select('*')
        .order('order_index', { ascending: true })
    ])

    if (contentResult.error && contentResult.error.code !== 'PGRST116') {
      throw contentResult.error
    }
    if (statsResult.error) throw statsResult.error

    return NextResponse.json({ 
      success: true, 
      data: {
        content: contentResult.data,
        stats: statsResult.data
      }
    })
  } catch (error) {
    console.error('Error fetching about content:', error)
    return NextResponse.json(
      { success: false, error: 'Error al obtener contenido de nosotros' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar contenido de about
export async function PUT(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '')
    if (token !== process.env.ADMIN_TOKEN) {
      return NextResponse.json({ success: false, error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { type, id, ...updates } = body

    if (!id || !type) {
      return NextResponse.json(
        { success: false, error: 'ID y type son requeridos' },
        { status: 400 }
      )
    }

    const table = type === 'content' ? 'about_content' : 'about_stats'
    
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from(table)
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error updating about content:', error)
    return NextResponse.json(
      { success: false, error: 'Error al actualizar' },
      { status: 500 }
    )
  }
}

// POST - Crear nueva estadística
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '')
    if (token !== process.env.ADMIN_TOKEN) {
      return NextResponse.json({ success: false, error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { icon, value, label, order_index = 0, visible = true } = body

    if (!icon || !value || !label) {
      return NextResponse.json(
        { success: false, error: 'Icon, value y label son requeridos' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('about_stats')
      .insert({ icon, value, label, order_index, visible })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error creating stat:', error)
    return NextResponse.json(
      { success: false, error: 'Error al crear estadística' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar estadística
export async function DELETE(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '')
    if (token !== process.env.ADMIN_TOKEN) {
      return NextResponse.json({ success: false, error: 'No autorizado' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID es requerido' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseAdmin()
    const { error } = await supabase
      .from('about_stats')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting stat:', error)
    return NextResponse.json(
      { success: false, error: 'Error al eliminar estadística' },
      { status: 500 }
    )
  }
}
