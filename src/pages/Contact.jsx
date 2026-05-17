import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import CTAButton from '../components/CTAButton';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log(formData);
    alert("Message sent! We'll get back to you soon.");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-12 pb-24 bg-warm-white min-h-screen"
    >
      <div className="container mx-auto max-w-7xl px-6">
        
        <SectionHeading 
          label="GET IN TOUCH" 
          title="We're here to help."
          subtitle="Have a question about a product? Need help with an order? Send us a message and our team will get back to you."
          centered
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16 max-w-5xl mx-auto">
          
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-[20px] shadow-card border border-border-light flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-soft-white flex items-center justify-center flex-shrink-0">
                <Mail size={18} className="text-ink" />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-ink mb-1">Email Us</h4>
                <p className="text-[13px] text-slate-muted">support@fixora.com</p>
                <p className="text-[13px] text-slate-muted">Usually replies in 2-4 hours</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-[20px] shadow-card border border-border-light flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-soft-white flex items-center justify-center flex-shrink-0">
                <Phone size={18} className="text-ink" />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-ink mb-1">Call Us</h4>
                <p className="text-[13px] text-slate-muted">+1 (555) 123-4567</p>
                <p className="text-[13px] text-slate-muted">Mon-Fri, 9am-6pm EST</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-[20px] shadow-card border border-border-light flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-soft-white flex items-center justify-center flex-shrink-0">
                <MapPin size={18} className="text-ink" />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-ink mb-1">HQ Office</h4>
                <p className="text-[13px] text-slate-muted">123 Innovation Drive<br/>Tech District, CA 94103</p>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white rounded-[24px] p-8 md:p-10 shadow-card border border-border-light"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-ink uppercase tracking-wider">Full Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full h-12 bg-soft-white border border-border-light rounded-xl px-4 text-[14px] text-ink focus:bg-white focus:border-ink outline-none transition-colors"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-ink uppercase tracking-wider">Email Address</label>
                  <input 
                    type="email" 
                    required
                    className="w-full h-12 bg-soft-white border border-border-light rounded-xl px-4 text-[14px] text-ink focus:bg-white focus:border-ink outline-none transition-colors"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-ink uppercase tracking-wider">Subject</label>
                <input 
                  type="text" 
                  required
                  className="w-full h-12 bg-soft-white border border-border-light rounded-xl px-4 text-[14px] text-ink focus:bg-white focus:border-ink outline-none transition-colors"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-ink uppercase tracking-wider">Message</label>
                <textarea 
                  required
                  rows="5"
                  className="w-full bg-soft-white border border-border-light rounded-xl p-4 text-[14px] text-ink focus:bg-white focus:border-ink outline-none transition-colors resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <CTAButton type="submit" variant="black" className="w-full">
                <Send size={18} className="mr-2" /> Send Message
              </CTAButton>
            </form>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
