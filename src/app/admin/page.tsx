'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard,
  Palette,
  Menu,
  Home,
  Users,
  Settings,
  FolderKanban,
  Building2,
  Phone,
  FileText,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react'
import { CMSModule } from '@/types'
import { ToastProvider } from '@/components/ui/Toast'

// Importar módulos
import DashboardModule from './modules/DashboardModule'
import BrandingModule from './modules/BrandingModule'
import NavigationModule from './modules/NavigationModule'
import HeroModule from './modules/HeroModule'
import AboutModule from './modules/AboutModule'
import ServicesModule from './modules/ServicesModule'
import ProjectsModule from './modules/ProjectsModule'
import ClientsModule from './modules/ClientsModule'
import ContactModule from './modules/ContactModule'
import FooterModule from './modules/FooterModule'
import LoginForm from './components/LoginForm'

const modules: { id: CMSModule; label: string; icon: React.ElementType; description: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, description: 'Resumen general' },
  { id: 'branding', label: 'Branding', icon: Palette, description: 'Logo y marca' },
  { id: 'navigation', label: 'Navegación', icon: Menu, description: 'Menú principal' },
  { id: 'hero', label: 'Hero', icon: Home, description: 'Sección principal' },
  { id: 'about', label: 'Nosotros', icon: Users, description: 'Quiénes somos' },
  { id: 'services', label: 'Servicios', icon: Settings, description: 'Nuestros servicios' },
  { id: 'projects', label: 'Proyectos', icon: FolderKanban, description: 'Portafolio' },
  { id: 'clients', label: 'Clientes', icon: Building2, description: 'Logos de clientes' },
  { id: 'contact', label: 'Contacto', icon: Phone, description: 'Información de contacto' },
  { id: 'footer', label: 'Footer', icon: FileText, description: 'Pie de página' },
]

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeModule, setActiveModule] = useState<CMSModule>('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [logoError, setLogoError] = useState(false)

  // Verificar autenticación al cargar
  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (token) {
      verifyToken(token)
    } else {
      setLoading(false)
    }
  }, [])

  // Cargar logo desde settings de branding
  useEffect(() => {
    const loadLogo = () => {
      fetch('/api/admin/settings')
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data?.branding?.logo) {
            setLogoUrl(data.data.branding.logo)
            setLogoError(false)
          }
        })
        .catch(err => console.error('Error loading branding:', err))
    }
    
    loadLogo()
    
    // Escuchar eventos de actualización de branding
    const handleBrandingUpdate = (e: CustomEvent) => {
      if (e.detail?.logo) {
        setLogoUrl(e.detail.logo)
        setLogoError(false)
      }
    }
    
    window.addEventListener('brandingUpdated', handleBrandingUpdate as EventListener)
    
    return () => {
      window.removeEventListener('brandingUpdated', handleBrandingUpdate as EventListener)
    }
  }, []) // Solo cargar al inicio y escuchar eventos

  const verifyToken = async (token: string) => {
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      })
      const data = await res.json()
      setIsAuthenticated(data.valid)
    } catch {
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    setIsAuthenticated(false)
  }

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <DashboardModule onNavigate={setActiveModule} />
      case 'branding':
        return <BrandingModule />
      case 'navigation':
        return <NavigationModule />
      case 'hero':
        return <HeroModule />
      case 'about':
        return <AboutModule />
      case 'services':
        return <ServicesModule />
      case 'projects':
        return <ProjectsModule />
      case 'clients':
        return <ClientsModule />
      case 'contact':
        return <ContactModule />
      case 'footer':
        return <FooterModule />
      default:
        return <DashboardModule />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-graphite flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-industrial-blue border-t-transparent rounded-full animate-spin" />
          <p className="text-metal-gray">Cargando CMS...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={setIsAuthenticated} />
  }

  return (
    <ToastProvider>
    <div className="min-h-screen bg-graphite flex">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarCollapsed ? 80 : 280 }}
        className="bg-graphite-light border-r border-metal-gray/20 flex flex-col fixed left-0 top-0 bottom-0 z-50"
      >
        {/* Logo */}
        <div className="p-4 border-b border-metal-gray/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center shadow-lg flex-shrink-0">
              {logoUrl && !logoError ? (
                <img 
                  src={logoUrl} 
                  alt="Logo"
                  className="w-full h-full object-contain"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-industrial-blue to-industrial-blue-dark flex items-center justify-center">
                  <span className="text-white font-bold text-lg">SI</span>
                </div>
              )}
            </div>
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="overflow-hidden"
                >
                  <div className="text-white font-bold text-sm leading-tight">CMS</div>
                  <div className="text-industrial-blue text-xs">Soluciones Integrales</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {modules.map((module) => {
            const Icon = module.icon
            const isActive = activeModule === module.id
            
            return (
              <motion.button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-industrial-blue text-white shadow-glow-blue' 
                    : 'text-metal-gray hover:text-white hover:bg-graphite'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <AnimatePresence>
                  {!sidebarCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="flex-1 text-left overflow-hidden"
                    >
                      <div className="font-medium text-sm">{module.label}</div>
                      <div className={`text-xs truncate ${isActive ? 'text-white/70' : 'text-metal-gray/60'}`}>
                        {module.description}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-metal-gray/20 space-y-2">
          {/* Ver sitio */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-metal-gray hover:text-white hover:bg-graphite transition-all"
          >
            <ExternalLink className="w-5 h-5 flex-shrink-0" />
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm font-medium"
                >
                  Ver Sitio
                </motion.span>
              )}
            </AnimatePresence>
          </a>
          
          {/* Cerrar sesión */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-metal-gray hover:text-red-500 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm font-medium"
                >
                  Cerrar Sesión
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-12 bg-graphite-light border border-metal-gray/20 rounded-r-lg flex items-center justify-center text-metal-gray hover:text-white transition-colors"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </motion.aside>

      {/* Main Content */}
      <motion.main
        initial={false}
        animate={{ marginLeft: sidebarCollapsed ? 80 : 280 }}
        className="flex-1 min-h-screen"
      >
        {/* Header */}
        <header className="bg-graphite-light/50 backdrop-blur-xl border-b border-metal-gray/20 sticky top-0 z-40">
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">
                {modules.find(m => m.id === activeModule)?.label}
              </h1>
              <p className="text-sm text-metal-gray">
                {modules.find(m => m.id === activeModule)?.description}
              </p>
            </div>
          </div>
        </header>

        {/* Module Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderModule()}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.main>
    </div>
    </ToastProvider>
  )
}
