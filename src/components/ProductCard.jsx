import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star, Tag } from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';
import { formatINR, getDiscount } from '../utils/formatPrice';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { isWishlisted, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const favorite = isWishlisted(product.id);

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
      className="card flex flex-col h-full overflow-hidden"
    >
      <div className="bg-gray-50 h-[220px] relative group overflow-hidden rounded-t-[20px]">
        <Link to={`/products/${product.id}`} className="block w-full h-full">
          <motion.img 
            whileHover={{ y: [-4, 4, -4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover rounded-xl"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&h=500&fit=crop';
            }}
          />
        </Link>
        
        {product.badge && (
          <div className={`absolute top-4 left-4 text-[11px] font-bold px-2.5 py-1 rounded-full ${
            product.badge.toLowerCase() === 'new' ? 'bg-lime text-ink' :
            product.badge.toLowerCase() === 'sale' ? 'bg-red-500 text-white' :
            'bg-ink text-white'
          }`}>
            {product.badge}
          </div>
        )}

        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleWishlist}
          className="absolute top-4 right-4 w-9 h-9 bg-white border border-border-light rounded-full flex items-center justify-center text-ink hover:shadow-card transition-shadow z-10"
        >
          <Heart size={18} className={favorite ? "fill-red-500 text-red-500" : ""} />
        </motion.button>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-[16px] font-semibold text-ink line-clamp-1 hover:underline">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-[20px] font-bold text-ink">{formatINR(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="text-[14px] text-[#9E9E98] line-through">
              {formatINR(product.originalPrice)}
            </span>
          )}
          {discount && (
            <span className="bg-[#DCFCE7] text-[#16A34A] text-[11px] font-bold px-2 py-0.5 rounded-full ml-auto">
              {discount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 mt-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                className={i < Math.floor(product.rating) ? "fill-[#F59E0B] text-[#F59E0B]" : "fill-border-light text-border-light"} 
              />
            ))}
          </div>
          <span className="text-[14px] font-semibold text-ink ml-1">{product.rating}</span>
          <span className="text-[14px] text-[#9E9E98]">({product.reviewCount})</span>
        </div>

        <p className="text-[13px] text-slate-muted mt-2 line-clamp-2">
          {product.shortSolution}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-2.5 mb-4">
          {product.tags?.slice(0, 2).map(tag => (
            <span key={tag} className="tag">
              <Tag size={10} />
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex gap-2 pt-4 border-t border-muted-white">
          <Link 
            to={`/products/${product.id}`}
            className="flex-1 bg-soft-white text-ink h-10 rounded-full flex items-center justify-center text-[14px] font-medium hover:bg-muted-white transition-colors"
          >
            Details
          </Link>
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
            className="flex-1 bg-ink text-white h-10 rounded-full flex items-center justify-center text-[14px] font-semibold hover:bg-[#1a1a1a] hover:shadow-card transition-all active:scale-[0.97]"
          >
            Buy Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
