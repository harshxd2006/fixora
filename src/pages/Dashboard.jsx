import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Heart, Clock, LogOut, Search, User, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useWishlist } from '../hooks/useWishlist';
import { getProductsByIds } from '../data/products';
import { problems } from '../data/problems';
import ProductCard from '../components/ProductCard';
import ProblemCard from '../components/ProblemCard';
import CTAButton from '../components/CTAButton';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { wishlistIds } = useWishlist();
  const navigate = useNavigate();
  
  const savedProducts = getProductsByIds(wishlistIds);
  const recentlyViewed = problems.slice(0, 3); // Mock recent problems

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  const fullName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'User';

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-12 pb-24 bg-transparent text-white min-h-screen"
    >
      <div className="container mx-auto max-w-7xl px-6">
        
        {/* WELCOME ROW */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full glass-card flex items-center justify-center overflow-hidden">
              {user?.user_metadata?.avatar_url ? (
                <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[24px] font-bold text-white">{getInitials(fullName)}</span>
              )}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-1">
                Hey, {fullName}
              </h1>
              <p className="text-base text-white/70">Here's what's happening.</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button className="glass-card px-6 py-2.5 text-[14px] font-medium text-white hover:border-[#E5B268] transition-colors">
              Edit Profile
            </button>
            <button 
              onClick={handleLogout}
              className="glass-card w-11 h-11 flex items-center justify-center text-white/70 hover:text-red-400 hover:border-red-400/40 transition-colors"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {/* STATS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass-card p-6">
            <div className="w-12 h-12 bg-[#E5B268] rounded-xl flex items-center justify-center mb-6">
              <Package size={24} className="text-ink" />
            </div>
            <div className="text-[32px] font-extrabold text-white leading-none mb-1">0</div>
            <div className="text-[13px] text-white/70 font-semibold uppercase tracking-wider">Active Orders</div>
          </div>
          
          <div className="glass-card p-6">
            <div className="w-12 h-12 bg-[#E5B268] rounded-xl flex items-center justify-center mb-6">
              <Heart size={24} className="text-ink" />
            </div>
            <div className="text-[32px] font-extrabold text-white leading-none mb-1">{wishlistIds.length}</div>
            <div className="text-[13px] text-white/70 font-semibold uppercase tracking-wider">Saved Items</div>
          </div>

          <div className="glass-card p-6">
            <div className="w-12 h-12 bg-[#E5B268] rounded-xl flex items-center justify-center mb-6">
              <Search size={24} className="text-ink" />
            </div>
            <div className="text-[32px] font-extrabold text-white leading-none mb-1">12</div>
            <div className="text-[13px] text-white/70 font-semibold uppercase tracking-wider">Problems Explored</div>
          </div>
        </div>

        {/* WISHLIST PREVIEW */}
        <div className="mb-16">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-2xl font-bold text-white tracking-tight">Saved Products</h2>
            <Link to="/wishlist" className="text-[14px] font-semibold text-white/80 flex items-center gap-1 hover:text-[#E5B268] transition-colors">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          
          {savedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {savedProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="glass-card p-12 text-center">
              <Heart size={32} className="mx-auto text-white/30 mb-4" />
              <h3 className="text-[18px] font-semibold text-white mb-2">No saved items yet</h3>
              <p className="text-[14px] text-white/70 mb-6">Explore products and save the ones you like.</p>
              <Link to="/products">
                <CTAButton variant="secondary">Browse Products</CTAButton>
              </Link>
            </div>
          )}
        </div>

        {/* RECENTLY VIEWED */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white tracking-tight mb-8">Recently Explored Problems</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentlyViewed.map((problem) => (
              <ProblemCard key={problem.id} problem={problem} />
            ))}
          </div>
        </div>

        {/* ACCOUNT SETTINGS CARD */}
        <div className="glass-card p-8 md:p-10 max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <User size={24} className="text-[#E5B268]" />
            <h2 className="text-2xl font-bold text-white tracking-tight">Account Settings</h2>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[12px] font-semibold text-[#E5B268] uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  defaultValue={fullName}
                  className="w-full h-12 glass-input"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[12px] font-semibold text-[#E5B268] uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  defaultValue={user?.email || ''}
                  disabled
                  className="w-full h-12 glass-input opacity-60 cursor-not-allowed"
                />
              </div>
            </div>
            
            <div className="pt-4">
              <button className="btn-primary">
                Save Changes
              </button>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default Dashboard;
