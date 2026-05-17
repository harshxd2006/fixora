import { motion } from 'framer-motion';
import { Target, Users, Zap, ShieldCheck } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-[104px] pb-24 bg-warm-white min-h-screen"
    >
      {/* Hero Section */}
      <section className="px-6 py-16 md:py-24 text-center border-b border-border-light bg-white">
        <div className="container mx-auto max-w-4xl">
          <SectionHeading 
            label="OUR MISSION" 
            title="We're here to fix what's broken."
            subtitle="Fixora isn't just another store. We are a problem-first platform designed to cure your daily frustrations with AI-curated solutions."
            centered
          />
        </div>
      </section>

      {/* Values Section */}
      <section className="px-6 py-20">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-[32px] font-bold text-ink tracking-tight">The Problem with Shopping</h2>
              <p className="text-[16px] text-slate-muted leading-relaxed">
                Traditional e-commerce forces you to know exactly what product you need. But when your back hurts, or your cables are a mess, you don't care about a "product"—you care about a <strong>fix</strong>.
              </p>
              <p className="text-[16px] text-slate-muted leading-relaxed">
                That's why we built Fixora. You describe the annoyance, and our AI maps it directly to the highest-rated, most effective combination of tools to solve it permanently.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="bg-white p-6 rounded-[20px] shadow-card border border-border-light">
                <div className="w-12 h-12 bg-soft-white rounded-xl flex items-center justify-center mb-4">
                  <Target size={24} className="text-ink" />
                </div>
                <h3 className="text-[16px] font-bold text-ink mb-2">Problem First</h3>
                <p className="text-[13px] text-slate-muted">Focus on the cure, not just the catalog.</p>
              </div>
              <div className="bg-white p-6 rounded-[20px] shadow-card border border-border-light mt-8">
                <div className="w-12 h-12 bg-soft-white rounded-xl flex items-center justify-center mb-4">
                  <Zap size={24} className="text-lime" />
                </div>
                <h3 className="text-[16px] font-bold text-ink mb-2">AI Powered</h3>
                <p className="text-[13px] text-slate-muted">Smart matching for complex annoyances.</p>
              </div>
              <div className="bg-white p-6 rounded-[20px] shadow-card border border-border-light -mt-8">
                <div className="w-12 h-12 bg-soft-white rounded-xl flex items-center justify-center mb-4">
                  <ShieldCheck size={24} className="text-ink" />
                </div>
                <h3 className="text-[16px] font-bold text-ink mb-2">Vetted Quality</h3>
                <p className="text-[13px] text-slate-muted">Only the best products make the cut.</p>
              </div>
              <div className="bg-white p-6 rounded-[20px] shadow-card border border-border-light">
                <div className="w-12 h-12 bg-soft-white rounded-xl flex items-center justify-center mb-4">
                  <Users size={24} className="text-ink" />
                </div>
                <h3 className="text-[16px] font-bold text-ink mb-2">Community</h3>
                <p className="text-[13px] text-slate-muted">Real reviews for real solutions.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
