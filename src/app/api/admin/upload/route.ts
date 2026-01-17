import { NextRequest, NextResponse } from 'next/server'
import { uploadImage } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  // Verificar autenticación con ADMIN_TOKEN
  const token = request.headers.get('Authorization')?.replace('Bearer ', '')
  if (token !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = (formData.get('folder') as string) || 'uploads'
    
    if (!file) {
      return NextResponse.json({ error: 'No se proporcionó archivo' }, { status: 400 })
    }

    // Validar tipo de archivo
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Tipo de archivo no permitido' }, { status: 400 })
    }

    // Validar tamaño (máx 5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'Archivo demasiado grande (máx 5MB)' }, { status: 400 })
    }

    // Convertir a Blob/Buffer para subir
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Crear un nombre único para el archivo
    const timestamp = Date.now()
    const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const fileName = `${timestamp}-${Math.random().toString(36).substr(2, 9)}.${extension}`
    
    // Subir a Supabase Storage
    const url = await uploadImage(new Blob([buffer], { type: file.type }), fileName, folder)
    
    if (!url) {
      throw new Error('Error uploading to storage')
    }

    return NextResponse.json({ url, success: true })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'Error al subir archivo' }, { status: 500 })
  }
}
