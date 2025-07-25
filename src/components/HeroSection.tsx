'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import useSound from 'use-sound';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [playClick] = useSound('/sounds/click.mp3');
  const { addItem } = useCart();
  const { isAuthenticated, openAuthModal } = useAuth();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist(); 
  const router = useRouter();

  const featuredProducts = [
    {
      id: 1,
      name: 'Pro Gaming Headset',
      title: 'Pro Gaming Headset',
      price: 129.99,
      image: '/products/gaming-headset.jpg',
    },
    {
      id: 2,
      name: 'Mechanical Keyboard',
      title: 'Mechanical Keyboard',
      price: 159.99,
      image: '/products/mechanical-keyboard.jpg',
    },
    {
      id: 3,
      name: 'Razer Gaming Mouse',
      title: 'Gaming Mouse',
      price: 89.99,
      image: '/products/gaming-mouse.jpg',
    },
  ];

  const nextSlide = () => {
    playClick();
    setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
  };

  const prevSlide = () => {
    playClick();
    setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);



  return (
    <div className="flex flex-col w-full pt-20">
 
      <section className="w-full flex flex-col items-center justify-center py-16 md:py-32 bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950 rounded-3xl shadow-2xl mb-16 overflow-visible">
        <div className="flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto px-6 gap-12 overflow-visible">
          <motion.div
            className="flex-1 flex flex-col items-center md:items-start text-center md:text-left"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-xl"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.2, ease: 'easeOut' }}
            >
              Unleash Your Ultimate Gaming Power
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            >
              Discover pro-grade gear, immersive sound, and lightning-fast performance. Elevate your play and express your style with GameRight.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-4 justify-center md:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
            >
              <span className="inline-block bg-gray-800/70 text-cyan-300 px-4 py-2 rounded-full text-sm font-semibold">Free Shipping</span>
              <span className="inline-block bg-gray-800/70 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold">24/7 Support</span>
              <span className="inline-block bg-gray-800/70 text-fuchsia-300 px-4 py-2 rounded-full text-sm font-semibold">Exclusive Deals</span>
            </motion.div>
          </motion.div>
          <motion.div
            className="flex-1 flex justify-center items-center"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div className="relative group">
              <motion.div 
                className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-600 via-cyan-500 to-fuchsia-500 opacity-70"
                style={{ filter: "blur(8px)" }}
                animate={{
                  background: [
                    "linear-gradient(90deg, rgb(147, 51, 234, 0.7), rgb(6, 182, 212, 0.7), rgb(219, 39, 119, 0.7))",
                    "linear-gradient(180deg, rgb(6, 182, 212, 0.7), rgb(219, 39, 119, 0.7), rgb(147, 51, 234, 0.7))",
                    "linear-gradient(270deg, rgb(219, 39, 119, 0.7), rgb(147, 51, 234, 0.7), rgb(6, 182, 212, 0.7))",
                    "linear-gradient(360deg, rgb(147, 51, 234, 0.7), rgb(6, 182, 212, 0.7), rgb(219, 39, 119, 0.7))",
                  ],
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear"
                }}
              />
              <motion.img
                src="/backgrounds/hero-bg-3.jpg"
                alt="Hero Background"
                className="w-[480px] md:w-[640px] h-auto rounded-3xl shadow-2xl object-cover bg-black/10 relative z-10 cursor-pointer"
                style={{ zIndex: 2 }}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        </div>
      </section>
     
      <div className="w-full h-[400px] bg-gray-900 py-12 mb-16">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 mb-8 tracking-tight drop-shadow-lg text-center">Legendary Gear</h2>
        
          <div className="w-full overflow-hidden">
            <div className="w-full h-[280px] flex items-center relative overflow-visible">
              <InfiniteMarquee 
                featuredProducts={featuredProducts} 
                isAuthenticated={isAuthenticated} 
                openAuthModal={openAuthModal} 
                addItem={addItem} 
                playClick={playClick}
                isInWishlist={isInWishlist}
                addToWishlist={addToWishlist}
                removeFromWishlist={removeFromWishlist}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


type FeaturedProduct = {
  id: number;
  name: string;
  title: string;
  price: number;
  image: string;
};

interface InfiniteMarqueeProps {
  featuredProducts: FeaturedProduct[];
  isAuthenticated: boolean;
  openAuthModal: (action: string) => void;
  addItem: (item: { id: number; name: string; price: number; image: string }) => void;
  playClick: () => void;
  isInWishlist: (id: number) => boolean;
  addToWishlist: (item: { id: number; name: string; price: number; image: string }) => void;
  removeFromWishlist: (id: number) => void;
}

function InfiniteMarquee({ 
  featuredProducts, 
  isAuthenticated, 
  openAuthModal, 
  addItem, 
  playClick, 
  isInWishlist,
  addToWishlist,
  removeFromWishlist
}: InfiniteMarqueeProps) {
  const marqueeRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const CARD_WIDTH = 320 + 20;
  const totalCards = featuredProducts.length * 3;
  const totalWidth = CARD_WIDTH * totalCards;

 
  const handleToggleWishlist = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    product: FeaturedProduct
  ) => {
    e.stopPropagation(); 
    playClick();
    
    if (!isAuthenticated) {
      openAuthModal('add-to-wishlist');
      return;
    }
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
  };

  useEffect(() => {
    let frame: number;
    let start: number;
    let lastTimestamp = 0;
    
    function animate(ts: number) {
      if (isPaused) {
        
        lastTimestamp = ts;
        frame = requestAnimationFrame(animate);
        return;
      }
      
      if (!start) {
        
        start = ts - lastTimestamp;
      }
      
      const elapsed = ts - start;
      const px = (elapsed * 25) / 1000;
      const newOffset = -((px) % (CARD_WIDTH * featuredProducts.length));
      setOffset(newOffset);
      frame = requestAnimationFrame(animate);
    }
    
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [featuredProducts.length, isPaused]);

  return (
    <div
      ref={marqueeRef}
      className="flex gap-5"
      style={{
        transform: `translateX(${offset}px)`,
        minWidth: totalWidth,
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {[...featuredProducts, ...featuredProducts, ...featuredProducts].map((product, idx) => (
        <motion.div
          key={idx}
          className="relative w-80 h-[240px] rounded-xl overflow-hidden flex-shrink-0 perspective-800 group"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/90 to-purple-900/80 backdrop-blur-sm border border-white/10 z-0"></div>
          
          <img
            src={product.image}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-cover opacity-80 scale-105 group-hover:scale-110 transition-all duration-700 z-5"
          />
          
          <motion.div 
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-fuchsia-500 z-20"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "linear"
            }}
            style={{ backgroundSize: '200% 100%' }}
          />
          
          <div className="absolute top-0 right-0 w-12 h-12 z-20">
            <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
              <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 rotate-45 bg-cyan-400/80 shadow-lg w-16 h-3"></div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between">
            
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-cyan-300 bg-cyan-900/40 px-2 py-1 rounded-full">Featured</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={(e) => handleToggleWishlist(e, product)}
                  className="w-8 h-8 bg-gray-800/70 rounded-full flex items-center justify-center backdrop-blur-sm text-white/80 hover:text-white border border-white/10 cursor-pointer"
                >
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill={isInWishlist(product.id) ? "currentColor" : "none"} 
                    className={isInWishlist(product.id) ? "text-red-500" : "text-white/80"}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 20.25C12 20.25 2.625 15 2.625 8.62501C2.625 7.49803 3.01546 6.40585 3.72996 5.53431C4.44445 4.66277 5.43884 4.06657 6.54909 3.84455C7.65934 3.62254 8.81657 3.78749 9.82279 4.31132C10.829 4.83516 11.6284 5.68494 12.0001 6.70001L12 6.70004C12.3714 5.68494 13.1708 4.83514 14.177 4.31132C15.1832 3.78749 16.3405 3.62254 17.4507 3.84456C18.5609 4.06659 19.5553 4.6628 20.2698 5.53434C20.9843 6.40589 21.3748 7.49805 21.375 8.62501C21.375 15 12 20.25 12 20.25Z" 
                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>
              </div>
              
              <h3 className="text-xl font-bold text-white mt-3 mb-1 tracking-tight">{product.title}</h3>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-3 h-3 ${i < 4 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
                <span className="text-xs text-gray-400 ml-1">(42)</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">₵{product.price}</p>
                <span className="text-xs text-green-400">In Stock</span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
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
                  playClick();
                }}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 
                           text-white py-2 px-4 rounded-md font-medium flex items-center justify-center gap-2
                           transition-all duration-200 shadow-[0_0_15px_rgba(139,92,246,0.3)] group cursor-pointer"
              >
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.75 5.25H6L8.25 15H18.75L21 7.5H6.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.25 20.25C9.07843 20.25 9.75 19.5784 9.75 18.75C9.75 17.9216 9.07843 17.25 8.25 17.25C7.42157 17.25 6.75 17.9216 6.75 18.75C6.75 19.5784 7.42157 20.25 8.25 20.25Z" stroke="white" strokeWidth="1.5"/>
                  <path d="M18.75 20.25C19.5784 20.25 20.25 19.5784 20.25 18.75C20.25 17.9216 19.5784 17.25 18.75 17.25C17.9216 17.25 17.25 17.9216 17.25 18.75C17.25 19.5784 17.9216 20.25 18.75 20.25Z" stroke="white" strokeWidth="1.5"/>
                </svg>
                Equip Now
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default HeroSection;
