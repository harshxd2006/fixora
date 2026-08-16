import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star, Tag } from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';
import { formatINR, getDiscount } from '../utils/formatPrice';
import { useCart } from '../context/CartContext';
import { getLivePrices } from '../services/priceService';

const ProductCard = ({ product }) => {
  const { isWishlisted, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const favorite = isWishlisted(product.id);
  
  const [lowestPriceInfo, setLowestPriceInfo] = useState(null);

  useEffect(() => {
    const prices = getLivePrices(product.id, product.price);
    let minPrice = Infinity;
    let minPlatform = '';
    
    ['amazon', 'flipkart', 'croma'].forEach(platform => {
      if (prices[platform] < minPrice) {
        minPrice = prices[platform];
        minPlatform = platform;
      }
    });
    
    if (minPrice < Infinity) {
      setLowestPriceInfo({
        platform: minPlatform.charAt(0).toUpperCase() + minPlatform.slice(1),
        price: minPrice
      });
    }
  }, [product.id, product.price]);

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const discount = getDiscount(product.originalPrice, product.price);

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white/10 backdrop-blur-lg border border-white/15 rounded-[24px] flex flex-col h-full overflow-hidden text-white shadow-card hover:bg-white/15 transition-all group"
    >
      <div className="bg-black/30 h-[220px] relative group overflow-hidden rounded-t-[20px]">
        <Link to={`/products/${product.id}`} className="block w-full h-full">
          <motion.img 
            whileHover={{ y: [-4, 4, -4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            src={product.image} 
            alt={product.name} 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover rounded-xl opacity-90 group-hover:opacity-100 transition-opacity"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&h=500&fit=crop';
            }}
          />
        </Link>
        
        {product.badge && (
          <div className={`absolute top-4 left-4 text-[11px] font-bold px-2.5 py-1 rounded-full ${
            product.badge.toLowerCase() === 'new' ? 'bg-[#E5B268] text-ink shadow-sm' :
            'bg-white/10 text-white border border-white/15 backdrop-blur-md'
          }`}>
            {product.badge}
          </div>
        )}

        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleWishlist}
          className="absolute top-4 right-4 w-9 h-9 bg-black/50 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all z-10 backdrop-blur-md"
        >
          <Heart size={18} className={favorite ? "fill-[#E5B268] text-[#E5B268]" : ""} />
        </motion.button>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-[16px] font-semibold text-white line-clamp-1 hover:text-[#E5B268] transition-colors">
            {product.name}
          </h3>
        </Link>

        {product.searchTerm && (
          <div className="mt-2 inline-block bg-[#E5B268]/20 text-[#E5B268] text-[11px] font-bold px-2 py-0.5 rounded border border-[#E5B268]/30 w-fit">
            Best match for: "{product.searchTerm}"
          </div>
        )}
        
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-[20px] font-bold text-white">{formatINR(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="text-[14px] text-white/50 line-through">
              {formatINR(product.originalPrice)}
            </span>
          )}
          {discount && (
            <span className="bg-[#E5B268]/20 text-[#E5B268] border border-[#E5B268]/30 text-[11px] font-bold px-2 py-0.5 rounded-full ml-auto">
              {discount}
            </span>
          )}
        </div>
        {lowestPriceInfo && (
          <div className="text-[12px] text-white/60 mt-1 font-medium">
            Available from {formatINR(lowestPriceInfo.price)} on {lowestPriceInfo.platform}
          </div>
        )}

        <div className="flex items-center gap-1.5 mt-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                className={i < Math.floor(product.rating) ? "fill-[#E5B268] text-[#E5B268]" : "fill-white/20 text-white/20"} 
              />
            ))}
          </div>
          <span className="text-[14px] font-semibold text-white ml-1">{product.rating}</span>
          <span className="text-[14px] text-white/50">({product.reviewCount})</span>
        </div>

        <p className="text-[13px] text-white/70 mt-2 line-clamp-2">
          {product.shortSolution}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-2.5 mb-4">
          {product.tags?.slice(0, 2).map(tag => (
            <span key={tag} className="bg-white/10 text-white/70 border border-white/15 text-[11px] font-medium px-2.5 py-1 rounded-full inline-flex items-center gap-1">
              <Tag size={10} />
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex gap-2 pt-4 border-t border-white/10">
          <Link 
            to={`/products/${product.id}`}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/15 h-10 rounded-full flex items-center justify-center text-[14px] font-medium transition-colors"
          >
            Details
          </Link>
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
            className="flex-1 bg-[#E5B268] text-ink font-bold h-10 rounded-full flex items-center justify-center text-[14px] hover:brightness-105 shadow-[0_0_15px_rgba(229,178,104,0.3)] transition-all active:scale-[0.97]"
          >
            Buy Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
