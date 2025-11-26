'use client'

import { motion } from 'framer-motion'
import { 
  Building2, 
  Cylinder, 
  AlertTriangle, 
  HardHat, 
  Cog, 
  Container, 
  Wrench, 
  Compass 
} from 'lucide-react'
import { services } from '@/lib/data'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 100,
    },
  },
}

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  'building': Building2,
  'pipe': Cylinder,
  'alert-triangle': AlertTriangle,
  'hard-hat': HardHat,
  'cog': Cog,
  'cylinder': Container,
  'wrench': Wrench,
  'drafting-compass': Compass,
}

function ServiceCard({ service, index }: { service: typeof services[0], index: number }) {
  const IconComponent = iconMap[service.icon] || Building2

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ 
        y: -10, 
        rotateY: 5,
        rotateX: 5,
        transition: { type: 'spring', stiffness: 300, damping: 20 }
      }}
      className="group perspective-1000"
    >
      <div className="relative h-full bg-gradient-to-br from-graphite-light/80 to-graphite/90 dark:from-graphite-light/80 dark:to-graphite/90 light:from-white light:to-gray-50 rounded-2xl p-6 md:p-8 border border-metal-gray/10 dark:border-metal-gray/10 light:border-gray-200 backdrop-blur-xl overflow-hidden transform-gpu transition-all duration-500 hover:border-industrial-blue/30 hover:shadow-glow-blue">
        {/* Metallic shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-shimmer" />
        </div>

        {/* Background glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-industrial-blue/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Icon container with 3D effect */}
        <motion.div
          whileHover={{ rotateY: 15, scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="relative w-16 h-16 mb-6"
        >
          <div className="absolute inset-0 bg-industrial-blue/20 rounded-xl transform rotate-6 group-hover:rotate-12 transition-transform duration-300" />
          <div className="absolute inset-0 bg-gradient-to-br from-industrial-blue to-industrial-blue-dark rounded-xl flex items-center justify-center shadow-lg">
            <IconComponent className="w-8 h-8 text-white" />
          </div>
          {/* 3D light effect */}
          <div className="absolute -inset-1 bg-industrial-blue/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>

        {/* Content */}
        <h3 className="text-xl md:text-2xl font-display font-bold text-white dark:text-white light:text-graphite mb-4 group-hover:text-industrial-blue-light transition-colors">
          {service.title}
        </h3>
        <p className="text-metal-gray dark:text-metal-gray light:text-gray-600 text-sm md:text-base leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Features list */}
        <ul className="space-y-2">
          {service.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2 text-sm text-metal-gray-dark dark:text-metal-gray-dark light:text-gray-500">
              <span className="w-1.5 h-1.5 rounded-full bg-safety-yellow/70" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-industrial-blue to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Corner accents */}
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-metal-gray/10 rounded-tr-lg group-hover:border-industrial-blue/30 transition-colors" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-metal-gray/10 rounded-bl-lg group-hover:border-safety-yellow/30 transition-colors" />
      </div>
    </motion.div>
  )
}

export default function ServicesSection() {
  return (
    <section id="servicios" className="relative py-24 md:py-32 bg-graphite-dark dark:bg-graphite-dark light:bg-gray-50 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-industrial-blue/3 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-safety-yellow/3 rounded-full blur-3xl" />
      </div>

      {/* Blueprint grid background */}
      <div className="absolute inset-0 opacity-[0.015]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="services-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0056A6" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#services-grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-industrial-blue/10 rounded-full mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-industrial-blue animate-pulse" />
            <span className="text-industrial-blue text-sm font-medium uppercase tracking-wider">
              Nuestros Servicios
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white dark:text-white light:text-graphite mb-6">
            Soluciones{' '}
            <span className="bg-gradient-to-r from-industrial-blue via-industrial-blue-light to-safety-yellow bg-clip-text text-transparent">
              Industriales
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-metal-gray dark:text-metal-gray light:text-gray-600 text-lg">
            Ofrecemos una amplia gama de servicios de ingeniería y construcción industrial, 
            adaptados a las necesidades específicas de cada proyecto.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-metal-gray dark:text-metal-gray light:text-gray-600 mb-6">
            ¿Necesitas un servicio personalizado? Contáctanos para una consulta gratuita.
          </p>
          <motion.a
            href="#contacto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-industrial-blue to-industrial-blue-dark text-white rounded-lg font-medium shadow-glow-blue hover:shadow-lg transition-shadow"
          >
            Solicitar Cotización
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
