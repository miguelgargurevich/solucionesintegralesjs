import { Client as MinioClient } from 'minio'
import { supabaseStorageAdminClient, supabaseStorageClient } from '@/lib/supabase-storage-client'

type UploadSource = Blob | Buffer

const storageProvider = process.env.STORAGE_PROVIDER || 'supabase'
const minioEndpoint = process.env.MINIO_ENDPOINT || 'localhost'
const minioPort = Number(process.env.MINIO_PORT || '9000')
const minioUseSSL = process.env.MINIO_USE_SSL === 'true'
const minioAccessKey = process.env.MINIO_ACCESS_KEY || 'minioadmin'
const minioSecretKey = process.env.MINIO_SECRET_KEY || 'minioadmin'
const minioBucket = process.env.MINIO_BUCKET || 'images'
const minioPublicUrl = (process.env.MINIO_PUBLIC_URL || `http://${minioEndpoint}:${minioPort}`).replace(/\/$/, '')

let minioClient: MinioClient | null = null

function getMinioClient() {
  if (minioClient) {
    return minioClient
  }

  minioClient = new MinioClient({
    endPoint: minioEndpoint,
    port: minioPort,
    useSSL: minioUseSSL,
    accessKey: minioAccessKey,
    secretKey: minioSecretKey,
    pathStyle: true,
  })

  return minioClient
}

async function toBuffer(file: UploadSource): Promise<Buffer> {
  if (Buffer.isBuffer(file)) {
    return file
  }

  const arrayBuffer = await file.arrayBuffer()
  return Buffer.from(arrayBuffer)
}

function getSupabaseStorageClient() {
  return supabaseStorageAdminClient || supabaseStorageClient
}

export async function uploadImage(
  file: UploadSource,
  fileName: string,
  folder: string = 'uploads',
  contentType?: string
): Promise<string | null> {
  const filePath = `${folder}/${fileName}`

  if (storageProvider === 'minio') {
    try {
      const buffer = await toBuffer(file)
      const client = getMinioClient()

      await client.putObject(minioBucket, filePath, buffer, buffer.length, {
        'Content-Type': contentType || 'application/octet-stream',
      })

      return `${minioPublicUrl}/${minioBucket}/${filePath}`
    } catch (error) {
      console.error('Error uploading image to MinIO:', error)
      return null
    }
  }

  const client = getSupabaseStorageClient()
  if (!client) {
    return null
  }

  try {
    const { error } = await client.storage
      .from('images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType,
      })

    if (error) {
      throw error
    }

    const { data } = client.storage
      .from('images')
      .getPublicUrl(filePath)

    return data.publicUrl
  } catch (error) {
    console.error('Error uploading image to Supabase Storage:', error)
    return null
  }
}

export async function deleteImage(url: string): Promise<boolean> {
  if (storageProvider === 'minio') {
    try {
      const parsedUrl = new URL(url)
      const objectPath = parsedUrl.pathname.replace(`/${minioBucket}/`, '')

      if (!objectPath || objectPath === parsedUrl.pathname) {
        return false
      }

      await getMinioClient().removeObject(minioBucket, objectPath)
      return true
    } catch (error) {
      console.error('Error deleting image from MinIO:', error)
      return false
    }
  }

  const client = getSupabaseStorageClient()
  if (!client) {
    return false
  }

  try {
    const path = url.split('/images/')[1]
    if (!path) {
      return false
    }

    const { error } = await client.storage
      .from('images')
      .remove([path])

    if (error) {
      throw error
    }

    return true
  } catch (error) {
    console.error('Error deleting image from Supabase Storage:', error)
    return false
  }
}