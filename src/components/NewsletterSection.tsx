'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-950 via-gray-950 to-gray-900">
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">Stay in the Game</h2>
          <p className="text-lg text-gray-300 mb-4">Sign up for exclusive offers, news, and updates</p>
        </motion.div>
        <form onSubmit={handleSubmit} className="w-full max-w-lg flex flex-col sm:flex-row gap-4 items-center justify-center">
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="flex-1 px-6 py-3 rounded-lg bg-gray-800/80 border border-purple-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-cyan-400 text-base"
          />
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 via-fuchsia-500 to-cyan-500 text-white font-bold shadow-lg hover:from-purple-500 hover:to-cyan-400 transition-all duration-200 border-2 border-transparent hover:border-cyan-400"
          >
            Subscribe
          </motion.button>
        </form>
        {submitted && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-green-400 font-semibold"
          >
            Thank you for subscribing!
          </motion.p>
        )}
      </div>
    </section>
  );
}
