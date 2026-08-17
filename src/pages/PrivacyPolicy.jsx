import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import SectionHeading from '../components/SectionHeading';

const PrivacyPolicy = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-12 pb-24 bg-transparent text-white min-h-screen"
    >
      <Helmet>
        <title>Privacy Policy - Fixora</title>
        <meta name="description" content="Fixora Privacy Policy. Learn how we collect, use, and safeguard your personal information." />
      </Helmet>

      <div className="container mx-auto max-w-4xl px-6">
        <SectionHeading 
          label="LEGAL" 
          title="Privacy Policy"
          subtitle="Last updated: October 2026"
          dark={true}
        />

        <div className="glass-card p-8 md:p-12 text-white border border-white/15 bg-white/5 backdrop-blur-2xl rounded-[28px] shadow-2xl space-y-8">
          <p className="text-white/80 leading-relaxed text-base sm:text-lg border-b border-white/10 pb-6">
            At Fixora, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our AI-powered problem-solving platform.
          </p>

          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E5B268]"></span>
              1. Information We Collect
            </h3>
            <p className="text-white/80 leading-relaxed text-sm sm:text-base">
              We collect information that you provide directly to us when you create an account, make a purchase, or communicate with us. This may include your name, email address, shipping address, and payment details.
            </p>
            <p className="text-white/80 leading-relaxed text-sm sm:text-base">
              We also automatically collect certain technical information about your device and how you interact with our website, such as your IP address, browser type, and pages visited, to optimize performance and recommendations.
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E5B268]"></span>
              2. How We Use Your Information
            </h3>
            <ul className="list-disc pl-6 text-white/80 space-y-3 leading-relaxed text-sm sm:text-base">
              <li>To process and fulfill your product orders and smart solution bundles</li>
              <li>To communicate with you regarding updates, tracking details, and support inquiries</li>
              <li>To personalize and improve our AI-driven recommendation algorithms</li>
              <li>To maintain, monitor, and enhance the security of our website and services</li>
            </ul>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E5B268]"></span>
              3. Data Security & Protection
            </h3>
            <p className="text-white/80 leading-relaxed text-sm sm:text-base">
              We implement appropriate technical, organizational, and encrypted security measures (including SSL encryption and Row-Level Security) to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E5B268]"></span>
              4. Contact Us
            </h3>
            <p className="text-white/80 leading-relaxed text-sm sm:text-base">
              If you have any questions or concerns regarding this Privacy Policy or your data, please reach out to our privacy compliance team at{' '}
              <a href="mailto:privacy@fixora.com" className="text-[#E5B268] font-semibold hover:underline">
                privacy@fixora.com
              </a>.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;
