import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Loader2 } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import CTAButton from '../components/CTAButton';
import { Helmet } from 'react-helmet-async';
import emailjs from 'emailjs-com';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // NOTE: Replace these with your actual EmailJS IDs from https://dashboard.emailjs.com/
      await emailjs.send(
        'service_8iyck8z',
        'template_hr24zhb',
        {
          from_name: formData.name,
          reply_to: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        'wGjFKBKaqUslp1Q0D'
      );

      toast.success("Message sent! We'll get back to you soon.");
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Email send failed:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-12 pb-24 bg-transparent text-white min-h-screen"
    >
      <Helmet>
        <title>Contact Us - Fixora</title>
        <meta name="description" content="Have a question about a product? Need help with an order? Send us a message and our team will get back to you." />
      </Helmet>
      <div className="container mx-auto max-w-7xl px-6">

        <SectionHeading
          label="GET IN TOUCH"
          title="We're here to help."
          subtitle="Have a question about a product? Need help with an order? Send us a message and our team will get back to you."
          centered
          dark={true}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16 max-w-5xl mx-auto">

          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-[#E5B268]/20 text-[#E5B268] flex items-center justify-center flex-shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-white mb-1">Email Us</h4>
                <p className="text-[13px] text-white/70">support@fixora.com</p>
                <p className="text-[13px] text-white/70">Usually replies in 2-4 hours</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-[#E5B268]/20 text-[#E5B268] flex items-center justify-center flex-shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-white mb-1">Call Us</h4>
                <p className="text-[13px] text-white/70">+1 (555) 123-4567</p>
                <p className="text-[13px] text-white/70">Mon-Fri, 9am-6pm EST</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-[#E5B268]/20 text-[#E5B268] flex items-center justify-center flex-shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-white mb-1">HQ Office</h4>
                <p className="text-[13px] text-white/70">123 Innovation Drive<br />Tech District, CA 94103</p>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 glass-card p-8 md:p-10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[12px] font-semibold text-[#E5B268] uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full h-12 glass-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-semibold text-[#E5B268] uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full h-12 glass-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-semibold text-[#E5B268] uppercase tracking-wider">Subject</label>
                <input
                  type="text"
                  required
                  className="w-full h-12 glass-input"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-semibold text-[#E5B268] uppercase tracking-wider">Message</label>
                <textarea
                  required
                  rows="5"
                  className="w-full glass-input rounded-2xl p-4 resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="btn-primary w-full h-12" disabled={loading}>
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
