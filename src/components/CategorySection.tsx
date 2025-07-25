'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Keyboard, Mouse, Headphones, Gamepad2 } from 'lucide-react';

const CategorySection = () => {
  const router = useRouter();
  const categories = [
    {
      id: 1,
      name: 'Keyboards',
      icon: <Keyboard size={40} className="text-cyan-400 drop-shadow-lg" />,
      description: 'Mechanical & gaming keyboards for every style',
    },
    {
      id: 2,
      name: 'Mice',
      icon: <Mouse size={40} className="text-fuchsia-400 drop-shadow-lg" />,
      description: 'Precision gaming mice for ultimate control',
    },
    {
      id: 3,
      name: 'Audio',
      icon: <Headphones size={40} className="text-purple-400 drop-shadow-lg" />,
      description: 'Immersive gaming headsets & speakers',
    },
    {
      id: 4,
      name: 'Accessories',
      icon: <Gamepad2 size={40} className="text-blue-400 drop-shadow-lg" />,
      description: 'Essential gaming gear & peripherals',
    },
  ];

  return (
  <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-950 to-purple-950/80 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-purple-700/30 to-cyan-400/10 rounded-full blur-3xl opacity-60 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-fuchsia-500/20 to-blue-400/10 rounded-full blur-2xl opacity-40 animate-pulse" />
      </div>
  <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 mb-4 tracking-tight drop-shadow-lg">Browse Categories</h2>
          <p className="text-lg text-gray-300 mb-4">Find the perfect gear for your gaming style and setup</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.07, boxShadow: "0 0 32px 0 rgba(168,85,247,0.25)" }}
              className="bg-gradient-to-br from-gray-800 via-gray-900 to-purple-900/40 rounded-2xl p-8 cursor-pointer hover:shadow-[0_0_32px_rgba(168,85,247,0.25)] transition-all duration-300 group relative overflow-hidden"
              onClick={() => router.push(`/products?category=${encodeURIComponent(category.name)}`)}
            >
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-cyan-400/10 rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-all duration-300" />
              <div className="mb-6 drop-shadow-lg group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">{category.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-2 tracking-wide group-hover:text-cyan-400 transition-colors duration-200">{category.name}</h3>
              <p className="text-gray-300 text-base mb-2">{category.description}</p>
              <span className="inline-block mt-2 text-xs text-fuchsia-400 font-semibold uppercase tracking-wider group-hover:text-cyan-300 transition-colors duration-200">Explore</span>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            className="mt-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-md font-semibold shadow-md hover:from-purple-500 hover:to-cyan-400 transition-all duration-200 border-2 border-transparent hover:border-cyan-400 cursor-pointer"
            onClick={() => router.push('/products')}
          >
            Browse Full Arsenal
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
