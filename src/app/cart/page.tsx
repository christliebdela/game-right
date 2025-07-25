'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import CheckoutModal from '@/components/CheckoutModal';
import OrderSuccessModal from '@/components/OrderSuccessModal';

export default function Cart() {
  const { isAuthenticated, openAuthModal } = useAuth();
  const { items: cartItems, updateQuantity: updateItemQuantity, removeItem: removeCartItem } = useCart();
  
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-black/95 pt-20 px-4 relative">
      {/* DESIGN ELEMENTS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black"></div>
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto py-16 relative">
        <h1 className="text-4xl font-black text-white mb-8 bg-gradient-to-r from-purple-500 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
          Your Arsenal
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg mb-6">Your cart is empty</p>
            <a
              href="/products"
              className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-md font-semibold shadow-lg hover:from-purple-500 hover:to-cyan-400 transition-all duration-200"
            >
              Browse Products
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white/5 backdrop-blur-sm border border-gray-800 rounded-lg p-6 mb-4 relative overflow-hidden group hover:border-purple-500/50 transition-colors"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="flex items-center space-x-4 relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg border border-gray-800"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">
                        {item.name}
                      </h3>
                      <p className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent font-bold">
                        ₵{item.price}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <button
                          onClick={() =>
                            updateItemQuantity(item.id, item.quantity - 1)
                          }
                          className="text-gray-400 hover:text-white"
                        >
                          -
                        </button>
                        <span className="text-white">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateItemQuantity(item.id, item.quantity + 1)
                          }
                          className="text-gray-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeCartItem(item.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      Dismantle
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white/5 backdrop-blur-sm border border-gray-800 rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-white mb-4 bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
                  Order Summary
                </h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>₵{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t border-gray-800 pt-4 mt-2">
                    <div className="flex justify-between">
                      <span className="font-bold text-white">Total</span>
                      <span className="font-bold bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
                        ₵{total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <motion.button
                  onClick={() => {
                    if (!isAuthenticated) {
                      openAuthModal('proceed to checkout');
                      return;
                    }
                    setShowCheckoutModal(true);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white py-3 rounded-sm hover:from-purple-500 hover:to-cyan-400 transition-all duration-200 uppercase tracking-wider font-bold text-sm"
                  disabled={cartItems.length === 0}
                >
                  {cartItems.length === 0 ? 'Arsenal Empty' : 'Deploy Gear'}
                </motion.button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* THE CHECKOUT MODAL */}
      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        onSuccess={() => {
          setShowCheckoutModal(false);
          
          // THIS GENERATES RANDOM ORDER NUMBERS
          const randomOrderId = `GU-${Math.floor(100000 + Math.random() * 900000)}`;
          setOrderNumber(randomOrderId);
          
          setShowSuccessModal(true);
        }}
      />

      {/* ORDER SUCCESS MODAL */}
      <OrderSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        orderNumber={orderNumber}
      />
    </div>
  );
}
