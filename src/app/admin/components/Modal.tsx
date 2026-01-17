'use client'

import { ReactNode, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  subtitle?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  icon?: ReactNode
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl'
}

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  subtitle,
  children, 
  size = 'md',
  icon
}: ModalProps) {
  // Bloquear scroll cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
        >
          {/* Backdrop con blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`relative w-full ${sizeClasses[size]} my-8`}
          >
            {/* Card */}
            <div className="bg-gradient-to-b from-graphite-light to-graphite rounded-2xl border border-metal-gray/20 shadow-2xl shadow-black/50 overflow-hidden">
              {/* Header con gradiente */}
              <div className="relative px-6 py-5 border-b border-metal-gray/20 bg-gradient-to-r from-industrial-blue/10 to-transparent">
                {/* Decoración */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-industrial-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                
                <div className="flex items-start justify-between relative">
                  <div className="flex items-center gap-3">
                    {icon && (
                      <div className="w-10 h-10 rounded-xl bg-industrial-blue/20 flex items-center justify-center text-industrial-blue">
                        {icon}
                      </div>
                    )}
                    <div>
                      <h2 className="text-xl font-bold text-white">{title}</h2>
                      {subtitle && (
                        <p className="text-sm text-metal-gray mt-0.5">{subtitle}</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg text-metal-gray hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                {children}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Componente para los botones del footer del modal
export function ModalFooter({ 
  onCancel, 
  onSubmit, 
  cancelText = 'Cancelar', 
  submitText = 'Guardar',
  loading = false,
  loadingText = 'Guardando...',
  submitIcon
}: {
  onCancel: () => void
  onSubmit?: () => void
  cancelText?: string
  submitText?: string
  loading?: boolean
  loadingText?: string
  submitIcon?: ReactNode
}) {
  return (
    <div className="flex gap-3 pt-6 mt-6 border-t border-metal-gray/20">
      <button
        type="button"
        onClick={onCancel}
        className="flex-1 py-3 px-4 bg-graphite border border-metal-gray/30 text-metal-gray rounded-xl hover:text-white hover:border-metal-gray/50 transition-all font-medium"
      >
        {cancelText}
      </button>
      <button
        type="submit"
        onClick={onSubmit}
        disabled={loading}
        className="flex-1 py-3 px-4 bg-gradient-to-r from-industrial-blue to-industrial-blue-light hover:from-industrial-blue-light hover:to-industrial-blue text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-industrial-blue/25"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            {loadingText}
          </>
        ) : (
          <>
            {submitIcon}
            {submitText}
          </>
        )}
      </button>
    </div>
  )
}

// Componente para campos de formulario
export function FormField({ 
  label, 
  children, 
  hint,
  required 
}: { 
  label: string
  children: ReactNode
  hint?: string
  required?: boolean
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-white">
        {label}
        {required && <span className="text-industrial-blue ml-1">*</span>}
      </label>
      {children}
      {hint && (
        <p className="text-xs text-metal-gray flex items-center gap-1.5">
          <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-metal-gray/20 text-[9px]">?</span>
          {hint}
        </p>
      )}
    </div>
  )
}

// Input estilizado
export function FormInput({
  type = 'text',
  value,
  onChange,
  placeholder,
  required,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-xl text-white placeholder:text-metal-gray/50 focus:border-industrial-blue focus:ring-1 focus:ring-industrial-blue/50 focus:outline-none transition-all"
      {...props}
    />
  )
}

// Textarea estilizado
export function FormTextarea({
  value,
  onChange,
  placeholder,
  rows = 4,
  required,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      required={required}
      className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-xl text-white placeholder:text-metal-gray/50 focus:border-industrial-blue focus:ring-1 focus:ring-industrial-blue/50 focus:outline-none transition-all resize-none"
      {...props}
    />
  )
}

// Select estilizado
export function FormSelect({
  value,
  onChange,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 bg-graphite border border-metal-gray/30 rounded-xl text-white focus:border-industrial-blue focus:ring-1 focus:ring-industrial-blue/50 focus:outline-none transition-all appearance-none cursor-pointer"
      {...props}
    >
      {children}
    </select>
  )
}
