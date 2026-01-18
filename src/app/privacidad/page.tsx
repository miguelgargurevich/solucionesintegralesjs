'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck, Bell, Globe, Mail } from 'lucide-react'

export default function PrivacidadPage() {
  const sections = [
    {
      icon: Shield,
      title: '1. Información que Recopilamos',
      content: 'Recopilamos información que usted nos proporciona directamente, como nombre, correo electrónico, número de teléfono, dirección y detalles de su empresa cuando solicita nuestros servicios o se comunica con nosotros. También recopilamos información automáticamente sobre su dispositivo y cómo interactúa con nuestro sitio web, incluyendo dirección IP, tipo de navegador, páginas visitadas y tiempos de acceso.'
    },
    {
      icon: Database,
      title: '2. Uso de la Información',
      content: 'Utilizamos la información recopilada para proporcionar y mejorar nuestros servicios, procesar sus solicitudes, comunicarnos con usted sobre nuestros servicios, enviar actualizaciones y ofertas relevantes, analizar el uso de nuestro sitio web y cumplir con nuestras obligaciones legales. No vendemos ni alquilamos su información personal a terceros.'
    },
    {
      icon: Lock,
      title: '3. Protección de Datos',
      content: 'Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger su información personal contra acceso no autorizado, alteración, divulgación o destrucción. Utilizamos cifrado SSL/TLS para proteger la transmisión de datos sensibles y mantenemos nuestros sistemas actualizados con los últimos parches de seguridad.'
    },
    {
      icon: Eye,
      title: '4. Compartir Información',
      content: 'Podemos compartir su información con proveedores de servicios de confianza que nos ayudan a operar nuestro negocio, como servicios de hosting, análisis y comunicación, siempre bajo acuerdos de confidencialidad estrictos. También podemos divulgar información cuando sea requerido por ley o para proteger nuestros derechos legales.'
    },
    {
      icon: UserCheck,
      title: '5. Sus Derechos',
      content: 'Usted tiene derecho a acceder, rectificar, cancelar y oponerse al tratamiento de sus datos personales. Puede solicitar una copia de la información que tenemos sobre usted, corregir datos inexactos, solicitar la eliminación de su información o restringir su procesamiento. Para ejercer estos derechos, contáctenos a través de los canales proporcionados en este sitio.'
    },
    {
      icon: Bell,
      title: '6. Cookies y Tecnologías Similares',
      content: 'Utilizamos cookies y tecnologías similares para mejorar su experiencia en nuestro sitio web, recordar sus preferencias, analizar el tráfico y personalizar el contenido. Puede configurar su navegador para rechazar cookies, pero esto puede afectar la funcionalidad del sitio. Utilizamos cookies esenciales, de rendimiento y de funcionalidad.'
    },
    {
      icon: Globe,
      title: '7. Transferencias Internacionales',
      content: 'Su información puede ser transferida y almacenada en servidores ubicados fuera de su país de residencia. Tomamos medidas para garantizar que cualquier transferencia internacional de datos cumpla con las leyes de protección de datos aplicables y que su información mantenga un nivel adecuado de protección.'
    },
    {
      icon: Shield,
      title: '8. Menores de Edad',
      content: 'Nuestros servicios no están dirigidos a menores de 18 años. No recopilamos intencionalmente información personal de menores. Si descubrimos que hemos recopilado información de un menor, la eliminaremos de inmediato. Si es padre o tutor y cree que su hijo nos ha proporcionado información personal, contáctenos.'
    },
    {
      icon: Bell,
      title: '9. Cambios en la Política',
      content: 'Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Le notificaremos sobre cambios significativos publicando la nueva política en esta página y actualizando la fecha de "Última actualización". Le recomendamos revisar periódicamente esta página para mantenerse informado sobre cómo protegemos su información.'
    },
    {
      icon: Mail,
      title: '10. Contacto',
      content: 'Si tiene preguntas, inquietudes o solicitudes relacionadas con esta política de privacidad o el tratamiento de sus datos personales, puede contactarnos a través de los medios proporcionados en nuestra sección de contacto. Nos comprometemos a responder sus consultas en un plazo razonable y a resolver cualquier problema de manera satisfactoria.'
    }
  ]

  return (
    <div className="min-h-screen bg-graphite-dark dark:bg-graphite-dark light:bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-industrial-blue/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-safety-yellow/10 rounded-full blur-3xl" />
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
              <Lock className="w-10 h-10 text-industrial-blue" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Política de Privacidad
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
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12 p-8 bg-gradient-to-br from-industrial-blue/10 to-industrial-blue/5 border border-industrial-blue/20 rounded-2xl"
            >
              <p className="text-metal-gray dark:text-metal-gray light:text-gray-600 leading-relaxed text-lg">
                En <strong className="text-white dark:text-white light:text-graphite">INTEGRALES JS S.A.C.</strong>, nos comprometemos a proteger su privacidad y a garantizar la seguridad de su información personal. Esta política de privacidad describe cómo recopilamos, usamos, protegemos y compartimos su información cuando utiliza nuestros servicios o visita nuestro sitio web.
              </p>
            </motion.div>

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
                <strong className="text-white dark:text-white light:text-graphite">Su privacidad es importante para nosotros.</strong> Estamos comprometidos con el cumplimiento de la Ley de Protección de Datos Personales del Perú (Ley N° 29733) y otras leyes aplicables. Si tiene alguna pregunta o inquietud sobre cómo manejamos su información, no dude en contactarnos.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
