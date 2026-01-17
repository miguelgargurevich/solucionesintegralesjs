import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { verifyRequest } from '@/lib/auth'
import { FooterLink } from '@/types'

// GET - Obtener links del footer
export async function GET() {
  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('footer_links')
      .select('*')
      .order('section', { ascending: true })
      .order('order_index', { ascending: true })

    if (error) throw error

    // Agrupar por sección
    const grouped = {
      servicios: data?.filter((link: FooterLink) => link.section === 'servicios') || [],
      empresa: data?.filter((link: FooterLink) => link.section === 'empresa') || [],
      legal: data?.filter((link: FooterLink) => link.section === 'legal') || []
    }

    return NextResponse.json({ success: true, data: grouped })
  } catch (error) {
    console.error('Error fetching footer links:', error)
    return NextResponse.json(
      { success: false, error: 'Error al obtener links del footer' },
      { status: 500 }
    )
  }
}

// POST - Crear link del footer
export async function POST(request: NextRequest) {
  try {
    if (!verifyRequest(request)) {
      return NextResponse.json({ success: false, error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { section, label, href, order_index = 0, visible = true, open_in_new_tab = false } = body

    if (!section || !label || !href) {
      return NextResponse.json(
        { success: false, error: 'Section, label y href son requeridos' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('footer_links')
      .insert({ section, label, href, order_index, visible, open_in_new_tab })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error creating footer link:', error)
    return NextResponse.json(
      { success: false, error: 'Error al crear link' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar link del footer
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
      .from('footer_links')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error updating footer link:', error)
    return NextResponse.json(
      { success: false, error: 'Error al actualizar link' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar link del footer
export async function DELETE(request: NextRequest) {
  try {
    if (!verifyRequest(request)) {
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
      .from('footer_links')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting footer link:', error)
    return NextResponse.json(
      { success: false, error: 'Error al eliminar link' },
      { status: 500 }
    )
  }
}
