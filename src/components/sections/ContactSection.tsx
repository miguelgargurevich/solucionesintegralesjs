'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, MapPin, Phone, Mail, CheckCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { companyInfo, services } from '@/lib/data'

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

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
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

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    const formData = new FormData(e.target as HTMLFormElement)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      company: formData.get('company') as string,
      service: formData.get('service') as string,
      message: formData.get('message') as string,
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Error al enviar el mensaje')
      }

      // Limpiar formulario primero
      formRef.current?.reset()
      setIsSuccess(true)
      
      // Volver a mostrar el formulario después de 4 segundos
      setTimeout(() => {
        setIsSuccess(false)
      }, 4000)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar el mensaje')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contacto" className="relative py-24 md:py-32 bg-graphite overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-industrial-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-safety-yellow/5 rounded-full blur-3xl" />
      </div>

      {/* Industrial grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="contact-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0056A6" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-grid)" />
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
              Contacto
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Iniciemos su{' '}
            <span className="bg-gradient-to-r from-industrial-blue via-industrial-blue-light to-safety-yellow bg-clip-text text-transparent">
              Próximo Proyecto
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-metal-gray text-lg">
            Estamos listos para ayudarle. Contáctenos para una consulta gratuita 
            y descubra cómo podemos transformar su visión en realidad.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              variants={itemVariants}
              className="relative bg-graphite-light/50 backdrop-blur-xl rounded-2xl p-8 md:p-10 border border-metal-gray/10"
            >
              {/* Decorative corner */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-industrial-blue/30 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-safety-yellow/30 rounded-br-2xl" />

              <AnimatePresence mode="wait" initial={false}>
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                      className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6"
                    >
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">¡Mensaje Enviado!</h3>
                    <p className="text-metal-gray">Nos pondremos en contacto con usted pronto.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    ref={formRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label htmlFor="name" className="text-white">Nombre completo</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Juan Pérez"
                          required
                        />
                      </motion.div>
                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label htmlFor="email" className="text-white">Correo electrónico</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="juan@empresa.com"
                          required
                        />
                      </motion.div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label htmlFor="phone" className="text-white">Teléfono</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+51 999 999 999"
                        />
                      </motion.div>
                      <motion.div variants={itemVariants} className="space-y-2">
                        <Label htmlFor="company" className="text-white">Empresa</Label>
                        <Input
                          id="company"
                          name="company"
                          placeholder="Nombre de su empresa"
                        />
                      </motion.div>
                    </div>

                    <motion.div variants={itemVariants} className="space-y-2">
                      <Label htmlFor="service" className="text-white">Servicio de interés</Label>
                      <select
                        id="service"
                        name="service"
                        className="flex h-12 w-full rounded-lg border-2 border-metal-gray/30 bg-graphite-light/50 px-4 py-2 text-sm text-white ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-industrial-blue focus-visible:ring-offset-2 focus-visible:border-industrial-blue transition-all duration-300 backdrop-blur-sm appearance-none cursor-pointer"
                        required
                      >
                        <option value="" className="bg-graphite">Seleccione un servicio</option>
                        {services.map(service => (
                          <option key={service.id} value={service.id} className="bg-graphite">
                            {service.title}
                          </option>
                        ))}
                      </select>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-2">
                      <Label htmlFor="message" className="text-white">Mensaje</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Cuéntenos sobre su proyecto..."
                        rows={5}
                        required
                      />
                    </motion.div>

                    {/* Error message */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
                      >
                        ⚠️ {error}
                      </motion.div>
                    )}

                    <motion.div variants={itemVariants}>
                      <Button
                        type="submit"
                        variant="premium"
                        size="xl"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            Enviar Mensaje
                            <Send className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <motion.div variants={itemVariants} className="grid gap-4">
              {[
                { icon: MapPin, label: 'Dirección', value: companyInfo.address, color: 'industrial-blue' },
                { icon: Phone, label: 'Teléfono', value: companyInfo.phone, color: 'safety-yellow' },
                { icon: Mail, label: 'Email', value: companyInfo.email, color: 'industrial-blue' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 10, transition: { type: 'spring', stiffness: 300 } }}
                  className="group flex items-center gap-4 p-4 bg-graphite-light/30 backdrop-blur-sm rounded-xl border border-metal-gray/10 hover:border-industrial-blue/30 transition-colors"
                >
                  <div className={`w-12 h-12 rounded-lg bg-${item.color}/10 flex items-center justify-center group-hover:bg-${item.color}/20 transition-colors`}>
                    <item.icon className={`w-5 h-5 text-${item.color}`} />
                  </div>
                  <div>
                    <div className="text-metal-gray text-sm">{item.label}</div>
                    <div className="text-white font-medium">{item.value}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Stylized Map */}
            <motion.div
              variants={itemVariants}
              className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden border border-metal-gray/10"
            >
              {/* Map placeholder with industrial styling */}
              <div className="absolute inset-0 bg-graphite-light">
                {/* Industrial styled map background */}
                <div className="absolute inset-0 opacity-30">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0056A6" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#map-grid)" />
                  </svg>
                </div>

                {/* Fake map elements */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Animated rings */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-20 h-20 rounded-full border-2 border-industrial-blue"
                      />
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="w-32 h-32 rounded-full border border-industrial-blue/50" />
                    </motion.div>
                    
                    {/* Pin marker */}
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="relative z-10"
                    >
                      <div className="w-12 h-12 rounded-full bg-industrial-blue flex items-center justify-center shadow-glow-blue">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Location label */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-graphite/90 backdrop-blur-md rounded-lg p-4 border border-industrial-blue/20">
                    <div className="text-white font-bold mb-1">{companyInfo.name}</div>
                    <div className="text-metal-gray text-sm">{companyInfo.address}</div>
                  </div>
                </div>
              </div>

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-graphite/50 to-transparent pointer-events-none" />
            </motion.div>

            {/* Working hours */}
            <motion.div
              variants={itemVariants}
              className="p-6 bg-graphite-light/30 backdrop-blur-sm rounded-xl border border-metal-gray/10"
            >
              <h4 className="text-white font-bold mb-4">Horario de Atención</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-metal-gray">Lunes - Viernes</div>
                  <div className="text-white font-medium">8:00 AM - 6:00 PM</div>
                </div>
                <div>
                  <div className="text-metal-gray">Sábados</div>
                  <div className="text-white font-medium">9:00 AM - 1:00 PM</div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-metal-gray/10">
                <div className="flex items-center gap-2 text-safety-yellow">
                  <span className="w-2 h-2 rounded-full bg-safety-yellow animate-pulse" />
                  <span className="text-sm font-medium">Emergencias 24/7</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
