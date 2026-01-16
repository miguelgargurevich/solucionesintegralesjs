# 🚀 Panel de Administración - Supabase CMS

Este documento explica cómo configurar el CMS personalizado con Supabase.

## 📋 Requisitos

1. Cuenta en [Supabase](https://supabase.com) (gratis)
2. Node.js 18+

---

## 🔧 Configuración de Supabase

### 1. Crear un proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Click en "New Project"
3. Elige un nombre (ej: "soluciones-integrales-cms")
4. Elige una contraseña segura para la base de datos
5. Selecciona la región más cercana (ej: South America)
6. Click "Create new project"

### 2. Crear las tablas

Ve a **SQL Editor** en el panel de Supabase y ejecuta el contenido del archivo `supabase-schema.sql` que está en la raíz del proyecto.

Esto creará:
- Tabla `categories` (categorías de proyectos)
- Tabla `projects` (proyectos)
- Políticas de seguridad (RLS)
- Índices para búsquedas rápidas
- Datos de ejemplo

### 3. Crear el bucket de Storage

1. Ve a **Storage** en el panel de Supabase
2. Click "New bucket"
3. Nombre: `images`
4. Marca "Public bucket"
5. Click "Create bucket"

### 4. Configurar políticas del Storage

En el bucket `images`, ve a **Policies** y agrega:

```sql
-- Permitir lectura pública
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- Permitir subida (autenticado o anón con token)
CREATE POLICY "Allow uploads"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'images');
```

### 5. Obtener las credenciales

1. Ve a **Settings** > **API**
2. Copia:
   - `URL` → NEXT_PUBLIC_SUPABASE_URL
   - `anon public` → NEXT_PUBLIC_SUPABASE_ANON_KEY

---

## 🔐 Variables de Entorno

Crea o edita el archivo `.env.local` en la raíz del proyecto:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJI...tu-anon-key

# Credenciales del Admin (puedes cambiarlas)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=tu-contraseña-segura-aqui
ADMIN_SECRET=una-clave-secreta-muy-larga-y-aleatoria
```

**⚠️ IMPORTANTE**: Cambia las credenciales por defecto antes de ir a producción.

---

## 🖥️ Acceso al Panel de Admin

1. Inicia el servidor de desarrollo: `npm run dev`
2. Ve a: `http://localhost:3000/admin`
3. Ingresa con las credenciales configuradas:
   - Usuario: `admin` (o el que hayas configurado)
   - Contraseña: `solucionesjs2024` (o la que hayas configurado)

---

## 📁 Estructura del CMS

```
src/
├── app/
│   ├── admin/
│   │   └── page.tsx        # Panel de administración
│   └── api/
│       ├── admin/
│       │   ├── auth/
│       │   │   └── route.ts    # Autenticación
│       │   ├── projects/
│       │   │   └── route.ts    # CRUD de proyectos
│       │   └── upload/
│       │       └── route.ts    # Subida de imágenes
│       └── projects/
│           └── route.ts    # API pública de proyectos
├── lib/
│   └── supabase.ts         # Cliente y funciones de Supabase
└── components/
    └── sections/
        └── ProjectsSection.tsx  # Muestra los proyectos
```

---

## 🚀 Despliegue en Vercel

### 1. Variables de entorno en Vercel

En tu proyecto de Vercel, ve a **Settings** > **Environment Variables** y agrega:

| Variable | Valor |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://tu-proyecto.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJI...` |
| `ADMIN_USERNAME` | `admin` |
| `ADMIN_PASSWORD` | `tu-contraseña-super-segura` |
| `ADMIN_SECRET` | `clave-secreta-aleatoria-larga` |

### 2. Re-deploy

Después de agregar las variables, haz un nuevo deploy para que tomen efecto.

---

## ✨ Características del CMS

- ✅ **Login simple**: Credenciales hardcodeadas (sin base de datos de usuarios)
- ✅ **CRUD completo**: Crear, editar, eliminar proyectos
- ✅ **Subida de imágenes**: A Supabase Storage
- ✅ **Galería múltiple**: Soporta varias imágenes por proyecto
- ✅ **Videos**: Soporte para YouTube y Vimeo
- ✅ **Destacados**: Marcar proyectos como destacados
- ✅ **Publicar/Ocultar**: Control de visibilidad
- ✅ **Responsive**: Funciona en móvil y desktop
- ✅ **Tema oscuro**: Diseño profesional industrial

---

## 🔒 Seguridad

- El token de sesión expira cada 24 horas
- Las contraseñas nunca se almacenan en el navegador
- Solo se almacena un hash temporal
- Las APIs están protegidas con verificación de token
- Supabase RLS protege la base de datos

---

## 📝 Notas

- Si no configuras Supabase, el sitio mostrará los datos de ejemplo de `src/lib/data.ts`
- Las imágenes se pueden subir o pegar URLs externas
- El panel está en `/admin` (no indexado por buscadores)
