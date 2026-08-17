import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const Hero = () => {
  const videoRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // Track page scroll progress (0 to 1)
  const { scrollYProgress, scrollY } = useScroll();

  // Motion transforms disabled if reduced motion preferred
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 80], [1, 0]);
  const rawHeroContentY = useTransform(scrollY, [0, 450], [0, -60]);
  const rawHeroContentOpacity = useTransform(scrollY, [0, 380], [1, 0.15]);

  const heroContentY = shouldReduceMotion ? 0 : rawHeroContentY;
  const heroContentOpacity = shouldReduceMotion ? 1 : rawHeroContentOpacity;

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 0);
      // Initialize playback asynchronously to ensure mobile browsers prime the video decoder
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          if (videoRef.current) {
            videoRef.current.pause();
          }
        }).catch(() => {});
      }
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      if (videoRef.current.duration) {
        setDuration(videoRef.current.duration);
      }
      videoRef.current.play().then(() => {
        if (videoRef.current) {
          videoRef.current.pause();
        }
      }).catch(() => {});
    }
  }, []);

  // HIGH-PERFORMANCE 60FPS HARDWARE-ACCELERATED VIDEO LERP ENGINE WITH VIEWPORT & TAB THROTTLING
  useEffect(() => {
    let animationFrameId;
    let targetTime = 0;
    let currTime = 0;
    let isSeeking = false;
    let isVisible = true;

    const videoEl = videoRef.current;

    const handleSeeked = () => {
      isSeeking = false;
    };

    // IntersectionObserver to pause loop when video scrolled far offscreen
    let observer;
    if (videoEl && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
        },
        { threshold: 0.05 }
      );
      observer.observe(videoEl);
    }

    // Page Visibility API to pause loop when tab is in background
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    if (videoEl) {
      videoEl.addEventListener('seeked', handleSeeked);
    }

    const renderLoop = () => {
      if (isVisible && videoEl && duration > 0) {
        const progress = scrollYProgress.get();
        targetTime = Math.min(duration - 0.04, Math.max(0, progress * duration));

        // Smooth 60fps exponential interpolation (lerp)
        currTime += (targetTime - currTime) * 0.15;

        if (Math.abs(currTime - videoEl.currentTime) > 0.02 && !isSeeking) {
          isSeeking = true;
          try {
            if ('fastSeek' in videoEl) {
              videoEl.fastSeek(currTime);
            } else {
              videoEl.currentTime = currTime;
            }
          } catch (e) {
            videoEl.currentTime = currTime;
          }
        }
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (videoEl) {
        videoEl.removeEventListener('seeked', handleSeeked);
      }
      if (observer) {
        observer.disconnect();
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [duration, scrollYProgress]);

  return (
    <section className="relative w-full min-h-[85vh] sm:min-h-[90vh] lg:min-h-screen -mt-20 sm:-mt-24 pt-20 sm:pt-24 flex items-center overflow-hidden bg-ink text-white">
      {/* CINEMATIC VIDEO BACKDROP WITH MOBILE-OPTIMIZED VISIBILITY & GPU HARDWARE ACCELERATION */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none transform-gpu will-change-transform">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedMetadata={handleLoadedMetadata}
          src="/hero.mp4"
          aria-hidden="true"
          className="fixed inset-0 w-full h-full object-cover object-[75%_center] md:object-center pointer-events-none transform-gpu"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* HIGH-VISIBILITY MOBILE GRADIENT OVERLAY */}
        <div className="fixed inset-0 z-10 bg-gradient-to-r from-[#0A0A0A]/75 via-[#0A0A0A]/50 to-[#0A0A0A]/60 pointer-events-none" />
        <div className="fixed inset-0 z-10 bg-gradient-to-b from-[#0A0A0A]/60 via-transparent to-[#0A0A0A]/70 pointer-events-none" />
      </div>

      {/* HERO CONTENT - RESPONSIVE TOUCH & TYPOGRAPHY */}
      <motion.div 
        style={{ y: heroContentY, opacity: heroContentOpacity }}
        className="relative z-20 container mx-auto px-5 sm:px-6 max-w-7xl py-8 sm:py-16 md:py-20 flex flex-col justify-center min-h-[calc(85vh-80px)] lg:min-h-[calc(100vh-96px)]"
      >
        <div className="max-w-2xl text-left">

          {/* Logo Badge (0.2s) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-4 sm:mb-6 inline-flex items-center gap-2"
          >
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#E5B268] flex items-center justify-center text-ink font-black text-[11px] sm:text-xs">
              F
            </div>
            <span className="text-[11px] sm:text-xs font-extrabold tracking-widest text-white uppercase">Fixora</span>
          </motion.div>

          {/* Heading (0.4s) */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-[-0.03em] leading-[1.1] sm:leading-[1.06]"
          >
            Shop for the problem.
            <br />
            <span className="text-[#E5B268]">
              We'll find the solution.
            </span>
          </motion.h1>

          {/* Description (0.6s) */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-4 sm:mt-6 text-sm sm:text-lg lg:text-xl text-white/85 font-normal leading-relaxed max-w-xl"
          >
            Tell Fixora what's bothering you in plain English. Our AI finds the products and solutions designed to fix it.
          </motion.p>

          {/* Buttons - Mobile Compact Auto-Width (0.8s) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4"
          >
            <Link to="/problems" className="w-auto">
              <button className="w-auto h-12 sm:h-14 px-7 sm:px-8 rounded-full bg-[#E5B268] text-ink font-bold text-sm sm:text-base flex items-center justify-center gap-2 hover:brightness-105 active:scale-[0.98] transition-all shadow-lg shadow-[#E5B268]/20 whitespace-nowrap">
                Find My Solution <ArrowRight size={18} />
              </button>
            </Link>

            <Link to="/products" className="w-auto">
              <button className="w-auto h-12 sm:h-14 px-7 sm:px-8 rounded-full bg-white/[0.12] hover:bg-white/20 text-white font-semibold text-sm sm:text-base border border-white/30 backdrop-blur-md active:scale-[0.98] transition-all flex items-center justify-center shadow-sm whitespace-nowrap">
                Explore Solutions
              </button>
            </Link>
          </motion.div>

        </div>
      </motion.div>

      {/* SCROLL INDICATOR */}
      <motion.div
        style={{ opacity: scrollIndicatorOpacity }}
        className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-1.5 pointer-events-none text-white/70"
      >
        <span className="text-[11px] font-medium uppercase tracking-[0.2em]">Scroll to explore</span>
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>

      {/* TRANSITION OVERLAY */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-36 bg-gradient-to-b from-transparent via-[#0A0A0A]/50 to-[#0A0A0A] z-20 pointer-events-none" />
    </section>
  );
};

export default Hero;

