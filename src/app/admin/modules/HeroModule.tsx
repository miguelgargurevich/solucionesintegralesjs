'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, Loader2, Check, Monitor, Image, Video } from 'lucide-react'
import { HeroContent } from '@/types'

export default function HeroModule() {
  const [hero, setHero] = useState<HeroContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetchHero()
  }, [])

  const fetchHero = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const res = await fetch('/api/admin/hero', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.success && data.data) {
        setHero(data.data)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!hero) return
    setSaving(true)
    const token = localStorage.getItem('admin_token')

    try {
      await fetch('/api/admin/hero', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(hero)
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-industrial-blue border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!hero) {
    return (
      <div className="text-center py-16 text-metal-gray">
        <p>No hay contenido del Hero. Ejecuta el SQL de inicialización.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Contenido Principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-graphite-light rounded-2xl p-6 border border-metal-gray/20"
      >
        <h3 className="text-lg font-bold text-white mb-6">Contenido del Hero</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-metal-gray mb-2">Título Principal</label>
            <input
              type="text"
              value={hero.title}
              onChange={(e) => setHero({ ...hero, title: e.target.value })}
              className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none text-xl font-bold"
              placeholder="SOLUCIONES INTEGRALES"
            />
          </div>

          <div>
            <label className="block text-sm text-metal-gray mb-2">Subtítulo</label>
            <input
              type="text"
              value={hero.subtitle || ''}
              onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
              className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none"
              placeholder="Ingeniería Industrial de Excelencia"
            />
          </div>

          <div>
            <label className="block text-sm text-metal-gray mb-2">Descripción</label>
            <textarea
              value={hero.description || ''}
              onChange={(e) => setHero({ ...hero, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none resize-none"
              placeholder="Transformamos ideas en estructuras sólidas..."
            />
          </div>
        </div>
      </motion.div>

      {/* Botones CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-graphite-light rounded-2xl p-6 border border-metal-gray/20"
      >
        <h3 className="text-lg font-bold text-white mb-6">Botones de Acción (CTA)</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-industrial-blue">Botón Principal</h4>
            <div>
              <label className="block text-xs text-metal-gray mb-1">Texto</label>
              <input
                type="text"
                value={hero.cta_primary_text || ''}
                onChange={(e) => setHero({ ...hero, cta_primary_text: e.target.value })}
                className="w-full px-4 py-2 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none"
                placeholder="Ver Proyectos"
              />
            </div>
            <div>
              <label className="block text-xs text-metal-gray mb-1">Enlace</label>
              <input
                type="text"
                value={hero.cta_primary_href || ''}
                onChange={(e) => setHero({ ...hero, cta_primary_href: e.target.value })}
                className="w-full px-4 py-2 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none"
                placeholder="#proyectos"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-safety-yellow">Botón Secundario</h4>
            <div>
              <label className="block text-xs text-metal-gray mb-1">Texto</label>
              <input
                type="text"
                value={hero.cta_secondary_text || ''}
                onChange={(e) => setHero({ ...hero, cta_secondary_text: e.target.value })}
                className="w-full px-4 py-2 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none"
                placeholder="Contáctanos"
              />
            </div>
            <div>
              <label className="block text-xs text-metal-gray mb-1">Enlace</label>
              <input
                type="text"
                value={hero.cta_secondary_href || ''}
                onChange={(e) => setHero({ ...hero, cta_secondary_href: e.target.value })}
                className="w-full px-4 py-2 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none"
                placeholder="#contacto"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Fondo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-graphite-light rounded-2xl p-6 border border-metal-gray/20"
      >
        <h3 className="text-lg font-bold text-white mb-6">Configuración del Fondo</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-metal-gray mb-3">Tipo de Fondo</label>
            <div className="flex gap-3">
              {[
                { value: '3d', label: 'Escena 3D', icon: Monitor },
                { value: 'video', label: 'Video', icon: Video },
                { value: 'image', label: 'Imagen', icon: Image },
              ].map((option) => {
                const Icon = option.icon
                return (
                  <button
                    key={option.value}
                    onClick={() => setHero({ ...hero, background_type: option.value as '3d' | 'video' | 'image' })}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border transition-colors ${
                      hero.background_type === option.value
                        ? 'bg-industrial-blue border-industrial-blue text-white'
                        : 'bg-graphite border-metal-gray/30 text-metal-gray hover:border-metal-gray/50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{option.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {hero.background_type !== '3d' && (
            <div>
              <label className="block text-sm text-metal-gray mb-2">
                URL del {hero.background_type === 'video' ? 'Video' : 'Imagen'}
              </label>
              <input
                type="text"
                value={hero.background_url || ''}
                onChange={(e) => setHero({ ...hero, background_url: e.target.value })}
                className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none"
                placeholder={hero.background_type === 'video' ? 'https://www.youtube.com/...' : 'https://...'}
              />
            </div>
          )}

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={hero.show_3d_scene}
              onChange={(e) => setHero({ ...hero, show_3d_scene: e.target.checked })}
              className="w-5 h-5 rounded border-metal-gray/30 bg-graphite text-industrial-blue focus:ring-industrial-blue"
            />
            <span className="text-white">Mostrar escena 3D animada</span>
          </label>
        </div>
      </motion.div>

      {/* Botón Guardar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex justify-end"
      >
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-industrial-blue hover:bg-industrial-blue-light text-white rounded-xl font-medium transition-colors disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : saved ? (
            <Check className="w-5 h-5" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          {saving ? 'Guardando...' : saved ? '¡Guardado!' : 'Guardar Cambios'}
        </button>
      </motion.div>
    </div>
  )
}
