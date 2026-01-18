'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
}

interface ToastContextType {
  showToast: (type: ToastType, title: string, message?: string, duration?: number) => void
  showConfirm: (title: string, message: string, onConfirm: () => void) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

const toastConfig = {
  success: {
    icon: CheckCircle2,
    bgColor: 'bg-gradient-to-r from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-500/50',
    iconColor: 'text-green-400',
    titleColor: 'text-green-300',
  },
  error: {
    icon: XCircle,
    bgColor: 'bg-gradient-to-r from-red-500/20 to-rose-500/20',
    borderColor: 'border-red-500/50',
    iconColor: 'text-red-400',
    titleColor: 'text-red-300',
  },
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20',
    borderColor: 'border-yellow-500/50',
    iconColor: 'text-yellow-400',
    titleColor: 'text-yellow-300',
  },
  info: {
    icon: Info,
    bgColor: 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/50',
    iconColor: 'text-blue-400',
    titleColor: 'text-blue-300',
  },
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const config = toastConfig[toast.type]
  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className={`
        relative overflow-hidden
        ${config.bgColor} ${config.borderColor}
        backdrop-blur-xl border rounded-2xl p-4 pr-12
        shadow-2xl shadow-black/20
        min-w-[320px] max-w-[420px]
      `}
    >
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 pointer-events-none" />
      
      <div className="flex items-start gap-3 relative z-10">
        <div className={`p-1 rounded-full ${config.bgColor}`}>
          <Icon className={`w-5 h-5 ${config.iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={`font-semibold ${config.titleColor}`}>{toast.title}</h4>
          {toast.message && (
            <p className="text-sm text-metal-gray mt-0.5 leading-relaxed">{toast.message}</p>
          )}
        </div>
      </div>

      <button
        onClick={() => onRemove(toast.id)}
        className="absolute top-3 right-3 p-1 rounded-lg text-metal-gray/60 hover:text-white hover:bg-white/10 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Progress bar */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: (toast.duration || 4000) / 1000, ease: 'linear' }}
        className={`absolute bottom-0 left-0 right-0 h-1 ${config.iconColor.replace('text-', 'bg-')} origin-left opacity-30`}
      />
    </motion.div>
  )
}

function ConfirmDialog({ 
  isOpen, 
  title, 
  message, 
  onConfirm, 
  onCancel 
}: { 
  isOpen: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void 
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-graphite-light border border-metal-gray/30 rounded-2xl p-6 max-w-md w-full shadow-2xl"
          >
            {/* Glow effect */}
            <div className="absolute -inset-px bg-gradient-to-r from-red-500/20 via-transparent to-red-500/20 rounded-2xl blur-xl opacity-50 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-500/20 rounded-xl">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
              </div>
              
              <p className="text-metal-gray mb-6 leading-relaxed">{message}</p>
              
              <div className="flex gap-3 justify-end">
                <button
                  onClick={onCancel}
                  className="px-5 py-2.5 bg-graphite border border-metal-gray/30 text-white rounded-xl hover:bg-graphite-light transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={onConfirm}
                  className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all font-medium shadow-lg shadow-red-500/25"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const [confirmState, setConfirmState] = useState<{
    isOpen: boolean
    title: string
    message: string
    onConfirm: () => void
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  })

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const showToast = useCallback((type: ToastType, title: string, message?: string, duration = 4000) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast: Toast = { id, type, title, message, duration }
    
    setToasts(prev => [...prev, newToast])
    
    setTimeout(() => {
      removeToast(id)
    }, duration)
  }, [removeToast])

  const showConfirm = useCallback((title: string, message: string, onConfirm: () => void) => {
    setConfirmState({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        onConfirm()
        setConfirmState(prev => ({ ...prev, isOpen: false }))
      },
    })
  }, [])

  const handleCancelConfirm = useCallback(() => {
    setConfirmState(prev => ({ ...prev, isOpen: false }))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast, showConfirm }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-[99] flex flex-col gap-3">
        <AnimatePresence mode="sync">
          {toasts.map(toast => (
            <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
          ))}
        </AnimatePresence>
      </div>

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmState.isOpen}
        title={confirmState.title}
        message={confirmState.message}
        onConfirm={confirmState.onConfirm}
        onCancel={handleCancelConfirm}
      />
    </ToastContext.Provider>
  )
}
