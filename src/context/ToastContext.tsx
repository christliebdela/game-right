'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, LogIn, LogOut, Check, AlertTriangle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'wishlist-added' | 'wishlist-removed' | 'login' | 'logout';

interface ToastState {
  visible: boolean;
  message: string;
  type: ToastType;
}

interface ToastNotification {
  message: string;
  type: ToastType;
  icon?: string;
}

interface ToastContextType {
  showToast: (messageOrConfig: string | ToastNotification, type?: ToastType) => void;
  hideToast: () => void;
  toast: ToastState;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: '',
    type: 'info'
  });

  const showToast = (messageOrConfig: string | ToastNotification, type?: ToastType) => {
    if (typeof messageOrConfig === 'string') {
      setToast({
        visible: true,
        message: messageOrConfig,
        type: type || 'info'
      });
    } else {
      setToast({
        visible: true,
        message: messageOrConfig.message,
        type: messageOrConfig.type
      });
    }

    // Auto-hide toast after 3 seconds
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, visible: false }));
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast, toast }}>
      {children}
      
      <AnimatePresence>
        {toast.visible && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-24 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 ${
              toast.type === 'error' ? 'bg-red-600' :
              toast.type === 'wishlist-added' ? 'bg-gradient-to-r from-purple-600 to-cyan-500' :
              toast.type === 'wishlist-removed' ? 'bg-gray-800' :
              toast.type === 'login' ? 'bg-gradient-to-r from-green-600 to-cyan-500' :
              toast.type === 'logout' ? 'bg-gradient-to-r from-gray-700 to-gray-900' :
              toast.type === 'success' ? 'bg-green-600' : 'bg-blue-600'
            }`}
          >
            <motion.div 
              animate={
                toast.type === 'wishlist-added' ? {
                  scale: [1, 1.5, 0.8, 1.2, 1],
                  rotate: [0, 0, 0, 10, -10, 0],
                } : 
                toast.type === 'login' ? {
                  y: [0, -5, 0],
                  transition: { repeat: 1, duration: 0.3 }
                } : 
                toast.type === 'logout' ? {
                  rotate: [0, -10, 10, -5, 5, 0],
                  transition: { duration: 0.5 }
                } : 
                { scale: 1 }
              }
              transition={{ duration: 0.5 }}
            >
              {toast.type === 'wishlist-added' || toast.type === 'wishlist-removed' ? (
                <Heart 
                  size={18} 
                  className={toast.type === 'wishlist-added' ? 'text-red-500 fill-red-500' : 'text-red-500'} 
                />
              ) : toast.type === 'login' ? (
                <LogIn size={18} className="text-white" />
              ) : toast.type === 'logout' ? (
                <LogOut size={18} className="text-white" />
              ) : toast.type === 'success' ? (
                <Check size={18} className="text-white" />
              ) : toast.type === 'error' ? (
                <AlertTriangle size={18} className="text-white" />
              ) : (
                <Info size={18} className="text-white" />
              )}
            </motion.div>
            <span className="text-white text-sm font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
