'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getUserByEmail } from '@/utils/mockDb';
import { useToast } from '@/context/ToastContext';

interface PasswordResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const PasswordResetModal: React.FC<PasswordResetModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // SIMULATE API CALL DELAY

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // CHECK IF USER EXISTS

      const user = getUserByEmail(email);
      if (!user) {
        throw new Error('No account found with this email address');
      }
      
      // In a real app, this would send an email with a password reset link
      // For our mock app, we'll just show a success message

      setIsSubmitted(true);
      
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (isSubmitted) {
      onSuccess();
      showToast({
        type: 'success',
        message: 'Password reset instructions sent to your email'
      });
    } else {
      onClose();
    }
    //RESET FORM STATE

    setEmail('');
    setIsSubmitted(false);
    setError('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

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

              <div className="relative">
                <button
                  onClick={handleClose}
                  className="absolute right-0 top-0 text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <h2 className="text-2xl font-bold text-white mb-2">
                  {isSubmitted ? 'Check Your Email' : 'Reset Your Password'}
                </h2>
                
                {isSubmitted ? (
                  <div className="text-center py-4">
                    <div className="mb-4 text-green-400">
                      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-300 mb-6">
                      If an account exists with <span className="text-cyan-400">{email}</span>, you will receive password reset instructions shortly.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleClose}
                      className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white py-2 rounded-sm hover:from-purple-500 hover:to-cyan-400 transition-all duration-200 font-medium"
                    >
                      Close
                    </motion.button>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-400 mb-6">
                      Enter your email address and we'll send you instructions to reset your password.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="reset-email" className="block text-sm font-medium text-gray-300 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="reset-email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-2 bg-white/5 border border-gray-800 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                          placeholder="Enter your email"
                          required
                        />
                      </div>

                      {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                      )}

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white py-2 rounded-sm hover:from-purple-500 hover:to-cyan-400 transition-all duration-200 font-medium"
                      >
                        {isLoading ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending instructions...
                          </span>
                        ) : (
                          'Reset Password'
                        )}
                      </motion.button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PasswordResetModal;
