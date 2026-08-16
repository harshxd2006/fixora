import { motion } from 'framer-motion';

const SectionHeading = ({ label, title, subtitle, centered = false, dark = false }) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center flex flex-col items-center' : ''}`}>
      {label && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 mb-4"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#E5B268]"></span>
          <span className="text-[12px] font-medium uppercase tracking-[0.1em] text-slate-muted">
            {label}
          </span>
        </motion.div>
      )}
      
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`text-[40px] md:text-[48px] font-bold tracking-tight leading-tight ${dark ? 'text-white' : 'text-ink'}`}
      >
        {title}
      </motion.h2>
      
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`text-[16px] mt-3 ${centered ? 'max-w-xl mx-auto text-center' : 'max-w-md'} ${dark ? 'text-gray-400' : 'text-slate-muted'}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeading;
