"use client";

import { useState, useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Filter, Heart } from 'lucide-react';
import Image from 'next/image';

// MOCK PRODUCT DATA

const products = [
  {
    id: 1,
    name: "Pro Gaming Headset",
    price: 350,
    image: "/products/gaming-headset.jpg",
    description: "Immersive sound, noise-cancelling mic, RGB lighting.",
    category: "Audio"
  },
  {
    id: 10,
    name: "Corsair K95 RGB Platinum",
    price: 650,
    image: "/products/corsair.webp",
    description: "Macro keys, aircraft-grade aluminum, RGB.",
    category: "Input Devices"
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    price: 400,
    image: "/products/mechanical-keyboard.jpg",
    description: "Hot-swappable switches, per-key RGB, aluminum frame.",
    category: "Input Devices"
  },
  {
    id: 3,
    name: "Razer Gaming Mouse",
    price: 180,
    image: "/products/gaming-mouse.jpg",
    description: "Ultra-lightweight, 16K DPI, customizable buttons.",
    category: "Input Devices"
  },
  {
    id: 4,
    name: "RGB Mouse Pad XL",
    price: 320,
    image: "/products/rgb-mouse-pad.jpg",
    description: "XL size, RGB edge, anti-slip base.",
    category: "Accessories"
  },
  {
    id: 5,
    name: "Gaming Chair Pro",
    price: 1200,
    image: "/products/gaming-chair.jpg",
    description: "Ergonomic, adjustable, memory foam.",
    category: "Furniture"
  },
  {
    id: 6,
    name: "Streaming Microphone",
    price: 550,
    image: "/products/streaming-mic.jpg",
    description: "Cardioid, pop filter, plug & play.",
    category: "Audio"
  },
  {
    id: 7,
    name: "LED Strip Gaming",
    price: 400,
    image: "/products/led-strip.jpg",
    description: "16M colors, app control, syncs to music.",
    category: "Lighting"
  },
  {
    id: 8,
    name: "Gaming Mousepad XL",
    price: 350,
    image: "/products/mousepad-xl.jpg",
    description: "XL size, stitched edges, water-resistant.",
    category: "Accessories"
  },
  {
    id: 9,
    name: "HyperX Cloud II",
    price: 620,
    image: "/products/hyperx.jpg",
    description: "Legendary comfort, virtual 7.1 surround sound.",
    category: "Audio"
  },
  {
    id: 11,
    name: "Logitech G Pro X Superlight",
    price: 650,
    image: "/products/logitech.jpg",
    description: "Ultra-light, HERO sensor, wireless.",
    category: "Input Devices"
  },
  {
    id: 12,
    name: "Razer BlackWidow V4",
    price: 420,
    image: "/products/razer.jpg",
    description: "Green switches, Chroma RGB, magnetic wrist rest.",
    category: "Input Devices"
  },
  {
    id: 13,
    name: "ASUS ROG Strix Gaming Chair",
    price: 1500,
    image: "/products/asus.jpg",
    description: "Premium build, adjustable armrests, lumbar support.",
    category: "Furniture"
  },
  {
    id: 14,
    name: "Elgato Stream Deck XL",
    price: 600,
    image: "/products/streaming-deck.webp",
    description: "32 customizable LCD keys, instant control.",
    category: "Accessories"
  },
  {
    id: 15,
    name: "Philips Hue Play Light Bar",
    price: 120,
    image: "/products/philips-hue.webp",
    description: "Syncs with games, vibrant colors, smart control.",
    category: "Lighting"
  },
  {
    id: 16,
    name: "Secretlab TITAN Evo",
    price: 1800,
    image: "/products/titan-evo.jpg",
    description: "Ergonomic, memory foam, multi-tilt mechanism.",
    category: "Furniture"
  },
  {
    id: 17,
    name: "SteelSeries QcK Prism XL",
    price: 250,
    image: "/products/steel-series.webp",
    description: "Dual-zone RGB, micro-woven cloth, non-slip base.",
    category: "Accessories"
  },
  {
    id: 18,
    name: "Blue Yeti USB Mic",
    price: 300,
    image: "/products/Blue-Yeti-X-2-1.jpg",
    description: "Four pickup patterns, plug & play, studio sound.",
    category: "Audio"
  },
  {
    id: 19,
  name: "AOC 27\" Curved Gaming Monitor",
    price: 2200,
    image: "/products/AOC-27.avif",
    description: "165Hz, 1ms, FreeSync Premium, immersive curve.",
    category: "Accessories"
  },
  {
    id: 20,
    name: "NZXT RGB & Fan Controller",
    price: 380,
    image: "/products/ZXT-RGB.jpg",
    description: "Custom fan curves, RGB lighting, CAM software.",
    category: "Lighting"
  },
  {
    id: 21,
    name: "Xbox Elite Wireless Controller Series 2",
    price: 400,
    image: "/products/xbox-elite-controller.jpg",
    description: "Adjustable-tension thumbsticks, interchangeable paddles, rechargeable battery.",
    category: "Controllers"
  },
  {
    id: 22,
    name: "PlayStation DualSense Wireless Controller",
    price: 350,
    image: "/products/ps5-dualsense.webp",
    description: "Haptic feedback, adaptive triggers, built-in microphone.",
    category: "Controllers"
  },
];

