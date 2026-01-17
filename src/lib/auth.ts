import { createHash } from 'crypto'
import { NextRequest } from 'next/server'

/**
 * Verifica si el token de autorización es válido
 * Usa el mismo sistema de autenticación JWT que el login
 */
export function verifyAdminAuth(token: string | null): boolean {
  if (!token) return false
  
  const secret = process.env.ADMIN_SECRET || 'clave-secreta-larga'
  const username = process.env.ADMIN_USERNAME || 'admin'
  const password = process.env.ADMIN_PASSWORD || '112358'
  const today = Math.floor(Date.now() / (1000 * 60 * 60 * 24))
  
  // Token de hoy
  const todayToken = createHash('sha256')
    .update(`${username}:${password}:${today}:${secret}`)
    .digest('hex')
  
  // Token de ayer (para evitar problemas con cambios de día)
  const yesterdayToken = createHash('sha256')
    .update(`${username}:${password}:${today - 1}:${secret}`)
    .digest('hex')
  
  return token === todayToken || token === yesterdayToken
}

/**
 * Extrae y verifica el token de autorización de una request
 */
export function verifyRequest(request: NextRequest): boolean {
  const authHeader = request.headers.get('Authorization')
  const token = authHeader?.replace('Bearer ', '') || null
  return verifyAdminAuth(token)
}
