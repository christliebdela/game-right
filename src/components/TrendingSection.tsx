'use client';

import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const TrendingSection = () => {
  const { addItem } = useCart();
  const { isAuthenticated, openAuthModal } = useAuth();
  const trendingItems = [
    {
      id: 22,
      title: "PlayStation DualSense Wireless Controller",
      price: 350,
      image: "/products/ps5-dualsense.webp",
      description: "Haptic feedback, adaptive triggers, built-in microphone."
    },
    {
      id: 1,
      title: "Pro Gaming Headset",
      price: 350,
      image: "/products/gaming-headset.jpg",
      description: "Immersive sound, noise-cancelling mic, RGB lighting."
    },
    {
      id: 10,
      title: "Corsair K95 RGB Platinum",
      price: 650,
      image: "/products/corsair.webp",
      description: "Macro keys, aircraft-grade aluminum, RGB."
    },
    {
      id: 2,
      title: "Mechanical Keyboard",
      price: 400,
      image: "/products/mechanical-keyboard.jpg",
      description: "Hot-swappable switches, per-key RGB, aluminum frame."
    },
    {
      id: 4,
      title: "RGB Mouse Pad XL",
      price: 320,
      image: "/products/rgb-mouse-pad.jpg",
      description: "XL size, RGB edge, anti-slip base."
    },
    {
      id: 6,
      title: "Streaming Microphone",
      price: 550,
      image: "/products/streaming-mic.jpg",
      description: "Cardioid, pop filter, plug & play."
    },
    {
      id: 9,
      title: "HyperX Cloud II",
      price: 620,
      image: "/products/hyperx.jpg",
      description: "Legendary comfort, virtual 7.1 surround sound."
    },
    {
      id: 14,
      title: "Elgato Stream Deck XL",
      price: 600,
      image: "/products/streaming-deck.webp",
      description: "32 customizable LCD keys, instant control."
    }
  ];
  return (
  <section className="py-20 bg-gray-800">
  <div className="max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 tracking-tight drop-shadow-lg mb-4">
            Trending Gear
          </h2>
          <p className="text-gray-400">Level up your setup with the hottest gaming accessories</p>
        </motion.div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.12 }}
              viewport={{ once: true }}
              className="relative group cursor-pointer overflow-hidden rounded-3xl aspect-[3/4] shadow-2xl bg-gradient-to-br from-gray-900/80 via-purple-900/60 to-cyan-900/60 border-2 border-purple-700/30"
            >
              {/* PRODUCT IMAGE*/}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-all duration-700 z-20"
              />

              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-gray-900/40 to-cyan-900/30 backdrop-blur-md z-10" />

              {/* ANIMATED GLOW BORDER */}

              <div className="absolute inset-0 pointer-events-none z-10">
                <div className="w-full h-full rounded-3xl border-4 border-transparent group-hover:border-cyan-400 transition-all duration-500" style={{boxShadow: '0 0 40px 8px rgba(168,85,247,0.15)'}}></div>
              </div>

              <div className="absolute -top-8 left-8 w-20 h-20 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-full opacity-20 blur-2xl z-0 animate-pulse" />
              <div className="absolute bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full opacity-20 blur-2xl z-0 animate-pulse" />

              <div className="relative h-full flex flex-col justify-between p-7 z-30">
                <div className="flex flex-col items-start">
                  <motion.h3 
                    className="text-2xl font-bold text-white mb-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.title}
                  </motion.h3>
                </div>

                <div className="space-y-5">
                  <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-md">₵{item.price}</p>
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                    className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-7 py-3 rounded-xl font-semibold text-base shadow-xl hover:from-purple-500 hover:to-cyan-400 transition-all duration-300 border border-purple-700/40 group-hover:border-cyan-400 cursor-pointer"
                    onClick={() => {
                      if (!isAuthenticated) {
                        openAuthModal('add-to-cart');
                        return;
                      }
                      addItem({
                        id: item.id,
                        name: item.title,
                        price: item.price,
                        image: item.image,
                      });
                    }}
                  >
                    <span className="inline-flex items-center gap-2">
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-300"><circle cx="10" cy="10" r="9"/></svg>
                      Equip Now
                    </span>
                  </motion.button>
                </div>

                <div className="absolute top-0 right-0 p-4 z-40">
                  <motion.div
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                    className="w-8 h-8 border-t-2 border-r-2 border-cyan-400/30 rounded-tr-lg"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="flex justify-center mt-10">
          <button
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-md font-semibold shadow-md hover:from-purple-500 hover:to-cyan-400 transition-all duration-200 border-2 border-transparent hover:border-cyan-400 cursor-pointer"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.location.href = '/products';
              }
            }}
          >
            View All Gears
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
