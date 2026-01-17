import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { verifyRequest } from '@/lib/auth'

// GET - Obtener clientes
export async function GET() {
  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('order_index', { ascending: true })

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error fetching clients:', error)
    return NextResponse.json(
      { success: false, error: 'Error al obtener clientes' },
      { status: 500 }
    )
  }
}

// POST - Crear cliente
export async function POST(request: NextRequest) {
  try {
    if (!verifyRequest(request)) {
      return NextResponse.json({ success: false, error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { name, logo, website, description, order_index = 0, visible = true, featured = false } = body

    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Name es requerido' },
        { status: 400 }
      )
    }

    // Generar slug
    const slug = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('clients')
      .insert({ name, slug, logo, website, description, order_index, visible, featured })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error creating client:', error)
    return NextResponse.json(
      { success: false, error: 'Error al crear cliente' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar cliente
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

    // Si se actualiza el nombre, actualizar también el slug
    if (updates.name) {
      updates.slug = updates.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    }

    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('clients')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error updating client:', error)
    return NextResponse.json(
      { success: false, error: 'Error al actualizar cliente' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar cliente
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
      .from('clients')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting client:', error)
    return NextResponse.json(
      { success: false, error: 'Error al eliminar cliente' },
      { status: 500 }
    )
  }
}
