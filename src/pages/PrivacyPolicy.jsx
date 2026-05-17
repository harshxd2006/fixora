import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';

const PrivacyPolicy = () => {
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
          title="Privacy Policy"
          subtitle="Last updated: October 2026"
        />

        <div className="bg-white rounded-[24px] p-8 md:p-12 shadow-card border border-border-light prose prose-lg max-w-none text-ink">
          <p className="text-slate-muted">
            At Fixora, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
          </p>

          <h3 className="text-xl font-bold mt-8 mb-4">1. Information We Collect</h3>
          <p className="text-slate-muted mb-4">
            We collect information that you provide directly to us when you create an account, make a purchase, or communicate with us. This may include your name, email address, shipping address, and payment information.
          </p>
          <p className="text-slate-muted mb-4">
            We also automatically collect certain information about your device and how you interact with our website, such as your IP address, browser type, and pages visited.
          </p>

          <h3 className="text-xl font-bold mt-8 mb-4">2. How We Use Your Information</h3>
          <ul className="list-disc pl-6 text-slate-muted space-y-2 mb-4">
            <li>To process and fulfill your orders</li>
            <li>To communicate with you about products, services, and promotions</li>
            <li>To personalize and improve our AI-driven recommendations</li>
            <li>To maintain and improve the security of our platform</li>
          </ul>

          <h3 className="text-xl font-bold mt-8 mb-4">3. Data Security</h3>
          <p className="text-slate-muted mb-4">
            We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h3 className="text-xl font-bold mt-8 mb-4">4. Contact Us</h3>
          <p className="text-slate-muted">
            If you have any questions about this Privacy Policy, please contact us at privacy@fixora.com.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;
