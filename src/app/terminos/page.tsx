'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, FileText, Shield, Scale, AlertCircle } from 'lucide-react'

export default function TerminosPage() {
  const sections = [
    {
      icon: FileText,
      title: '1. Aceptación de los Términos',
      content: 'Al acceder y utilizar los servicios de INTEGRALES JS S.A.C., usted acepta estar sujeto a estos términos y condiciones de uso. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestros servicios. Estos términos constituyen un acuerdo legal vinculante entre usted y nuestra empresa.'
    },
    {
      icon: Shield,
      title: '2. Servicios Ofrecidos',
      content: 'INTEGRALES JS S.A.C. proporciona servicios de ingeniería industrial, incluyendo pero no limitado a: diseño y fabricación de estructuras metálicas, automatización industrial, mantenimiento industrial, y consultoría en ingeniería. Nos reservamos el derecho de modificar, suspender o discontinuar cualquier servicio en cualquier momento sin previo aviso.'
    },
    {
      icon: Scale,
      title: '3. Uso Aceptable',
      content: 'Usted se compromete a utilizar nuestros servicios únicamente para fines legales y de manera que no infrinja los derechos de terceros. Está prohibido el uso de nuestros servicios para cualquier actividad ilegal, fraudulenta o que pueda dañar la reputación de nuestra empresa. Nos reservamos el derecho de rechazar servicio a cualquier persona por cualquier motivo.'
    },
    {
      icon: AlertCircle,
      title: '4. Propiedad Intelectual',
      content: 'Todo el contenido de este sitio web, incluyendo pero no limitado a textos, gráficos, logos, iconos, imágenes, clips de audio, descargas digitales y compilaciones de datos, es propiedad de INTEGRALES JS S.A.C. o de sus proveedores de contenido y está protegido por las leyes de propiedad intelectual peruanas e internacionales.'
    },
    {
      icon: FileText,
      title: '5. Limitación de Responsabilidad',
      content: 'INTEGRALES JS S.A.C. no será responsable de ningún daño directo, indirecto, incidental, especial o consecuente que resulte del uso o la imposibilidad de usar nuestros servicios. Nos esforzamos por proporcionar servicios de la más alta calidad, pero no garantizamos que nuestros servicios estarán libres de errores o interrupciones.'
    },
    {
      icon: Scale,
      title: '6. Modificaciones de los Términos',
      content: 'Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en este sitio web. Es su responsabilidad revisar periódicamente estos términos para estar informado de cualquier cambio. El uso continuado de nuestros servicios después de cualquier modificación constituye su aceptación de los nuevos términos.'
    },
    {
      icon: Shield,
      title: '7. Ley Aplicable',
      content: 'Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes de la República del Perú. Cualquier disputa relacionada con estos términos será sometida a la jurisdicción exclusiva de los tribunales de Lima, Perú.'
    },
    {
      icon: AlertCircle,
      title: '8. Contacto',
      content: 'Si tiene alguna pregunta sobre estos términos y condiciones, puede contactarnos a través de los medios proporcionados en nuestra sección de contacto. Nos comprometemos a responder sus consultas en un plazo razonable.'
    }
  ]

  return (
    <div className="min-h-screen bg-graphite-dark dark:bg-graphite-dark light:bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-industrial-blue/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-safety-yellow/10 rounded-full blur-3xl" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0056A6" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-metal-gray hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Volver al inicio
            </Link>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-industrial-blue/20 to-industrial-blue/5 border border-industrial-blue/20 mb-6">
              <Scale className="w-10 h-10 text-industrial-blue" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Términos y Condiciones
            </h1>
            <p className="text-metal-gray text-lg">
              Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="mb-8"
              >
                <div className="bg-graphite-light dark:bg-graphite-light light:bg-white border border-metal-gray/10 dark:border-metal-gray/10 light:border-gray-200 rounded-2xl p-8 hover:border-industrial-blue/30 transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-industrial-blue/20 to-industrial-blue/5 border border-industrial-blue/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <section.icon className="w-6 h-6 text-industrial-blue" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white dark:text-white light:text-graphite mb-4">
                        {section.title}
                      </h2>
                      <p className="text-metal-gray dark:text-metal-gray light:text-gray-600 leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Footer Note */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 p-6 bg-industrial-blue/5 border border-industrial-blue/20 rounded-xl"
            >
              <p className="text-metal-gray dark:text-metal-gray light:text-gray-600 text-sm leading-relaxed">
                <strong className="text-white dark:text-white light:text-graphite">Nota importante:</strong> Al utilizar nuestros servicios, usted reconoce que ha leído, entendido y aceptado estos términos y condiciones en su totalidad. Si tiene alguna pregunta o inquietud, no dude en contactarnos.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
