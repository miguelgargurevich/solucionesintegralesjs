'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Linkedin, 
  Facebook, 
  Instagram,
  ArrowUp
} from 'lucide-react'
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
  hidden: { opacity: 0, y: 20 },
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

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-graphite-dark border-t border-metal-gray/10 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-industrial-blue/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-safety-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.01]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footer-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0056A6" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 py-16"
        >
          {/* Company Info */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-industrial-blue to-industrial-blue-dark flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">SI</span>
              </div>
              <div>
                <div className="text-white font-display font-bold text-xl leading-tight">
                  SOLUCIONES
                </div>
                <div className="text-industrial-blue text-xs font-medium tracking-wider">
                  INTEGRALES JS S.A.C.
                </div>
              </div>
            </Link>
            <p className="text-metal-gray text-sm leading-relaxed mb-6">
              {companyInfo.tagline}. Más de 15 años transformando la industria peruana con soluciones de ingeniería de primer nivel.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                { icon: Linkedin, href: companyInfo.socialMedia.linkedin },
                { icon: Facebook, href: companyInfo.socialMedia.facebook },
                { icon: Instagram, href: companyInfo.socialMedia.instagram },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-10 h-10 rounded-lg bg-graphite-light border border-metal-gray/10 flex items-center justify-center text-metal-gray hover:text-white hover:border-industrial-blue/30 hover:bg-industrial-blue/10 transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-bold mb-6 relative inline-block">
              Servicios
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-industrial-blue" />
            </h4>
            <ul className="space-y-3">
              {services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    href="#servicios"
                    className="text-metal-gray text-sm hover:text-white hover:translate-x-2 transition-all inline-flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-industrial-blue/50" />
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-bold mb-6 relative inline-block">
              Enlaces Rápidos
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-safety-yellow" />
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Sobre Nosotros', href: '#nosotros' },
                { label: 'Nuestros Proyectos', href: '#proyectos' },
                { label: 'Clientes', href: '#clientes' },
                { label: 'Contacto', href: '#contacto' },
                { label: 'Solicitar Cotización', href: '#contacto' },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-metal-gray text-sm hover:text-white hover:translate-x-2 transition-all inline-flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-safety-yellow/50" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-bold mb-6 relative inline-block">
              Contacto
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-industrial-blue" />
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="flex items-start gap-3 text-metal-gray hover:text-white transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-industrial-blue/10 flex items-center justify-center flex-shrink-0 group-hover:bg-industrial-blue/20 transition-colors">
                    <Phone className="w-4 h-4 text-industrial-blue" />
                  </div>
                  <div>
                    <div className="text-xs text-metal-gray-dark">Teléfono</div>
                    <div className="text-sm">{companyInfo.phone}</div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="flex items-start gap-3 text-metal-gray hover:text-white transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-industrial-blue/10 flex items-center justify-center flex-shrink-0 group-hover:bg-industrial-blue/20 transition-colors">
                    <Mail className="w-4 h-4 text-industrial-blue" />
                  </div>
                  <div>
                    <div className="text-xs text-metal-gray-dark">Email</div>
                    <div className="text-sm">{companyInfo.email}</div>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-metal-gray">
                  <div className="w-8 h-8 rounded-lg bg-industrial-blue/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-industrial-blue" />
                  </div>
                  <div>
                    <div className="text-xs text-metal-gray-dark">Dirección</div>
                    <div className="text-sm">{companyInfo.address}</div>
                  </div>
                </div>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-metal-gray/10 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-metal-gray text-sm text-center md:text-left">
              © {new Date().getFullYear()} {companyInfo.name}. Todos los derechos reservados.
            </div>
            <div className="flex items-center gap-4 text-metal-gray text-sm">
              <span>RUC: {companyInfo.ruc}</span>
              <span className="w-1 h-1 rounded-full bg-metal-gray/30" />
              <span>Lima, Perú</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -3, scale: 1.1 }}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-xl bg-industrial-blue text-white flex items-center justify-center shadow-lg shadow-industrial-blue/30 z-40 hover:bg-industrial-blue-light transition-colors"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  )
}
