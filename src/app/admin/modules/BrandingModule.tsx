'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Save, Upload, Loader2, Check } from 'lucide-react'
import { useToast } from '@/components/ui/Toast'

interface BrandingData {
  companyName: string
  tagline: string
  logo: string
  favicon: string
}

// Componente de vista previa que se actualiza correctamente
function LogoPreview({ url, label, small = false }: { url: string; label: string; small?: boolean }) {
  const [hasError, setHasError] = useState(false)
  const [imageKey, setImageKey] = useState(0)
  
  // Cuando cambia la URL, resetear el estado de error y forzar recarga
  useEffect(() => {
    setHasError(false)
    setImageKey(prev => prev + 1)
  }, [url])
  
  const containerHeight = small ? 'h-12' : 'h-20'
  const iconSize = small ? 'w-8 h-8' : 'w-full h-full'
  const textSize = small ? 'text-xs' : 'text-2xl'
  
  return (
    <div className="p-3 bg-graphite rounded-lg border border-metal-gray/20">
      <p className="text-xs text-metal-gray mb-2">Vista previa:</p>
      <div className={`bg-white rounded p-3 flex items-center justify-center ${containerHeight}`}>
        {url && !hasError ? (
          <img 
            key={imageKey}
            src={url}
            alt={`${label} preview`}
            className="max-h-full max-w-full object-contain"
            onError={() => setHasError(true)}
          />
        ) : (
          <div className={`flex items-center justify-center ${iconSize} bg-gradient-to-br from-industrial-blue to-industrial-blue-light rounded`}>
            <span className={`text-white font-bold ${textSize}`}>SI</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default function BrandingModule() {
  const [branding, setBranding] = useState<BrandingData>({
    companyName: '',
    tagline: '',
    logo: '',
    favicon: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const logoInputRef = useRef<HTMLInputElement>(null)
  const { showToast } = useToast()

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings')
      const data = await res.json()
      
      if (data.success && data.data) {
        if (data.data.branding) {
          setBranding(data.data.branding)
        }
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    const token = localStorage.getItem('admin_token')

    try {
      // Guardar branding
      await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ key: 'branding', value: branding })
      })

      setSaved(true)
      showToast('success', 'Cambios guardados')
      setTimeout(() => setSaved(false), 2000)
    } catch (error) {
      console.error('Error saving:', error)
      showToast('error', 'Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'logo' | 'favicon',
    setUploading: (v: boolean) => void
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar tamaño antes de subir (5MB máximo)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      showToast('error', 'Archivo muy grande', `Máximo 5MB. Tamaño: ${(file.size / 1024 / 1024).toFixed(2)}MB`)
      e.target.value = '' // Limpiar input
      return
    }

    // Validar tipo de archivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      showToast('error', 'Tipo no permitido', 'Usa: JPG, PNG, SVG, WEBP o GIF')
      e.target.value = '' // Limpiar input
      return
    }

    console.log(`Subiendo ${field}:`, file.name, `Tamaño: ${(file.size / 1024).toFixed(2)}KB`)
    setUploading(true)
    
    try {
      const token = localStorage.getItem('admin_token')
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'branding')

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      })

      const data = await res.json()
      console.log('Upload response:', data)
      
      if (data.success && data.url) {
        setBranding(prev => ({ ...prev, [field]: data.url }))
        showToast('success', `${field === 'logo' ? 'Logo' : 'Favicon'} subido`, 'La imagen se actualizó correctamente')
      } else {
        showToast('error', 'Error al subir', data.error || 'No se pudo subir la imagen')
      }
    } catch (error) {
      console.error('Upload error:', error)
      showToast('error', 'Error de conexión', 'Revisa la consola para más detalles')
    } finally {
      setUploading(false)
      e.target.value = '' // Limpiar input para permitir re-upload del mismo archivo
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
      {/* Información de la Marca */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-graphite-light rounded-2xl p-6 border border-metal-gray/20"
      >
        <h3 className="text-lg font-bold text-white mb-6">Información de la Marca</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-metal-gray mb-2">Nombre de la Empresa</label>
            <input
              type="text"
              value={branding.companyName}
              onChange={(e) => setBranding({ ...branding, companyName: e.target.value })}
              className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none"
              placeholder="SOLUCIONES INTEGRALES JS S.A.C."
            />
          </div>

          <div>
            <label className="block text-sm text-metal-gray mb-2">Tagline / Eslogan</label>
            <input
              type="text"
              value={branding.tagline}
              onChange={(e) => setBranding({ ...branding, tagline: e.target.value })}
              className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none"
              placeholder="Ingeniería Industrial de Excelencia"
            />
          </div>

          <div>
            <label className="block text-sm text-metal-gray mb-2">Logo de la Empresa</label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={branding.logo}
                  onChange={(e) => setBranding({ ...branding, logo: e.target.value })}
                  className="flex-1 px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none text-sm"
                  placeholder="URL del logo"
                />
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/svg+xml,image/webp,image/gif"
                  onChange={(e) => handleFileUpload(e, 'logo', setUploadingLogo)}
                  className="hidden"
                />
                <button 
                  type="button"
                  onClick={() => logoInputRef.current?.click()}
                  disabled={uploadingLogo}
                  className="px-4 py-3 bg-industrial-blue/20 text-industrial-blue rounded-lg hover:bg-industrial-blue/30 transition-colors disabled:opacity-50 flex items-center gap-2"
                  title="Subir logo (máx 5MB)"
                >
                  {uploadingLogo ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span className="text-xs">Subiendo...</span>
                    </>
                  ) : (
                    <Upload className="w-5 h-5" />
                  )}
                </button>
              </div>
              <LogoPreview url={branding.logo} label="Logo" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Botón Guardar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
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
