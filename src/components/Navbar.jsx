import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Heart, Menu, X, User, ArrowLeft } from 'lucide-react';
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
  const navigate = useNavigate();
  const { user, isAuthenticated, avatarUrl } = useAuth();
  const { wishlistCount } = useWishlist();
  const { cartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
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
        className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-500 ease-in-out flex items-center border-b ${
          isScrolled
            ? 'bg-[#0A0A0A]/85 backdrop-blur-xl border-white/10 shadow-lg'
            : 'bg-transparent backdrop-blur-sm border-transparent'
        }`}
      >
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between h-full">

          {/* LEFT SECTION: Logo & Mobile Back Button */}
          <div className="flex items-center gap-2">
            {location.pathname !== '/store' && location.pathname !== '/' && location.pathname !== '/intro' && (
              <button
                onClick={() => navigate(-1)}
                className="md:hidden text-white p-1 -ml-1 mr-1 hover:text-lime transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
            )}
            <Link to="/store" className="flex-shrink-0">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-[22px] font-extrabold text-white tracking-tight"
              >
                Fixora
              </motion.span>
            </Link>
          </div>

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
              className="relative w-10 h-10 rounded-full flex items-center justify-center text-white hover:text-[#E5B268] hover:bg-white/10 transition-colors"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#E5B268] rounded-full border-2 border-black"></span>
              )}
            </motion.button>

            <Link to="/wishlist">
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="relative w-10 h-10 rounded-full flex items-center justify-center text-white hover:text-[#E5B268] hover:bg-white/10 transition-colors"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#E5B268] rounded-full border-2 border-black"></span>
                )}
              </motion.button>
            </Link>

            <div className="ml-2 pl-2 border-l border-white/15">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <motion.div
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full p-1 pr-3 shadow-sm hover:bg-white/20 transition-all text-white"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt="User" className="w-full h-full object-cover" />
                      ) : (
                        <User size={16} className="text-white/70" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-white max-w-[100px] truncate">
                      {user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'User'}
                    </span>
                  </motion.div>
                </Link>
              ) : (
                <Link to="/login">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center bg-[#E5B268] text-ink rounded-full px-5 py-2 text-sm font-bold hover:brightness-105 transition-all"
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
              className="relative p-2 text-white hover:text-[#E5B268] transition-colors"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#E5B268] rounded-full border-2 border-black"></span>
              )}
            </button>
            <button
              className="text-white p-2"
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
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] md:hidden"
            />
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 w-[300px] bg-[#0A0A0A]/95 backdrop-blur-2xl border-l border-white/15 text-white z-[70] shadow-2xl flex flex-col md:hidden"
            >
              <div className="p-6 border-b border-white/15 flex justify-between items-center bg-white/5">
                <span className="text-xl font-extrabold text-white tracking-tight">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="relative w-full">
                  <SearchBar placeholder="Search problems..." />
                </div>

                <ul className="space-y-2">
                  {NAV_LINKS.map(link => {
                    const isActive = location.pathname === link.path;
                    return (
                      <li key={link.path}>
                        <Link
                          to={link.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block text-base font-semibold px-4 py-3 rounded-xl transition-all ${
                            isActive 
                              ? 'text-[#E5B268] bg-[#E5B268]/15 border border-[#E5B268]/30 font-bold' 
                              : 'text-white/80 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {link.name}
                        </Link>
                      </li>
                    );
                  })}
                  <li>
                    <Link 
                      to="/wishlist" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between text-base font-semibold px-4 py-3 rounded-xl transition-all ${
                        location.pathname === '/wishlist'
                          ? 'text-[#E5B268] bg-[#E5B268]/15 border border-[#E5B268]/30 font-bold'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <span>Wishlist</span>
                      {wishlistCount > 0 && (
                        <span className="text-xs font-bold bg-[#E5B268] text-[#0A0A0A] px-2 py-0.5 rounded-full">
                          {wishlistCount}
                        </span>
                      )}
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="p-6 border-t border-white/15 bg-white/5">
                {isAuthenticated ? (
                  <Link 
                    to="/dashboard" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/10 border border-white/15 hover:bg-white/20 transition-all text-white"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden flex-shrink-0">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt="User" className="w-full h-full object-cover" />
                      ) : (
                        <User size={20} className="text-white/70" />
                      )}
                    </div>
                    <div className="overflow-hidden">
                      <div className="font-bold text-white text-sm truncate">
                        {user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'User'}
                      </div>
                      <div className="text-xs text-white/60 truncate max-w-[170px]">{user?.email}</div>
                    </div>
                  </Link>
                ) : (
                  <Link 
                    to="/login" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn-primary block w-full text-center py-3 text-sm font-bold"
                  >
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
