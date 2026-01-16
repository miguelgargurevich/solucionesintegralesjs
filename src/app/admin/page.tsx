'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  Eye, 
  EyeOff, 
  Star, 
  StarOff,
  LogOut,
  Upload,
  Image as ImageIcon,
  Video,
  GripVertical
} from 'lucide-react'
import Image from 'next/image'

// Tipos
interface Project {
  id: string
  title: string
  slug: string
  client: string
  category: string
  description: string
  full_description?: string
  main_image: string
  gallery?: string[]
  video_url?: string
  year: string
  location?: string
  duration?: string
  featured: boolean
  published: boolean
  order_index: number
}

const CATEGORIES = [
  'Ingeniería Estructural',
  'Obras Civiles',
  'Montaje Industrial',
  'Piping',
  'Estructuras Metálicas',
  'Señalización',
]

const YEARS = ['2026', '2025', '2024', '2023', '2022', '2021', '2020']

// Componente de Login
function LoginForm({ onLogin }: { onLogin: (success: boolean) => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (data.success) {
        localStorage.setItem('admin_token', data.token)
        onLogin(true)
      } else {
        setError('Credenciales incorrectas')
      }
    } catch {
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-graphite relative overflow-hidden flex items-center justify-center p-4">
      {/* Background animado industrial */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="admin-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0056A6" strokeWidth="0.5" />
              <circle cx="30" cy="30" r="1" fill="#0056A6" opacity="0.5" />
            </pattern>
            <linearGradient id="admin-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0056A6" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#FFB800" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#0056A6" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#admin-grid)" />
          <rect width="100%" height="100%" fill="url(#admin-gradient)" />
        </svg>
      </div>

      {/* Orbes animados */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-20 w-96 h-96 bg-industrial-blue/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-20 w-96 h-96 bg-safety-yellow/10 rounded-full blur-3xl"
      />

      {/* Botón de retorno */}
      <motion.a
        href="/"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-graphite-light/80 backdrop-blur-md border border-metal-gray/30 rounded-lg text-metal-gray hover:text-white hover:border-industrial-blue/50 transition-all group z-10"
      >
        <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="text-sm font-medium">Volver al sitio</span>
      </motion.a>

      {/* Card de Login */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          type: "spring",
          damping: 20,
          stiffness: 100,
          delay: 0.1 
        }}
        className="w-full max-w-md relative z-10"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-industrial-blue/30 via-safety-yellow/20 to-industrial-blue/30 rounded-3xl blur-xl" />
        
        {/* Card principal */}
        <div className="relative bg-graphite-light rounded-3xl p-8 border border-metal-gray/20 shadow-2xl backdrop-blur-sm">
          {/* Líneas decorativas esquinas */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-industrial-blue rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-industrial-blue rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-safety-yellow rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-safety-yellow rounded-br-lg" />

          {/* Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Icono Shield */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring",
                damping: 15,
                stiffness: 200,
                delay: 0.4 
              }}
              className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-industrial-blue to-industrial-blue-light rounded-2xl flex items-center justify-center shadow-glow-blue"
            >
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </motion.div>

            <motion.h1 
              className="text-4xl font-display font-bold mb-2 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="bg-gradient-to-r from-white via-industrial-blue-light to-white bg-clip-text text-transparent">
                Admin Panel
              </span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="h-0.5 bg-gradient-to-r from-transparent via-industrial-blue to-transparent mt-2"
              />
            </motion.h1>
            
            <motion.p 
              className="text-metal-gray font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Soluciones Integrales JS
            </motion.p>
          </motion.div>

          {/* Formulario */}
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div>
              <label className="block text-sm font-medium text-metal-gray mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Usuario
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-xl text-white placeholder-metal-gray/50 focus:border-industrial-blue focus:outline-none focus:ring-2 focus:ring-industrial-blue/20 transition-all"
                placeholder="admin"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-metal-gray mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-xl text-white placeholder-metal-gray/50 focus:border-industrial-blue focus:outline-none focus:ring-2 focus:ring-industrial-blue/20 transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
              >
                <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-red-500 text-sm font-medium">{error}</p>
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-industrial-blue to-industrial-blue-light hover:from-industrial-blue-light hover:to-industrial-blue text-white rounded-xl font-bold text-lg shadow-glow-blue disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verificando...
                </>
              ) : (
                <>
                  <span>Acceder al Panel</span>
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Footer decorativo */}
          <motion.div 
            className="mt-6 pt-6 border-t border-metal-gray/20 flex items-center justify-center gap-2 text-xs text-metal-gray/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Acceso restringido a administradores</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

// Componente de formulario de proyecto
function ProjectForm({
  project,
  onSave,
  onCancel,
}: {
  project?: Project
  onSave: (data: Partial<Project>) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState<Partial<Project>>({
    title: project?.title || '',
    slug: project?.slug || '',
    client: project?.client || '',
    category: project?.category || CATEGORIES[0],
    description: project?.description || '',
    full_description: project?.full_description || '',
    main_image: project?.main_image || '',
    gallery: project?.gallery || [],
    video_url: project?.video_url || '',
    year: project?.year || new Date().getFullYear().toString(),
    location: project?.location || '',
    duration: project?.duration || '',
    featured: project?.featured || false,
    published: project?.published ?? true,
    order_index: project?.order_index || 0,
  })

  const [uploading, setUploading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const generateSlug = () => {
    const slug = formData.title
      ?.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    setFormData(prev => ({ ...prev, slug }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isGallery = false) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    
    try {
      const formDataUpload = new FormData()
      formDataUpload.append('file', file)
      
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
        },
        body: formDataUpload,
      })
      
      const data = await res.json()
      
      if (data.url) {
        if (isGallery) {
          setFormData(prev => ({
            ...prev,
            gallery: [...(prev.gallery || []), data.url],
          }))
        } else {
          setFormData(prev => ({ ...prev, main_image: data.url }))
        }
      }
    } catch (error) {
      console.error('Error uploading:', error)
    } finally {
      setUploading(false)
    }
  }

  const removeGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery?.filter((_, i) => i !== index),
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl bg-graphite-light rounded-2xl p-6 my-8 border border-metal-gray/20"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {project ? 'Editar Proyecto' : 'Nuevo Proyecto'}
          </h2>
          <button onClick={onCancel} className="p-2 hover:bg-graphite rounded-lg">
            <X className="w-6 h-6 text-metal-gray" />
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="space-y-6">
          {/* Título y Slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-metal-gray mb-2">Título *</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                onBlur={() => !formData.slug && generateSlug()}
                className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-metal-gray mb-2">Slug (URL)</label>
              <div className="flex gap-2">
                <input
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="flex-1 px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none"
                />
                <button
                  type="button"
                  onClick={generateSlug}
                  className="px-3 py-2 bg-industrial-blue/20 text-industrial-blue rounded-lg hover:bg-industrial-blue/30"
                >
                  Auto
                </button>
              </div>
            </div>
          </div>

          {/* Cliente y Categoría */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-metal-gray mb-2">Cliente *</label>
              <input
                name="client"
                value={formData.client}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-metal-gray mb-2">Categoría *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Año y Ubicación */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-metal-gray mb-2">Año *</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none"
              >
                {YEARS.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-metal-gray mb-2">Ubicación</label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Lima, Perú"
                className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-metal-gray mb-2">Duración</label>
              <input
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="3 meses"
                className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none"
              />
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm text-metal-gray mb-2">Descripción Corta *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none resize-none"
              required
            />
          </div>

          {/* Imagen Principal */}
          <div>
            <label className="block text-sm text-metal-gray mb-2">Imagen Principal *</label>
            <div className="flex gap-4 items-start">
              {formData.main_image ? (
                <div className="relative w-32 h-24 rounded-lg overflow-hidden">
                  <Image
                    src={formData.main_image}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, main_image: '' }))}
                    className="absolute top-1 right-1 p-1 bg-red-500 rounded-full"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-32 h-24 border-2 border-dashed border-metal-gray/30 rounded-lg cursor-pointer hover:border-industrial-blue transition-colors">
                  <Upload className="w-6 h-6 text-metal-gray mb-1" />
                  <span className="text-xs text-metal-gray">Subir</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, false)}
                    className="hidden"
                  />
                </label>
              )}
              <div className="flex-1">
                <input
                  name="main_image"
                  value={formData.main_image}
                  onChange={handleChange}
                  placeholder="O pega una URL de imagen..."
                  className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none text-sm"
                />
              </div>
            </div>
          </div>

          {/* Video URL */}
          <div>
            <label className="block text-sm text-metal-gray mb-2">
              <Video className="w-4 h-4 inline mr-1" />
              Video (YouTube/Vimeo)
            </label>
            <input
              name="video_url"
              value={formData.video_url}
              onChange={handleChange}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none"
            />
          </div>

          {/* Galería */}
          <div>
            <label className="block text-sm text-metal-gray mb-2">
              <ImageIcon className="w-4 h-4 inline mr-1" />
              Galería de Imágenes
            </label>
            <div className="flex flex-wrap gap-2">
              {formData.gallery?.map((img, idx) => (
                <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden">
                  <Image src={img} alt={`Gallery ${idx}`} fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(idx)}
                    className="absolute top-1 right-1 p-1 bg-red-500 rounded-full"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}
              <label className="flex flex-col items-center justify-center w-20 h-20 border-2 border-dashed border-metal-gray/30 rounded-lg cursor-pointer hover:border-industrial-blue transition-colors">
                <Plus className="w-5 h-5 text-metal-gray" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, true)}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Opciones */}
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-5 h-5 rounded border-metal-gray/30 bg-graphite text-industrial-blue focus:ring-industrial-blue"
              />
              <span className="text-white">Proyecto Destacado</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleChange}
                className="w-5 h-5 rounded border-metal-gray/30 bg-graphite text-industrial-blue focus:ring-industrial-blue"
              />
              <span className="text-white">Publicado</span>
            </label>
          </div>

          {/* Botones */}
          <div className="flex gap-4 pt-4 border-t border-metal-gray/20">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 bg-graphite border border-metal-gray/30 text-metal-gray rounded-lg hover:bg-graphite-light transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="flex-1 py-3 bg-industrial-blue hover:bg-industrial-blue-light text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {uploading ? 'Subiendo...' : 'Guardar Proyecto'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

