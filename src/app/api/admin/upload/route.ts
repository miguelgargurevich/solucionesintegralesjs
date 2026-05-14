import { NextRequest, NextResponse } from 'next/server'
import { uploadImage } from '@/lib/storage'
import { createHash } from 'crypto'

// Verificar autenticación con el mismo sistema que otros endpoints
const verifyAuth = (token: string | null): boolean => {
  if (!token) return false
  
  const secret = process.env.ADMIN_SECRET || 'clave-secreta-larga'
  const username = process.env.ADMIN_USERNAME || 'admin'
  const password = process.env.ADMIN_PASSWORD || '112358'
  const today = Math.floor(Date.now() / (1000 * 60 * 60 * 24))
  
  const todayToken = createHash('sha256')
    .update(`${username}:${password}:${today}:${secret}`)
    .digest('hex')
  
  const yesterdayToken = createHash('sha256')
    .update(`${username}:${password}:${today - 1}:${secret}`)
    .digest('hex')
  
  return token === todayToken || token === yesterdayToken
}

export async function POST(request: NextRequest) {
  // Verificar autenticación
  const token = request.headers.get('Authorization')?.replace('Bearer ', '') || null
  if (!verifyAuth(token)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = (formData.get('folder') as string) || 'uploads'

    console.log('[admin/upload] incoming file', {
      folder,
      name: file?.name,
      type: file?.type,
      size: file?.size,
      storageProvider: process.env.STORAGE_PROVIDER,
      hasObjectStoragePublicUrl: Boolean(process.env.MINIO_PUBLIC_URL || process.env.R2_PUBLIC_URL),
    })
    
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
    
    // Subir al backend de storage configurado
    const url = await uploadImage(buffer, fileName, folder, file.type)
    
    if (!url) {
      throw new Error('Error uploading to storage')
    }

    console.log('[admin/upload] upload success', {
      fileName,
      folder,
      url,
      urlHost: (() => {
        try {
          return new URL(url).host
        } catch {
          return null
        }
      })(),
    })

    return NextResponse.json({ url, success: true })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'Error al subir archivo' }, { status: 500 })
  }
}
