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
      className="pt-12 pb-24 bg-warm-white min-h-screen"
    >
      <div className="container mx-auto max-w-7xl px-6">
        <Link to="/products" className="inline-flex items-center gap-2 text-[14px] font-medium text-slate-muted hover:text-ink transition-colors mb-8">
          <ArrowLeft size={16} /> Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Images Section */}
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 rounded-[32px] overflow-hidden border border-border-light h-[500px] flex items-center justify-center relative shadow-sm"
            >
              {product.badge && (
                <div className={`absolute top-6 left-6 text-[12px] font-bold px-3 py-1.5 rounded-full ${
                  product.badge.toLowerCase() === 'new' ? 'bg-lime text-ink' :
                  product.badge.toLowerCase() === 'sale' ? 'bg-red-500 text-white' :
                  'bg-ink text-white'
                }`}>
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
                  className={`bg-white rounded-2xl p-4 border h-[120px] transition-all ${
                    activeImage === i ? 'border-ink ring-1 ring-ink shadow-sm' : 'border-border-light hover:border-slate-400'
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
              <h1 className="text-[32px] md:text-[40px] font-bold text-ink leading-tight tracking-tight mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      className={i < Math.floor(product.rating) ? "fill-[#F59E0B] text-[#F59E0B]" : "fill-border-light text-border-light"} 
                    />
                  ))}
                </div>
                <span className="text-[15px] font-bold text-ink">{product.rating}</span>
                <span className="text-[15px] text-slate-muted underline underline-offset-4 cursor-pointer hover:text-ink transition-colors">
                  {product.reviewCount} Reviews
                </span>
              </div>

              <div className="flex items-end gap-3 mb-8 pb-8 border-b border-border-light">
                <span className="text-[40px] font-bold text-ink leading-none">{formatINR(product.price)}</span>
                {product.originalPrice > product.price && (
                  <span className="text-[20px] text-[#9E9E98] line-through mb-1">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
                {discount && (
                  <span className="bg-[#DCFCE7] text-[#16A34A] text-[13px] font-bold px-2.5 py-1 rounded-full mb-2 ml-2">
                    {discount}
                  </span>
                )}
              </div>

              <div className="space-y-6 mb-10">
                <p className="text-[16px] text-slate-muted leading-relaxed">
                  {product.longDescription || product.shortSolution}
                </p>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="stroke-[3]" />
                    </div>
                    <span className="text-[15px] text-ink font-medium">Premium build quality</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="stroke-[3]" />
                    </div>
                    <span className="text-[15px] text-ink font-medium">AI-verified solution</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="stroke-[3]" />
                    </div>
                    <span className="text-[15px] text-ink font-medium">100% satisfaction guarantee</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <CTAButton 
                  className="flex-1 h-[56px] text-[16px]"
                  onClick={() => addToCart(product)}
                >
                  <ShoppingBag size={20} className="mr-2" /> Add to Cart
                </CTAButton>
                <button 
                  onClick={toggleWishlist}
                  className={`h-[56px] px-8 rounded-full border-2 flex items-center justify-center font-bold transition-all
                    ${favorite 
                      ? 'border-red-500 text-red-500 bg-red-50' 
                      : 'border-border-light text-ink bg-white hover:border-ink hover:bg-soft-white'
                    }
                  `}
                >
                  <Heart size={20} className={`mr-2 ${favorite ? 'fill-current' : ''}`} /> 
                  {favorite ? 'Saved' : 'Save'}
                </button>
              </div>

              {/* External Purchase Options */}
              <div className="pt-6 border-t border-border-light mb-10">
                <h3 className="text-[13px] font-semibold text-ink uppercase tracking-wider mb-4">Available on other platforms</h3>
                
                {loadingPrices || !platformPrices ? (
                  <div className="flex flex-col gap-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-[74px] bg-white border border-border-light rounded-xl animate-pulse flex items-center justify-between p-4">
                        <div className="w-24 h-5 bg-gray-200 rounded"></div>
                        <div className="w-20 h-5 bg-gray-200 rounded"></div>
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
                        <div key={platform} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border border-border-light rounded-xl hover:border-ink hover:shadow-sm transition-all group gap-2">
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-ink group-hover:text-lime transition-colors capitalize">
                              {platform}
                            </span>
                            {diff !== 0 && (
                              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${isCheaper ? 'bg-[#DCFCE7] text-[#16A34A]' : 'bg-red-100 text-red-600'}`}>
                                {isCheaper ? `↓ ${diffPercent}% cheaper` : `↑ ${diffPercent}% higher`}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-semibold text-ink">{formatINR(platPrice)}</span>
                            <a 
                              href={url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[12px] font-bold text-ink px-3 py-1.5 bg-soft-white rounded-full group-hover:bg-ink group-hover:text-white transition-colors cursor-pointer"
                            >
                              View Deal
                            </a>
                          </div>
                        </div>
                      );
                    })}
                    <div className="text-[11px] text-slate-muted text-center mt-2 font-medium">
                      Prices updated daily • Last synced: {platformPrices.lastUpdated}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-border-light pt-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white border border-border-light flex items-center justify-center text-ink shadow-sm">
                    <Truck size={20} />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-ink">Free Delivery</h4>
                    <p className="text-[12px] text-slate-muted">On orders over ₹999</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white border border-border-light flex items-center justify-center text-ink shadow-sm">
                    <RotateCcw size={20} />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-ink">Easy Returns</h4>
                    <p className="text-[12px] text-slate-muted">30-day policy</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white border border-border-light flex items-center justify-center text-ink shadow-sm">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-ink">Warranty</h4>
                    <p className="text-[12px] text-slate-muted">1 year included</p>
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
