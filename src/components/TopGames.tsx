'use client';

import { motion } from 'framer-motion';

interface Game {
  id: number;
  title: string;
  image: string;
  accessoryCount: number;
  backgroundClass: string;
}

const TopGames = () => {
  const games: Game[] = [
    {
      id: 1,
      title: 'Call of Duty',
      image: '/games/cod.jpg', 
      accessoryCount: 45,
      backgroundClass: 'from-[#1e2329] to-[#2d3436]',
    },
    {
      id: 2,
      title: 'FIFA',
      image: '/games/fifa.jpg',
      accessoryCount: 32,
      backgroundClass: 'from-[#1a472a] to-[#2d3436]',
    },
    {
      id: 3,
      title: 'Fortnite',
      image: '/games/fortnite.jpg',
      accessoryCount: 38,
      backgroundClass: 'from-[#5c3c92] to-[#2d3436]',
    },
    {
      id: 4,
      title: 'GTA V',
      image: '/games/gta.jpg',
      accessoryCount: 29,
      backgroundClass: 'from-[#b91c1c] to-[#2d3436]',
    },
  ];

  return (
  <section className="py-20 bg-gray-900">
  <div className="max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 tracking-tight drop-shadow-lg mb-4">Top Games</h2>
          <p className="text-gray-400">Find the perfect gear for your favorite games</p>
        </motion.div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative group cursor-pointer overflow-hidden rounded-2xl aspect-[4/5]`}
            >
              {/* BACKGROUND GRADIENT */}

              <div className={`absolute inset-0 bg-gradient-to-b ${game.backgroundClass} opacity-90 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* GAME IMAGE */}
              <img
                src={game.image}
                alt={game.title}
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity duration-300"
              />

              <div className="relative h-full flex flex-col justify-between p-6">
                <div>
                  <motion.h3 
                    className="text-2xl font-bold text-white mb-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    {game.title}
                  </motion.h3>
                  <p className="text-gray-300">{game.accessoryCount} Accessories</p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 bg-white/10 backdrop-blur-sm text-white px-6 py-2 rounded-md 
                           hover:bg-white/20 transition-all duration-200 border border-white/20
                           opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 cursor-pointer"
                >
                  View Collection
                </motion.button>
              </div>

              <div className="absolute top-0 right-0 p-4">
                <motion.div
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                  className="w-8 h-8 border-t-2 border-r-2 border-white/20 rounded-tr-lg"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopGames;
