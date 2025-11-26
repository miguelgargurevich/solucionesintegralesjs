'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Menu, X, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { companyInfo } from '@/lib/data'

const navItems = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Clientes', href: '#clientes' },
  { label: 'Contacto', href: '#contacto' },
]

const menuVariants = {
  closed: {
    opacity: 0,
    x: '100%',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
}

const menuItemVariants = {
  closed: { opacity: 0, x: 50 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  }),
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Detect active section
      const sections = navItems.map(item => item.href.replace('#', ''))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Top Bar */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="hidden md:block bg-graphite-dark border-b border-metal-gray/10"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="flex items-center gap-6 text-metal-gray">
              <a href={`tel:${companyInfo.phone}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                {companyInfo.phone}
              </a>
              <a href={`mailto:${companyInfo.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                {companyInfo.email}
              </a>
            </div>
            <div className="flex items-center gap-4">
              {Object.entries(companyInfo.socialMedia).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-metal-gray hover:text-industrial-blue transition-colors capitalize"
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.1 }}
        className={`fixed top-0 md:top-10 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-graphite/90 backdrop-blur-xl shadow-lg border-b border-metal-gray/10' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-10 h-10 rounded-lg bg-gradient-to-br from-industrial-blue to-industrial-blue-dark flex items-center justify-center shadow-lg"
              >
                <span className="text-white font-bold text-lg">SI</span>
              </motion.div>
              <div className="hidden sm:block">
                <div className="text-white font-display font-bold text-lg leading-tight">
                  SOLUCIONES
                </div>
                <div className="text-industrial-blue text-xs font-medium tracking-wider">
                  INTEGRALES JS S.A.C.
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                    activeSection === item.href.replace('#', '')
                      ? 'text-white'
                      : 'text-metal-gray hover:text-white'
                  }`}
                >
                  {item.label}
                  {activeSection === item.href.replace('#', '') && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-industrial-blue to-safety-yellow"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Button
                variant="premium"
                size="default"
                onClick={() => handleNavClick('#contacto')}
              >
                Solicitar Cotización
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-white"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-graphite/80 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[80vw] bg-graphite-light border-l border-metal-gray/10 z-50 lg:hidden"
            >
              <div className="flex flex-col h-full p-6">
                {/* Close button */}
                <div className="flex justify-end mb-8">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-10 h-10 flex items-center justify-center text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-2">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.href}
                      custom={index}
                      variants={menuItemVariants}
                      onClick={() => handleNavClick(item.href)}
                      className={`w-full text-left px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                        activeSection === item.href.replace('#', '')
                          ? 'bg-industrial-blue/20 text-white'
                          : 'text-metal-gray hover:bg-metal-gray/10 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </nav>

                {/* Contact info */}
                <div className="pt-6 border-t border-metal-gray/10 space-y-4">
                  <a
                    href={`tel:${companyInfo.phone}`}
                    className="flex items-center gap-3 text-metal-gray hover:text-white transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    {companyInfo.phone}
                  </a>
                  <a
                    href={`mailto:${companyInfo.email}`}
                    className="flex items-center gap-3 text-metal-gray hover:text-white transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    {companyInfo.email}
                  </a>
                </div>

                {/* CTA */}
                <div className="mt-6">
                  <Button
                    variant="premium"
                    size="lg"
                    className="w-full"
                    onClick={() => handleNavClick('#contacto')}
                  >
                    Solicitar Cotización
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
