'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit2, Trash2, Save, X, Eye, EyeOff, ExternalLink, Loader2 } from 'lucide-react'
import { FooterLink } from '@/types'

export default function FooterModule() {
  const [links, setLinks] = useState<{
    servicios: FooterLink[]
    empresa: FooterLink[]
    legal: FooterLink[]
  }>({ servicios: [], empresa: [], legal: [] })
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingLink, setEditingLink] = useState<FooterLink | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchLinks()
  }, [])

  const fetchLinks = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const res = await fetch('/api/admin/footer', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.success) {
        setLinks(data.data || { servicios: [], empresa: [], legal: [] })
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (linkData: Partial<FooterLink>) => {
    setSaving(true)
    const token = localStorage.getItem('admin_token')

    try {
      const res = await fetch('/api/admin/footer', {
        method: editingLink ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editingLink ? { id: editingLink.id, ...linkData } : linkData)
      })

      if (res.ok) {
        fetchLinks()
        setShowForm(false)
        setEditingLink(null)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este enlace?')) return

    const token = localStorage.getItem('admin_token')
    try {
      await fetch(`/api/admin/footer?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      fetchLinks()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const toggleVisibility = async (link: FooterLink) => {
    const token = localStorage.getItem('admin_token')
    try {
      await fetch('/api/admin/footer', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id: link.id, visible: !link.visible })
      })
      fetchLinks()
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

  const sections = [
    { key: 'servicios' as const, label: 'Servicios', color: 'industrial-blue' },
    { key: 'empresa' as const, label: 'Empresa', color: 'safety-yellow' },
    { key: 'legal' as const, label: 'Legal', color: 'metal-gray' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-metal-gray">
          Gestiona los enlaces del pie de página.
        </p>
        <button
          onClick={() => { setEditingLink(null); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-industrial-blue hover:bg-industrial-blue-light text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Nuevo Enlace</span>
        </button>
      </div>

      {/* Links by Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <motion.div
            key={section.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-graphite-light rounded-2xl p-4 border border-metal-gray/20"
          >
            <h3 className={`text-lg font-bold text-${section.color} mb-4`}>
              {section.label}
            </h3>
            
            <div className="space-y-2">
              {links[section.key].map((link) => (
                <div
                  key={link.id}
                  className="flex items-center gap-3 p-3 bg-graphite rounded-xl"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm truncate">{link.label}</span>
                      {link.open_in_new_tab && (
                        <ExternalLink className="w-3 h-3 text-metal-gray" />
                      )}
                    </div>
                    <span className="text-xs text-metal-gray truncate block">{link.href}</span>
                  </div>

                  <button
                    onClick={() => toggleVisibility(link)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      link.visible 
                        ? 'text-green-500' 
                        : 'text-red-500'
                    }`}
                  >
                    {link.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => { setEditingLink(link); setShowForm(true); }}
                    className="p-1.5 text-metal-gray hover:text-industrial-blue transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(link.id)}
                    className="p-1.5 text-metal-gray hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {links[section.key].length === 0 && (
                <p className="text-center text-metal-gray/50 py-4 text-sm">
                  Sin enlaces
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <FooterLinkForm
            link={editingLink}
            onSave={handleSave}
            onCancel={() => { setShowForm(false); setEditingLink(null); }}
            saving={saving}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function FooterLinkForm({
  link,
  onSave,
  onCancel,
  saving
}: {
  link: FooterLink | null
  onSave: (data: Partial<FooterLink>) => void
  onCancel: () => void
  saving: boolean
}) {
  const [formData, setFormData] = useState({
    section: link?.section || 'empresa' as 'servicios' | 'empresa' | 'legal',
    label: link?.label || '',
    href: link?.href || '',
    order_index: link?.order_index || 0,
    visible: link?.visible ?? true,
    open_in_new_tab: link?.open_in_new_tab || false
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md bg-graphite-light rounded-2xl p-6 border border-metal-gray/20"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">
            {link ? 'Editar Enlace' : 'Nuevo Enlace'}
          </h2>
          <button onClick={onCancel} className="p-2 hover:bg-graphite rounded-lg">
            <X className="w-5 h-5 text-metal-gray" />
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="space-y-4">
          <div>
            <label className="block text-sm text-metal-gray mb-2">Sección</label>
            <select
              value={formData.section}
              onChange={(e) => setFormData({ ...formData, section: e.target.value as 'servicios' | 'empresa' | 'legal' })}
              className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none"
            >
              <option value="servicios">Servicios</option>
              <option value="empresa">Empresa</option>
              <option value="legal">Legal</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-metal-gray mb-2">Texto del Enlace</label>
            <input
              type="text"
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none"
              placeholder="Estructuras Metálicas"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-metal-gray mb-2">URL / Href</label>
            <input
              type="text"
              value={formData.href}
              onChange={(e) => setFormData({ ...formData, href: e.target.value })}
              className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none"
              placeholder="#servicios o /pagina"
              required
            />
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.visible}
                onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                className="w-5 h-5 rounded border-metal-gray/30 bg-graphite text-industrial-blue focus:ring-industrial-blue"
              />
              <span className="text-white">Visible</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.open_in_new_tab}
                onChange={(e) => setFormData({ ...formData, open_in_new_tab: e.target.checked })}
                className="w-5 h-5 rounded border-metal-gray/30 bg-graphite text-industrial-blue focus:ring-industrial-blue"
              />
              <span className="text-white">Abrir en nueva pestaña</span>
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 bg-graphite border border-metal-gray/30 text-metal-gray rounded-lg hover:bg-graphite-light transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-3 bg-industrial-blue hover:bg-industrial-blue-light text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {saving ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
