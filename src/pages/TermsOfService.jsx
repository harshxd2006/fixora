import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';

const TermsOfService = () => {
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
          title="Terms of Service"
          subtitle="Last updated: October 2026"
        />

        <div className="bg-white rounded-[24px] p-8 md:p-12 shadow-card border border-border-light prose prose-lg max-w-none text-ink">
          <p className="text-slate-muted">
            Please read these Terms of Service carefully before using Fixora. By accessing or using our platform, you agree to be bound by these terms.
          </p>

          <h3 className="text-xl font-bold mt-8 mb-4">1. Acceptance of Terms</h3>
          <p className="text-slate-muted mb-4">
            By creating an account, purchasing products, or otherwise using Fixora, you agree to these terms. If you do not agree, you may not use our services.
          </p>

          <h3 className="text-xl font-bold mt-8 mb-4">2. AI Recommendations</h3>
          <p className="text-slate-muted mb-4">
            Our AI-powered solutions and bundles are provided as suggestions based on the problems you describe. While we strive for high accuracy, we do not guarantee that any specific product will completely solve your personal situation.
          </p>

          <h3 className="text-xl font-bold mt-8 mb-4">3. User Accounts</h3>
          <p className="text-slate-muted mb-4">
            You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must be at least 18 years old to make purchases on our platform.
          </p>

          <h3 className="text-xl font-bold mt-8 mb-4">4. Intellectual Property</h3>
          <p className="text-slate-muted mb-4">
            All content, features, and functionality on Fixora, including text, graphics, logos, and software, are the exclusive property of Fixora and are protected by copyright and other intellectual property laws.
          </p>

          <h3 className="text-xl font-bold mt-8 mb-4">5. Limitation of Liability</h3>
          <p className="text-slate-muted">
            Fixora shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services or products.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TermsOfService;
