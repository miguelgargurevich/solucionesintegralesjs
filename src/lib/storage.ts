import { Client as S3CompatibleClient } from 'minio'
import { supabaseStorageAdminClient, supabaseStorageClient } from '@/lib/supabase-storage-client'

type UploadSource = Blob | Buffer

const storageProvider = process.env.STORAGE_PROVIDER || 'supabase'
const r2AccountId = process.env.R2_ACCOUNT_ID || ''
const r2Endpoint = process.env.R2_ENDPOINT || (r2AccountId ? `${r2AccountId}.r2.cloudflarestorage.com` : '')
const r2Port = Number(process.env.R2_PORT || '443')
const r2UseSSL = (process.env.R2_USE_SSL || 'true') === 'true'
const r2AccessKey = process.env.R2_ACCESS_KEY_ID || ''
const r2SecretKey = process.env.R2_SECRET_ACCESS_KEY || ''
const r2Bucket = process.env.R2_BUCKET || 'soluciones-integrales-bucket'
const r2PathStyle = (process.env.R2_PATH_STYLE || 'false') === 'true'
const defaultR2PublicUrl = r2Endpoint ? `https://${r2Bucket}.${r2Endpoint}` : ''
const r2PublicUrl = (process.env.R2_PUBLIC_URL || defaultR2PublicUrl).replace(/\/$/, '')

let s3Client: S3CompatibleClient | null = null

function getS3Client() {
  if (s3Client) {
    return s3Client
  }

  s3Client = new S3CompatibleClient({
    endPoint: r2Endpoint,
    port: r2Port,
    useSSL: r2UseSSL,
    accessKey: r2AccessKey,
    secretKey: r2SecretKey,
    pathStyle: r2PathStyle,
  })

  return s3Client
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

  if (storageProvider === 'r2') {
    if (!r2Endpoint || !r2AccessKey || !r2SecretKey || !r2PublicUrl) {
      console.error(
        'Missing R2 configuration. Set R2_ENDPOINT, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, and R2_PUBLIC_URL.'
      )
      return null
    }

    try {
      const buffer = await toBuffer(file)
      const client = getS3Client()

      await client.putObject(r2Bucket, filePath, buffer, buffer.length, {
        'Content-Type': contentType || 'application/octet-stream',
      })

      return `${r2PublicUrl}/${filePath}`
    } catch (error) {
      console.error('Error uploading image to R2:', error)
      return null
    }
  }

  const client = getSupabaseStorageClient()
  if (!client) {
    return null
  }

  try {
    const { error } = await client.storage.from('images').upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
      contentType,
    })

    if (error) {
      throw error
    }

    const { data } = client.storage.from('images').getPublicUrl(filePath)

    return data.publicUrl
  } catch (error) {
    console.error('Error uploading image to Supabase Storage:', error)
    return null
  }
}

export async function deleteImage(url: string): Promise<boolean> {
  if (storageProvider === 'r2') {
    try {
      let objectPath = ''

      if (r2PublicUrl && url.startsWith(r2PublicUrl)) {
        objectPath = url.slice(r2PublicUrl.length).replace(/^\//, '')
      } else {
        const parsedUrl = new URL(url)
        objectPath = parsedUrl.pathname.replace(/^\//, '')
        if (objectPath.startsWith(`${r2Bucket}/`)) {
          objectPath = objectPath.slice(r2Bucket.length + 1)
        }
      }

      if (!objectPath) {
        return false
      }

      await getS3Client().removeObject(r2Bucket, objectPath)
      return true
    } catch (error) {
      console.error('Error deleting image from R2:', error)
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

    const { error } = await client.storage.from('images').remove([path])

    if (error) {
      throw error
    }

    return true
  } catch (error) {
    console.error('Error deleting image from Supabase Storage:', error)
    return false
  }
}
