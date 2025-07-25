"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-900 py-16 px-4 pt-32">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-black mb-8 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-xl"
        >
          About Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
        >
          Welcome to <span className="text-cyan-400 font-bold">GameRight</span>, your ultimate destination for next-level gaming gear and accessories. We're passionate gamers, tech enthusiasts, and creators dedicated to bringing you the best products to elevate your play. Our curated selection features top brands, exclusive items, and pro setups trusted by the gaming community.
        </motion.p>

        {/* Timeline / Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="bg-gradient-to-br from-purple-900/60 via-gray-900/80 to-cyan-900/60 rounded-2xl shadow-xl p-8 w-full md:w-1/3">
              <div className="text-4xl mb-4 animate-bounce">🎮</div>
              <h3 className="text-xl font-bold text-white mb-2">Founded in 2022</h3>
              <p className="text-gray-300">Started by gamers, for gamers. Our journey began with a love for competitive play and tech innovation.</p>
            </div>
            <div className="bg-gradient-to-br from-cyan-900/60 via-gray-900/80 to-purple-900/60 rounded-2xl shadow-xl p-8 w-full md:w-1/3">
              <div className="text-4xl mb-4 animate-pulse">🚀</div>
              <h3 className="text-xl font-bold text-white mb-2">1000+ Happy Customers</h3>
              <p className="text-gray-300">We've shipped gear to gamers across the country, helping them level up their setups and skills.</p>
            </div>
            <div className="bg-gradient-to-br from-fuchsia-900/60 via-gray-900/80 to-cyan-900/60 rounded-2xl shadow-xl p-8 w-full md:w-1/3">
              <div className="text-4xl mb-4 animate-spin">✨</div>
              <h3 className="text-xl font-bold text-white mb-2">Community First</h3>
              <p className="text-gray-300">We host tournaments, sponsor teams, and support creators. Join our Discord and be part of the action!</p>
            </div>
          </div>
        </motion.div>

        {/* Mission & Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-purple-900 via-gray-950 to-cyan-900 rounded-3xl shadow-2xl overflow-hidden px-8 py-12 md:py-16 mb-14 border border-purple-700/30"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 mb-2 tracking-tight">Our Mission</h2>
              <p className="text-gray-200 text-lg leading-relaxed mb-2 max-w-md">
                To empower every gamer with the gear they need to win, create, and connect.
              </p>
              <p className="text-fuchsia-400 text-base italic mb-2">Gaming is more than a hobby—it's a lifestyle, a community, and a source of inspiration.</p>
            </div>
            <div className="hidden md:block flex-1 text-center">
              <span className="inline-block text-6xl md:text-7xl animate-pulse">🎯</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4 mt-8">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">
            <div className="flex items-center gap-4 bg-gray-900/60 rounded-xl p-4 shadow-md">
              <span className="text-3xl">🏆</span>
              <span className="text-gray-200 font-semibold">Curated selection of top gaming brands</span>
            </div>
            <div className="flex items-center gap-4 bg-gray-900/60 rounded-xl p-4 shadow-md">
              <span className="text-3xl">🛒</span>
              <span className="text-gray-200 font-semibold">Exclusive products and limited editions</span>
            </div>
            <div className="flex items-center gap-4 bg-gray-900/60 rounded-xl p-4 shadow-md">
              <span className="text-3xl">⚡</span>
              <span className="text-gray-200 font-semibold">Fast, reliable shipping and customer support</span>
            </div>
            <div className="flex items-center gap-4 bg-gray-900/60 rounded-xl p-4 shadow-md">
              <span className="text-3xl">🎮</span>
              <span className="text-gray-200 font-semibold">Passionate team of gamers and tech experts</span>
            </div>
            <div className="flex items-center gap-4 bg-gray-900/60 rounded-xl p-4 shadow-md col-span-1 md:col-span-2 justify-center">
              <span className="text-3xl">🔥</span>
              <span className="text-gray-200 font-semibold">Active community events and tournaments</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4 mt-8">Contact</h2>
          <div className="flex flex-col items-center justify-center gap-2 mb-2">
            <span className="text-2xl text-cyan-400">📧</span>
            <p className="text-gray-200 text-lg">Have questions or need help?</p>
            <a href="mailto:support@gameright.com" className="text-cyan-400 underline font-semibold text-lg">support@gameright.com</a>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <h2 className="text-3xl font-bold text-white mb-8">Meet the Team</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-gradient-to-br from-purple-900 via-gray-900 to-cyan-900 rounded-2xl p-6 w-64 min-h-[260px] flex flex-col items-center shadow-lg">
              <img src="/avatars/avatar-1.png" alt="Christlieb Dela Attipoe" className="w-20 h-20 rounded-full mb-4 border-4 border-purple-500/40 object-cover" />
              <h3 className="text-lg font-bold text-white mb-1">Christlieb Dela Attipoe</h3>
              <p className="text-gray-400 text-sm">Founder & Lead Developer</p>
            </div>
            <div className="bg-gradient-to-br from-purple-900 via-gray-900 to-cyan-900 rounded-2xl p-6 w-64 min-h-[260px] flex flex-col items-center shadow-lg">
              <img src="/avatars/avatar-2.png" alt="Gerald Zipki" className="w-20 h-20 rounded-full mb-4 border-4 border-cyan-500/40 object-cover" />
              <h3 className="text-lg font-bold text-white mb-1">Gerald Zipki</h3>
              <p className="text-gray-400 text-sm">UI/UX Designer</p>
            </div>
            <div className="bg-gradient-to-br from-purple-900 via-gray-900 to-cyan-900 rounded-2xl p-6 w-64 min-h-[260px] flex flex-col items-center shadow-lg">
              <img src="/avatars/avatar-3.png" alt="Anthony" className="w-20 h-20 rounded-full mb-4 border-4 border-fuchsia-500/40 object-cover" />
              <h3 className="text-lg font-bold text-white mb-1">Anthony</h3>
              <p className="text-gray-400 text-sm">Graphics Designer</p>
            </div>
          </div>
        </motion.div>

        <Link href="/" className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-md font-semibold shadow-lg hover:from-purple-500 hover:to-cyan-400 transition-all duration-200">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
