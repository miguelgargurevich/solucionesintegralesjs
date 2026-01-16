import { NextRequest, NextResponse } from 'next/server'
import { uploadImage } from '@/lib/supabase'
import { createHash } from 'crypto'

// Verificar autenticación
const verifyAuth = (request: NextRequest): boolean => {
  const authHeader = request.headers.get('Authorization')
  const token = authHeader?.replace('Bearer ', '')
  
  if (!token) return false
  
  const secret = process.env.ADMIN_SECRET || 'super-secret-key-solucionesjs'
  const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'solucionesjs2024'
  const today = Math.floor(Date.now() / (1000 * 60 * 60 * 24))
  
  const todayToken = createHash('sha256')
    .update(`${ADMIN_USERNAME}:${ADMIN_PASSWORD}:${today}:${secret}`)
    .digest('hex')
  
  const yesterdayToken = createHash('sha256')
    .update(`${ADMIN_USERNAME}:${ADMIN_PASSWORD}:${today - 1}:${secret}`)
    .digest('hex')
  
  return token === todayToken || token === yesterdayToken
}

export async function POST(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No se proporcionó archivo' }, { status: 400 })
    }

    // Validar tipo de archivo
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
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
    const extension = file.name.split('.').pop()
    const fileName = `${timestamp}-${Math.random().toString(36).substr(2, 9)}.${extension}`
    
    // Subir a Supabase Storage
    const url = await uploadImage(new Blob([buffer], { type: file.type }), fileName)
    
    if (!url) {
      throw new Error('Error uploading to storage')
    }

    return NextResponse.json({ url, success: true })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'Error al subir archivo' }, { status: 500 })
  }
}
