'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
}

const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ isOpen, onClose, orderNumber }) => {
  const { items } = useCart();
  
  const confettiColors = ['#9333EA', '#06B6D4', '#FFFFFF', '#818CF8']; 
  
  // GENERATE RANDOM CONFETTI PIECES

  const confetti = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: -10 - Math.random() * 40,
    size: 5 + Math.random() * 10,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    rotation: Math.random() * 360,
  }));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* CCONFETTI ANIMATION */}
          
          <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
            {confetti.map((piece) => (
              <motion.div
                key={piece.id}
                initial={{ 
                  x: `${piece.x}%`, 
                  y: `${piece.y}%`, 
                  opacity: 1,
                  rotate: piece.rotation 
                }}
                animate={{ 
                  y: '110%',
                  x: [
                    `${piece.x}%`, 
                    `${piece.x + (Math.random() * 20 - 10)}%`, 
                    `${piece.x + (Math.random() * 20 - 10)}%`
                  ],
                  opacity: [1, 1, 0],
                  rotate: piece.rotation + Math.random() * 360
                }}
                transition={{ 
                  duration: 3 + Math.random() * 5,
                  ease: "easeOut",
                  times: [0, 0.8, 1] 
                }}
                style={{
                  position: 'absolute',
                  width: `${piece.size}px`,
                  height: `${piece.size}px`,
                  backgroundColor: piece.color,
                  borderRadius: Math.random() > 0.5 ? '50%' : '0%',
                }}
              />
            ))}
          </div>

          {/* MODAL */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 px-4 sm:px-0"
          >
            <div className="relative bg-black/95 p-6 rounded-lg shadow-xl border border-gray-800">
            
              <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-600/10 to-cyan-500/10"></div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
              </div>

              
              <div className="relative flex flex-col items-center text-center">
                <button
                  onClick={onClose}
                  className="absolute right-0 top-0 text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="w-16 h-16 mb-4 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <h2 className="text-2xl font-bold text-white mb-2">Order Successful!</h2>
                <p className="text-gray-300 mb-4">
                  Your order has been processed and will be shipped soon.
                </p>
                
                <div className="bg-white/5 p-3 rounded-md w-full mb-6">
                  <p className="text-sm text-gray-400">Order Reference</p>
                  <p className="text-lg font-mono text-cyan-400 font-bold">{orderNumber}</p>
                </div>
                
                <p className="text-gray-400 mb-6 text-sm">
                  A confirmation email has been sent to your email address with order details and tracking information.
                </p>

                <div className="flex gap-3 w-full">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="w-full bg-white/5 text-white py-2 px-4 rounded-sm hover:bg-white/10 transition-all duration-200 border border-gray-800"
                  >
                    Back to Shop
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      window.location.href = "/";
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white py-2 px-4 rounded-sm hover:from-purple-500 hover:to-cyan-400 transition-all duration-200 font-medium"
                  >
                    Continue Shopping
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default OrderSuccessModal;
