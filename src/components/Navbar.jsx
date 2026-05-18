import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Heart, Menu, X, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../context/CartContext';
import { NAV_LINKS } from '../utils/constants';
import SearchBar from './SearchBar';
import CartDrawer from './CartDrawer';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const { wishlistCount } = useWishlist();
  const { cartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    }
  };

  const menuVariants = {
    closed: { x: '100%' },
    open: { 
      x: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    }
  };

  return (
    <>
      <motion.nav 
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className="fixed top-0 left-0 right-0 z-50 h-16 glass-nav border-b border-border-light flex items-center"
      >
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between h-full">
          
          {/* LEFT SECTION: Logo */}
          <Link to="/store" className="flex-shrink-0">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[22px] font-extrabold text-ink tracking-tight"
            >
              Fixora
            </motion.span>
          </Link>

          {/* CENTER SECTION: Search */}
          <div className="hidden md:flex flex-1 justify-center px-8">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="w-full max-w-[380px]"
            >
              <SearchBar placeholder="Search problems..." />
            </motion.div>
          </div>

          {/* RIGHT SECTION: Icons & User */}
          <div className="hidden md:flex items-center gap-2">
            <motion.button 
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsCartOpen(true)}
              className="relative w-10 h-10 rounded-full flex items-center justify-center text-ink hover:bg-muted-white transition-colors"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-lime rounded-full border-2 border-warm-white"></span>
              )}
            </motion.button>
            
            <Link to="/wishlist">
              <motion.button 
                whileTap={{ scale: 0.97 }}
                className="relative w-10 h-10 rounded-full flex items-center justify-center text-ink hover:bg-muted-white transition-colors"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute 1 top-1 right-1 w-2.5 h-2.5 bg-lime rounded-full border-2 border-warm-white"></span>
                )}
              </motion.button>
            </Link>

            <div className="ml-2 pl-2 border-l border-border-light">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <motion.div 
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 bg-white border border-border-light rounded-full p-1 pr-3 shadow-sm hover:shadow-card transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-tag-bg flex items-center justify-center overflow-hidden">
                      {user?.user_metadata?.avatar_url ? (
                        <img src={user.user_metadata.avatar_url} alt="User" className="w-full h-full object-cover" />
                      ) : (
                        <User size={16} className="text-slate-muted" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-ink max-w-[100px] truncate">
                      {user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'User'}
                    </span>
                  </motion.div>
                </Link>
              ) : (
                <Link to="/login">
                  <motion.div 
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center bg-white border border-border-light rounded-full px-4 py-2 text-sm font-medium text-ink shadow-sm hover:shadow-card transition-all"
                  >
                    Sign In
                  </motion.div>
                </Link>
              )}
            </div>
          </div>

          {/* MOBILE TOGGLE & CART */}
          <div className="md:hidden flex items-center gap-2">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-ink hover:text-lime transition-colors"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-lime rounded-full border-2 border-warm-white"></span>
              )}
            </button>
            <button 
              className="text-ink p-2"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-ink/20 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.div 
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-white z-[70] shadow-2xl flex flex-col md:hidden"
            >
              <div className="p-6 border-b border-border-light flex justify-between items-center">
                <span className="text-xl font-bold text-ink">Menu</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-slate-muted hover:text-ink transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="relative w-full">
                  <input 
                    type="text" 
                    placeholder="Search..."
                    className="w-full h-11 bg-warm-white border border-border-light rounded-xl pl-4 pr-10 outline-none text-ink text-sm focus:border-ink transition-colors"
                  />
                  <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-muted" />
                </div>

                <ul className="space-y-4">
                  {NAV_LINKS.map(link => (
                    <li key={link.path}>
                      <Link 
                        to={link.path} 
                        className={`block text-lg font-medium transition-colors ${
                          location.pathname === link.path ? 'text-ink' : 'text-slate-muted hover:text-ink'
                        }`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link to="/wishlist" className="block text-lg font-medium text-slate-muted hover:text-ink transition-colors">
                      Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="p-6 border-t border-border-light bg-warm-white">
                {isAuthenticated ? (
                  <Link to="/dashboard" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white border border-border-light flex items-center justify-center overflow-hidden">
                      {user?.user_metadata?.avatar_url ? (
                        <img src={user.user_metadata.avatar_url} alt="User" className="w-full h-full object-cover" />
                      ) : (
                        <User size={20} className="text-slate-muted" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-ink">Dashboard</div>
                      <div className="text-xs text-slate-muted truncate max-w-[150px]">{user?.email}</div>
                    </div>
                  </Link>
                ) : (
                  <Link to="/login" className="block w-full py-3 bg-ink text-white text-center rounded-xl font-medium">
                    Sign In
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CART DRAWER */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
