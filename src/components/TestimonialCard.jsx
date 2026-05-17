import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="card p-8 flex flex-col h-full bg-white relative"
    >
      <div className="absolute top-6 right-8 text-[64px] font-serif leading-none text-lime opacity-50 select-none">
        "
      </div>
      
      <p className="text-[15px] text-tag-text leading-relaxed flex-1 mt-4 relative z-10 font-medium">
        {testimonial.quote}
      </p>

      <div className="mt-8 flex items-center justify-between border-t border-muted-white pt-6">
        <div className="flex items-center gap-3">
          <img 
            src={testimonial.avatar} 
            alt={testimonial.name} 
            className="w-12 h-12 rounded-full object-cover border border-border-light"
          />
          <div>
            <h4 className="text-[14px] font-semibold text-ink">{testimonial.name}</h4>
            <p className="text-[12px] text-slate-muted">{testimonial.role}</p>
          </div>
        </div>
        
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={12} 
              className={i < testimonial.rating ? "fill-[#F59E0B] text-[#F59E0B]" : "fill-border-light text-border-light"} 
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
