'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

const AuthModal = () => {
  const { showAuthModal, closeAuthModal, login, signup, pendingAction } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [authMode, setAuthMode] = useState('signin');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (authMode === 'signin') {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
      // CLEARS FORM

      setEmail('');
      setPassword('');
      setName('');
    } catch (err) {
      if (authMode === 'signin') {
        setError('Invalid email or password');
      } else {
        setError('Registration failed. Email might be in use.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
    setError('');
  };

  return (
    <AnimatePresence>
      {showAuthModal && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAuthModal}
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
              {/* DECOR ITEMS */}
              <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-600/10 to-cyan-500/10"></div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
              </div>
              
              <div className="relative">
                <button
                  onClick={closeAuthModal}
                  className="absolute right-0 top-0 text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <h2 className="text-2xl font-bold text-white mb-2">
                  {authMode === 'signin' ? 'Enter Battle Station' : 'Create Your Legend'}
                </h2>
                <p className="text-gray-400 mb-6">
                  {authMode === 'signin' 
                    ? `Please sign in to ${pendingAction?.toLowerCase() || 'access your battle station'}`
                    : 'Enlist now to start conquering with GameRight'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {authMode === 'signup' && (
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 bg-white/5 border border-gray-800 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                  )}

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 bg-white/5 border border-gray-800 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 bg-white/5 border border-gray-800 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      placeholder="Enter your password"
                      required
                    />
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                  )}

                  {/* Auth Modal Button */}
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
                        {authMode === 'signin' ? 'Entering Battle...' : 'Creating Legend...'}
                      </span>
                    ) : (
                      authMode === 'signin' ? 'Enter Battle' : 'Enlist Now'
                    )}
                  </motion.button>

                  {/* Modal toggle text */}
                  <p className="text-sm text-center mt-4">
                    {authMode === 'signin' ? (
                      <>
                        New to the battlefield?{" "}
                        <span
                          className="text-blue-500 cursor-pointer"
                          onClick={toggleMode}
                        >
                          Create Legend
                        </span>
                      </>
                    ) : (
                      <>
                        Already a warrior?{" "}
                        <span
                          className="text-blue-500 cursor-pointer"
                          onClick={toggleMode}
                        >
                          Enter Battle
                        </span>
                      </>
                    )}
                  </p>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
