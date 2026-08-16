import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Star, ShoppingBag, Truck, RotateCcw, ShieldCheck, Check } from 'lucide-react';
import { getProductById } from '../data/products';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../context/CartContext';
import { formatINR, getDiscount } from '../utils/formatPrice';
import NotFound from '../components/NotFound';
import CTAButton from '../components/CTAButton';
import { getLivePrices } from '../services/priceService';

const ProductDetail = () => {
  const { id } = useParams();
  const product = getProductById(id);
  const { isWishlisted, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  
  if (!product) return <NotFound />;

  const favorite = isWishlisted(product.id);
  const discount = getDiscount(product.originalPrice, product.price);
  
  const [activeImage, setActiveImage] = useState(0);
  const images = [product.image, `https://picsum.photos/seed/${product.id}b/600/600`, `https://picsum.photos/seed/${product.id}c/600/600`];

  const [loadingPrices, setLoadingPrices] = useState(true);
  const [platformPrices, setPlatformPrices] = useState(null);

  useEffect(() => {
    if (product) {
      setLoadingPrices(true);
      const prices = getLivePrices(product.id, product.price);
      setPlatformPrices(prices);
      setTimeout(() => {
        setLoadingPrices(false);
      }, 150);
    }
  }, [product]);

  const toggleWishlist = () => {
    if (favorite) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-12 pb-24 bg-transparent text-white min-h-screen"
    >
      <div className="container mx-auto max-w-7xl px-6">
        <Link to="/products" className="inline-flex items-center gap-2 text-[14px] font-medium text-white/70 hover:text-[#E5B268] transition-colors mb-8">
          <ArrowLeft size={16} /> Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Images Section */}
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="glass-card overflow-hidden h-[460px] sm:h-[500px] flex items-center justify-center relative"
            >
              {product.badge && (
                <div className="absolute top-6 left-6 text-[12px] font-bold px-3 py-1.5 rounded-full bg-[#E5B268] text-ink">
                  {product.badge}
                </div>
              )}
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={images[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-cover rounded-2xl"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&h=500&fit=crop';
                }}
              />
            </motion.div>
            
            <div className="grid grid-cols-3 gap-4">
              {images.map((img, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`glass-card p-2 h-[100px] sm:h-[120px] transition-all ${
                    activeImage === i ? 'border-[#E5B268] ring-1 ring-[#E5B268]' : 'hover:border-white/40'
                  }`}
                >
                  <img 
                    src={img} 
                    alt="" 
                    className="w-full h-full object-cover rounded-xl"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&h=500&fit=crop';
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      className={i < Math.floor(product.rating) ? "fill-[#E5B268] text-[#E5B268]" : "fill-white/20 text-white/20"} 
                    />
                  ))}
                </div>
                <span className="text-[15px] font-bold text-white">{product.rating}</span>
                <span className="text-[15px] text-white/70 underline underline-offset-4 cursor-pointer hover:text-[#E5B268] transition-colors">
                  {product.reviewCount} Reviews
                </span>
              </div>

              <div className="flex items-end gap-3 mb-8 pb-8 border-b border-white/15">
                <span className="text-3xl sm:text-4xl font-extrabold text-white leading-none">{formatINR(product.price)}</span>
                {product.originalPrice > product.price && (
                  <span className="text-[18px] text-white/50 line-through mb-1">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
                {discount && (
                  <span className="glass-pill text-[#E5B268] border-[#E5B268]/40 text-[12px] font-bold px-3 py-1 mb-1 ml-2">
                    {discount}
                  </span>
                )}
              </div>

              <div className="space-y-6 mb-10">
                <p className="text-base text-white/80 leading-relaxed">
                  {product.longDescription || product.shortSolution}
                </p>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-[#E5B268]/20 text-[#E5B268] border border-[#E5B268]/40 flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="stroke-[3]" />
                    </div>
                    <span className="text-[15px] text-white font-medium">Premium build quality</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-[#E5B268]/20 text-[#E5B268] border border-[#E5B268]/40 flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="stroke-[3]" />
                    </div>
                    <span className="text-[15px] text-white font-medium">AI-verified solution</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-[#E5B268]/20 text-[#E5B268] border border-[#E5B268]/40 flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="stroke-[3]" />
                    </div>
                    <span className="text-[15px] text-white font-medium">100% satisfaction guarantee</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                  onClick={() => addToCart(product)}
                  className="btn-primary flex-1 h-[54px] text-base"
                >
                  <ShoppingBag size={20} /> Add to Cart
                </button>
                <button 
                  onClick={toggleWishlist}
                  className={`h-[54px] px-8 rounded-full border flex items-center justify-center font-bold transition-all
                    ${favorite 
                      ? 'border-[#E5B268] text-[#E5B268] bg-[#E5B268]/15' 
                      : 'border-white/20 text-white bg-white/10 hover:bg-white/20'
                    }
                  `}
                >
                  <Heart size={20} className={`mr-2 ${favorite ? 'fill-current' : ''}`} /> 
                  {favorite ? 'Saved' : 'Save'}
                </button>
              </div>

              {/* External Purchase Options */}
              <div className="pt-6 border-t border-white/15 mb-10">
                <h3 className="text-[13px] font-semibold text-[#E5B268] uppercase tracking-wider mb-4">Available on other platforms</h3>
                
                {loadingPrices || !platformPrices ? (
                  <div className="flex flex-col gap-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-[64px] glass-card animate-pulse flex items-center justify-between p-4">
                        <div className="w-24 h-4 bg-white/20 rounded"></div>
                        <div className="w-20 h-4 bg-white/20 rounded"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {['amazon', 'flipkart', 'croma'].map(platform => {
                      const platPrice = platformPrices[platform];
                      const diff = platPrice - product.price;
                      const diffPercent = Math.abs(Math.round((diff / product.price) * 100));
                      const isCheaper = diff < 0;
                      
                      let url = '#';
                      const encodedName = encodeURIComponent(product.name);
                      if (platform === 'amazon') url = `https://www.amazon.in/s?k=${encodedName}`;
                      else if (platform === 'flipkart') url = `https://www.flipkart.com/search?q=${encodedName}`;
                      else if (platform === 'croma') url = `https://www.croma.com/searchB?q=${encodedName}%3Arelevance&text=${encodedName}`;

                      return (
                        <div key={platform} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 glass-card hover:border-[#E5B268]/60 transition-all gap-2">
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-white capitalize">
                              {platform}
                            </span>
                            {diff !== 0 && (
                              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${isCheaper ? 'bg-[#E5B268]/20 text-[#E5B268]' : 'bg-red-500/20 text-red-300'}`}>
                                {isCheaper ? `↓ ${diffPercent}% cheaper` : `↑ ${diffPercent}% higher`}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-semibold text-white">{formatINR(platPrice)}</span>
                            <a 
                              href={url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[12px] font-bold text-ink px-4 py-1.5 bg-[#E5B268] rounded-full hover:brightness-110 transition-colors cursor-pointer"
                            >
                              View Deal
                            </a>
                          </div>
                        </div>
                      );
                    })}
                    <div className="text-[11px] text-white/50 text-center mt-2 font-medium">
                      Prices updated daily • Last synced: {platformPrices.lastUpdated}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/15 pt-8">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full glass-card flex items-center justify-center text-white">
                    <Truck size={18} />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-white">Free Delivery</h4>
                    <p className="text-[12px] text-white/70">On orders over ₹999</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full glass-card flex items-center justify-center text-white">
                    <RotateCcw size={18} />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-white">Easy Returns</h4>
                    <p className="text-[12px] text-white/70">30-day policy</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full glass-card flex items-center justify-center text-white">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-white">Warranty</h4>
                    <p className="text-[12px] text-white/70">1 year included</p>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
