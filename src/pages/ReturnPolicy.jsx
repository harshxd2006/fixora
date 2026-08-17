import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import SectionHeading from '../components/SectionHeading';
import { RefreshCw, Clock, ShieldCheck, Mail } from 'lucide-react';

const ReturnPolicy = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-12 pb-24 bg-transparent text-white min-h-screen"
    >
      <Helmet>
        <title>Return Policy - Fixora</title>
        <meta name="description" content="Fixora Return Policy. Simple, hassle-free returns within 30 days." />
      </Helmet>

      <div className="container mx-auto max-w-4xl px-6">
        <SectionHeading 
          label="LEGAL" 
          title="Return Policy"
          subtitle="Simple, hassle-free returns within 30 days."
          dark={true}
        />

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass-card p-6 rounded-2xl text-center border border-white/15 bg-white/5 hover:border-[#E5B268]/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#E5B268]/15 border border-[#E5B268]/30 flex items-center justify-center mx-auto mb-4 text-[#E5B268]">
              <Clock size={24} />
            </div>
            <h4 className="font-bold text-white text-lg mb-2">30-Day Window</h4>
            <p className="text-sm text-white/70">Return any unused item within 30 days of delivery.</p>
          </div>

          <div className="glass-card p-6 rounded-2xl text-center border border-white/15 bg-white/5 hover:border-[#E5B268]/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#E5B268]/15 border border-[#E5B268]/30 flex items-center justify-center mx-auto mb-4 text-[#E5B268]">
              <RefreshCw size={24} />
            </div>
            <h4 className="font-bold text-white text-lg mb-2">Free Returns</h4>
            <p className="text-sm text-white/70">We cover the return shipping costs for domestic orders.</p>
          </div>

          <div className="glass-card p-6 rounded-2xl text-center border border-white/15 bg-white/5 hover:border-[#E5B268]/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#E5B268]/15 border border-[#E5B268]/30 flex items-center justify-center mx-auto mb-4 text-[#E5B268]">
              <ShieldCheck size={24} />
            </div>
            <h4 className="font-bold text-white text-lg mb-2">Instant Refunds</h4>
            <p className="text-sm text-white/70">Refunds are processed within 24 hours of receiving the item.</p>
          </div>
        </div>

        {/* Detailed Return Instructions */}
        <div className="glass-card p-8 md:p-12 text-white border border-white/15 bg-white/5 backdrop-blur-2xl rounded-[28px] shadow-2xl space-y-8">
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E5B268]"></span>
              How to Initiate a Return
            </h3>
            <p className="text-white/80 leading-relaxed text-sm sm:text-base mb-4">
              If a product didn't solve your problem or you simply changed your mind, we want to make it right. Follow these simple steps:
            </p>
            
            <ol className="list-decimal pl-6 text-white/80 space-y-3 leading-relaxed text-sm sm:text-base">
              <li><strong className="text-white">Contact Support:</strong> Email us at <a href="mailto:returns@fixora.com" className="text-[#E5B268] font-semibold hover:underline">returns@fixora.com</a> with your order number.</li>
              <li><strong className="text-white">Get Your Label:</strong> We will send you a prepaid return shipping label.</li>
              <li><strong className="text-white">Pack It Up:</strong> Securely pack the item in its original packaging.</li>
              <li><strong className="text-white">Ship It Back:</strong> Drop off the package at any authorized shipping drop-off location.</li>
            </ol>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E5B268]"></span>
              Conditions for Returns
            </h3>
            <ul className="list-disc pl-6 text-white/80 space-y-3 leading-relaxed text-sm sm:text-base">
              <li>Items must be returned within 30 days of the delivery date.</li>
              <li>Products must be in their original condition and include all accessories.</li>
              <li>Digital products and software licenses are non-refundable once activated.</li>
              <li>Bundle returns: If you return part of an AI Smart Bundle, the discount is forfeited and you will be refunded the difference as if remaining items were purchased individually.</li>
            </ul>
          </div>

          {/* Support Banner Box */}
          <div className="glass-card rounded-2xl p-6 flex items-start gap-4 mt-8 border border-white/15 bg-white/10">
            <div className="w-10 h-10 rounded-xl bg-[#E5B268]/20 flex items-center justify-center flex-shrink-0 text-[#E5B268]">
              <Mail size={20} />
            </div>
            <div>
              <h4 className="font-bold text-white text-base mb-1">Still need help?</h4>
              <p className="text-sm text-white/70">Our support team is available 24/7 to assist you with any return or exchange questions. Contact us at <a href="mailto:support@fixora.com" className="text-[#E5B268] font-semibold hover:underline">support@fixora.com</a>.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReturnPolicy;
