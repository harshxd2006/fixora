import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Package, Plus, Sparkles } from 'lucide-react';
import { formatINR } from '../utils/formatPrice';

const BundleCard = ({ bundle }) => {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-[24px] p-6 lg:p-8 flex flex-col h-full shadow-card relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Package size={120} className="text-white" />
      </div>

      <div className="flex items-center gap-2 bg-white/10 w-fit px-3 py-1.5 rounded-full mb-6">
        <Sparkles size={14} className="text-lime" />
        <span className="text-xs font-semibold text-white uppercase tracking-wider">AI Bundle</span>
      </div>

      <h3 className="text-[24px] font-bold text-white mb-2 relative z-10">
        {bundle.name}
      </h3>
      <p className="text-[#a0a0a0] text-[15px] mb-8 relative z-10">
        {bundle.description}
      </p>

      <div className="bg-black/50 rounded-2xl p-4 mb-8 border border-white/5 relative z-10">
        <p className="text-xs font-medium text-[#6B6B6B] uppercase tracking-wider mb-4">Includes</p>
        <div className="space-y-4">
          {bundle.items.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white/50">
                  <Package size={16} />
                </div>
                <span className="text-[14px] text-white/90 font-medium">{item.name}</span>
              </div>
              {index < bundle.items.length - 1 && (
                <Plus size={14} className="text-white/20 ml-2" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-white/10 flex items-end justify-between relative z-10">
        <div>
          <p className="text-xs text-[#a0a0a0] mb-1">Bundle Price</p>
          <div className="flex items-baseline gap-2">
            <span className="text-[24px] font-bold text-white">{formatINR(bundle.price)}</span>
            <span className="text-[14px] text-[#6B6B6B] line-through">{formatINR(bundle.originalPrice)}</span>
          </div>
        </div>
        
        <Link to={`/products/${bundle.items[0]?.id || ''}`}>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full bg-lime text-ink flex items-center justify-center hover:brightness-110 transition-all"
          >
            <ArrowRight size={20} />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default BundleCard;
