'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import { Plus, Edit2, Trash2, Save, X, GripVertical, Eye, EyeOff, Loader2 } from 'lucide-react'
import { NavigationItem } from '@/types'
import { useToast } from '@/components/ui/Toast'

export default function NavigationModule() {
  const [items, setItems] = useState<NavigationItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<NavigationItem | null>(null)
  const [saving, setSaving] = useState(false)
  const { showToast, showConfirm } = useToast()

  useEffect(() => {
    fetchNavigation()
  }, [])

  const fetchNavigation = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const res = await fetch('/api/admin/navigation', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.success) {
        setItems(data.data || [])
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (itemData: Partial<NavigationItem>) => {
    setSaving(true)
    const token = localStorage.getItem('admin_token')

    try {
      const res = await fetch('/api/admin/navigation', {
        method: editingItem ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editingItem ? { id: editingItem.id, ...itemData } : itemData)
      })

      if (res.ok) {
        fetchNavigation()
        setShowForm(false)
        setEditingItem(null)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    showConfirm(
      '¿Eliminar elemento?',
      'Esta acción no se puede deshacer. El elemento se eliminará permanentemente.',
      async () => {
        const token = localStorage.getItem('admin_token')
        try {
          await fetch(`/api/admin/navigation?id=${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
          })
          showToast('success', 'Elemento eliminado')
          fetchNavigation()
        } catch (error) {
          console.error('Error:', error)
          showToast('error', 'Error al eliminar')
        }
      }
    )
  }

  const toggleVisibility = async (item: NavigationItem) => {
    const token = localStorage.getItem('admin_token')
    try {
      await fetch('/api/admin/navigation', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id: item.id, visible: !item.visible })
      })
      fetchNavigation()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleReorder = async (newOrder: NavigationItem[]) => {
    setItems(newOrder)
    // Actualizar orden en el backend
    const token = localStorage.getItem('admin_token')
    for (let i = 0; i < newOrder.length; i++) {
      await fetch('/api/admin/navigation', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id: newOrder[i].id, order_index: i + 1 })
      })
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
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-metal-gray">
          Arrastra los elementos para reordenarlos. Los cambios se guardan automáticamente.
        </p>
        <button
          onClick={() => { setEditingItem(null); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-industrial-blue hover:bg-industrial-blue-light text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Añadir</span>
        </button>
      </div>

      {/* Navigation List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-graphite-light rounded-2xl p-4 border border-metal-gray/20"
      >
        <Reorder.Group axis="y" values={items} onReorder={handleReorder} className="space-y-2">
          {items.map((item) => (
            <Reorder.Item
              key={item.id}
              value={item}
              className="bg-graphite rounded-xl p-4 border border-metal-gray/20 flex items-center gap-4 cursor-move"
            >
              <GripVertical className="w-5 h-5 text-metal-gray/50" />
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">{item.label}</span>
                  {item.is_cta && (
                    <span className="px-2 py-0.5 bg-industrial-blue/20 text-industrial-blue text-xs rounded-full">
                      CTA
                    </span>
                  )}
                </div>
                <span className="text-sm text-metal-gray">{item.href}</span>
              </div>

              <button
                onClick={() => toggleVisibility(item)}
                className={`p-2 rounded-lg transition-colors ${
                  item.visible 
                    ? 'bg-green-500/20 text-green-500' 
                    : 'bg-red-500/20 text-red-500'
                }`}
              >
                {item.visible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>

              <button
                onClick={() => { setEditingItem(item); setShowForm(true); }}
                className="p-2 text-metal-gray hover:text-industrial-blue transition-colors"
              >
                <Edit2 className="w-5 h-5" />
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 text-metal-gray hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </Reorder.Item>
          ))}
        </Reorder.Group>

        {items.length === 0 && (
          <div className="text-center py-8 text-metal-gray">
            No hay elementos de navegación. Añade el primero.
          </div>
        )}
      </motion.div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <NavigationForm
            item={editingItem}
            onSave={handleSave}
            onCancel={() => { setShowForm(false); setEditingItem(null); }}
            saving={saving}
            nextOrder={items.length + 1}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function NavigationForm({
  item,
  onSave,
  onCancel,
  saving,
  nextOrder
}: {
  item: NavigationItem | null
  onSave: (data: Partial<NavigationItem>) => void
  onCancel: () => void
  saving: boolean
  nextOrder: number
}) {
  const [formData, setFormData] = useState({
    label: item?.label || '',
    href: item?.href || '',
    order_index: item?.order_index || nextOrder,
    visible: item?.visible ?? true,
    is_cta: item?.is_cta || false
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
            {item ? 'Editar Enlace' : 'Nuevo Enlace'}
          </h2>
          <button onClick={onCancel} className="p-2 hover:bg-graphite rounded-lg">
            <X className="w-5 h-5 text-metal-gray" />
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="space-y-4">
          <div>
            <label className="block text-sm text-metal-gray mb-2">Texto del Enlace</label>
            <input
              type="text"
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none"
              placeholder="Inicio"
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
              placeholder="#inicio"
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
                checked={formData.is_cta}
                onChange={(e) => setFormData({ ...formData, is_cta: e.target.checked })}
                className="w-5 h-5 rounded border-metal-gray/30 bg-graphite text-industrial-blue focus:ring-industrial-blue"
              />
              <span className="text-white">Es CTA (botón destacado)</span>
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
