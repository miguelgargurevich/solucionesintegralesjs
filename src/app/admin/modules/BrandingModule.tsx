'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, Upload, Loader2, Check } from 'lucide-react'

interface BrandingData {
  companyName: string
  tagline: string
  logo: string
  favicon: string
}

interface ColorsData {
  primary: string
  primaryLight: string
  primaryDark: string
  secondary: string
  secondaryLight: string
  secondaryDark: string
  accent: string
  background: string
  backgroundLight: string
  textPrimary: string
  textSecondary: string
}

export default function BrandingModule() {
  const [branding, setBranding] = useState<BrandingData>({
    companyName: '',
    tagline: '',
    logo: '',
    favicon: ''
  })
  const [colors, setColors] = useState<ColorsData>({
    primary: '#0056A6',
    primaryLight: '#0066CC',
    primaryDark: '#004080',
    secondary: '#FFB800',
    secondaryLight: '#FFC933',
    secondaryDark: '#CC9300',
    accent: '#FF6B35',
    background: '#1A1D23',
    backgroundLight: '#22252C',
    textPrimary: '#FFFFFF',
    textSecondary: '#D7D8DA'
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
        if (data.data.branding) {
          setBranding(data.data.branding)
        }
        if (data.data.colors) {
          setColors(data.data.colors)
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

      // Guardar colores
      await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ key: 'colors', value: colors })
      })

      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (error) {
      console.error('Error saving:', error)
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-metal-gray mb-2">URL del Logo</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={branding.logo}
                  onChange={(e) => setBranding({ ...branding, logo: e.target.value })}
                  className="flex-1 px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none"
                  placeholder="/logo.svg"
                />
                <button className="px-4 py-3 bg-industrial-blue/20 text-industrial-blue rounded-lg hover:bg-industrial-blue/30 transition-colors">
                  <Upload className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm text-metal-gray mb-2">URL del Favicon</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={branding.favicon}
                  onChange={(e) => setBranding({ ...branding, favicon: e.target.value })}
                  className="flex-1 px-4 py-3 bg-graphite border border-metal-gray/30 rounded-lg text-white focus:border-industrial-blue focus:outline-none"
                  placeholder="/favicon.ico"
                />
                <button className="px-4 py-3 bg-industrial-blue/20 text-industrial-blue rounded-lg hover:bg-industrial-blue/30 transition-colors">
                  <Upload className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Colores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-graphite-light rounded-2xl p-6 border border-metal-gray/20"
      >
        <h3 className="text-lg font-bold text-white mb-6">Paleta de Colores</h3>
        
        <div className="space-y-6">
          {/* Colores Primarios */}
          <div>
            <h4 className="text-sm font-medium text-metal-gray mb-3">Colores Primarios</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ColorInput 
                label="Primary" 
                value={colors.primary} 
                onChange={(v) => setColors({ ...colors, primary: v })} 
              />
              <ColorInput 
                label="Primary Light" 
                value={colors.primaryLight} 
                onChange={(v) => setColors({ ...colors, primaryLight: v })} 
              />
              <ColorInput 
                label="Primary Dark" 
                value={colors.primaryDark} 
                onChange={(v) => setColors({ ...colors, primaryDark: v })} 
              />
            </div>
          </div>

          {/* Colores Secundarios */}
          <div>
            <h4 className="text-sm font-medium text-metal-gray mb-3">Colores Secundarios</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ColorInput 
                label="Secondary" 
                value={colors.secondary} 
                onChange={(v) => setColors({ ...colors, secondary: v })} 
              />
              <ColorInput 
                label="Secondary Light" 
                value={colors.secondaryLight} 
                onChange={(v) => setColors({ ...colors, secondaryLight: v })} 
              />
              <ColorInput 
                label="Secondary Dark" 
                value={colors.secondaryDark} 
                onChange={(v) => setColors({ ...colors, secondaryDark: v })} 
              />
            </div>
          </div>

          {/* Otros */}
          <div>
            <h4 className="text-sm font-medium text-metal-gray mb-3">Fondos y Textos</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ColorInput 
                label="Background" 
                value={colors.background} 
                onChange={(v) => setColors({ ...colors, background: v })} 
              />
              <ColorInput 
                label="Background Light" 
                value={colors.backgroundLight} 
                onChange={(v) => setColors({ ...colors, backgroundLight: v })} 
              />
              <ColorInput 
                label="Accent" 
                value={colors.accent} 
                onChange={(v) => setColors({ ...colors, accent: v })} 
              />
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="mt-6 p-4 bg-graphite rounded-xl">
          <h4 className="text-sm font-medium text-metal-gray mb-3">Vista Previa</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(colors).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-lg shadow-md border border-white/10" 
                  style={{ backgroundColor: value }}
                />
                <span className="text-xs text-metal-gray">{key}</span>
              </div>
            ))}
          </div>
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

function ColorInput({ 
  label, 
  value, 
  onChange 
}: { 
  label: string
  value: string
  onChange: (value: string) => void 
}) {
  return (
    <div className="flex items-center gap-3 p-3 bg-graphite rounded-lg border border-metal-gray/20">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent"
      />
      <div className="flex-1">
        <div className="text-sm text-white font-medium">{label}</div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full text-xs text-metal-gray bg-transparent border-0 focus:outline-none uppercase"
        />
      </div>
    </div>
  )
}
