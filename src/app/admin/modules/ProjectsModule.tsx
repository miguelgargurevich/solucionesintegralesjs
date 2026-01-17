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
  Upload,
  Video,
  Image as ImageIcon,
  GripVertical,
  Loader2
} from 'lucide-react'
import Image from 'next/image'

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

export default function ProjectsModule() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | undefined>()

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/admin/projects', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` },
      })
      const data = await res.json()
      setProjects(data.projects || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
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
      await fetch('/api/admin/projects', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id: project.id, published: !project.published }),
      })
      fetchProjects()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const toggleFeatured = async (project: Project) => {
    const token = localStorage.getItem('admin_token')
    try {
      await fetch('/api/admin/projects', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id: project.id, featured: !project.featured }),
      })
      fetchProjects()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-industrial-blue border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-metal-gray">
          {projects.length} proyectos en total
        </p>
        <button
          onClick={() => { setEditingProject(undefined); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-industrial-blue hover:bg-industrial-blue-light text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Nuevo Proyecto</span>
        </button>
      </div>

      {/* Projects List */}
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
              <div className="hidden sm:block cursor-move text-metal-gray/50">
                <GripVertical className="w-5 h-5" />
              </div>

              <div className="relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={project.main_image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium truncate">{project.title}</h3>
                <p className="text-sm text-metal-gray truncate">
                  {project.client} • {project.category} • {project.year}
                </p>
              </div>

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
      formDataUpload.append('folder', 'projects')
      
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
              {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {uploading ? 'Subiendo...' : 'Guardar Proyecto'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
