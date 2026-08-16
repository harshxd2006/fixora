import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const CTAButton = ({ 
  children, 
  onClick, 
  type = "button",
  variant = "primary", 
  disabled = false,
  loading = false,
  className = "",
  fullWidth = false,
  icon = true,
  magnetic = false
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMouse = (e) => {
    if (!magnetic || !ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
  };

  const reset = () => {
    if (!magnetic) return;
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = "relative flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 active:scale-[0.97]";
  
  const variants = {
    primary: "bg-[#E5B268] text-ink shadow-btn hover:brightness-105 h-[48px] px-8",
    secondary: "bg-white text-ink border border-border-light hover:bg-soft-white h-[48px] px-8",
    black: "bg-ink text-white hover:bg-[#1a1a1a] shadow-card h-[48px] px-8",
    blackCircle: "bg-ink text-white hover:bg-[#1a1a1a] shadow-card w-[48px] h-[48px] p-0 rounded-full flex items-center justify-center"
  };

  const isCircle = variant === 'blackCircle';

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${fullWidth && !isCircle ? 'w-full' : ''} 
        ${(disabled || loading) ? 'opacity-70 cursor-not-allowed' : ''} 
        ${className}
      `}
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <>
          {!isCircle && children}
          {icon && !isCircle && <ArrowRight size={18} />}
          {isCircle && children}
        </>
      )}
    </motion.button>
  );
};

export default CTAButton;
