import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import SectionHeading from '../components/SectionHeading';

const TermsOfService = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-12 pb-24 bg-transparent text-white min-h-screen"
    >
      <Helmet>
        <title>Terms of Service - Fixora</title>
        <meta name="description" content="Fixora Terms of Service. Please read these terms carefully before using our platform." />
      </Helmet>

      <div className="container mx-auto max-w-4xl px-6">
        <SectionHeading 
          label="LEGAL" 
          title="Terms of Service"
          subtitle="Last updated: October 2026"
          dark={true}
        />

        <div className="glass-card p-8 md:p-12 text-white border border-white/15 bg-white/5 backdrop-blur-2xl rounded-[28px] shadow-2xl space-y-8">
          <p className="text-white/80 leading-relaxed text-base sm:text-lg border-b border-white/10 pb-6">
            Please read these Terms of Service carefully before using Fixora. By accessing or using our platform, creating an account, or purchasing solutions, you agree to be bound by these terms.
          </p>

          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E5B268]"></span>
              1. Acceptance of Terms
            </h3>
            <p className="text-white/80 leading-relaxed text-sm sm:text-base">
              By creating an account, purchasing products, or otherwise using Fixora, you agree to these terms. If you do not agree to all of these terms, you may not use our services.
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E5B268]"></span>
              2. AI Recommendations
            </h3>
            <p className="text-white/80 leading-relaxed text-sm sm:text-base">
              Our AI-powered solutions and bundles are provided as automated suggestions based on the symptoms and problem descriptions you submit. While we strive for high accuracy, Fixora does not guarantee that any specific product bundle will solve every unique individual situation.
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E5B268]"></span>
              3. User Accounts & Security
            </h3>
            <p className="text-white/80 leading-relaxed text-sm sm:text-base">
              You are responsible for maintaining the confidentiality of your account login credentials and for all activities that occur under your account. You must be at least 18 years old or possess legal parental consent to make purchases on our platform.
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E5B268]"></span>
              4. Intellectual Property
            </h3>
            <p className="text-white/80 leading-relaxed text-sm sm:text-base">
              All content, features, branding, and functionality on Fixora—including text, graphics, logos, icons, and software—are the exclusive property of Fixora Inc. and are protected by applicable copyright and trademark laws.
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E5B268]"></span>
              5. Limitation of Liability
            </h3>
            <p className="text-white/80 leading-relaxed text-sm sm:text-base">
              Fixora shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services or products.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TermsOfService;
