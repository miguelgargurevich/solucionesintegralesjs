import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

// Deshabilitar caché para obtener datos frescos
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const supabase = getSupabaseAdmin()
    
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'branding')
      .single()

    if (error) {
      console.error('Error fetching branding:', error)
      return NextResponse.json({ 
        success: false, 
        branding: {
          logo: null,
          favicon: null,
          companyName: 'SOLUCIONES INTEGRALES JS S.A.C.',
          tagline: 'Ingeniería Industrial de Excelencia'
        }
      })
    }

    return NextResponse.json({ 
      success: true, 
      branding: data?.value || {
        logo: null,
        favicon: null,
        companyName: 'SOLUCIONES INTEGRALES JS S.A.C.',
        tagline: 'Ingeniería Industrial de Excelencia'
      }
    })
  } catch (error: any) {
    console.error('Error:', error)
    return NextResponse.json({ 
      success: false, 
      branding: {
        logo: null,
        favicon: null,
        companyName: 'SOLUCIONES INTEGRALES JS S.A.C.',
        tagline: 'Ingeniería Industrial de Excelencia'
      }
    }, { status: 500 })
  }
}
