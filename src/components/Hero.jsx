import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Grid, Heart } from 'lucide-react';
import { useProblemSearch } from '../hooks/useProblemSearch';
import { useState } from 'react';
import SearchBar from './SearchBar';

const Hero = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 32, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  const heading1 = "Stop Suffering.".split(" ");
  const heading2 = "Start Fixing.".split(" ");

  return (
    <section className="pt-12 pb-16 px-6 container mx-auto max-w-7xl min-h-screen flex items-center">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="w-full flex flex-col md:grid md:grid-cols-7 gap-4"
      >
        
        {/* CARD 1 — MAIN HERO */}
        <motion.div 
          variants={itemVariants}
          className="col-span-7 lg:col-span-5 row-span-2 bg-soft-white rounded-3xl p-8 lg:p-10 min-h-[460px] relative overflow-hidden"
        >
          {/* Top Left Tag */}
          <div className="inline-flex items-center gap-2 bg-white border border-border-light rounded-full px-3.5 py-1.5 mb-6 relative z-10">
            <Grid size={14} className="text-ink" />
            <span className="text-xs font-medium text-slate-muted">Problem-First Shopping</span>
          </div>

          {/* Heading */}
          <div className="relative z-10">
            <h1 className="text-[40px] md:text-[64px] font-extrabold text-ink leading-[1.05] tracking-[-0.03em] flex flex-wrap gap-x-4">
              {heading1.map((word, i) => (
                <motion.span key={i} variants={wordVariants} className="inline-block">{word}</motion.span>
              ))}
            </h1>
            <h1 className="text-[40px] md:text-[64px] font-extrabold text-ink leading-[1.05] tracking-[-0.03em] flex flex-wrap gap-x-4 mt-2">
              {heading2.map((word, i) => (
                <motion.span key={i} variants={wordVariants} className="inline-block">{word}</motion.span>
              ))}
            </h1>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center gap-4 mt-5 relative z-10">
            <span className="text-[32px] font-light text-[#D0D0CA]">01</span>
            <div className="w-10 md:w-20 h-px bg-[#D0D0CA]"></div>
            <ArrowRight size={16} className="text-[#D0D0CA]" />
            <span className="text-sm text-slate-muted font-medium max-w-[200px] md:max-w-none">
              Describe your problem, AI finds the fix
            </span>
          </div>

          {/* CTA Row */}
          <div className="flex items-center gap-3 mt-8 relative z-10">
            <Link to="/problems">
              <motion.button 
                whileTap={{ scale: 0.97 }}
                className="bg-lime text-ink px-6 py-3.5 rounded-full font-semibold flex items-center gap-2 shadow-btn hover:brightness-105 transition-all"
              >
                View All Problems <ArrowRight size={18} />
              </motion.button>
            </Link>
            <Link to="/products">
              <motion.button 
                whileTap={{ scale: 0.97 }}
                className="w-[52px] h-[52px] bg-ink text-white rounded-full flex items-center justify-center hover:bg-[#1a1a1a] hover:scale-105 transition-all"
              >
                <ArrowUpRight size={22} />
              </motion.button>
            </Link>
          </div>

          {/* Product Image Animation */}
          <div className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 w-[280px] h-[280px]">
            <motion.div 
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-full h-full"
            >
              <img src="https://picsum.photos/seed/ergonomic/400/400" alt="Product" className="w-full h-full object-contain drop-shadow-2xl mix-blend-multiply" />
            </motion.div>
            {/* Shadow */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[120px] h-[16px] bg-black/10 rounded-[100%] blur-sm"></div>
            
            {/* Decorative dots */}
            <motion.div animate={{ y: [-4, 4, -4] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-10 -left-6 w-3 h-3 bg-ink/10 rounded-full"></motion.div>
            <motion.div animate={{ y: [4, -4, 4] }} transition={{ duration: 3.5, repeat: Infinity }} className="absolute bottom-20 -right-4 w-2 h-2 bg-ink/10 rounded-full"></motion.div>
            <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-1/4 right-0 w-2.5 h-2.5 bg-ink/10 rounded-full"></motion.div>
          </div>
        </motion.div>

        {/* CARD 2 — TOP RIGHT */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.98 }}
          className="col-span-7 md:col-span-3 lg:col-span-2 bg-white border border-border-light rounded-[20px] p-5 min-h-[200px] flex flex-col justify-between shadow-card hover:shadow-card-hover transition-all relative cursor-pointer"
          onClick={() => navigate('/products')}
        >
          <div className="flex justify-between items-start">
            <h3 className="text-base font-semibold text-ink max-w-[120px]">Ergonomic Setup Focus</h3>
            <div className="w-8 h-8 bg-ink rounded-full flex items-center justify-center text-white">
              <ArrowUpRight size={16} />
            </div>
          </div>
          <div className="self-end mt-4">
            <img src="https://picsum.photos/seed/chair/120/120" alt="Chair" className="w-[100px] h-[100px] object-cover rounded-xl" />
          </div>
        </motion.div>

        {/* CARD 3 — BOTTOM RIGHT */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.98 }}
          className="col-span-7 md:col-span-4 lg:col-span-2 bg-white border border-border-light rounded-[20px] p-5 min-h-[200px] flex flex-col justify-between shadow-card hover:shadow-card-hover transition-all relative cursor-pointer"
          onClick={() => navigate('/products')}
        >
           <div className="flex justify-between items-start">
            <h3 className="text-base font-semibold text-ink max-w-[120px]">Cable Management Kit</h3>
            <div className="w-8 h-8 bg-ink rounded-full flex items-center justify-center text-white">
              <ArrowUpRight size={16} />
            </div>
          </div>
          <div className="self-end mt-4">
            <img src="https://picsum.photos/seed/cables/120/120" alt="Cables" className="w-[100px] h-[100px] object-cover rounded-xl" />
          </div>
        </motion.div>

        {/* BOTTOM ROW */}
        <div className="col-span-7 grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* BOTTOM CARD 1 */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white border border-border-light rounded-[20px] p-5 flex flex-col justify-between shadow-card hover:shadow-card-hover transition-all cursor-pointer"
            onClick={() => navigate('/products')}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-base font-semibold text-ink">More Products</h3>
                <p className="text-[13px] text-slate-muted">460+ items</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                <Heart size={14} className="fill-current" />
              </div>
            </div>
            <div className="flex pl-3">
              {[1, 2, 3].map((i) => (
                <img 
                  key={i} 
                  src={`https://picsum.photos/seed/prod${i}/60/60`} 
                  alt="" 
                  className="w-[52px] h-[52px] rounded-full border-2 border-white -ml-3 object-cover shadow-sm"
                />
              ))}
            </div>
          </motion.div>

          {/* BOTTOM CARD 2 */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="bg-white border border-border-light rounded-[20px] p-5 flex flex-col items-center justify-center shadow-card hover:shadow-card-hover transition-all text-center"
          >
            <h3 className="text-[40px] font-extrabold text-ink leading-tight">10k+</h3>
            <p className="text-[13px] text-slate-muted mb-4">Problems Solved</p>
            <div className="flex items-center gap-2">
              <div className="flex pl-2">
                {[1,2,3].map((i) => (
                  <img 
                    key={i} 
                    src={`https://picsum.photos/seed/user${i}/40/40`} 
                    alt="User" 
                    className="w-7 h-7 rounded-full border-2 border-white -ml-2 object-cover"
                  />
                ))}
              </div>
              <span className="text-[13px] font-medium text-ink">
                <span className="text-amber-500">★</span> 4.9 reviews
              </span>
            </div>
          </motion.div>

          {/* BOTTOM CARD 3 */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white border border-border-light rounded-[20px] p-5 flex flex-col justify-between shadow-card hover:shadow-card-hover transition-all relative cursor-pointer overflow-hidden"
            onClick={() => navigate('/problems')}
          >
            <div className="absolute top-4 right-4 w-8 h-8 bg-ink rounded-full flex items-center justify-center text-white z-10">
              <ArrowUpRight size={16} />
            </div>
            <div>
              <span className="inline-block bg-lime text-ink text-[11px] font-bold px-2.5 py-1 rounded-full mb-3">Popular</span>
              <h3 className="text-base font-semibold text-ink pr-10">Constant back pain at desk</h3>
            </div>
            <div className="flex justify-between items-end mt-4">
              <span className="text-[13px] font-medium text-ink"><span className="text-amber-500">★</span> 4.8</span>
              <img src="https://picsum.photos/seed/backpain/80/80" alt="Fix" className="w-[60px] h-[60px] rounded-lg object-cover" />
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
