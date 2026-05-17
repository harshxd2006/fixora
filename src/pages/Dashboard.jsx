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
      className="pt-12 pb-24 bg-warm-white min-h-screen"
    >
      <div className="container mx-auto max-w-7xl px-6">
        
        {/* WELCOME ROW */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-white border border-border-light shadow-sm flex items-center justify-center overflow-hidden">
              {user?.user_metadata?.avatar_url ? (
                <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[24px] font-bold text-ink">{getInitials(fullName)}</span>
              )}
            </div>
            <div>
              <h1 className="text-[32px] md:text-[40px] font-bold text-ink tracking-tight mb-1">
                Hey, {fullName}
              </h1>
              <p className="text-[16px] text-slate-muted">Here's what's happening.</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button className="bg-white border border-border-light px-6 py-2.5 rounded-full text-[14px] font-medium text-ink shadow-sm hover:bg-soft-white transition-colors">
              Edit Profile
            </button>
            <button 
              onClick={handleLogout}
              className="bg-white border border-border-light w-11 h-11 rounded-full flex items-center justify-center text-slate-muted hover:text-red-500 hover:border-red-200 transition-colors"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {/* STATS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-border-light rounded-[24px] p-6 shadow-sm">
            <div className="w-12 h-12 bg-lime rounded-xl flex items-center justify-center mb-6 shadow-sm">
              <Package size={24} className="text-ink" />
            </div>
            <div className="text-[32px] font-bold text-ink leading-none mb-1">0</div>
            <div className="text-[14px] text-slate-muted font-medium uppercase tracking-wider">Active Orders</div>
          </div>
          
          <div className="bg-white border border-border-light rounded-[24px] p-6 shadow-sm">
            <div className="w-12 h-12 bg-lime rounded-xl flex items-center justify-center mb-6 shadow-sm">
              <Heart size={24} className="text-ink" />
            </div>
            <div className="text-[32px] font-bold text-ink leading-none mb-1">{wishlistIds.length}</div>
            <div className="text-[14px] text-slate-muted font-medium uppercase tracking-wider">Saved Items</div>
          </div>

          <div className="bg-white border border-border-light rounded-[24px] p-6 shadow-sm">
            <div className="w-12 h-12 bg-lime rounded-xl flex items-center justify-center mb-6 shadow-sm">
              <Search size={24} className="text-ink" />
            </div>
            <div className="text-[32px] font-bold text-ink leading-none mb-1">12</div>
            <div className="text-[14px] text-slate-muted font-medium uppercase tracking-wider">Problems Explored</div>
          </div>
        </div>

        {/* WISHLIST PREVIEW */}
        <div className="mb-16">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-[24px] font-bold text-ink tracking-tight">Saved Products</h2>
            <Link to="/wishlist" className="text-[14px] font-semibold text-ink flex items-center gap-1 hover:text-lime transition-colors">
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
            <div className="bg-white border border-border-light rounded-[24px] p-12 text-center shadow-sm">
              <Heart size={32} className="mx-auto text-border-light mb-4" />
              <h3 className="text-[18px] font-semibold text-ink mb-2">No saved items yet</h3>
              <p className="text-[14px] text-slate-muted mb-6">Explore products and save the ones you like.</p>
              <Link to="/products">
                <CTAButton variant="secondary">Browse Products</CTAButton>
              </Link>
            </div>
          )}
        </div>

        {/* RECENTLY VIEWED */}
        <div className="mb-16">
          <h2 className="text-[24px] font-bold text-ink tracking-tight mb-8">Recently Explored Problems</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentlyViewed.map((problem) => (
              <ProblemCard key={problem.id} problem={problem} />
            ))}
          </div>
        </div>

        {/* ACCOUNT SETTINGS CARD */}
        <div className="bg-white border border-border-light rounded-[24px] p-8 md:p-10 shadow-sm max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <User size={24} className="text-ink" />
            <h2 className="text-[24px] font-bold text-ink tracking-tight">Account Settings</h2>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-ink uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  defaultValue={fullName}
                  className="w-full h-12 bg-soft-white border border-border-light rounded-xl px-4 text-[14px] text-ink focus:bg-white focus:border-ink outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-ink uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  defaultValue={user?.email || ''}
                  disabled
                  className="w-full h-12 bg-muted-white border border-border-light rounded-xl px-4 text-[14px] text-slate-muted outline-none cursor-not-allowed"
                />
              </div>
            </div>
            
            <div className="pt-4">
              <button className="bg-ink text-white px-8 py-3.5 rounded-full font-semibold text-[14px] hover:bg-[#1a1a1a] transition-colors shadow-sm">
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
