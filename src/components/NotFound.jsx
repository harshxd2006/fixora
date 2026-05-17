import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import CTAButton from './CTAButton';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-24 h-24 bg-soft-white rounded-[24px] flex items-center justify-center mb-8 border border-border-light shadow-card"
      >
        <Search size={40} className="text-slate-muted" />
      </motion.div>
      
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-[48px] font-bold text-ink tracking-tight mb-4"
      >
        404
      </motion.h1>
      
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-[16px] text-slate-muted max-w-md mb-8"
      >
        We couldn't find the page or problem you're looking for. Maybe it's a new problem we haven't solved yet.
      </motion.p>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Link to="/">
          <CTAButton magnetic>Back to Home</CTAButton>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
