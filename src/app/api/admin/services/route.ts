import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { verifyRequest } from '@/lib/auth'

// GET - Obtener servicios
export async function GET() {
  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('order_index', { ascending: true })

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json(
      { success: false, error: 'Error al obtener servicios' },
      { status: 500 }
    )
  }
}

// POST - Crear servicio
export async function POST(request: NextRequest) {
  try {
    if (!verifyRequest(request)) {
      return NextResponse.json({ success: false, error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, icon, features = [], image, order_index = 0, visible = true } = body

    if (!title || !description || !icon) {
      return NextResponse.json(
        { success: false, error: 'Title, description e icon son requeridos' },
        { status: 400 }
      )
    }

    // Generar slug
    const slug = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('services')
      .insert({ title, slug, description, icon, features, image, order_index, visible })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error creating service:', error)
    return NextResponse.json(
      { success: false, error: 'Error al crear servicio' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar servicio
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

    // Si se actualiza el título, actualizar también el slug
    if (updates.title) {
      updates.slug = updates.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    }

    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('services')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error updating service:', error)
    return NextResponse.json(
      { success: false, error: 'Error al actualizar servicio' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar servicio
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
      .from('services')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting service:', error)
    return NextResponse.json(
      { success: false, error: 'Error al eliminar servicio' },
      { status: 500 }
    )
  }
}
