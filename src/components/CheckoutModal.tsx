'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { items, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Ghana',
    momoNumber: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name,
        email: user.email,
      }));
    }
  }, [user]);

  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'card'>('momo');

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // PAYMENT METHOD VALIDATION -- BASIC

    if (paymentMethod === 'momo' && !formData.momoNumber) {
      alert('Please enter your MoMo number.');
      setIsSubmitting(false);
      return;
    }
    if (paymentMethod === 'card' && (!formData.cardNumber || !formData.cardExpiry || !formData.cardCvc)) {
      alert('Please fill in all credit card details.');
      setIsSubmitting(false);
      return;
    }

    // SIMULATE PAYMENT PROCESSING DELAY LOL

    await new Promise(resolve => setTimeout(resolve, 2000));

    // CLEAR THE CART AFTER PAYMENT

    clearCart();

    // SHOW SUCCESS MODAL

    onSuccess();
    setIsSubmitting(false);
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
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* MODAL */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl z-50 px-4 sm:px-0 max-h-[90vh] overflow-auto"
          >
            <div className="relative bg-black/95 p-6 rounded-lg shadow-xl border border-gray-800">
              
              <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-600/10 to-cyan-500/10"></div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="relative">
                <button
                  onClick={onClose}
                  className="absolute right-0 top-0 text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <h2 className="text-2xl font-bold text-white mb-2">Deploy Your Gear</h2>
                <p className="text-gray-400 mb-6">
                  Enter your shipping and payment details to deploy your gear.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">

                  {/*ORDER SUMMARY */}

                  <div className="bg-white/5 p-4 rounded-md">
                    <h3 className="text-lg font-medium text-white mb-2">Order Summary</h3>
                    <div className="space-y-1 mb-4">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-gray-300">{item.name} × {item.quantity}</span>
                          <span className="text-gray-300">₵{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-700 pt-2 mt-2">
                      <div className="flex justify-between font-medium">
                        <span className="text-white">Total</span>
                        <span className="text-cyan-400">₵{total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* SHIPPING INFO */}
                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Shipping Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-white/5 border border-gray-800 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-white/5 border border-gray-800 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">
                          Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-white/5 border border-gray-800 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-white/5 border border-gray-800 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-300 mb-1">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-white/5 border border-gray-800 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* PAYMMENT INFO */}
                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Payment Information</h3>
                    <div className="flex gap-4 mb-4">
                      <button
                        type="button"
                        className={`px-4 py-2 rounded-full font-medium transition-all duration-200 border border-purple-700/40 focus:outline-none focus:ring-2 focus:ring-purple-500 ${paymentMethod === 'momo' ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                        onClick={() => setPaymentMethod('momo')}
                      >
                        Pay with MoMo
                      </button>
                      <button
                        type="button"
                        className={`px-4 py-2 rounded-full font-medium transition-all duration-200 border border-purple-700/40 focus:outline-none focus:ring-2 focus:ring-purple-500 ${paymentMethod === 'card' ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                        onClick={() => setPaymentMethod('card')}
                      >
                        Pay with Credit Card
                      </button>
                    </div>
                    {paymentMethod === 'momo' ? (
                      <div className="mb-2">
                        <label htmlFor="momoNumber" className="block text-sm font-medium text-gray-300 mb-1">
                          MoMo Number
                        </label>
                        <input
                          type="tel"
                          id="momoNumber"
                          name="momoNumber"
                          value={formData.momoNumber}
                          onChange={handleChange}
                          placeholder="e.g. 024XXXXXXX"
                          className="w-full px-4 py-2 bg-white/5 border border-gray-800 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                          required={paymentMethod === 'momo'}
                        />
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-300 mb-1">
                            Card Number
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-4 py-2 bg-white/5 border border-gray-800 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                            required={paymentMethod === 'card'}
                          />
                        </div>
                        <div>
                          <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-300 mb-1">
                            Expiration Date
                          </label>
                          <input
                            type="text"
                            id="cardExpiry"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleChange}
                            placeholder="MM/YY"
                            className="w-full px-4 py-2 bg-white/5 border border-gray-800 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                            required={paymentMethod === 'card'}
                          />
                        </div>
                        <div>
                          <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-300 mb-1">
                            CVC
                          </label>
                          <input
                            type="text"
                            id="cardCvc"
                            name="cardCvc"
                            value={formData.cardCvc}
                            onChange={handleChange}
                            placeholder="123"
                            className="w-full px-4 py-2 bg-white/5 border border-gray-800 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                            required={paymentMethod === 'card'}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    className={`w-full mt-6 py-3 rounded-sm text-white font-medium ${
                      isSubmitting
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 cursor-pointer'
                    }`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      `Deploy Gear - ₵${total.toFixed(2)}`
                    )}
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;
