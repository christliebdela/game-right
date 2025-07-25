"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { Heart, ShoppingBag, User, Edit, Trash, ShoppingCart } from "lucide-react";

export default function AccountPage() {
  const { isAuthenticated, user } = useAuth();
  const [tab, setTab] = useState("profile");
  
  // REDIRECT IF NOT AUTHENTICATED
  
  useEffect(() => {
    if (!isAuthenticated && typeof window !== 'undefined') {
      window.location.href = '/signin';
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-900 py-16 px-4 pt-32 flex items-center justify-center">
      <div className="text-white text-center">Loading...</div>
    </div>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-900 py-16 px-4 pt-32">
      <div className="max-w-5xl mx-auto bg-gray-900 rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl md:text-5xl font-black mb-8 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-xl gaming-font text-center">My Account</h1>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8">
          <button 
            onClick={() => setTab("profile")} 
            className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold text-sm transition-all ${tab === "profile" ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
          >
            <User size={16} />
            Profile
          </button>
          <button 
            onClick={() => setTab("orders")} 
            className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold text-sm transition-all ${tab === "orders" ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
          >
            <ShoppingBag size={16} />
            Order History
          </button>
          <button 
            onClick={() => setTab("wishlist")} 
            className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold text-sm transition-all ${tab === "wishlist" ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
          >
            <Heart size={16} />
            Wishlist
          </button>
        </div>
        <div>
          {tab === "profile" && <ProfileSection />}
          {tab === "orders" && <OrderHistorySection />}
          {tab === "wishlist" && <WishlistSection />}
        </div>
      </div>
    </main>
  );
}

function ProfileSection() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [avatarIndex, setAvatarIndex] = useState(1);
  const [name, setName] = useState(user?.name || 'User');
  const [email, setEmail] = useState(user?.email || 'user@email.com');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('+233 555 123 456');
  const [address, setAddress] = useState('123 Game Street, Accra');
  
  const handleSave = () => {
    setEditing(false);

    // DATA SUBMISSION LOGIC HERE
  };
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 rounded-xl bg-gray-800/80 mb-6">
      <div className="flex flex-col md:flex-row md:items-start gap-8">
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <div className="relative">
            <img 
              src={`/avatars/avatar-${avatarIndex}.png`} 
              alt="Avatar" 
              className="w-32 h-32 rounded-full border-4 border-cyan-400 shadow-lg" 
            />
            {editing && (
              <div className="absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center">
                <div className="bg-black/70 p-2 rounded-lg">
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map((idx) => (
                      <button
                        key={idx}
                        onClick={() => setAvatarIndex(idx)}
                        className={`w-8 h-8 rounded-full overflow-hidden border-2 ${avatarIndex === idx ? 'border-cyan-400' : 'border-transparent'}`}
                      >
                        <img src={`/avatars/avatar-${idx}.png`} alt={`Avatar ${idx}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-2xl font-bold text-white">{name}</h2>
            <p className="text-gray-400">Premium Member</p>
          </div>
        </div>
        
        <div className="w-full md:w-2/3 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-cyan-400 mb-4 gaming-font flex items-center gap-3">
            <User className="text-cyan-400" size={24} />
            Profile Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">Name</label>
              {editing ? (
                <input 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  className="w-full px-3 py-2 rounded bg-gray-900 text-white border border-purple-500 focus:border-cyan-400 focus:outline-none transition-colors" 
                />
              ) : (
                <p className="text-white font-bold">{name}</p>
              )}
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-1">Email</label>
              {editing ? (
                <input 
                  type="email"
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  className="w-full px-3 py-2 rounded bg-gray-900 text-white border border-purple-500 focus:border-cyan-400 focus:outline-none transition-colors" 
                />
              ) : (
                <p className="text-white font-bold">{email}</p>
              )}
            </div>
            
            {editing && (
              <div>
                <label className="block text-gray-400 text-sm mb-1">Password</label>
                <input 
                  type="password"
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  placeholder="Leave blank to keep current" 
                  className="w-full px-3 py-2 rounded bg-gray-900 text-white border border-purple-500 focus:border-cyan-400 focus:outline-none transition-colors" 
                />
              </div>
            )}
            
            <div>
              <label className="block text-gray-400 text-sm mb-1">Phone</label>
              {editing ? (
                <input 
                  value={phone} 
                  onChange={e => setPhone(e.target.value)} 
                  className="w-full px-3 py-2 rounded bg-gray-900 text-white border border-purple-500 focus:border-cyan-400 focus:outline-none transition-colors" 
                />
              ) : (
                <p className="text-white font-bold">{phone}</p>
              )}
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-gray-400 text-sm mb-1">Address</label>
              {editing ? (
                <textarea 
                  value={address} 
                  onChange={e => setAddress(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 rounded bg-gray-900 text-white border border-purple-500 focus:border-cyan-400 focus:outline-none transition-colors resize-none" 
                />
              ) : (
                <p className="text-white font-bold">{address}</p>
              )}
            </div>
            
            <div className="md:col-span-2">
              <p className="text-gray-400 text-sm">Member Since: <span className="text-white font-bold">July 2024</span></p>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => editing ? handleSave() : setEditing(true)} 
              className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-md text-sm font-medium hover:from-purple-500 hover:to-cyan-400 transition-all cursor-pointer"
            >
              {editing ? 'Save Changes' : (
                <>
                  <Edit size={16} />
                  Edit Profile
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function OrderHistorySection() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // MOCK ORDER DATA

  const orders = [
    {
      id: 'GU-123456',
      date: 'July 22, 2025',
      status: 'Delivered',
      total: 2450,
      items: [
        {
          id: 5,
          name: 'Gaming Chair Pro',
          price: 1200,
          quantity: 1,
          image: '/products/gaming-chair.jpg'
        },
        {
          id: 6,
          name: 'Streaming Microphone',
          price: 550,
          quantity: 1,
          image: '/products/streaming-mic.jpg'
        },
        {
          id: 3,
          name: 'Razer Gaming Mouse',
          price: 350,
          quantity: 2,
          image: '/products/gaming-mouse.jpg'
        }
      ],
      shipping: 'Express Delivery',
      paymentMethod: 'Mobile Money'
    },
    {
      id: 'GU-654321',
      date: 'July 15, 2025',
      status: 'Processing',
      total: 1050,
      items: [
        {
          id: 2,
          name: 'Mechanical Keyboard',
          price: 400,
          quantity: 1,
          image: '/products/mechanical-keyboard.jpg'
        },
        {
          id: 4,
          name: 'RGB Mouse Pad XL',
          price: 320,
          quantity: 1,
          image: '/products/rgb-mouse-pad.jpg'
        },
        {
          id: 7,
          name: 'LED Strip Gaming',
          price: 330,
          quantity: 1,
          image: '/products/led-strip.jpg'
        }
      ],
      shipping: 'Standard Delivery',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'GU-789012',
      date: 'June 28, 2025',
      status: 'Delivered',
      total: 950,
      items: [
        {
          id: 1,
          name: 'Pro Gaming Headset',
          price: 350,
          quantity: 1,
          image: '/products/gaming-headset.jpg'
        },
        {
          id: 3,
          name: 'Razer Gaming Mouse',
          price: 180,
          quantity: 1,
          image: '/products/gaming-mouse.jpg'
        },
        {
          id: 4,
          name: 'RGB Mouse Pad XL',
          price: 320,
          quantity: 1,
          image: '/products/rgb-mouse-pad.jpg'
        }
      ],
      shipping: 'Express Delivery',
      paymentMethod: 'Mobile Money'
    }
  ];
  
  const toggleOrderDetails = (orderId: string) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 rounded-xl bg-gray-800/80 mb-6">
      <h2 className="text-xl font-bold text-purple-400 mb-4 gaming-font flex items-center gap-3">
        <ShoppingBag size={24} className="text-purple-400" />
        Order History
      </h2>
      
      {orders.length === 0 ? (
        <div className="text-center py-10 bg-gray-900/50 rounded-xl">
          <p className="text-gray-400 text-lg mb-4">You haven't placed any orders yet.</p>
          <a href="/products" className="px-5 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-md text-sm font-medium hover:from-purple-500 hover:to-cyan-400 transition-all cursor-pointer">
            Start Shopping
          </a>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-gray-900 rounded-xl overflow-hidden">
              <div 
                className="p-4 flex flex-col md:flex-row justify-between items-center gap-4 cursor-pointer hover:bg-gray-800 transition-colors"
                onClick={() => toggleOrderDetails(order.id)}
              >
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="relative w-16 h-16 overflow-hidden">
                    {order.items.slice(0, 2).map((item, idx) => (
                      <div 
                        key={idx} 
                        className="absolute w-12 h-12 rounded-lg overflow-hidden border border-purple-400"
                        style={{ top: idx * 4, left: idx * 4, zIndex: 10 - idx }}
                      >
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                    ))}
                    {order.items.length > 2 && (
                      <div className="absolute top-6 left-6 w-12 h-12 bg-black/80 rounded-lg border border-purple-400 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">+{order.items.length - 1}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="text-white font-bold block">Order #{order.id}</span>
                    <span className="text-gray-400 text-sm">{order.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                  <span className="text-gray-300 font-bold">₵{order.total.toLocaleString()}</span>
                  <span className={`${
                    order.status === 'Delivered' ? 'text-cyan-400' : 
                    order.status === 'Processing' ? 'text-purple-400' : 
                    order.status === 'Shipped' ? 'text-green-400' : 'text-yellow-400'
                  } font-medium`}>{order.status}</span>
                  <button className="flex items-center gap-1 px-3 py-1 rounded text-white text-xs font-medium">
                    {expandedOrder === order.id ? 'Hide Details' : 'View Details'}
                  </button>
                </div>
              </div>
              
            
              {expandedOrder === order.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-gray-800 overflow-hidden"
                >
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-3">Order Items</h3>
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 bg-gray-800/60 p-2 rounded-lg">
                          <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded border border-purple-400" />
                          <div className="flex-1">
                            <h4 className="text-white font-bold">{item.name}</h4>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400 text-sm">Qty: {item.quantity}</span>
                              <span className="text-cyan-400 font-bold">₵{item.price}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-800 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="text-gray-400 text-sm mb-1">Shipping Method:</h4>
                        <p className="text-white">{order.shipping}</p>
                      </div>
                      <div>
                        <h4 className="text-gray-400 text-sm mb-1">Payment Method:</h4>
                        <p className="text-white">{order.paymentMethod}</p>
                      </div>
                      <div>
                        <h4 className="text-gray-400 text-sm mb-1">Total:</h4>
                        <p className="text-cyan-400 font-bold text-lg">₵{order.total.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function WishlistSection() {
  const { items: wishlistItems, removeItem: removeFromWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();
  
  type WishlistItem = {
    id: number;
    name: string;
    price: number;
    image: string;
    description?: string;
  };

  const handleAddToCart = (item: WishlistItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
  };
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 rounded-xl bg-gray-800/80 mb-6">
      <h2 className="text-xl font-bold text-fuchsia-400 mb-6 gaming-font flex items-center gap-3">
        <Heart className="text-fuchsia-400" size={24} />
        My Quest Log ({wishlistItems.length} items)
      </h2>
      
      {wishlistItems.length === 0 ? (
        <div className="text-center py-10 bg-gray-900/50 rounded-xl">
          <p className="text-gray-400 text-lg mb-4">Your quest log is empty.</p>
          <p className="text-gray-500 mb-6">Add gear to your quest log by clicking the heart icon on gear cards.</p>
          <a href="/products" className="px-5 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-md text-sm font-medium hover:from-purple-500 hover:to-cyan-400 transition-all cursor-pointer">
            Browse Loadout
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlistItems.map((item) => (
            <motion.div 
              key={item.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-gray-900 rounded-xl overflow-hidden group hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all duration-300"
            >
              <div className="relative h-36 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                <motion.button 
                  onClick={() => removeFromWishlist(item.id)} 
                  className="absolute top-2 right-2 w-8 h-8 bg-black/70 rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 cursor-pointer"
                  whileTap={{ scale: 0.8 }}
                  whileHover={{ 
                    backgroundColor: "rgba(239, 68, 68, 0.8)",
                    color: "rgba(255, 255, 255, 1)"
                  }}
                >
                  <motion.div
                    animate={{
                      rotate: [0, -10, 10, -5, 5, 0],
                      transition: { duration: 0.4 }
                    }}
                  >
                    <Trash size={16} />
                  </motion.div>
                </motion.button>
              </div>
              
              <div className="p-4">
                <h3 className="text-white font-bold text-lg mb-1 group-hover:text-cyan-400 transition-colors">
                  {item.name}
                </h3>
                
                {item.description && (
                  <p className="text-gray-400 text-sm line-clamp-2 mb-2">
                    {item.description}
                  </p>
                )}
                
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-bold bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
                    ₵{item.price}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(168,85,247,0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddToCart(item)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-md text-xs font-medium hover:from-purple-500 hover:to-cyan-400 transition-all cursor-pointer"
                  >
                    <motion.div 
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                    >
                      <ShoppingCart size={14} />
                    </motion.div>
                    Equip Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
