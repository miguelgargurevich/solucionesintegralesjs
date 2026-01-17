'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2, Save, X, Eye, EyeOff, Loader2, GripVertical, Wrench } from 'lucide-react'
import { CMSService } from '@/types'
import Modal, { ModalFooter, FormField, FormInput, FormTextarea, FormSelect } from '../components/Modal'

const ICONS = [
  'building', 'pipe', 'alert-triangle', 'hard-hat', 'cog', 
  'cylinder', 'wrench', 'drafting-compass', 'hammer', 'settings'
]

export default function ServicesModule() {
  const [services, setServices] = useState<CMSService[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingService, setEditingService] = useState<CMSService | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const res = await fetch('/api/admin/services', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.success) {
        setServices(data.data || [])
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (serviceData: Partial<CMSService>) => {
    setSaving(true)
    const token = localStorage.getItem('admin_token')

    try {
      const res = await fetch('/api/admin/services', {
        method: editingService ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editingService ? { id: editingService.id, ...serviceData } : serviceData)
      })

      if (res.ok) {
        fetchServices()
        setShowForm(false)
        setEditingService(null)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este servicio?')) return

    const token = localStorage.getItem('admin_token')
    try {
      await fetch(`/api/admin/services?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      fetchServices()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const toggleVisibility = async (service: CMSService) => {
    const token = localStorage.getItem('admin_token')
    try {
      await fetch('/api/admin/services', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id: service.id, visible: !service.visible })
      })
      fetchServices()
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
          Gestiona los servicios que ofrece la empresa.
        </p>
        <button
          onClick={() => { setEditingService(null); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-industrial-blue hover:bg-industrial-blue-light text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Nuevo Servicio</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid gap-4">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-graphite-light rounded-xl p-4 border border-metal-gray/20 flex items-center gap-4"
          >
            <div className="hidden sm:block cursor-move text-metal-gray/50">
              <GripVertical className="w-5 h-5" />
            </div>

            <div className="w-12 h-12 rounded-xl bg-industrial-blue/20 flex items-center justify-center text-industrial-blue flex-shrink-0">
              ⚙️
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium">{service.title}</h3>
              <p className="text-sm text-metal-gray truncate">{service.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {service.features?.slice(0, 3).map((feature, idx) => (
                  <span 
                    key={idx}
                    className="px-2 py-0.5 bg-graphite text-xs text-metal-gray rounded"
                  >
                    {feature}
                  </span>
                ))}
                {service.features && service.features.length > 3 && (
                  <span className="px-2 py-0.5 text-xs text-metal-gray">
                    +{service.features.length - 3} más
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => toggleVisibility(service)}
              className={`p-2 rounded-lg transition-colors ${
                service.visible 
                  ? 'bg-green-500/20 text-green-500' 
                  : 'bg-red-500/20 text-red-500'
              }`}
            >
              {service.visible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </button>

            <button
              onClick={() => { setEditingService(service); setShowForm(true); }}
              className="p-2 text-metal-gray hover:text-industrial-blue transition-colors"
            >
              <Edit2 className="w-5 h-5" />
            </button>

            <button
              onClick={() => handleDelete(service.id)}
              className="p-2 text-metal-gray hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </motion.div>
        ))}

        {services.length === 0 && (
          <div className="text-center py-16 text-metal-gray">
            <p className="mb-4">No hay servicios aún</p>
            <button
              onClick={() => setShowForm(true)}
              className="text-industrial-blue hover:underline"
            >
              Crear el primero
            </button>
          </div>
        )}
      </div>

      {/* Form Modal */}
      <ServiceFormModal
        isOpen={showForm}
        service={editingService}
        onSave={handleSave}
        onCancel={() => { setShowForm(false); setEditingService(null); }}
        saving={saving}
        nextOrder={services.length + 1}
      />
    </div>
  )
}

function ServiceFormModal({
  isOpen,
  service,
  onSave,
  onCancel,
  saving,
  nextOrder
}: {
  isOpen: boolean
  service: CMSService | null
  onSave: (data: Partial<CMSService>) => void
  onCancel: () => void
  saving: boolean
  nextOrder: number
}) {
  const [formData, setFormData] = useState({
    title: service?.title || '',
    description: service?.description || '',
    icon: service?.icon || 'building',
    features: service?.features || [''],
    image: service?.image || '',
    order_index: service?.order_index || nextOrder,
    visible: service?.visible ?? true
  })

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: service?.title || '',
        description: service?.description || '',
        icon: service?.icon || 'building',
        features: service?.features || [''],
        image: service?.image || '',
        order_index: service?.order_index || nextOrder,
        visible: service?.visible ?? true
      })
    }
  }, [isOpen, service, nextOrder])

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] })
  }

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData({ ...formData, features: newFeatures })
  }

  const removeFeature = (index: number) => {
    setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const features = formData.features.filter(f => f.trim() !== '')
    onSave({ ...formData, features })
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title={service ? 'Editar Servicio' : 'Nuevo Servicio'}
      subtitle="Define los servicios que ofrece tu empresa"
      size="lg"
      icon={<Wrench className="w-5 h-5" />}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField label="Título del Servicio" required>
            <FormInput
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Estructuras Metálicas"
              required
            />
          </FormField>

          <FormField label="Icono">
            <FormSelect
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            >
              {ICONS.map((icon) => (
                <option key={icon} value={icon}>{icon}</option>
              ))}
            </FormSelect>
          </FormField>
        </div>

        <FormField label="Descripción" required>
          <FormTextarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            placeholder="Descripción del servicio..."
            required
          />
        </FormField>

        <FormField label="Características" hint="Añade las características principales del servicio">
          <div className="space-y-2">
            {formData.features.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <FormInput
                  type="text"
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  placeholder="Característica..."
                />
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="p-3 text-metal-gray hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addFeature}
              className="w-full py-3 border-2 border-dashed border-metal-gray/30 rounded-xl text-metal-gray hover:text-industrial-blue hover:border-industrial-blue/50 transition-colors text-sm font-medium"
            >
              + Añadir característica
            </button>
          </div>
        </FormField>

        <FormField label="URL de Imagen" hint="Imagen representativa del servicio (opcional)">
          <FormInput
            type="text"
            value={formData.image || ''}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://..."
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
          submitText={service ? 'Actualizar' : 'Crear Servicio'}
          submitIcon={<Save className="w-5 h-5" />}
        />
      </form>
    </Modal>
  )
}
