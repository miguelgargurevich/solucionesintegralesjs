import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

// GET - Obtener todas las configuraciones del sitio
export async function GET() {
  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')

    if (error) throw error

    // Convertir array a objeto con keys
    const settings: Record<string, unknown> = {}
    data?.forEach((item: { key: string; value: unknown }) => {
      settings[item.key] = item.value
    })

    return NextResponse.json({ success: true, data: settings })
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return NextResponse.json(
      { success: false, error: 'Error al obtener configuraciones' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar configuración del sitio
export async function PUT(request: NextRequest) {
  try {
    // Verificar autenticación
    const token = request.headers.get('Authorization')?.replace('Bearer ', '')
    if (token !== process.env.ADMIN_TOKEN) {
      return NextResponse.json({ success: false, error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { key, value } = body

    if (!key || !value) {
      return NextResponse.json(
        { success: false, error: 'Key y value son requeridos' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('site_settings')
      .upsert({ key, value, updated_at: new Date().toISOString() })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error updating site settings:', error)
    return NextResponse.json(
      { success: false, error: 'Error al actualizar configuración' },
      { status: 500 }
    )
  }
}
