'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Building2, Users, Award, Clock, Play, Wrench, Cog, Shield } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 100,
    },
  },
}

const stats = [
  { icon: Building2, value: '200+', label: 'Proyectos Realizados' },
  { icon: Users, value: '50+', label: 'Clientes Satisfechos' },
  { icon: Award, value: '15+', label: 'Años de Experiencia' },
  { icon: Clock, value: '24/7', label: 'Soporte Técnico' },
]

export default function AboutSection() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section id="nosotros" className="relative py-24 md:py-32 bg-graphite dark:bg-graphite light:bg-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-industrial-blue/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-safety-yellow/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="about-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#D7D8DA" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Video Section */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
              {!isPlaying ? (
                <>
                  {/* Custom Video Thumbnail with Industrial Design */}
                  <div className="absolute inset-0 bg-gradient-to-br from-graphite via-graphite-light to-industrial-blue/30">
                    {/* Animated grid pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id="video-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0066CC" strokeWidth="0.5" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#video-grid)" />
                      </svg>
                    </div>
                    
                    {/* Decorative industrial elements */}
                    <div className="absolute top-6 left-6 w-16 h-16 border border-industrial-blue/30 rounded-lg flex items-center justify-center">
                      <Wrench className="w-8 h-8 text-industrial-blue/50" />
                    </div>
                    <div className="absolute top-6 right-6 w-16 h-16 border border-safety-yellow/30 rounded-lg flex items-center justify-center">
                      <Cog className="w-8 h-8 text-safety-yellow/50 animate-spin" style={{ animationDuration: '8s' }} />
                    </div>
                    <div className="absolute bottom-20 left-6 w-12 h-12 border border-metal-gray/30 rounded-lg flex items-center justify-center">
                      <Shield className="w-6 h-6 text-metal-gray/50" />
                    </div>
                    
                    {/* Glowing orbs */}
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-industrial-blue/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-safety-yellow/10 rounded-full blur-3xl" />
                    
                    {/* Center content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-4"
                      >
                        <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2 tracking-tight">
                          SOLUCIONES
                        </div>
                        <div className="text-2xl md:text-3xl font-display font-bold text-industrial-blue">
                          INTEGRALES JS
                        </div>
                        <div className="text-safety-yellow text-sm md:text-base font-medium mt-2 tracking-widest">
                          S.A.C.
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Bottom gradient */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-graphite to-transparent" />
                  </div>
                  
                  {/* Play Button */}
                  <motion.button
                    onClick={() => setIsPlaying(true)}
                    className="absolute inset-0 z-20 flex items-center justify-center group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative">
                      {/* Pulse animation */}
                      <div className="absolute inset-0 bg-industrial-blue/30 rounded-full animate-ping" />
                      <motion.div 
                        className="relative w-20 h-20 md:w-24 md:h-24 bg-industrial-blue rounded-full flex items-center justify-center shadow-2xl group-hover:bg-industrial-blue/90 transition-colors"
                        whileHover={{ boxShadow: '0 0 40px rgba(0, 102, 204, 0.5)' }}
                      >
                        <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
                      </motion.div>
                    </div>
                  </motion.button>
                  
                  {/* Video Label */}
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <div className="bg-graphite-light/90 backdrop-blur-xl rounded-xl px-4 py-3 border border-industrial-blue/20">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-safety-yellow/20 flex items-center justify-center">
                          <Play className="w-5 h-5 text-safety-yellow" />
                        </div>
                        <div>
                          <div className="text-white font-semibold text-sm">Carta de Presentación</div>
                          <div className="text-metal-gray text-xs">Ver video institucional • 2:30 min</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* YouTube Embed */
                <iframe
                  src="https://www.youtube.com/embed/Vt5_u4yPAhU?autoplay=1&rel=0"
                  title="SOLUCIONES INTEGRALES JS S.A.C. - Carta de Presentación"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              )}
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-industrial-blue/30 rounded-xl -z-10" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-safety-yellow/30 rounded-xl -z-10" />
          </motion.div>

          {/* Content Section */}
          <motion.div variants={itemVariants} className="lg:pl-8">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 bg-industrial-blue/10 rounded-full mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-industrial-blue" />
              <span className="text-industrial-blue text-sm font-medium uppercase tracking-wider">
                Quiénes Somos
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white dark:text-white light:text-graphite mb-6 leading-tight"
            >
              Ingeniería que{' '}
              <span className="bg-gradient-to-r from-industrial-blue to-safety-yellow bg-clip-text text-transparent">
                Transforma
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-metal-gray dark:text-metal-gray light:text-gray-600 text-lg leading-relaxed mb-8"
            >
              <span className="text-white dark:text-white light:text-graphite font-semibold">SOLUCIONES INTEGRALES JS S.A.C.</span> es una 
              empresa peruana con más de 15 años de experiencia brindando servicios especializados 
              de ingeniería industrial. Nos especializamos en el diseño, fabricación y montaje de 
              estructuras metálicas, sistemas de piping, obras civiles y mantenimiento industrial.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-metal-gray dark:text-metal-gray light:text-gray-600 leading-relaxed mb-10"
            >
              Nuestro compromiso es ofrecer soluciones integrales de alta calidad, cumpliendo con 
              los más altos estándares de seguridad y eficiencia. Contamos con un equipo altamente 
              calificado y la tecnología necesaria para enfrentar los proyectos más desafiantes.
            </motion.p>

            {/* Values */}
            <motion.div variants={containerVariants} className="grid grid-cols-2 gap-4 mb-10">
              {['Calidad Premium', 'Seguridad Total', 'Innovación Constante', 'Cumplimiento Garantizado'].map((value, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-center gap-3 text-white dark:text-white light:text-graphite"
                >
                  <div className="w-2 h-2 rounded-full bg-safety-yellow" />
                  <span className="text-sm md:text-base">{value}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="mt-20 pt-20 border-t border-metal-gray/10 dark:border-metal-gray/10 light:border-gray-200"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center group"
              >
                <div className="relative inline-flex items-center justify-center w-16 h-16 mb-4">
                  <div className="absolute inset-0 bg-industrial-blue/10 rounded-xl transform rotate-6 group-hover:rotate-12 transition-transform" />
                  <div className="absolute inset-0 bg-graphite-light dark:bg-graphite-light light:bg-white light:border light:border-gray-200 light:shadow-md rounded-xl" />
                  <stat.icon className="relative w-7 h-7 text-industrial-blue" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white dark:text-white light:text-graphite mb-2 font-display">
                  {stat.value}
                </div>
                <div className="text-metal-gray dark:text-metal-gray light:text-gray-600 text-sm uppercase tracking-wider">
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
