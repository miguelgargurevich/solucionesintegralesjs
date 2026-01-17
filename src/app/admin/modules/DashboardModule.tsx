'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FolderKanban, 
  Settings, 
  Building2, 
  Eye,
  TrendingUp,
  Clock,
  Activity
} from 'lucide-react'

interface Stats {
  projects: number
  services: number
  clients: number
  published: number
}

export default function DashboardModule() {
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    services: 0,
    clients: 0,
    published: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      
      // Fetch projects
      const projectsRes = await fetch('/api/admin/projects', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const projectsData = await projectsRes.json()
      
      // Fetch services
      const servicesRes = await fetch('/api/admin/services', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const servicesData = await servicesRes.json()
      
      // Fetch clients  
      const clientsRes = await fetch('/api/admin/clients', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const clientsData = await clientsRes.json()

      const projects = projectsData.projects || []
      const services = servicesData.data || []
      const clients = clientsData.data || []

      setStats({
        projects: projects.length,
        services: services.length,
        clients: clients.length,
        published: projects.filter((p: { published: boolean }) => p.published).length
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    { 
      label: 'Proyectos', 
      value: stats.projects, 
      icon: FolderKanban, 
      color: 'industrial-blue',
      gradient: 'from-industrial-blue to-industrial-blue-light'
    },
    { 
      label: 'Servicios', 
      value: stats.services, 
      icon: Settings, 
      color: 'safety-yellow',
      gradient: 'from-safety-yellow to-safety-yellow-light'
    },
    { 
      label: 'Clientes', 
      value: stats.clients, 
      icon: Building2, 
      color: 'green-500',
      gradient: 'from-green-500 to-green-400'
    },
    { 
      label: 'Publicados', 
      value: stats.published, 
      icon: Eye, 
      color: 'purple-500',
      gradient: 'from-purple-500 to-purple-400'
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-industrial-blue border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-industrial-blue/20 via-industrial-blue/10 to-transparent rounded-2xl p-6 border border-industrial-blue/20"
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Bienvenido al CMS
            </h2>
            <p className="text-metal-gray">
              Gestiona todo el contenido de tu sitio web desde aquí. Usa el menú lateral para navegar entre las diferentes secciones.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-industrial-blue/20 rounded-lg">
            <Activity className="w-5 h-5 text-industrial-blue" />
            <span className="text-sm text-industrial-blue font-medium">Sistema activo</span>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-graphite-light rounded-xl p-6 border border-metal-gray/20 hover:border-metal-gray/40 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-metal-gray">{stat.label}</div>
            </motion.div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-graphite-light rounded-2xl p-6 border border-metal-gray/20"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-industrial-blue" />
          Acciones Rápidas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickActionCard
            title="Nuevo Proyecto"
            description="Añade un nuevo proyecto al portafolio"
            icon={FolderKanban}
            color="industrial-blue"
          />
          <QuickActionCard
            title="Editar Servicios"
            description="Modifica la lista de servicios"
            icon={Settings}
            color="safety-yellow"
          />
          <QuickActionCard
            title="Gestionar Clientes"
            description="Actualiza logos de clientes"
            icon={Building2}
            color="green-500"
          />
        </div>
      </motion.div>

      {/* System Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-graphite-light/50 rounded-xl p-4 border border-metal-gray/10"
      >
        <div className="flex items-center justify-between text-sm text-metal-gray">
          <span>CMS Soluciones Integrales JS v1.0</span>
          <span>Última actualización: {new Date().toLocaleDateString('es-PE')}</span>
        </div>
      </motion.div>
    </div>
  )
}

function QuickActionCard({ 
  title, 
  description, 
  icon: Icon, 
  color 
}: { 
  title: string
  description: string
  icon: React.ElementType
  color: string
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="w-full p-4 bg-graphite rounded-xl border border-metal-gray/20 hover:border-metal-gray/40 transition-all text-left group"
    >
      <div className={`w-10 h-10 rounded-lg bg-${color}/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
        <Icon className={`w-5 h-5 text-${color}`} />
      </div>
      <div className="font-medium text-white mb-1">{title}</div>
      <div className="text-sm text-metal-gray">{description}</div>
    </motion.button>
  )
}
