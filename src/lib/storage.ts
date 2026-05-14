import { Client as S3CompatibleClient } from 'minio'
import { supabaseStorageAdminClient, supabaseStorageClient } from '@/lib/supabase-storage-client'

type UploadSource = Blob | Buffer

const storageProvider = (process.env.STORAGE_PROVIDER || 'supabase').toLowerCase()
const isS3CompatibleProvider = storageProvider === 'r2' || storageProvider === 'minio'
const isMinioProvider = storageProvider === 'minio'
const r2AccountId = process.env.R2_ACCOUNT_ID || ''
const r2Endpoint = process.env.R2_ENDPOINT || (r2AccountId ? `${r2AccountId}.r2.cloudflarestorage.com` : '')
const r2Port = Number(process.env.R2_PORT || '443')
const r2UseSSL = (process.env.R2_USE_SSL || 'true') === 'true'
const r2AccessKey = process.env.R2_ACCESS_KEY_ID || ''
const r2SecretKey = process.env.R2_SECRET_ACCESS_KEY || ''
const r2Bucket = process.env.R2_BUCKET || 'soluciones-integrales-bucket'
const r2PathStyle = (process.env.R2_PATH_STYLE || 'false') === 'true'
const defaultR2PublicUrl = r2Endpoint ? `https://${r2Bucket}.${r2Endpoint}` : ''

const minioEndpoint = process.env.MINIO_ENDPOINT || ''
const minioPort = Number(process.env.MINIO_PORT || '9000')
const minioUseSSL = (process.env.MINIO_USE_SSL || 'false') === 'true'
const minioAccessKey = process.env.MINIO_ACCESS_KEY || ''
const minioSecretKey = process.env.MINIO_SECRET_KEY || ''
const minioBucket = process.env.MINIO_BUCKET || 'soluciones-integrales-bucket'
const minioPathStyle = true
const defaultMinioPublicUrl = minioEndpoint
  ? `${minioUseSSL ? 'https' : 'http'}://${minioEndpoint}${minioPort ? `:${minioPort}` : ''}`
  : ''

const objectEndpoint = isMinioProvider ? (minioEndpoint || r2Endpoint) : (r2Endpoint || minioEndpoint)
const objectPort = isMinioProvider ? minioPort : r2Port
const objectUseSSL = isMinioProvider ? minioUseSSL : r2UseSSL
const objectAccessKey = isMinioProvider ? (minioAccessKey || r2AccessKey) : (r2AccessKey || minioAccessKey)
const objectSecretKey = isMinioProvider ? (minioSecretKey || r2SecretKey) : (r2SecretKey || minioSecretKey)
const objectBucket = isMinioProvider ? (minioBucket || r2Bucket) : (r2Bucket || minioBucket)
const objectPathStyle = isMinioProvider ? minioPathStyle : r2PathStyle
const objectPublicUrl = (
  isMinioProvider
    ? (process.env.MINIO_PUBLIC_URL || process.env.R2_PUBLIC_URL || defaultMinioPublicUrl)
    : (process.env.R2_PUBLIC_URL || defaultR2PublicUrl)
).replace(/\/$/, '')

let s3Client: S3CompatibleClient | null = null

function getS3Client() {
  if (s3Client) {
    return s3Client
  }

  s3Client = new S3CompatibleClient({
    endPoint: objectEndpoint,
    port: objectPort,
    useSSL: objectUseSSL,
    accessKey: objectAccessKey,
    secretKey: objectSecretKey,
    pathStyle: objectPathStyle,
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

  if (isS3CompatibleProvider) {
    if (!objectEndpoint || !objectAccessKey || !objectSecretKey || !objectPublicUrl) {
      console.error(
        'Missing object storage configuration. Configure endpoint, credentials, bucket and public URL for the selected provider.'
      )
      return null
    }

    try {
      const buffer = await toBuffer(file)
      const client = getS3Client()

      await client.putObject(objectBucket, filePath, buffer, buffer.length, {
        'Content-Type': contentType || 'application/octet-stream',
      })

      return `${objectPublicUrl}/${filePath}`
    } catch (error) {
      console.error('Error uploading image to object storage:', error)
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
  if (isS3CompatibleProvider) {
    try {
      let objectPath = ''

      if (objectPublicUrl && url.startsWith(objectPublicUrl)) {
        objectPath = url.slice(objectPublicUrl.length).replace(/^\//, '')
      } else {
        const parsedUrl = new URL(url)
        objectPath = parsedUrl.pathname.replace(/^\//, '')
        if (objectPath.startsWith(`${objectBucket}/`)) {
          objectPath = objectPath.slice(objectBucket.length + 1)
        }
      }

      if (!objectPath) {
        return false
      }

      await getS3Client().removeObject(objectBucket, objectPath)
      return true
    } catch (error) {
      console.error('Error deleting image from object storage:', error)
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
