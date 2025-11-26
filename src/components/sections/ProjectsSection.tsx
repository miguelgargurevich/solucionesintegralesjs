'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { projects } from '@/lib/data'
import { Dialog, DialogContent } from '@/components/ui/dialog'

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
  hidden: { opacity: 0, y: 80, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 100,
    },
  },
}

// Componente de tarjeta de proyecto con efectos magnéticos
function ProjectCard({ 
  project, 
  index, 
  onSelect 
}: { 
  project: typeof projects[0]
  index: number
  onSelect: (project: typeof projects[0]) => void 
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  // Determinar el tamaño de la tarjeta para efecto masonry
  const getCardSize = () => {
    const sizes = ['row-span-1', 'row-span-2', 'row-span-1']
    return sizes[index % 3]
  }

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`group relative cursor-pointer ${getCardSize()} ${project.featured ? 'md:col-span-2 md:row-span-2' : ''}`}
      onClick={() => onSelect(project)}
    >
      <div className="relative h-full min-h-[280px] md:min-h-[320px] rounded-2xl overflow-hidden bg-graphite-light dark:bg-graphite-light light:bg-gray-100 border border-metal-gray/10 dark:border-metal-gray/10 light:border-gray-200 transform-gpu transition-all duration-500 hover:border-industrial-blue/40">
        {/* Imagen con efecto grayscale -> color */}
        <div className="absolute inset-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Overlay gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/50 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-industrial-blue/20 mix-blend-overlay opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
        </div>

        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-2xl border-2 border-industrial-blue/50 shadow-glow-blue" />
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-industrial-blue/20 via-transparent to-safety-yellow/20 opacity-50" />
        </div>

        {/* Metallic shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          {/* Category badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="mb-3"
          >
            <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-safety-yellow bg-graphite/80 rounded-full border border-safety-yellow/30 backdrop-blur-sm">
              {project.category}
            </span>
          </motion.div>

          {/* Title - Blueprint style animation */}
          <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-2 relative">
            <span className="relative inline-block">
              {project.title}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-industrial-blue to-safety-yellow group-hover:w-full transition-all duration-500" />
            </span>
          </h3>

          {/* Client and year */}
          <div className="flex items-center gap-4 text-metal-gray text-sm opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-industrial-blue" />
              {project.client}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-safety-yellow" />
              {project.year}
            </span>
          </div>

          {/* View button */}
          <motion.div
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Maximize2 className="w-4 h-4 text-white" />
            </div>
          </motion.div>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-industrial-blue/30 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-safety-yellow/30 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  )
}

// Lightbox premium
function ProjectLightbox({ 
  project, 
  isOpen, 
  onClose,
  onPrev,
  onNext
}: { 
  project: typeof projects[0] | null
  isOpen: boolean
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  if (!project) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl p-0 bg-transparent border-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateX: 15 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          exit={{ opacity: 0, scale: 0.9, rotateX: -15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative bg-graphite-light rounded-2xl overflow-hidden border border-metal-gray/20"
        >
          {/* Image container */}
          <div className="relative aspect-video">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            {/* Industrial camera shutter effect overlay */}
            <motion.div
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute inset-0 bg-graphite origin-top"
            />
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-safety-yellow bg-graphite/80 rounded-full border border-safety-yellow/30 mb-3">
                  {project.category}
                </span>
                <h2 className="text-3xl font-display font-bold text-white">
                  {project.title}
                </h2>
              </div>
              <div className="text-right">
                <div className="text-industrial-blue font-bold">{project.client}</div>
                <div className="text-metal-gray text-sm">{project.year}</div>
              </div>
            </div>
            <p className="text-metal-gray leading-relaxed">{project.description}</p>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-graphite/80 backdrop-blur-md flex items-center justify-center border border-metal-gray/20 hover:border-industrial-blue/50 transition-colors group"
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:text-industrial-blue transition-colors" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-graphite/80 backdrop-blur-md flex items-center justify-center border border-metal-gray/20 hover:border-industrial-blue/50 transition-colors group"
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:text-industrial-blue transition-colors" />
          </button>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const parallaxY = useTransform(scrollYProgress, [0, 1], [100, -100])

  const handleSelectProject = (project: typeof projects[0]) => {
    setSelectedProject(project)
    setIsLightboxOpen(true)
  }

  const handlePrevProject = () => {
    if (!selectedProject) return
    const currentIndex = projects.findIndex(p => p.id === selectedProject.id)
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : projects.length - 1
    setSelectedProject(projects[prevIndex])
  }

  const handleNextProject = () => {
    if (!selectedProject) return
    const currentIndex = projects.findIndex(p => p.id === selectedProject.id)
    const nextIndex = currentIndex < projects.length - 1 ? currentIndex + 1 : 0
    setSelectedProject(projects[nextIndex])
  }

  return (
    <section ref={sectionRef} id="proyectos" className="relative py-24 md:py-32 bg-graphite dark:bg-graphite light:bg-white overflow-hidden">
      {/* Parallax background elements */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-industrial-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-safety-yellow/5 rounded-full blur-3xl" />
      </motion.div>

      {/* Blueprint background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="projects-blueprint" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#0056A6" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="2" fill="#0056A6" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#projects-blueprint)" />
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
              Portafolio
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white dark:text-white light:text-graphite mb-6">
            Proyectos{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-industrial-blue via-industrial-blue-light to-safety-yellow bg-clip-text text-transparent">
                Destacados
              </span>
              {/* Blueprint underline effect */}
              <svg className="absolute -bottom-2 left-0 w-full h-2" viewBox="0 0 200 8" preserveAspectRatio="none">
                <motion.path
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  d="M0 4 Q50 0 100 4 T200 4"
                  fill="none"
                  stroke="#0056A6"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-metal-gray dark:text-metal-gray light:text-gray-600 text-lg">
            Más de 200 proyectos completados para empresas líderes de la industria peruana. 
            Cada proyecto refleja nuestro compromiso con la excelencia.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[280px] gap-6"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onSelect={handleSelectProject}
            />
          ))}
        </motion.div>

        {/* View all projects button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 86, 166, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-transparent text-white dark:text-white light:text-graphite rounded-lg font-medium border-2 border-industrial-blue/50 hover:bg-industrial-blue/10 transition-colors"
          >
            <span>Ver Todos los Proyectos</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </motion.div>
      </div>

      {/* Lightbox */}
      <ProjectLightbox
        project={selectedProject}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onPrev={handlePrevProject}
        onNext={handleNextProject}
      />
    </section>
  )
}
