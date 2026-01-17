import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

// Deshabilitar caché para obtener datos frescos
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const supabase = getSupabaseAdmin()
    
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('visible', true)
      .order('order_index', { ascending: true })

    if (error) {
      console.error('Error fetching clients:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      clients: data || [] 
    })
  } catch (error: any) {
    console.error('Error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