// EXTRACT UNIQUE CATEGORIES 

const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

interface WishlistNotification {
  show: boolean;
  productId: number | null;
  action: 'added' | 'removed' | null;
}

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [wishlistNotification, setWishlistNotification] = useState<WishlistNotification>({ 
    show: false, 
    productId: null, 
    action: null 
  });

  // PRE-FILTER BY CATEGORY
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const category = params.get("category");
      if (category && categories.includes(category)) {
        setSelectedCategory(category);
      }
    }
  }, []);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const { addItem } = useCart();
  const { isAuthenticated, openAuthModal } = useAuth();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();

  // LOADING STATE SIMULATION

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // FILTER PRODUCTS BASED ON SEARCH AND CATEGORY

  const filtered = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || 
                          product.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const PRODUCTS_PER_PAGE = 12;
  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filtered.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE);

  // ADD TO CART HANDLER

  const handleAddToCart = (product: any) => {
    if (!isAuthenticated) {
      openAuthModal('add-to-cart');
      return;
    }
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };
  
  // WISHLIST TOGGLE HANDLER
  
  const handleToggleWishlist = (product: any) => {
    if (!isAuthenticated) {
      openAuthModal('add-to-wishlist');
      return;
    }
    
    const isCurrentlyInWishlist = isInWishlist(product.id);
    
    if (isCurrentlyInWishlist) {
      removeFromWishlist(product.id);
      setWishlistNotification({ 
        show: true, 
        productId: product.id, 
        action: 'removed' 
      });
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        category: product.category
      });
      setWishlistNotification({ 
        show: true, 
        productId: product.id, 
        action: 'added' 
      });
    }

    // AUTO-HIDE NOTIFICATION IN 1.5 SECONDS

    setTimeout(() => {
      setWishlistNotification({ show: false, productId: null, action: null });
    }, 1500);
  };

  // FILTER RESET 

  const resetFilters = () => {
    setSearch("");
    setSelectedCategory("All");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-900 py-16 px-4 pt-32">

      {/* WISHLIST NOTIFICATION */}

      <AnimatePresence>
        {wishlistNotification.show && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-24 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 ${
              wishlistNotification.action === 'added' 
                ? 'bg-gradient-to-r from-purple-600 to-cyan-500' 
                : 'bg-gray-800'
            }`}
          >
            <motion.div 
              animate={wishlistNotification.action === 'added' ? {
                scale: [1, 1.5, 1],
                rotate: [0, 10, -10, 0],
              } : {
                scale: 1,
                rotate: 0
              }}
              transition={{ duration: 0.5 }}
            >
              <Heart 
                size={18} 
                className={wishlistNotification.action === 'added' 
                  ? 'text-red-500 fill-red-500' 
                  : 'text-red-500'
                } 
              />
            </motion.div>
            <span className="text-white text-sm font-medium">
              {wishlistNotification.action === 'added' 
                ? 'Added to wishlist!' 
                : 'Removed from wishlist'
              }
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">


        {/* HERO SECTION */}

        <section className="relative mb-20">
          <div
            className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-purple-900 via-gray-950 to-cyan-900 rounded-3xl shadow-2xl overflow-hidden px-8 py-12 md:py-20"
            data-aos="fade-up"
          >
            <div className="w-full md:w-1/2 z-10 flex flex-col items-start md:items-start text-left" data-aos="fade-right">
              <h1 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-xl">
                Next-Level Gaming Gear
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg">
                Shop the hottest tech, exclusive accessories, and pro setups. Transform your play with gear trusted by top gamers.
              </p>
            </div>
            <div className="w-full md:w-1/2 flex justify-center items-center relative mt-10 md:mt-0" data-aos="fade-left">
              <div className="relative">
                <img
                  src="/products/rgb-mouse-pad.jpg"
                  alt="RGB Mouse Pad XL"
                  className="w-[340px] md:w-[420px] h-auto rounded-2xl shadow-xl border-4 border-purple-700/30 object-cover bg-black/10"
                  style={{ zIndex: 2 }}
                />
                <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-full opacity-30 blur-2xl z-0"></div>
                <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full opacity-30 blur-2xl z-0"></div>
              </div>
            </div>
          </div>
        </section>

        
        <div className="mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-2/3 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Scan For Loot..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800/80 border border-purple-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
            />
            {search && (
              <button 
                onClick={() => setSearch("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X size={18} className="text-gray-400 hover:text-white" />
              </button>
            )}
          </div>
          
          <div className="w-full md:w-auto flex gap-3">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 flex items-center gap-2 rounded-lg bg-gray-800/80 border border-purple-700/50 text-white hover:bg-gray-800 transition-colors"
            >
              <Filter size={18} />
              <span>Filters</span>
            </button>
            
            {(search || selectedCategory !== "All") && (
              <button 
                onClick={resetFilters}
                className="px-4 py-3 rounded-lg bg-gray-800/80 border border-purple-700/50 text-white hover:bg-gray-800 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>
        
        {/* CATEGORY FILTERS */}

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8 overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                      ${selectedCategory === category 
                        ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white' 
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* COUNTS RESULT */}
        <div className="mb-6 text-left">
          {!isLoading && (
            <p className="text-cyan-400 font-bold text-base gaming-font px-1 py-1 inline-block bg-gray-800/60 rounded-md shadow">
              {filtered.length} products found
            </p>
          )}
        </div>

        {/* PRODUCTS GRID */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {isLoading ? (

            // SKELETON LOADERS

            [...Array(PRODUCTS_PER_PAGE)].map((_, idx) => (
              <div 
                key={idx}
                className="bg-gray-800/50 rounded-2xl p-6 animate-pulse h-[380px]"
              >
                <div className="w-full h-40 bg-gray-700/50 rounded-xl mb-4"></div>
                <div className="h-6 bg-gray-700/50 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-700/50 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-700/50 rounded w-2/3 mb-6"></div>
                <div className="h-10 bg-gray-700/50 rounded w-full mt-auto"></div>
              </div>
            ))
          ) : filtered.length === 0 ? (

            // EMPTY RESULT STATE

            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 text-xl mb-4">No products found</div>
              <button
                onClick={resetFilters}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-md hover:from-purple-500 hover:to-cyan-400 transition-all"
              >
                Clear filters
              </button>
            </div>
          ) : (

            // PRODUCT CARDS

            paginatedProducts.map(product => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-gradient-to-br from-gray-800 via-gray-900 to-purple-900/20 rounded-2xl overflow-hidden flex flex-col shadow-lg hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] transition-all duration-300 group"
              >
                {/* PRODUCT IMAGE */}

                <div className="relative h-48 w-full overflow-hidden bg-gray-900">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      style={{ objectPosition: 'center' }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-50"></div>
                  <motion.button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleWishlist(product);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center z-10 hover:bg-black/80 transition-all cursor-pointer"
                    whileTap={{ scale: 0.8 }}
                    initial={{ scale: 1 }}
                  >
                    <motion.div
                      initial={isInWishlist(product.id) ? { scale: 1 } : { scale: 1 }}
                      animate={isInWishlist(product.id) ? {
                        scale: [1, 1.5, 0.8, 1.2, 1],
                        rotate: [0, 0, 0, 10, -10, 0],
                        transition: { duration: 0.5 }
                      } : { scale: 1 }}
                      whileHover={isInWishlist(product.id) ? { 
                        scale: [1, 1.2, 1],
                        transition: { duration: 0.3, repeat: 0 }
                      } : {}}

                      // PULSE ANIMATION FOR WISHLIST ICON

                      {...(isInWishlist(product.id) && {
                        animate: {
                          filter: ["drop-shadow(0 0 3px rgba(239,68,68,0.7))", "drop-shadow(0 0 5px rgba(239,68,68,0.9))", "drop-shadow(0 0 3px rgba(239,68,68,0.7))"],
                          transition: { duration: 2, repeat: Infinity, repeatType: "reverse" }
                        }
                      })}
                    >
                      <Heart 
                        size={20} 
                        className={isInWishlist(product.id) 
                          ? 'text-red-500 fill-red-500 filter drop-shadow-[0_0_3px_rgba(239,68,68,0.7)]' 
                          : 'text-white'
                        }
                      />
                    </motion.div>
                  </motion.button>
                </div>
                
                {/* PRODUCT INFO */}

                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-200">
                    {product.name}
                  </h2>
                  <p className="text-gray-400 text-sm mb-4 flex-grow">
                    {product.description}
                  </p>
                  
                  {/* CATEGORY TAG */}

                  <div className="mb-4">
                    <span className="inline-block bg-gray-800/80 text-xs text-cyan-400 px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                  
                  {/* PRICE & ADD TO CART */}

                  <div className="flex items-center justify-between mt-auto">
                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                      ₵{product.price}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddToCart(product)}
                      className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-purple-500 hover:to-cyan-400 transition-all cursor-pointer"
                    >
                      Equip Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* PAGINATION CONTROLS */}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className={`px-4 py-2 rounded-md bg-gray-800 text-white border border-purple-700/50 transition-colors ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'}`}
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPage(idx + 1)}
                className={`px-3 py-2 rounded-md border border-purple-700/50 text-white transition-colors ${page === idx + 1 ? 'bg-gradient-to-r from-purple-600 to-cyan-500' : 'bg-gray-800 hover:bg-purple-700'}`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded-md bg-gray-800 text-white border border-purple-700/50 transition-colors ${page === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'}`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
