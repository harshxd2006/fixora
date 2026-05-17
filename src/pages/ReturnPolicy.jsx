import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import { RefreshCw, Clock, ShieldCheck, Mail } from 'lucide-react';

const ReturnPolicy = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-12 pb-24 bg-warm-white min-h-screen"
    >
      <div className="container mx-auto max-w-4xl px-6">
        <SectionHeading 
          label="LEGAL" 
          title="Return Policy"
          subtitle="Simple, hassle-free returns within 30 days."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-[20px] shadow-sm border border-border-light text-center">
            <Clock size={32} className="mx-auto text-ink mb-4" />
            <h4 className="font-bold text-ink mb-2">30-Day Window</h4>
            <p className="text-sm text-slate-muted">Return any unused item within 30 days of delivery.</p>
          </div>
          <div className="bg-white p-6 rounded-[20px] shadow-sm border border-border-light text-center">
            <RefreshCw size={32} className="mx-auto text-ink mb-4" />
            <h4 className="font-bold text-ink mb-2">Free Returns</h4>
            <p className="text-sm text-slate-muted">We cover the return shipping costs for all domestic orders.</p>
          </div>
          <div className="bg-white p-6 rounded-[20px] shadow-sm border border-border-light text-center">
            <ShieldCheck size={32} className="mx-auto text-ink mb-4" />
            <h4 className="font-bold text-ink mb-2">Instant Refunds</h4>
            <p className="text-sm text-slate-muted">Refunds are processed within 24 hours of receiving the item.</p>
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-8 md:p-12 shadow-card border border-border-light prose prose-lg max-w-none text-ink">
          <h3 className="text-xl font-bold mb-4">How to Initiate a Return</h3>
          <p className="text-slate-muted mb-6">
            If a product didn't solve your problem or you simply changed your mind, we want to make it right. Follow these steps to process your return:
          </p>
          
          <ol className="list-decimal pl-6 text-slate-muted space-y-4 mb-8">
            <li><strong>Contact Support:</strong> Email us at <a href="mailto:returns@fixora.com" className="text-ink font-semibold">returns@fixora.com</a> with your order number.</li>
            <li><strong>Get Your Label:</strong> We will email you a prepaid return shipping label.</li>
            <li><strong>Pack It Up:</strong> Securely pack the item in its original packaging if possible.</li>
            <li><strong>Ship It Back:</strong> Drop off the package at any authorized shipping location.</li>
          </ol>

          <h3 className="text-xl font-bold mt-8 mb-4">Conditions for Returns</h3>
          <ul className="list-disc pl-6 text-slate-muted space-y-2 mb-8">
            <li>Items must be returned within 30 days of the delivery date.</li>
            <li>Products must be in their original condition and include all accessories.</li>
            <li>Digital products and software licenses are non-refundable once activated.</li>
            <li>Bundle returns: If you return part of an AI Smart Bundle, the discount is forfeited and you will be refunded the difference as if the remaining items were purchased at full price.</li>
          </ul>

          <div className="bg-soft-white rounded-xl p-6 flex items-start gap-4 mt-8 border border-border-light">
            <Mail className="text-ink flex-shrink-0 mt-1" size={24} />
            <div>
              <h4 className="font-bold text-ink mb-1">Still need help?</h4>
              <p className="text-sm text-slate-muted">Our support team is available 24/7 to assist you with any return or exchange questions. Contact us at support@fixora.com.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReturnPolicy;
