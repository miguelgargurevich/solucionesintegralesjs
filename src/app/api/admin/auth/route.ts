import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'

// Credenciales hardcodeadas (puedes cambiarlas en .env.local)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'solucionesjs2024'

// Generamos un token simple basado en las credenciales
const generateToken = () => {
  const secret = process.env.ADMIN_SECRET || 'super-secret-key-solucionesjs'
  const timestamp = Math.floor(Date.now() / (1000 * 60 * 60 * 24)) // Válido por 24 horas
  return createHash('sha256')
    .update(`${ADMIN_USERNAME}:${ADMIN_PASSWORD}:${timestamp}:${secret}`)
    .digest('hex')
}

const verifyToken = (token: string) => {
  const secret = process.env.ADMIN_SECRET || 'super-secret-key-solucionesjs'
  const today = Math.floor(Date.now() / (1000 * 60 * 60 * 24))
  
  // Verificar token de hoy
  const todayToken = createHash('sha256')
    .update(`${ADMIN_USERNAME}:${ADMIN_PASSWORD}:${today}:${secret}`)
    .digest('hex')
  
  // También verificar token de ayer (por si acaba de expirar)
  const yesterdayToken = createHash('sha256')
    .update(`${ADMIN_USERNAME}:${ADMIN_PASSWORD}:${today - 1}:${secret}`)
    .digest('hex')
  
  return token === todayToken || token === yesterdayToken
}

// POST - Login
export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = generateToken()
      return NextResponse.json({ success: true, token })
    }
    
    return NextResponse.json({ success: false, error: 'Credenciales incorrectas' }, { status: 401 })
  } catch {
    return NextResponse.json({ success: false, error: 'Error en la solicitud' }, { status: 400 })
  }
}

// GET - Verify token
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization')
    const token = authHeader?.replace('Bearer ', '')
    
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ valid: false }, { status: 401 })
    }
    
    return NextResponse.json({ valid: true })
  } catch {
    return NextResponse.json({ valid: false }, { status: 401 })
  }
}

