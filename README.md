# 🏗️ Soluciones Integrales JS

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-CMS-3ECF8E?style=for-the-badge&logo=supabase)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animations-FF0080?style=for-the-badge&logo=framer)

**Landing page ultra moderna para empresa de ingeniería y construcción industrial**

[🌐 Ver Demo](https://solucionesintegralesjs.vercel.app) • [📋 Documentación CMS](./CMS-SETUP.md)

</div>

---

## ✨ Características Principales

### 🎨 Diseño Premium

| Característica | Descripción |
|----------------|-------------|
| **Tema Industrial** | Paleta de colores profesional: azul industrial, amarillo seguridad, tonos grafito |
| **Modo Oscuro/Claro** | Toggle de tema con persistencia en localStorage |
| **Tipografía Premium** | Playfair Display + Inter para máxima legibilidad |
| **Responsive Design** | Optimizado para móvil, tablet y desktop |
| **Animaciones Fluidas** | Transiciones y micro-interacciones con Framer Motion |

### 🚀 Secciones del Landing

#### 🏠 Hero Section
- Escena 3D interactiva adaptable a tema claro/oscuro
- Three.js/React Three Fiber con engranajes industriales animados
- Título con animación de entrada letter-by-letter
- Fondo dinámico según modo dark/light
- CTA buttons con efectos hover premium
- Overlay con gradiente suave

#### 💼 Servicios (Dinámico)
- Grid responsive cargado desde Supabase
- Cards con efecto 3D y glow en hover
- Control de visibilidad desde CMS
- Iconos de Lucide personalizables
- Features configurables por servicio
- Ordenamiento desde panel admin

#### 📂 Proyectos (Dinámico)
- Grid masonry con lazy loading
- Galería múltiple de imágenes
- Soporte para videos de YouTube/Vimeo
- Upload de imágenes desde frontend
- Filtro por categorías
- Efecto grayscale → color en hover
- Gestión completa desde CMS

#### 🏢 Sobre Nosotros
- Estadísticas animadas con contadores
- Video embed con thumbnail personalizado
- Cards de misión y visión
- Efectos parallax en scroll

#### 🤝 Clientes (Dinámico)
- Logos cargados desde Supabase Storage
- Upload directo desde panel admin
- Carrusel infinito dual (izq/der)
- Efecto grayscale en reposo
- Control de visibilidad por cliente
- Logos organizables por orden

#### 📧 Contacto
- Formulario con validación
- Envío de emails con Resend API
- Animaciones de feedback
- Mapa de ubicación integrado

### ⚡ Performance & SEO

- ✅ **Lighthouse Score 95+** en todas las métricas
- ✅ **Core Web Vitals** optimizados
- ✅ **Datos Frescos**: Endpoints sin caché con `force-dynamic`
- ✅ **Imágenes optimizadas** con Next.js Image + Supabase CDN
- ✅ **Lazy loading** en componentes 3D y galería
- ✅ **SEO completo**: meta tags, Open Graph, Twitter Cards
- ✅ **Sitemap XML** dinámico
- ✅ **robots.txt** configurado
- ✅ **Schema.org** para FAQ y organización
- ✅ **Adaptable a temas**: Modo claro/oscuro sin FOUC (Flash of Unstyled Content)

---

## 🛠️ CMS Completo con 10 Módulos

Sistema de gestión de contenido profesional integrado con Supabase.

### Panel de Administración (`/admin`)

<div align="center">

| Módulo | Funcionalidades |
|--------|-----------------|
| 🔐 **Autenticación** | Login con JWT (SHA-256), tokens 24h, logout |
| ⚙️ **Configuración** | Branding, colores, contacto, redes sociales con upload |
| 🧭 **Navegación** | Crear/editar/ordenar items del menú, toggle visibilidad |
| 🎯 **Hero** | Título, descripción, CTAs, tipo de fondo |
| 👥 **Nosotros** | Contenido, misión, visión, stats animadas |
| 🛠️ **Servicios** | CRUD completo, iconos, features, orden |
| 📂 **Proyectos** | Galería múltiple, videos, categorías, featured |
| 🏢 **Clientes** | Logos con upload, descripción, orden, featured |
| 🔗 **Footer** | Links organizados por sección |
| 👁️ **Secciones** | Control de visibilidad de cada sección |

</div>

### 🎨 Características del CMS

#### Sistema de Autenticación JWT
- ✅ Login seguro con username/password
- ✅ Tokens SHA-256 con expiración 24h
- ✅ Validación automática en todos los endpoints
- ✅ Logout con limpieza de sesión

#### Upload de Archivos Integrado
- ✅ **Upload desde Frontend**: Subir imágenes directamente desde cada módulo
- ✅ **Preview en Tiempo Real**: Vista previa antes de guardar
- ✅ **Múltiples Carpetas**: Organización automática (clients/, projects/, branding/)
- ✅ **Validación**: Tipos permitidos (jpg, png, webp, svg), límite 5MB
- ✅ **Storage en Supabase**: CDN global automático

#### Gestión Dinámica de Contenido
- ✅ **Navegación Dinámica**: Items del menú cargados desde BD
- ✅ **Secciones Adaptables**: Clientes y Servicios cargan datos en tiempo real
- ✅ **Sin Caché**: Datos siempre frescos con `force-dynamic`
- ✅ **Ordenamiento**: Drag & drop para reordenar items
- ✅ **Visibilidad**: Toggle para mostrar/ocultar elementos

#### Interfaz Premium
- 🎨 UI épica con efectos glow y animaciones
- 📱 100% responsive en móvil, tablet y desktop
- 🌙 Tema oscuro profesional
- ⚡ Feedback instantáneo en todas las acciones
- 🔔 Notificaciones de éxito/error elegantes

---

## 🏗️ Stack Tecnológico

```
Frontend
├── Next.js 14 (App Router)
├── React 18
├── TypeScript 5
├── Tailwind CSS 3.4
├── Framer Motion
├── Three.js / React Three Fiber
└── Radix UI + shadcn/ui

Backend & CMS
├── Supabase PostgreSQL (Base de datos)
├── Supabase Storage (CDN para imágenes)
├── Next.js API Routes (Backend)
├── Resend (Servicio de emails)
└── JWT Authentication (SHA-256)

Deploy & DevOps
├── Vercel (Hosting)
├── Edge Functions
├── ISR (Incremental Static Regeneration)
└── GitHub Actions (CI/CD)
```

---

## 📁 Estructura del Proyecto

```
SolucionesIntegrales/
├── public/
│   ├── sitemap.xml
│   ├── robots.txt
│   └── manifest.json
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── modules/              # 10 módulos del CMS
│   │   │   │   ├── NavigationModule.tsx
│   │   │   │   ├── HeroModule.tsx
│   │   │   │   ├── ServicesModule.tsx
│   │   │   │   ├── ClientsModule.tsx
│   │   │   │   ├── ProjectsModule.tsx
│   │   │   │   ├── BrandingModule.tsx
│   │   │   │   └── ... (10 total)
│   │   │   └── page.tsx              # Panel principal
│   │   ├── api/
│   │   │   ├── admin/                # Endpoints privados
│   │   │   │   ├── auth/             # Login JWT
│   │   │   │   ├── navigation/       # CRUD navegación
│   │   │   │   ├── services/         # CRUD servicios
│   │   │   │   ├── clients/          # CRUD clientes
│   │   │   │   ├── projects/         # CRUD proyectos
│   │   │   │   ├── settings/         # Configuración
│   │   │   │   └── upload/           # Upload de imágenes
│   │   │   ├── navigation/           # API pública (sin caché)
│   │   │   ├── services/             # API pública (sin caché)
│   │   │   ├── clients/              # API pública (sin caché)
│   │   │   ├── projects/             # API pública
│   │   │   └── contact/              # Envío de emails
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── IndustrialScene.tsx   # Escena 3D adaptable
│   │   │   └── ... (3 escenas)
│   │   ├── layout/
│   │   │   ├── Footer.tsx
│   │   │   └── Header.tsx            # Nav dinámica
│   │   ├── providers/
│   │   │   └── ThemeProvider.tsx     # Dark/Light mode
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ServicesSection.tsx   # Dinámico desde BD
│   │   │   ├── ClientsSection.tsx    # Dinámico desde BD
│   │   │   └── ... (6 secciones)
│   │   └── ui/
│   │       └── ... (componentes UI)
│   ├── lib/
│   │   ├── auth.ts                   # JWT helpers
│   │   ├── supabase.ts               # Cliente Supabase
│   │   └── utils.ts
│   └── types/
│       └── index.ts
├── supabase-schema.sql               # Esquema proyectos
├── supabase-cms-schema.sql           # Esquema CMS completo
├── supabase-fix-rls.sql              # Fix políticas RLS
├── CMS-SETUP.md                      # Guía configuración
├── tailwind.config.ts
├── next.config.js
└── package.json
```

---

## 🚀 Instalación

### Requisitos Previos

- Node.js 18+
- npm o yarn
- Cuenta en [Supabase](https://supabase.com) (gratis)
- Cuenta en [Resend](https://resend.com) (opcional, para emails)

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/miguelgargurevich/solucionesintegralesjs.git
cd solucionesintegralesjs

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales

# 4. Iniciar servidor de desarrollo
npm run dev
```

### Variables de Entorno

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key

# Admin (credenciales hardcodeadas)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=tu-contraseña-segura
ADMIN_SECRET=clave-secreta-larga-y-aleatoria

# Resend (opcional)
RESEND_API_KEY=re_xxxxx
```

---

## 📦 Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Genera build de producción |
| `npm run start` | Inicia servidor de producción |
| `npm run lint` | Ejecuta ESLint |

---

## 🎨 Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Industrial Blue | `#0056A6` | Color primario, CTAs |
| Industrial Blue Light | `#0073E6` | Hover states |
| Safety Yellow | `#FFB800` | Acentos, destacados |
| Graphite | `#1A1A1A` | Fondo oscuro |
| Graphite Light | `#2D2D2D` | Cards, superficies |
| Metal Gray | `#6B7280` | Texto secundario |
| Concrete | `#E5E5E5` | Fondos claros |

---

## 🔐 Seguridad

- ✅ Autenticación con tokens hash SHA-256
- ✅ Tokens expiran cada 24 horas
- ✅ Variables de entorno para credenciales
- ✅ Validación de tipos de archivo en uploads
- ✅ Límite de tamaño de archivos (5MB)
- ✅ Sanitización de inputs

---

## 📱 Responsive Breakpoints

| Breakpoint | Tamaño | Dispositivos |
|------------|--------|--------------|
| `sm` | 640px | Móviles grandes |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Pantallas grandes |

---

## 🌐 Deploy en Vercel

1. Conectar repositorio en [Vercel](https://vercel.com)
2. Agregar variables de entorno en Settings > Environment Variables
3. Deploy automático con cada push a `main`

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/miguelgargurevich/solucionesintegralesjs)

---

## 📄 Licencia

Este proyecto es privado y pertenece a Soluciones Integrales JS SAC.

---

## 👨‍💻 Desarrollado por

**Miguel Fernandez Gargurevich**

- GitHub: [@miguelgargurevich](https://github.com/miguelgargurevich)

---

<div align="center">

**⭐ Si te gustó el proyecto, dale una estrella ⭐**

Made with ❤️ and ☕ in Peru 🇵🇪

</div>
