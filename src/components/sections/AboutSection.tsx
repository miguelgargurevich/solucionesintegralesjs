'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Building2, Users, Award, Clock } from 'lucide-react'

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
  return (
    <section id="nosotros" className="relative py-24 md:py-32 bg-graphite overflow-hidden">
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
          {/* Image Section */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              {/* Image with duotone effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-industrial-blue/80 to-graphite/90 mix-blend-color z-10" />
              <Image
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop"
                alt="Industrial facility"
                fill
                className="object-cover"
              />
              
              {/* Glass card overlay */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute bottom-6 left-6 right-6 z-20"
              >
                <div className="bg-graphite-light/80 backdrop-blur-xl rounded-xl p-6 border border-metal-gray/20 shadow-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg bg-industrial-blue/20 flex items-center justify-center">
                      <Award className="w-7 h-7 text-industrial-blue" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">ISO 9001:2015</div>
                      <div className="text-metal-gray text-sm">Certificación de Calidad</div>
                    </div>
                  </div>
                </div>
              </motion.div>
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
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight"
            >
              Ingeniería que{' '}
              <span className="bg-gradient-to-r from-industrial-blue to-safety-yellow bg-clip-text text-transparent">
                Transforma
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-metal-gray text-lg leading-relaxed mb-8"
            >
              <span className="text-white font-semibold">SOLUCIONES INTEGRALES JS S.A.C.</span> es una 
              empresa peruana con más de 15 años de experiencia brindando servicios especializados 
              de ingeniería industrial. Nos especializamos en el diseño, fabricación y montaje de 
              estructuras metálicas, sistemas de piping, obras civiles y mantenimiento industrial.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-metal-gray leading-relaxed mb-10"
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
                  className="flex items-center gap-3 text-white"
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
          className="mt-20 pt-20 border-t border-metal-gray/10"
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
                  <div className="absolute inset-0 bg-graphite-light rounded-xl" />
                  <stat.icon className="relative w-7 h-7 text-industrial-blue" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 font-display">
                  {stat.value}
                </div>
                <div className="text-metal-gray text-sm uppercase tracking-wider">
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
