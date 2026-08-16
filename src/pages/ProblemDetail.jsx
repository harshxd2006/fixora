import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Tag, Activity, Lightbulb, Package, Zap } from 'lucide-react';
import { getProblemById } from '../data/problems';
import { getProductsByIds } from '../data/products';
import ProductCard from '../components/ProductCard';
import BundleCard from '../components/BundleCard';
import NotFound from '../components/NotFound';
import SectionHeading from '../components/SectionHeading';
import CTAButton from '../components/CTAButton';

const ProblemDetail = () => {
  const { id } = useParams();
  const problem = getProblemById(id);
  
  if (!problem) return <NotFound />;

  const recommendedProducts = getProductsByIds(problem.relatedProductIds || []);
  const bundles = problem.bundleIds ? problem.bundleIds.map(bId => getProductsByIds([bId])[0]) : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-12 pb-24 bg-transparent text-white min-h-screen"
    >
      {/* Header Section */}
      <section className="bg-white/10 backdrop-blur-xl border-b border-white/15 pt-8 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <Link to="/problems" className="inline-flex items-center gap-2 text-[14px] font-medium text-white/70 hover:text-[#E5B268] transition-colors mb-8">
            <ArrowLeft size={16} /> Back to Problems
          </Link>
          
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="glass-pill text-[12px] font-bold px-3 py-1.5 uppercase tracking-wider">
              {problem.category}
            </span>
            <div className="glass-pill text-[12px] font-bold px-3 py-1.5">
              {problem.difficulty} Fix
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
            {problem.title}
          </h1>
          
          <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-8 max-w-3xl">
            {problem.description || problem.shortDesc}
          </p>

          <div className="flex flex-wrap gap-2">
            {problem.tags?.map(tag => (
              <span key={tag} className="glass-pill">
                <Tag size={12} /> {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Analysis Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="glass-card p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Activity size={120} className="text-white" />
            </div>
            
            <div className="flex items-center gap-2 mb-6">
              <Zap size={20} className="text-[#E5B268] fill-[#E5B268]" />
              <h2 className="text-[20px] font-bold text-white">AI Analysis</h2>
            </div>
            
            <div className="space-y-6 relative z-10">
              <div>
                <h3 className="text-[14px] font-semibold text-[#E5B268] uppercase tracking-wider mb-2">Root Cause</h3>
                <p className="text-base text-white/80 leading-relaxed">
                  {problem.rootCause || "Often caused by improper setup, lack of ergonomic support, or prolonged exposure without proper breaks."}
                </p>
              </div>
              
              <div className="h-px w-full bg-white/15"></div>
              
              <div>
                <h3 className="text-[14px] font-semibold text-[#E5B268] uppercase tracking-wider mb-2">The Fix</h3>
                <p className="text-base text-white/80 leading-relaxed">
                  {problem.theFix || "Implementing proper support equipment combined with behavioral adjustments. The products recommended below specifically address the structural causes of this issue."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Solutions */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <SectionHeading 
            label="SOLUTIONS" 
            title="Products that actually fix this."
            dark={true}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {recommendedProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          {recommendedProducts.length === 0 && (
            <div className="glass-card p-12 text-center">
              <Package size={48} className="mx-auto text-white/30 mb-4" />
              <h3 className="text-[18px] font-semibold text-white mb-2">No specific products mapped yet</h3>
              <p className="text-[14px] text-white/70">Our AI is currently analyzing the best solutions for this problem.</p>
            </div>
          )}
        </div>
      </section>

      {/* Smart Bundle (if available) */}
      {bundles.length > 0 && (
        <section className="py-16 px-6 text-white mt-12">
          <div className="container mx-auto max-w-7xl">
            <SectionHeading 
              label="COMPLETE FIX" 
              title="Get the Smart Bundle."
              subtitle="Fix it completely with this AI-curated bundle at a 15% discount."
              dark={true}
            />
            
            <div className="max-w-4xl mx-auto mt-12">
              <div className="glass-card p-8 text-center flex flex-col items-center">
                <Package size={48} className="text-[#E5B268] mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Bundle available for this problem</h3>
                <p className="text-white/70 mb-8 max-w-md">Bundle logic needs mapping to specific bundle objects, but this is a placeholder for the UI.</p>
                <CTAButton variant="primary">View Bundle Details</CTAButton>
              </div>
            </div>
          </div>
        </section>
      )}

    </motion.div>
  );
};

export default ProblemDetail;
