'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { ShoppingCart, X, Menu, Home, Package, Gamepad, LayoutGrid, User, LogOut } from 'lucide-react';

// NAV-LINKS

const navLinks = [
  { href: '/', label: '- Lobby', icon: <Home size={20} /> },
  { href: '/products', label: '- Loadout', icon: <Package size={20} /> },
  { href: '/cart', label: '- Arsenal', icon: <ShoppingCart size={20} /> },
];

// MOBILE MENU LINKS

const mobileExtraLinks = [
  { href: '/#top-games', label: 'Top Games', icon: <Gamepad size={20} /> },
  { href: '/#trending', label: 'Trending', icon: <Package size={20} /> },
  { href: '/#categories', label: 'Categories', icon: <LayoutGrid size={20} /> },
];

const Navigation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);
  
  // PREVENT BODY SCROLL WHEN MENU IS OPEN 

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleLinkClick = (href: string) => {
    setIsMenuOpen(false);
    router.push(href);
  };
  
  const handleLogout = () => {
    logout();
    router.push('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-black/60 backdrop-blur-xl shadow-lg border-b border-purple-900/40">
     
      <div className="h-[3px] w-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-cyan-500 animate-pulse"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 select-none">
              <span className="bg-gradient-to-r from-purple-500 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent text-3xl font-extrabold tracking-widest drop-shadow-[0_0_8px_rgba(168,85,247,0.7)] animate-pulse">
                GameRight
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center justify-center flex-1 mx-4">
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative flex items-center gap-1 text-lg font-medium ${
                    pathname === link.href ? 'text-cyan-400' : 'text-white hover:text-cyan-300'
                  } transition-colors duration-200`}
                >
                  {link.icon}
                  {link.label}
                  {link.href === '/cart' && itemCount > 0 && (
                    <span className="absolute -top-2 -right-5 bg-fuchsia-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {itemCount}
                    </span>
                  )}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </div>
            
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link href="/account" className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors">
                  <User size={18} className="text-cyan-400" />
                  <span className="text-sm font-medium truncate max-w-[100px]">
                    {user?.name || 'User'}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-white hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  <LogOut size={18} />
                  <span className="text-sm">Retreat</span>
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="text-white hover:text-cyan-300 transition-colors text-lg"
                >
                  Enter Battle
                </Link>
                <button
                  onClick={() => router.push('/signup')}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-semibold transition-all cursor-pointer"
                >
                  Enlist Now
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-cyan-400 hover:text-fuchsia-400 focus:outline-none p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-[calc(100%-1px)] left-0 right-0 z-40"
          >
            <div className="h-screen bg-black backdrop-blur-xl shadow-2xl border-t border-purple-900/40">
              <div className="flex flex-col p-6 pt-10 space-y-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
                
                {navLinks.map((link) => (
                  <motion.div
                    key={link.href}
                    whileTap={{ scale: 0.97 }}
                    className="w-full"
                  >
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className="w-full flex items-center justify-between p-4 rounded-lg bg-gray-800/50 text-white hover:bg-gray-800/80 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-cyan-400">{link.icon}</span>
                        <span className="text-xl font-medium">{link.label}</span>
                      </div>
                      {link.href === '/cart' && itemCount > 0 && (
                        <span className="bg-fuchsia-600 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center font-bold">
                          {itemCount}
                        </span>
                      )}
                    </button>
                  </motion.div>
                ))}

                <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent my-2"></div>
                
               
                {mobileExtraLinks.map((link) => (
                  <motion.div
                    key={link.href}
                    whileTap={{ scale: 0.97 }}
                    className="w-full"
                  >
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className="w-full flex items-center gap-3 p-4 rounded-lg bg-gray-800/50 text-white hover:bg-gray-800/80 transition-colors"
                    >
                      <span className="text-purple-400">{link.icon}</span>
                      <span className="text-xl font-medium">{link.label}</span>
                    </button>
                  </motion.div>
                ))}
                
                <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent my-2"></div>
                
                {isAuthenticated ? (
                  <>
                    <motion.div whileTap={{ scale: 0.97 }} className="w-full">
                      <button
                        onClick={() => handleLinkClick('/account')}
                        className="w-full flex items-center justify-between p-4 rounded-lg bg-gray-800/50 text-white hover:text-cyan-400 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-cyan-400"><User size={20} /></span>
                          <span className="text-xl font-medium">{user?.name || 'User'}</span>
                        </div>
                      </button>
                    </motion.div>
                    <motion.div whileTap={{ scale: 0.97 }} className="w-full">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 p-4 rounded-lg bg-gray-800/50 text-white hover:bg-gray-800/80 transition-colors cursor-pointer"
                      >
                        <span className="text-red-400"><LogOut size={20} /></span>
                        <span className="text-xl font-medium">Retreat</span>
                      </button>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div whileTap={{ scale: 0.97 }} className="w-full">
                      <button
                        onClick={() => handleLinkClick('/signin')}
                        className="w-full flex items-center justify-center p-4 rounded-lg bg-gray-800/50 text-white hover:bg-gray-800/80 transition-colors"
                      >
                        <span className="text-xl font-medium">Enter Battle</span>
                      </button>
                    </motion.div>
                    
                    <motion.div whileTap={{ scale: 0.97 }} className="w-full">
                      <button
                        onClick={() => handleLinkClick('/signup')}
                        className="w-full flex items-center justify-center p-4 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold hover:from-purple-500 hover:to-cyan-400 transition-all"
                      >
                        <span className="text-xl font-bold">Enlist Now</span>
                      </button>
                    </motion.div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
