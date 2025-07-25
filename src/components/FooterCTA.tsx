'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const FooterCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 tracking-tight drop-shadow-lg mb-6">
            Join the Pro Squad
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Get exclusive deals, early access to new products, and special member-only perks!
          </p>
          <Link href="/signin">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:from-purple-500 hover:to-cyan-400 transition-all duration-200 shadow-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] cursor-pointer"
            >
              Join the Squad
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FooterCTA;
