'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, Loader2, Check, MapPin, Phone, Mail, Globe } from 'lucide-react'

interface ContactData {
  phone: string
  email: string
  address: string
  ruc: string
  coordinates: {
    lat: number
    lng: number
  }
}

interface SocialMediaData {
  linkedin: string
  facebook: string
  instagram: string
  youtube: string
  whatsapp: string
}

export default function ContactModule() {
  const [contact, setContact] = useState<ContactData>({
    phone: '',
    email: '',
    address: '',
    ruc: '',
    coordinates: { lat: -12.1328, lng: -76.9908 }
  })
  const [social, setSocial] = useState<SocialMediaData>({
    linkedin: '',
    facebook: '',
    instagram: '',
    youtube: '',
    whatsapp: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings')
      const data = await res.json()
      
      if (data.success && data.data) {
        if (data.data.contact) {
          setContact(data.data.contact)
        }
        if (data.data.social_media) {
          setSocial(data.data.social_media)
        }
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    const token = localStorage.getItem('admin_token')

    try {
      // Guardar contact
      await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ key: 'contact', value: contact })
      })

      // Guardar social media
      await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ key: 'social_media', value: social })
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

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Información de Contacto */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-graphite-light rounded-2xl p-6 border border-metal-gray/20"
      >
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Phone className="w-5 h-5 text-industrial-blue" />
          Información de Contacto
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-metal-gray mb-2">Teléfono</label>
            <input
              type="text"
              value={contact.phone}
              onChange={(e) => setContact({ ...contact, phone: e.target.value })}
              className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none"
              placeholder="+51 953 951 268"
            />
          </div>
          <div>
            <label className="block text-sm text-metal-gray mb-2">Email</label>
            <input
              type="email"
              value={contact.email}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
              className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none"
              placeholder="contacto@empresa.com"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-metal-gray mb-2">Dirección</label>
            <input
              type="text"
              value={contact.address}
              onChange={(e) => setContact({ ...contact, address: e.target.value })}
              className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none"
              placeholder="Av. Las Gaviotas 2121, Santiago de Surco, Lima, Perú"
            />
          </div>
          <div>
            <label className="block text-sm text-metal-gray mb-2">RUC</label>
            <input
              type="text"
              value={contact.ruc}
              onChange={(e) => setContact({ ...contact, ruc: e.target.value })}
              className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none"
              placeholder="20123456789"
            />
          </div>
        </div>
      </motion.div>

      {/* Coordenadas del Mapa */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-graphite-light rounded-2xl p-6 border border-metal-gray/20"
      >
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-industrial-blue" />
          Ubicación en el Mapa
        </h3>
        
        {/* Vista Previa del Mapa */}
        <div className="relative h-[250px] rounded-xl overflow-hidden border border-metal-gray/30 mb-4">
          <iframe
            src={`https://www.google.com/maps?q=${contact.coordinates.lat},${contact.coordinates.lng}&z=15&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Vista previa del mapa"
            className="absolute inset-0"
          />
          {/* Overlay con información */}
          <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
            <div className="bg-graphite/90 backdrop-blur-md rounded-lg p-3 border border-industrial-blue/20">
              <div className="text-white font-medium text-sm">{contact.address || 'Sin dirección'}</div>
              <div className="text-metal-gray text-xs mt-1">
                Lat: {contact.coordinates.lat}, Lng: {contact.coordinates.lng}
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-metal-gray mb-2">Latitud</label>
            <input
              type="number"
              step="any"
              value={contact.coordinates.lat}
              onChange={(e) => setContact({ 
                ...contact, 
                coordinates: { ...contact.coordinates, lat: parseFloat(e.target.value) || 0 }
              })}
              className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none"
              placeholder="-12.1328"
            />
          </div>
          <div>
            <label className="block text-sm text-metal-gray mb-2">Longitud</label>
            <input
              type="number"
              step="any"
              value={contact.coordinates.lng}
              onChange={(e) => setContact({ 
                ...contact, 
                coordinates: { ...contact.coordinates, lng: parseFloat(e.target.value) || 0 }
              })}
              className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none"
              placeholder="-76.9908"
            />
          </div>
        </div>
        <p className="text-xs text-metal-gray mt-3 flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-industrial-blue/20 text-industrial-blue text-[10px]">?</span>
          Obtén las coordenadas desde Google Maps haciendo clic derecho en la ubicación y seleccionando &quot;¿Qué hay aquí?&quot;
        </p>
      </motion.div>

      {/* Redes Sociales */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-graphite-light rounded-2xl p-6 border border-metal-gray/20"
      >
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Globe className="w-5 h-5 text-industrial-blue" />
          Redes Sociales
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-metal-gray mb-2">LinkedIn</label>
            <input
              type="url"
              value={social.linkedin}
              onChange={(e) => setSocial({ ...social, linkedin: e.target.value })}
              className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none"
              placeholder="https://linkedin.com/company/..."
            />
          </div>
          <div>
            <label className="block text-sm text-metal-gray mb-2">Facebook</label>
            <input
              type="url"
              value={social.facebook}
              onChange={(e) => setSocial({ ...social, facebook: e.target.value })}
              className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none"
              placeholder="https://facebook.com/..."
            />
          </div>
          <div>
            <label className="block text-sm text-metal-gray mb-2">Instagram</label>
            <input
              type="url"
              value={social.instagram}
              onChange={(e) => setSocial({ ...social, instagram: e.target.value })}
              className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none"
              placeholder="https://instagram.com/..."
            />
          </div>
          <div>
            <label className="block text-sm text-metal-gray mb-2">YouTube</label>
            <input
              type="url"
              value={social.youtube}
              onChange={(e) => setSocial({ ...social, youtube: e.target.value })}
              className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none"
              placeholder="https://youtube.com/..."
            />
          </div>
          <div>
            <label className="block text-sm text-metal-gray mb-2">WhatsApp (número con código de país)</label>
            <input
              type="text"
              value={social.whatsapp}
              onChange={(e) => setSocial({ ...social, whatsapp: e.target.value })}
              className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none"
              placeholder="+51953951268"
            />
          </div>
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
