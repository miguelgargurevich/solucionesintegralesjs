'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { ChevronDown, ArrowRight } from 'lucide-react'

// Importar Scene3D dinámicamente para evitar problemas de SSR
const Scene3D = dynamic(() => import('@/components/3d/Scene3D'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-industrial flex items-center justify-center">
      <div className="animate-pulse text-industrial-blue text-2xl font-bold">
        Cargando experiencia 3D...
      </div>
    </div>
  ),
})

const titleVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const letterVariants = {
  hidden: { opacity: 0, y: 100, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
}

const AnimatedText = ({ text, className }: { text: string; className?: string }) => {
  return (
    <motion.span
      className={className}
      variants={titleVariants}
      initial="hidden"
      animate="visible"
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          className="inline-block"
          style={{ transformOrigin: 'bottom' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-graphite"
      id="inicio"
    >
      {/* Escena 3D de fondo */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <Scene3D />
      </motion.div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-graphite/40 via-transparent to-graphite z-10" />
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] z-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-safety-yellow bg-graphite-light/50 rounded-full border border-safety-yellow/30 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-safety-yellow animate-pulse" />
            Ingeniería Industrial de Excelencia
          </span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 tracking-tight">
          <AnimatedText text="SOLUCIONES" className="block" />
          <span className="block mt-2 md:mt-4">
            <AnimatedText 
              text="INTEGRALES" 
              className="text-industrial-blue"
            />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="max-w-2xl text-lg md:text-xl text-metal-gray mb-12 leading-relaxed"
        >
          Transformamos visiones en estructuras reales. Especialistas en 
          <span className="text-white font-medium"> ingeniería estructural</span>,
          <span className="text-white font-medium"> piping industrial</span> y
          <span className="text-white font-medium"> montaje de equipos</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button variant="premium" size="xl" className="group">
            Solicitar Proyecto
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="outline" size="xl" className="border-metal-gray/30 text-white hover:bg-white/10">
            Ver Proyectos
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="absolute bottom-32 left-0 right-0 flex justify-center gap-8 md:gap-16"
        >
          {[
            { number: '15+', label: 'Años de Experiencia' },
            { number: '200+', label: 'Proyectos Completados' },
            { number: '50+', label: 'Clientes Satisfechos' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                {stat.number}
              </div>
              <div className="text-xs md:text-sm text-metal-gray uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-metal-gray cursor-pointer hover:text-white transition-colors"
          >
            <span className="text-xs uppercase tracking-widest">Explorar</span>
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Grid lines decoration */}
      <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
        <svg className="absolute w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#0056A6" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </section>
  )
}
