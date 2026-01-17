'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Save, Loader2, Check, Plus, Edit2, Trash2,
  Building2, Users, Award, Clock, Star, Target, TrendingUp, Shield,
  LucideIcon, BarChart3
} from 'lucide-react'
import { AboutContent, AboutStat } from '@/types'
import Modal, { ModalFooter, FormField, FormInput } from '../components/Modal'

// Mapa de iconos disponibles para estadísticas
const iconMap: Record<string, LucideIcon> = {
  Building2,
  Users,
  Award,
  Clock,
  Star,
  Target,
  TrendingUp,
  Shield
}

// Componente para renderizar icono dinámicamente
function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = iconMap[name]
  if (!IconComponent) {
    return <Building2 className={className} />
  }
  return <IconComponent className={className} />
}

export default function AboutModule() {
  const [content, setContent] = useState<AboutContent | null>(null)
  const [stats, setStats] = useState<AboutStat[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [editingStat, setEditingStat] = useState<AboutStat | null>(null)
  const [showStatForm, setShowStatForm] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const res = await fetch('/api/admin/about', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.success) {
        setContent(data.data.content)
        setStats(data.data.stats || [])
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveContent = async () => {
    if (!content) return
    setSaving(true)
    const token = localStorage.getItem('admin_token')

    try {
      await fetch('/api/admin/about', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ type: 'content', ...content })
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleSaveStat = async (statData: Partial<AboutStat>) => {
    const token = localStorage.getItem('admin_token')

    try {
      if (editingStat) {
        await fetch('/api/admin/about', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ type: 'stat', id: editingStat.id, ...statData })
        })
      } else {
        await fetch('/api/admin/about', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(statData)
        })
      }
      fetchData()
      setShowStatForm(false)
      setEditingStat(null)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleDeleteStat = async (id: string) => {
    if (!confirm('¿Eliminar esta estadística?')) return
    const token = localStorage.getItem('admin_token')

    try {
      await fetch(`/api/admin/about?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      fetchData()
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
    <div className="space-y-8 max-w-4xl">
      {/* Contenido Principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-graphite-light rounded-2xl p-6 border border-metal-gray/20"
      >
        <h3 className="text-lg font-bold text-white mb-6">Contenido de la Sección</h3>
        
        {content && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-metal-gray mb-2">Título</label>
                <input
                  type="text"
                  value={content.title}
                  onChange={(e) => setContent({ ...content, title: e.target.value })}
                  className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none"
                  placeholder="Quiénes Somos"
                />
              </div>
              <div>
                <label className="block text-sm text-metal-gray mb-2">Subtítulo</label>
                <input
                  type="text"
                  value={content.subtitle || ''}
                  onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
                  className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none"
                  placeholder="Más de 15 años de experiencia"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-metal-gray mb-2">Descripción</label>
              <textarea
                value={content.description}
                onChange={(e) => setContent({ ...content, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none resize-none"
                placeholder="Descripción de la empresa..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-metal-gray mb-2">Misión</label>
                <textarea
                  value={content.mission || ''}
                  onChange={(e) => setContent({ ...content, mission: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none resize-none"
                  placeholder="Nuestra misión..."
                />
              </div>
              <div>
                <label className="block text-sm text-metal-gray mb-2">Visión</label>
                <textarea
                  value={content.vision || ''}
                  onChange={(e) => setContent({ ...content, vision: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none resize-none"
                  placeholder="Nuestra visión..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-metal-gray mb-2">URL del Video (YouTube)</label>
              <input
                type="text"
                value={content.video_url || ''}
                onChange={(e) => setContent({ ...content, video_url: e.target.value })}
                className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none"
                placeholder="https://www.youtube.com/embed/..."
              />
            </div>
          </div>
        )}
      </motion.div>

      {/* Estadísticas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-graphite-light rounded-2xl p-6 border border-metal-gray/20"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">Estadísticas</h3>
          <button
            onClick={() => { setEditingStat(null); setShowStatForm(true); }}
            className="flex items-center gap-2 px-3 py-1.5 bg-industrial-blue/20 text-industrial-blue rounded-lg hover:bg-industrial-blue/30 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Añadir
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="flex items-center gap-4 p-4 bg-graphite rounded-xl border border-metal-gray/20"
            >
              <div className="w-12 h-12 rounded-xl bg-industrial-blue/20 flex items-center justify-center text-industrial-blue">
                <DynamicIcon name={stat.icon} className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-metal-gray">{stat.label}</div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => { setEditingStat(stat); setShowStatForm(true); }}
                  className="p-2 text-metal-gray hover:text-industrial-blue transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteStat(stat.id)}
                  className="p-2 text-metal-gray hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Botón Guardar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-end"
      >
        <button
          onClick={handleSaveContent}
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

      {/* Form Modal para Stats */}
      <StatFormModal
        isOpen={showStatForm}
        stat={editingStat}
        onSave={handleSaveStat}
        onCancel={() => { setShowStatForm(false); setEditingStat(null); }}
        nextOrder={stats.length + 1}
      />
    </div>
  )
}

function StatFormModal({
  isOpen,
  stat,
  onSave,
  onCancel,
  nextOrder
}: {
  isOpen: boolean
  stat: AboutStat | null
  onSave: (data: Partial<AboutStat>) => void
  onCancel: () => void
  nextOrder: number
}) {
  const [formData, setFormData] = useState({
    icon: stat?.icon || 'Building2',
    value: stat?.value || '',
    label: stat?.label || '',
    order_index: stat?.order_index || nextOrder,
    visible: stat?.visible ?? true
  })
  const [saving, setSaving] = useState(false)

  // Reset form when modal opens with different stat
  useEffect(() => {
    if (isOpen) {
      setFormData({
        icon: stat?.icon || 'Building2',
        value: stat?.value || '',
        label: stat?.label || '',
        order_index: stat?.order_index || nextOrder,
        visible: stat?.visible ?? true
      })
    }
  }, [isOpen, stat, nextOrder])

  const icons = ['Building2', 'Users', 'Award', 'Clock', 'Star', 'Target', 'TrendingUp', 'Shield']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await onSave(formData)
    setSaving(false)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title={stat ? 'Editar Estadística' : 'Nueva Estadística'}
      subtitle="Agrega métricas impactantes para mostrar tu experiencia"
      size="md"
      icon={<BarChart3 className="w-5 h-5" />}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormField label="Icono" required>
          <div className="flex gap-3">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-industrial-blue/30 to-industrial-blue/10 flex items-center justify-center text-industrial-blue shrink-0 border border-industrial-blue/20">
              <DynamicIcon name={formData.icon} className="w-7 h-7" />
            </div>
            <div className="flex-1 grid grid-cols-4 gap-2">
              {icons.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setFormData({ ...formData, icon })}
                  className={`p-3 rounded-xl border transition-all ${
                    formData.icon === icon
                      ? 'bg-industrial-blue/20 border-industrial-blue text-industrial-blue'
                      : 'bg-graphite border-metal-gray/30 text-metal-gray hover:text-white hover:border-metal-gray/50'
                  }`}
                >
                  <DynamicIcon name={icon} className="w-5 h-5 mx-auto" />
                </button>
              ))}
            </div>
          </div>
        </FormField>

        <FormField label="Valor" hint="Ej: 200+, 15 años, 24/7" required>
          <FormInput
            type="text"
            value={formData.value}
            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
            placeholder="200+"
            required
          />
        </FormField>

        <FormField label="Etiqueta" required>
          <FormInput
            type="text"
            value={formData.label}
            onChange={(e) => setFormData({ ...formData, label: e.target.value })}
            placeholder="Proyectos Realizados"
            required
          />
        </FormField>

        <label className="flex items-center gap-3 cursor-pointer p-3 bg-graphite rounded-xl border border-metal-gray/30 hover:border-metal-gray/50 transition-colors">
          <input
            type="checkbox"
            checked={formData.visible}
            onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
            className="w-5 h-5 rounded border-metal-gray/30 bg-graphite text-industrial-blue focus:ring-industrial-blue"
          />
          <span className="text-white">Visible en el sitio</span>
        </label>

        <ModalFooter
          onCancel={onCancel}
          loading={saving}
          submitText={stat ? 'Actualizar' : 'Crear'}
          submitIcon={<Save className="w-5 h-5" />}
        />
      </form>
    </Modal>
  )
}
