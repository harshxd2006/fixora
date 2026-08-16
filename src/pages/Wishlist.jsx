import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';
import { getProductsByIds } from '../data/products';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import SectionHeading from '../components/SectionHeading';
import CTAButton from '../components/CTAButton';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlistIds, loading } = useWishlist();
  const savedProducts = getProductsByIds(wishlistIds);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-12 pb-24 bg-transparent text-white min-h-screen"
    >
      <div className="container mx-auto max-w-7xl px-6">
        
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12 bg-[#E5B268]/20 border border-[#E5B268]/40 rounded-full flex items-center justify-center">
            <Heart size={24} className="text-[#E5B268] fill-[#E5B268]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Your Wishlist</h1>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : savedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-16 text-center max-w-2xl mx-auto"
          >
            <div className="w-20 h-20 glass-card rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart size={32} className="text-white/40" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Your wishlist is empty</h2>
            <p className="text-base text-white/70 mb-8 max-w-md mx-auto">
              Save items you're interested in by clicking the heart icon on any product.
            </p>
            <Link to="/products" className="inline-block">
              <CTAButton variant="primary">
                <ShoppingBag size={18} className="mr-2" /> Browse Products
              </CTAButton>
            </Link>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Wishlist;
