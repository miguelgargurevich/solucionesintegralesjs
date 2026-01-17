'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2, Save, Eye, EyeOff, Star, StarOff, Upload, Users } from 'lucide-react'
import { CMSClient } from '@/types'
import Image from 'next/image'
import Modal, { ModalFooter, FormField, FormInput } from '../components/Modal'

export default function ClientsModule() {
  const [clients, setClients] = useState<CMSClient[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingClient, setEditingClient] = useState<CMSClient | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const res = await fetch('/api/admin/clients', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.success) {
        setClients(data.data || [])
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (clientData: Partial<CMSClient>) => {
    setSaving(true)
    const token = localStorage.getItem('admin_token')

    try {
      const res = await fetch('/api/admin/clients', {
        method: editingClient ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editingClient ? { id: editingClient.id, ...clientData } : clientData)
      })

      if (res.ok) {
        fetchClients()
        setShowForm(false)
        setEditingClient(null)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este cliente?')) return

    const token = localStorage.getItem('admin_token')
    try {
      await fetch(`/api/admin/clients?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      fetchClients()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const toggleVisibility = async (client: CMSClient) => {
    const token = localStorage.getItem('admin_token')
    try {
      await fetch('/api/admin/clients', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id: client.id, visible: !client.visible })
      })
      fetchClients()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const toggleFeatured = async (client: CMSClient) => {
    const token = localStorage.getItem('admin_token')
    try {
      await fetch('/api/admin/clients', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id: client.id, featured: !client.featured })
      })
      fetchClients()
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
          Gestiona los logos de tus clientes.
        </p>
        <button
          onClick={() => { setEditingClient(null); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-industrial-blue hover:bg-industrial-blue-light text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Nuevo Cliente</span>
        </button>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map((client, index) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-graphite-light rounded-xl p-4 border border-metal-gray/20"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl bg-graphite flex items-center justify-center overflow-hidden">
                {client.logo ? (
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                ) : (
                  <span className="text-2xl font-bold text-metal-gray">
                    {client.name.substring(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium truncate">{client.name}</h3>
                {client.website && (
                  <a 
                    href={client.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-industrial-blue hover:underline truncate block"
                  >
                    {client.website}
                  </a>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => toggleFeatured(client)}
                  className={`p-2 rounded-lg transition-colors ${
                    client.featured 
                      ? 'bg-safety-yellow/20 text-safety-yellow' 
                      : 'text-metal-gray/50 hover:text-metal-gray'
                  }`}
                  title={client.featured ? 'Quitar destacado' : 'Destacar'}
                >
                  {client.featured ? <Star className="w-4 h-4" /> : <StarOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => toggleVisibility(client)}
                  className={`p-2 rounded-lg transition-colors ${
                    client.visible 
                      ? 'bg-green-500/20 text-green-500' 
                      : 'bg-red-500/20 text-red-500'
                  }`}
                >
                  {client.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => { setEditingClient(client); setShowForm(true); }}
                  className="p-2 text-metal-gray hover:text-industrial-blue transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(client.id)}
                  className="p-2 text-metal-gray hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {clients.length === 0 && (
          <div className="col-span-full text-center py-16 text-metal-gray">
            <p className="mb-4">No hay clientes aún</p>
            <button
              onClick={() => setShowForm(true)}
              className="text-industrial-blue hover:underline"
            >
              Añadir el primero
            </button>
          </div>
        )}
      </div>

      {/* Form Modal */}
      <ClientFormModal
        isOpen={showForm}
        client={editingClient}
        onSave={handleSave}
        onCancel={() => { setShowForm(false); setEditingClient(null); }}
        saving={saving}
        nextOrder={clients.length + 1}
      />
    </div>
  )
}

function ClientFormModal({
  isOpen,
  client,
  onSave,
  onCancel,
  saving,
  nextOrder
}: {
  isOpen: boolean
  client: CMSClient | null
  onSave: (data: Partial<CMSClient>) => void
  onCancel: () => void
  saving: boolean
  nextOrder: number
}) {
  const [formData, setFormData] = useState({
    name: client?.name || '',
    logo: client?.logo || '',
    website: client?.website || '',
    description: client?.description || '',
    order_index: client?.order_index || nextOrder,
    visible: client?.visible ?? true,
    featured: client?.featured || false
  })

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: client?.name || '',
        logo: client?.logo || '',
        website: client?.website || '',
        description: client?.description || '',
        order_index: client?.order_index || nextOrder,
        visible: client?.visible ?? true,
        featured: client?.featured || false
      })
    }
  }, [isOpen, client, nextOrder])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title={client ? 'Editar Cliente' : 'Nuevo Cliente'}
      subtitle="Gestiona los logos de tus clientes destacados"
      size="md"
      icon={<Users className="w-5 h-5" />}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormField label="Nombre del Cliente" required>
          <FormInput
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Goodyear"
            required
          />
        </FormField>

        <FormField label="URL del Logo" hint="Sube el logo o ingresa la URL">
          <div className="flex gap-2">
            <div className="flex-1">
              <FormInput
                type="text"
                value={formData.logo}
                onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                placeholder="/clients/logo.svg"
              />
            </div>
            <button 
              type="button"
              className="px-4 py-3 bg-industrial-blue/20 text-industrial-blue rounded-xl hover:bg-industrial-blue/30 transition-colors"
            >
              <Upload className="w-5 h-5" />
            </button>
          </div>
          {formData.logo && (
            <div className="mt-3 p-4 bg-graphite rounded-xl border border-metal-gray/30 flex items-center justify-center">
              <Image
                src={formData.logo}
                alt="Preview"
                width={120}
                height={60}
                className="object-contain max-h-16"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            </div>
          )}
        </FormField>

        <FormField label="Sitio Web">
          <FormInput
            type="url"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            placeholder="https://..."
          />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center gap-3 cursor-pointer p-3 bg-graphite rounded-xl border border-metal-gray/30 hover:border-metal-gray/50 transition-colors">
            <input
              type="checkbox"
              checked={formData.visible}
              onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
              className="w-5 h-5 rounded border-metal-gray/30 bg-graphite text-industrial-blue focus:ring-industrial-blue"
            />
            <span className="text-white">Visible</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer p-3 bg-graphite rounded-xl border border-metal-gray/30 hover:border-metal-gray/50 transition-colors">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-5 h-5 rounded border-metal-gray/30 bg-graphite text-safety-yellow focus:ring-safety-yellow"
            />
            <div className="flex items-center gap-2">
              <Star className={`w-4 h-4 ${formData.featured ? 'text-safety-yellow fill-safety-yellow' : 'text-metal-gray'}`} />
              <span className="text-white">Destacado</span>
            </div>
          </label>
        </div>

        <ModalFooter
          onCancel={onCancel}
          loading={saving}
          submitText={client ? 'Actualizar' : 'Añadir Cliente'}
          submitIcon={<Save className="w-5 h-5" />}
        />
      </form>
    </Modal>
  )
}
