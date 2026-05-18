import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, Sparkles, Package, ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import SectionHeading from '../components/SectionHeading';
import ProblemCard from '../components/ProblemCard';
import ProductCard from '../components/ProductCard';
import BundleCard from '../components/BundleCard';
import TestimonialCard from '../components/TestimonialCard';
import CTAButton from '../components/CTAButton';
import { trendingProblems } from '../data/problems';
import { featuredProducts, aiBundles } from '../data/products';
import { testimonials } from '../data/testimonials';

// Counter component for animated stats
const AnimatedNumber = ({ value }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 1500, bounce: 0 });
  const rounded = useTransform(springValue, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, value, motionValue]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Helmet>
        <title>Fixora – Stop Suffering, Start Fixing</title>
        <meta name="description" content="AI-powered problem-solving e-commerce platform." />
      </Helmet>
      
      <Hero />

      {/* MARQUEE STRIP */}
      <div className="w-full bg-ink h-12 overflow-hidden flex items-center relative whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="flex gap-4 items-center min-w-max"
        >
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 text-white text-[13px] font-bold uppercase tracking-widest">
              <span>Problem-First Shopping</span>
              <span className="w-1.5 h-1.5 rounded-full bg-lime"></span>
              <span>AI-Powered</span>
              <span className="w-1.5 h-1.5 rounded-full bg-lime"></span>
              <span>Smart Bundles</span>
              <span className="w-1.5 h-1.5 rounded-full bg-lime"></span>
              <span>10,000+ Fixes</span>
              <span className="w-1.5 h-1.5 rounded-full bg-lime"></span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* HOW IT WORKS */}
      <section className="bg-white py-20 px-6 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <SectionHeading 
            label="HOW IT WORKS" 
            title="Fixing problems shouldn't be a problem."
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 relative">
            {/* Dashed line connecting steps (desktop only) */}
            <div className="hidden md:block absolute top-1/2 left-20 right-20 h-px border-t-2 border-dashed border-border-light -translate-y-1/2 z-0"></div>
            
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="bg-warm-white rounded-[20px] p-8 relative z-10 hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="text-[64px] font-extrabold text-muted-white absolute top-6 right-8 leading-none">01</div>
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-card mb-6 relative z-10">
                <Search size={24} className="text-ink" />
              </div>
              <h3 className="text-[18px] font-semibold text-ink mb-2">Describe Your Problem</h3>
              <p className="text-[14px] text-slate-muted leading-relaxed">Tell us what's bothering you in plain English. No need to know exactly what product you need.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-warm-white rounded-[20px] p-8 relative z-10 hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="text-[64px] font-extrabold text-muted-white absolute top-6 right-8 leading-none">02</div>
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-card mb-6 relative z-10">
                <Sparkles size={24} className="text-ink" />
              </div>
              <h3 className="text-[18px] font-semibold text-ink mb-2">AI Finds Solutions</h3>
              <p className="text-[14px] text-slate-muted leading-relaxed">Our AI analyzes your problem and finds the perfect combination of products to solve it permanently.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-warm-white rounded-[20px] p-8 relative z-10 hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="text-[64px] font-extrabold text-muted-white absolute top-6 right-8 leading-none">03</div>
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-card mb-6 relative z-10">
                <Package size={24} className="text-ink" />
              </div>
              <h3 className="text-[18px] font-semibold text-ink mb-2">Get the Right Products</h3>
              <p className="text-[14px] text-slate-muted leading-relaxed">Buy individual items or grab an AI-curated bundle with everything you need at a discount.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRENDING PROBLEMS */}
      <section className="bg-warm-white py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-end mb-10">
            <SectionHeading 
              label="TRENDING" 
              title="What people are fixing today."
            />
            <Link to="/problems" className="hidden md:flex items-center gap-1 font-semibold text-ink hover:text-lime transition-colors pb-4">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingProblems.map((problem, i) => (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <ProblemCard problem={problem} />
              </motion.div>
            ))}
          </div>
          
          <Link to="/problems" className="mt-8 flex md:hidden items-center justify-center gap-2 font-semibold text-ink">
            View All Problems <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-white py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-end mb-10">
            <SectionHeading 
              label="FEATURED" 
              title="Top-rated solutions."
            />
            <Link to="/products" className="hidden md:flex items-center gap-1 font-semibold text-ink hover:text-lime transition-colors pb-4">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SMART BUNDLES */}
      <section className="bg-ink py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <SectionHeading 
            label="SMART BUNDLES" 
            title="Complete fixes, bundled."
            subtitle="Our AI curates the perfect combination of products to solve complex problems permanently, offering a 15% discount when bought together."
            dark
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {aiBundles.map((bundle, i) => (
              <motion.div
                key={bundle.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <BundleCard bundle={bundle} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-warm-white py-16 px-6 border-b border-muted-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-muted-white">
            <div className="text-center px-4">
              <div className="text-[40px] md:text-[56px] font-extrabold text-ink"><AnimatedNumber value={10} />k+</div>
              <div className="text-[14px] text-slate-muted mt-2">Problems Solved</div>
            </div>
            <div className="text-center px-4">
              <div className="text-[40px] md:text-[56px] font-extrabold text-ink"><AnimatedNumber value={98} />%</div>
              <div className="text-[14px] text-slate-muted mt-2">Success Rate</div>
            </div>
            <div className="text-center px-4">
              <div className="text-[40px] md:text-[56px] font-extrabold text-ink"><AnimatedNumber value={500} />+</div>
              <div className="text-[14px] text-slate-muted mt-2">Curated Products</div>
            </div>
            <div className="text-center px-4">
              <div className="text-[40px] md:text-[56px] font-extrabold text-ink"><AnimatedNumber value={24} />/<AnimatedNumber value={7} /></div>
              <div className="text-[14px] text-slate-muted mt-2">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <SectionHeading 
            label="TESTIMONIALS" 
            title="Don't just take our word for it."
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <section className="bg-ink py-24 px-6 relative overflow-hidden">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_40%,transparent_100%)] opacity-30"></div>
        
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[40px] md:text-[56px] font-extrabold text-white tracking-tight leading-tight mb-6"
          >
            Ready to stop suffering and start fixing?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#a0a0a0] text-lg mb-10 max-w-xl mx-auto"
          >
            Join thousands of others who have solved their daily annoyances with Fixora.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <Link to="/problems">
              <CTAButton magnetic>Find Your Fix</CTAButton>
            </Link>
          </motion.div>
        </div>
      </section>

    </motion.div>
  );
};

export default Home;
