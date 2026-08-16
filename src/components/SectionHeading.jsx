import { motion } from 'framer-motion';

const SectionHeading = ({ label, title, subtitle, centered = false, dark = true }) => {
  return (
    <div className={`mb-10 sm:mb-14 ${centered ? 'text-center flex flex-col items-center' : ''}`}>
      {label && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 mb-3"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#E5B268]"></span>
          <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-[#E5B268] uppercase">
            {label}
          </span>
        </motion.div>
      )}
      
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-white"
      >
        {title}
      </motion.h2>
      
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`text-sm sm:text-base mt-3.5 leading-relaxed ${centered ? 'max-w-xl mx-auto text-center' : 'max-w-md'} text-white/70`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeading;
