# Soluciones Integrales JS

Landing + CMS para una empresa industrial, construido con Next.js 14 (App Router), TypeScript y Tailwind.

## Estado actual de arquitectura

- Frontend + backend en una sola app Next.js (rutas en src/app/api)
- Base de datos: PostgreSQL (Neon en produccion, PostgreSQL local en desarrollo)
- Storage de imagenes: Cloudflare R2 (S3-compatible)
- Email: Resend
- Deploy recomendado: Vercel

## Stack tecnico

- Next.js 14
- React 18
- TypeScript 5
- Tailwind CSS 3
- Framer Motion
- PostgreSQL + pg
- Cloudflare R2 (cliente S3-compatible via minio SDK)
- Resend

## Estructura principal

- src/app: rutas, paginas y API Routes
- src/app/admin: panel CMS
- src/app/api/admin: endpoints privados del CMS
- src/app/api: endpoints publicos del sitio
- src/components: secciones y componentes UI
- src/lib/supabase.ts: capa de datos (adaptada a PostgreSQL directo)
- src/lib/storage.ts: capa de storage (R2 o fallback Supabase)

## Requisitos

- Node.js 18+
- npm
- Docker (opcional, para DB local)

## Instalacion

```bash
git clone https://github.com/miguelgargurevich/solucionesintegralesjs.git
cd solucionesintegralesjs
npm install
cp .env.example .env.local
npm run dev
```

## Scripts

- npm run dev: desarrollo
- npm run build: build de produccion
- npm run start: correr build
- npm run lint: lint
- npm run db:local:up: levanta PostgreSQL local con schema+seed
- npm run db:local:down: baja stack local DB
- npm run db:local:reset: reinicia DB local desde cero

## Variables de entorno

Base minima para produccion (Vercel):

```env
DATABASE_URL=postgresql://user:password@host:5432/dbname?sslmode=require

ADMIN_USERNAME=admin
ADMIN_PASSWORD=tu-password-segura
ADMIN_SECRET=tu-secret-largo-y-unico

RESEND_API_KEY=re_xxx
CONTACT_EMAIL=contacto@tudominio.com

STORAGE_PROVIDER=r2
R2_ACCOUNT_ID=tu_account_id
R2_ENDPOINT=tu_account_id.r2.cloudflarestorage.com
R2_PORT=443
R2_USE_SSL=true
R2_ACCESS_KEY_ID=tu_access_key
R2_SECRET_ACCESS_KEY=tu_secret_key
R2_BUCKET=soluciones-integrales-bucket
R2_PUBLIC_URL=https://pub-xxxx.r2.dev
R2_PATH_STYLE=false
```

Notas:

- En local puedes usar LOCAL_DATABASE_URL para apuntar a PostgreSQL Docker.
- STORAGE_PROVIDER admite r2 (recomendado) y supabase (fallback).
- Si usas r2, valida que el bucket tenga acceso publico para servir imagenes.

## Base de datos

Este repo incluye SQL para bootstrap, schema y seed:

- docker/postgres/init/00-local-bootstrap.sql
- supabase-schema.sql
- supabase-cms-schema.sql

Para aplicar manualmente en una DB remota (ejemplo Neon):

```bash
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f docker/postgres/init/00-local-bootstrap.sql
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f supabase-schema.sql
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f supabase-cms-schema.sql
```

## Deploy (Vercel)

1. Conecta el repo en Vercel.
2. Configura variables de entorno de Production.
3. Redeploy completo cuando cambies next.config.js.

## Troubleshooting rapido

Si imagenes nuevas no aparecen tras subir desde CMS:

- Verifica R2_PUBLIC_URL en Vercel (Production).
- Verifica que el bucket/URL publica respondan 200 directo en navegador.
- Revisa host allowlist de next/image en next.config.js.
- Asegura que endpoints publicos usen dynamic = 'force-dynamic' si deben reflejar cambios inmediatos.

## Licencia

Proyecto privado.