// Componente principal del Admin
export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState<Project[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | undefined>()

  // Verificar autenticación al cargar
  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (token) {
      verifyToken(token)
    } else {
      setLoading(false)
    }
  }, [])

  const verifyToken = async (token: string) => {
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      })
      const data = await res.json()
      setIsAuthenticated(data.valid)
      if (data.valid) {
        fetchProjects()
      }
    } catch {
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/admin/projects', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` },
      })
      const data = await res.json()
      setProjects(data.projects || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    setIsAuthenticated(false)
  }

  const handleSave = async (data: Partial<Project>) => {
    const token = localStorage.getItem('admin_token')
    
    try {
      const res = await fetch('/api/admin/projects', {
        method: editingProject ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editingProject ? { id: editingProject.id, ...data } : data),
      })
      
      if (res.ok) {
        fetchProjects()
        setShowForm(false)
        setEditingProject(undefined)
      }
    } catch (error) {
      console.error('Error saving:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este proyecto?')) return
    
    try {
      await fetch('/api/admin/projects', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
        },
        body: JSON.stringify({ id }),
      })
      fetchProjects()
    } catch (error) {
      console.error('Error deleting:', error)
    }
  }

  const togglePublished = async (project: Project) => {
    const token = localStorage.getItem('admin_token')
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id: project.id, published: !project.published }),
      })
      if (res.ok) {
        fetchProjects()
      }
    } catch (error) {
      console.error('Error updating published:', error)
    }
  }

  const toggleFeatured = async (project: Project) => {
    const token = localStorage.getItem('admin_token')
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id: project.id, featured: !project.featured }),
      })
      if (res.ok) {
        fetchProjects()
      }
    } catch (error) {
      console.error('Error updating featured:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-graphite flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-industrial-blue border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={setIsAuthenticated} />
  }

  return (
    <div className="min-h-screen bg-graphite">
      {/* Header */}
      <header className="bg-graphite-light border-b border-metal-gray/20 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Panel de Administración</h1>
            <p className="text-sm text-metal-gray">Soluciones Integrales JS</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => { setEditingProject(undefined); setShowForm(true); }}
              className="flex items-center gap-2 px-4 py-2 bg-industrial-blue hover:bg-industrial-blue-light text-white rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Nuevo Proyecto</span>
            </button>
            <button
              onClick={handleLogout}
              className="p-2 text-metal-gray hover:text-white transition-colors"
              title="Cerrar Sesión"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-4">
          {projects.length === 0 ? (
            <div className="text-center py-16 text-metal-gray">
              <p className="mb-4">No hay proyectos aún</p>
              <button
                onClick={() => setShowForm(true)}
                className="text-industrial-blue hover:underline"
              >
                Crear el primero
              </button>
            </div>
          ) : (
            projects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-graphite-light rounded-xl p-4 border border-metal-gray/20 flex items-center gap-4"
              >
                {/* Drag Handle */}
                <div className="hidden sm:block cursor-move text-metal-gray/50">
                  <GripVertical className="w-5 h-5" />
                </div>

                {/* Image */}
                <div className="relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={project.main_image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium truncate">{project.title}</h3>
                  <p className="text-sm text-metal-gray truncate">
                    {project.client} • {project.category} • {project.year}
                  </p>
                </div>

                {/* Status */}
                <div className="hidden md:flex items-center gap-2">
                  <button
                    onClick={() => toggleFeatured(project)}
                    className={`p-2 rounded-lg transition-colors ${
                      project.featured 
                        ? 'bg-safety-yellow/20 text-safety-yellow' 
                        : 'text-metal-gray/50 hover:text-metal-gray'
                    }`}
                    title={project.featured ? 'Quitar destacado' : 'Marcar como destacado'}
                  >
                    {project.featured ? <Star className="w-5 h-5" /> : <StarOff className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => togglePublished(project)}
                    className={`p-2 rounded-lg transition-colors ${
                      project.published 
                        ? 'bg-green-500/20 text-green-500' 
                        : 'bg-red-500/20 text-red-500'
                    }`}
                    title={project.published ? 'Ocultar' : 'Publicar'}
                  >
                    {project.published ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => { setEditingProject(project); setShowForm(true); }}
                    className="p-2 text-metal-gray hover:text-industrial-blue transition-colors"
                    title="Editar"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 text-metal-gray hover:text-red-500 transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </main>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <ProjectForm
            project={editingProject}
            onSave={handleSave}
            onCancel={() => { setShowForm(false); setEditingProject(undefined); }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
