'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface Client {
  id: string
  name: string
  logo: string
  website?: string
  order_index: number
}

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

// Componente de logo de cliente con efectos
function ClientLogo({ client, index }: { client: Client, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.1, y: -5 }}
      className="group relative flex items-center justify-center px-8 py-6"
    >
      {/* Metallic glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-industrial-blue/0 via-industrial-blue/10 to-industrial-blue/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Shine effect */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>

      {/* Logo del cliente */}
      <div className="relative flex flex-col items-center gap-2">
        <div className="w-32 h-20 flex items-center justify-center bg-white dark:bg-white light:bg-white rounded-lg border border-metal-gray/10 dark:border-metal-gray/10 light:border-gray-200 group-hover:border-industrial-blue/30 transition-colors duration-300 p-3">
          {client.logo ? (
            <img 
              src={client.logo} 
              alt={client.name}
              className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          ) : (
            <span className="text-metal-gray-dark text-sm font-bold text-center">
              {client.name}
            </span>
          )}
        </div>
      </div>

      {/* Border glow */}
      <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-industrial-blue/30 transition-colors duration-300" />
    </motion.div>
  )
}

// Marquee infinito
function InfiniteMarquee({ clients, direction = 'left' }: { clients: Client[], direction?: 'left' | 'right' }) {
  const duplicatedClients = [...clients, ...clients, ...clients]

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex"
        animate={{
          x: direction === 'left' ? ['0%', '-33.33%'] : ['-33.33%', '0%'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {duplicatedClients.map((client, index) => (
          <ClientLogo key={`${client.id}-${index}`} client={client} index={index % clients.length} />
        ))}
      </motion.div>
    </div>
  )
}

export default function ClientsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [clients, setClients] = useState<Client[]>([])
  
  // Cargar clientes desde la API
  useEffect(() => {
    fetch('/api/clients')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setClients(data.clients || [])
        }
      })
      .catch(err => console.error('Error loading clients:', err))
  }, [])
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const parallaxY = useTransform(scrollYProgress, [0, 1], [50, -50])
  
  // No mostrar sección si no hay clientes
  if (clients.length === 0) return null

  return (
    <section ref={sectionRef} id="clientes" className="relative py-24 md:py-32 bg-graphite-dark dark:bg-graphite-dark light:bg-gray-50 overflow-hidden">
      {/* Background decorations */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-industrial-blue/3 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-safety-yellow/3 rounded-full blur-3xl" />
      </motion.div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="clients-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#D7D8DA" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#clients-grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-industrial-blue/10 rounded-full mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-industrial-blue animate-pulse" />
            <span className="text-industrial-blue text-sm font-medium uppercase tracking-wider">
              Clientes
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white dark:text-white light:text-graphite mb-6">
            Empresas que{' '}
            <span className="bg-gradient-to-r from-industrial-blue via-industrial-blue-light to-safety-yellow bg-clip-text text-transparent">
              Confían
            </span>
            {' '}en Nosotros
          </h2>
          <p className="max-w-2xl mx-auto text-metal-gray dark:text-metal-gray light:text-gray-600 text-lg">
            Trabajamos con las empresas líderes de la industria peruana, 
            brindando soluciones de ingeniería de primer nivel.
          </p>
        </motion.div>

        {/* Marquee container */}
        <div className="relative">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-graphite-dark dark:from-graphite-dark light:from-gray-50 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-graphite-dark dark:from-graphite-dark light:from-gray-50 to-transparent z-10" />
          
          {/* First marquee row */}
          <div className="mb-8">
            <InfiniteMarquee clients={clients} direction="left" />
          </div>
          
          {/* Second marquee row - opposite direction */}
          <div>
            <InfiniteMarquee clients={clients} direction="right" />
          </div>
        </div>

        {/* Trust indicators */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-20 pt-12 border-t border-metal-gray/10 dark:border-metal-gray/10 light:border-gray-200"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50+', label: 'Clientes Activos' },
              { value: '100%', label: 'Satisfacción' },
              { value: '15+', label: 'Sectores Industriales' },
              { value: '100%', label: 'Proyectos Entregados' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-white dark:text-white light:text-graphite mb-2 font-display">
                  {stat.value}
                </div>
                <div className="text-metal-gray dark:text-metal-gray light:text-gray-500 text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
