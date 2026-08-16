import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center text-white">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-20 h-20 glass-card rounded-full flex items-center justify-center mb-6"
      >
        <Search size={36} className="text-[#E5B268]" />
      </motion.div>
      
      <motion.h1 
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-3"
      >
        404
      </motion.h1>
      
      <motion.p 
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-base text-white/70 max-w-md mb-8 leading-relaxed"
      >
        We couldn't find the page or problem you're looking for. Try exploring our active catalog or search for a specific solution.
      </motion.p>
      
      <motion.div
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Link to="/store">
          <button className="btn-primary">Back to Solutions</button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
