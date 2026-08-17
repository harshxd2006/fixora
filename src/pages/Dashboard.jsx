import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Package, Heart, Clock, LogOut, Search, User, ChevronRight, Loader2, AlertCircle, ShoppingBag, ExternalLink, Camera, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { useWishlist } from '../hooks/useWishlist';
import { supabase } from '../services/supabase';
import { getProductsByIds } from '../data/products';
import { problems } from '../data/problems';
import { formatINR } from '../utils/formatPrice';
import ProductCard from '../components/ProductCard';
import ProblemCard from '../components/ProblemCard';
import CTAButton from '../components/CTAButton';
import ImageCropModal from '../components/ImageCropModal';

const Dashboard = () => {
  const { user, signOut, avatarUrl, uploadAvatar, removeAvatar } = useAuth();
  const { wishlistIds } = useWishlist();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [ordersError, setOrdersError] = useState(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  // Crop Modal state
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [selectedImageSrc, setSelectedImageSrc] = useState(null);

  const savedProducts = getProductsByIds(wishlistIds);
  const recentlyViewed = problems.slice(0, 3);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input element value so re-selecting same file triggers event
    if (fileInputRef.current) fileInputRef.current.value = '';

    // 1. Validate File Format (JPEG, PNG, WebP allowed. Reject videos, PDFs, SVGs, EXEs)
    const validMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const isSvg = file.name.toLowerCase().endsWith('.svg') || file.type.includes('svg');

    if (!validMimeTypes.includes(file.type) || isSvg) {
      toast.error('Invalid file format. Please select a JPG, PNG, or WebP image.');
      return;
    }

    // 2. Validate Source File Size Limit (10MB)
    const MAX_SOURCE_BYTES = 10 * 1024 * 1024;
    if (file.size > MAX_SOURCE_BYTES) {
      toast.error('Source image is too large. Please select an image under 10MB.');
      return;
    }

    // Create object URL for local crop preview (does NOT upload to Supabase yet)
    const objectUrl = URL.createObjectURL(file);
    setSelectedImageSrc(objectUrl);
    setCropModalOpen(true);
  };

  const handleCropCancel = () => {
    setCropModalOpen(false);
    if (selectedImageSrc) {
      URL.revokeObjectURL(selectedImageSrc);
    }
    setSelectedImageSrc(null);
  };

  const handleCropSave = async (croppedFile) => {
    setCropModalOpen(false);
    setUploadingAvatar(true);

    const { error } = await uploadAvatar(croppedFile);
    
    if (selectedImageSrc) {
      URL.revokeObjectURL(selectedImageSrc);
    }
    setSelectedImageSrc(null);
    setUploadingAvatar(false);

    if (error) {
      toast.error(error.message || 'Failed to upload cropped profile picture');
    } else {
      toast.success('Profile picture updated successfully!');
    }
  };

  const handleAvatarRemove = async () => {
    setUploadingAvatar(true);
    const { error } = await removeAvatar();
    setUploadingAvatar(false);

    if (error) {
      toast.error('Failed to remove profile picture');
    } else {
      toast.success('Profile picture removed');
    }
  };

  const fetchUserOrders = async () => {
    if (!user) return;
    setLoadingOrders(true);
    setOrdersError(null);

    try {
      // SECURITY: Efficient single query retrieving ONLY orders belonging to the current user with order_items
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .or(`user_id.eq.${user.id},customer_email.eq.${user.email}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      console.error('Error fetching user orders from Supabase:', err);
      setOrdersError("Couldn't load your orders.");
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, [user]);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  const fullName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'User';

  // Calculate Real Order Statistics from Supabase
  const totalOrdersCount = orders.length;
  const activeOrdersCount = orders.filter(o => o.order_status !== 'delivered' && o.order_status !== 'cancelled').length;
  const completedOrdersCount = orders.filter(o => o.order_status === 'delivered').length;

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
            
            {/* AVATAR WITH UPLOAD OVERLAY */}
            <div className="relative group">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleAvatarChange} 
                accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,image/svg+xml"
                className="hidden" 
              />
              
              <div className="w-20 h-20 rounded-full glass-card flex items-center justify-center overflow-hidden flex-shrink-0 relative border-2 border-white/20 shadow-md">
                {uploadingAvatar ? (
                  <Loader2 size={26} className="animate-spin text-[#E5B268]" />
                ) : avatarUrl ? (
                  <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[24px] font-bold text-white">{getInitials(fullName)}</span>
                )}

                {/* Hover Camera Icon Overlay */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingAvatar}
                  className="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white disabled:opacity-0 cursor-pointer"
                  title="Upload profile picture"
                >
                  <Camera size={20} className="text-[#E5B268]" />
                </button>
              </div>
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-1">
                Hey, {fullName}
              </h1>
              <div className="flex items-center gap-4 text-xs font-semibold text-white/70">
                <span>Here's what's happening with your Fixora setup.</span>
                <div className="flex items-center gap-3">
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingAvatar}
                    className="text-[#E5B268] hover:underline flex items-center gap-1 transition-colors disabled:opacity-50"
                  >
                    <Camera size={13} /> Change Photo
                  </button>
                  {avatarUrl && (
                    <button 
                      type="button"
                      onClick={handleAvatarRemove}
                      disabled={uploadingAvatar}
                      className="text-red-400 hover:underline flex items-center gap-1 transition-colors disabled:opacity-50"
                    >
                      <Trash2 size={13} /> Remove Photo
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="glass-card px-6 py-2.5 text-[14px] font-medium text-white hover:border-[#E5B268] transition-colors flex items-center gap-2"
            >
              <Camera size={16} className="text-[#E5B268]" /> Edit Photo
            </button>
            <button 
              onClick={handleLogout}
              className="glass-card w-11 h-11 flex items-center justify-center text-white/70 hover:text-red-400 hover:border-red-400/40 transition-colors"
              title="Log out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {/* REAL STATS ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="glass-card p-6">
            <div className="w-12 h-12 bg-[#E5B268] rounded-xl flex items-center justify-center mb-6">
              <Package size={24} className="text-ink" />
            </div>
            <div className="text-[32px] font-extrabold text-white leading-none mb-1">
              {loadingOrders ? '...' : activeOrdersCount}
            </div>
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
              <ShoppingBag size={24} className="text-ink" />
            </div>
            <div className="text-[32px] font-extrabold text-white leading-none mb-1">
              {loadingOrders ? '...' : totalOrdersCount}
            </div>
            <div className="text-[13px] text-white/70 font-semibold uppercase tracking-wider">Total Orders</div>
          </div>
        </div>

        {/* 1. REAL ORDER HISTORY SECTION */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
              <Package size={22} className="text-[#E5B268]" /> Order History
            </h2>
            {orders.length > 0 && (
              <span className="text-xs text-[#E5B268] bg-[#E5B268]/15 px-3 py-1 rounded-full border border-[#E5B268]/30 font-semibold">
                {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
              </span>
            )}
          </div>

          {/* LOADING STATE */}
          {loadingOrders ? (
            <div className="glass-card p-12 text-center text-white/70">
              <Loader2 size={32} className="animate-spin text-[#E5B268] mx-auto mb-3" />
              <p className="text-sm">Loading your orders from database...</p>
            </div>
          ) : ordersError ? (
            /* ERROR STATE */
            <div className="glass-card p-8 text-center text-white">
              <AlertCircle size={32} className="text-red-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">{ordersError}</h3>
              <p className="text-xs text-white/70 max-w-md mx-auto mb-6">
                We couldn't retrieve your order history. Please check your network connection and try again.
              </p>
              <button onClick={fetchUserOrders} className="btn-primary">
                Try Again
              </button>
            </div>
          ) : orders.length === 0 ? (
            /* EMPTY STATE */
            <div className="glass-card p-12 text-center">
              <Package size={36} className="mx-auto text-[#E5B268]/40 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No orders yet</h3>
              <p className="text-sm text-white/70 max-w-md mx-auto mb-6 leading-relaxed">
                Your Fixora solutions will appear here after you place an order.
              </p>
              <Link to="/products">
                <button className="btn-primary">Explore Solutions</button>
              </Link>
            </div>
          ) : (
            /* REAL ORDERS LIST */
            <div className="space-y-4">
              {orders.map((order) => {
                const totalUnits = (order.order_items || []).reduce((sum, item) => sum + item.quantity, 0);
                const formattedDate = new Date(order.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                });

                return (
                  <div
                    key={order.id}
                    onClick={() => navigate(`/order-confirmation?orderNumber=${encodeURIComponent(order.order_number)}&orderId=${order.id}`)}
                    className="glass-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer hover:border-[#E5B268]/50 transition-all group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-extrabold text-white group-hover:text-[#E5B268] transition-colors">
                          {order.order_number}
                        </span>
                        <span className="text-xs font-semibold text-white/60">
                          {formattedDate}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-white/70">
                        <span>
                          {totalUnits} {totalUnits === 1 ? 'item' : 'items'}
                        </span>
                        <span>•</span>
                        <span className="text-white font-semibold">
                          {formatINR(order.total_amount)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 border-white/10 pt-4 md:pt-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#E5B268] bg-[#E5B268]/20 px-3 py-1 rounded-full border border-[#E5B268]/30">
                          {order.order_status || 'Processing'}
                        </span>
                        <span className="text-xs font-bold text-white uppercase bg-white/10 px-2.5 py-1 rounded">
                          {order.payment_status || 'Pending'}
                        </span>
                      </div>

                      <div className="text-white/60 group-hover:text-white transition-colors flex items-center gap-1 text-xs font-semibold">
                        View Details <ExternalLink size={14} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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

        {/* IMAGE CROP MODAL */}
        <ImageCropModal 
          imageSrc={selectedImageSrc}
          isOpen={cropModalOpen}
          onClose={handleCropCancel}
          onCropSave={handleCropSave}
        />

      </div>
    </motion.div>
  );
};

export default Dashboard;
