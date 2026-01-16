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
- Escena 3D interactiva con Three.js/React Three Fiber
- Título animado con efecto de escritura
- Partículas flotantes industriales
- CTA buttons con efectos hover premium
- Scroll indicator animado

#### 💼 Servicios
- Grid de servicios con iconos animados
- Cards con efecto de hover magnético
- Animaciones de entrada escalonadas
- Iconos SVG personalizados para cada servicio:
  - Ingeniería Estructural
  - Obras Civiles
  - Montaje Industrial
  - Piping Industrial
  - Estructuras Metálicas
  - Señalización Industrial

#### 📂 Proyectos
- Grid masonry con efecto 3D
- Lightbox premium con galería de imágenes
- Soporte para videos de YouTube/Vimeo
- Filtro por categorías
- Efecto grayscale → color en hover
- Indicadores de proyecto destacado

#### 🏢 Sobre Nosotros
- Estadísticas animadas con contadores
- Timeline de experiencia
- Cards de valores corporativos
- Efectos parallax en scroll

#### 🤝 Clientes
- Carrusel infinito de logos
- Efecto grayscale en reposo
- Animación suave y continua

#### 📧 Contacto
- Formulario con validación
- Envío de emails con Resend API
- Animaciones de feedback
- Mapa de ubicación integrado

### ⚡ Performance & SEO

- ✅ **Lighthouse Score 95+** en todas las métricas
- ✅ **Core Web Vitals** optimizados
- ✅ **Imágenes optimizadas** con Next.js Image
- ✅ **Lazy loading** en componentes pesados
- ✅ **SEO completo**: meta tags, Open Graph, Twitter Cards
- ✅ **Sitemap XML** dinámico
- ✅ **robots.txt** configurado
- ✅ **Schema.org** para FAQ y organización

---

## 🛠️ CMS Personalizado

Sistema de gestión de contenido integrado con Supabase.

### Panel de Administración (`/admin`)

<div align="center">

| Función | Descripción |
|---------|-------------|
| 🔐 **Login Seguro** | Autenticación con credenciales hardcodeadas |
| ➕ **Crear Proyectos** | Formulario completo con todos los campos |
| ✏️ **Editar Proyectos** | Modificación en tiempo real |
| 🗑️ **Eliminar Proyectos** | Con confirmación de seguridad |
| 📤 **Subir Imágenes** | Directo a Supabase Storage |
| 🎬 **Videos** | Soporte YouTube y Vimeo |
| ⭐ **Destacados** | Marcar proyectos como featured |
| 👁️ **Publicar/Ocultar** | Control de visibilidad |

</div>

### Características del CMS

- **UI Épica**: Diseño con efectos glow, animaciones y tema oscuro
- **Responsive**: Funciona perfectamente en móvil
- **Galería Múltiple**: Hasta N imágenes por proyecto
- **Preview de Imágenes**: Vista previa antes de guardar
- **Auto-slug**: Generación automática de URLs amigables
- **Token 24h**: Sesión segura con expiración automática

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
└── Radix UI (Primitives)

Backend
├── Supabase (PostgreSQL)
├── Supabase Storage (Imágenes)
├── Next.js API Routes
└── Resend (Emails)

Deploy
├── Vercel
├── Edge Functions
└── ISR (Incremental Static Regeneration)
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
│   │   │   └── page.tsx          # Panel de administración
│   │   ├── api/
│   │   │   ├── admin/
│   │   │   │   ├── auth/         # Autenticación
│   │   │   │   ├── projects/     # CRUD proyectos
│   │   │   │   └── upload/       # Subida de imágenes
│   │   │   ├── contact/          # Envío de emails
│   │   │   └── projects/         # API pública
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── AdvancedScene3D.tsx
│   │   │   ├── IndustrialScene.tsx
│   │   │   └── Scene3D.tsx
│   │   ├── layout/
│   │   │   ├── Footer.tsx
│   │   │   └── Header.tsx
│   │   ├── providers/
│   │   │   └── ThemeProvider.tsx
│   │   ├── sections/
│   │   │   ├── AboutSection.tsx
│   │   │   ├── ClientsSection.tsx
│   │   │   ├── ContactSection.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   └── ServicesSection.tsx
│   │   └── ui/
│   │       ├── button.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       └── ThemeToggle.tsx
│   ├── lib/
│   │   ├── data.ts               # Datos locales
│   │   ├── supabase.ts           # Cliente Supabase
│   │   └── utils.ts
│   └── types/
│       └── index.ts
├── supabase-schema.sql           # Esquema de BD
├── CMS-SETUP.md                  # Guía de configuración
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
