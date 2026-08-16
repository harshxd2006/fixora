import { Link } from 'react-router-dom';
import { Globe, Link as LinkIcon, Mail } from 'lucide-react';
import { APP_NAME, NAV_LINKS } from '../utils/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-white/15 pt-16 pb-12 mt-auto text-white relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-[22px] font-extrabold tracking-tight text-white">
                Fixora
              </span>
            </Link>
            <p className="text-white/80 text-sm leading-relaxed max-w-sm mb-6 font-normal">
              AI-powered problem-solving e-commerce platform. 
              We don't just sell products, we sell solutions to your daily frustrations.
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="Website" className="w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-[#E5B268] hover:bg-white/10 transition-colors border border-white/10">
                <Globe size={18} />
              </a>
              <a href="#" aria-label="Email" className="w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-[#E5B268] hover:bg-white/10 transition-colors border border-white/10">
                <Mail size={18} />
              </a>
              <a href="#" aria-label="Link" className="w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-[#E5B268] hover:bg-white/10 transition-colors border border-white/10">
                <LinkIcon size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[13px] text-white uppercase tracking-[0.15em] mb-4 font-bold">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-[14px] text-white/70 hover:text-[#E5B268] transition-colors font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] text-white uppercase tracking-[0.15em] mb-4 font-bold">Legal</h4>
            <ul className="flex flex-col gap-3">
              <li><Link to="/privacy" className="text-[14px] text-white/70 hover:text-[#E5B268] transition-colors font-medium">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-[14px] text-white/70 hover:text-[#E5B268] transition-colors font-medium">Terms of Service</Link></li>
              <li><Link to="/returns" className="text-[14px] text-white/70 hover:text-[#E5B268] transition-colors font-medium">Return Policy</Link></li>
              <li><Link to="/contact" className="text-[14px] text-white/70 hover:text-[#E5B268] transition-colors font-medium">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] text-white uppercase tracking-[0.15em] mb-4 font-bold">Account</h4>
            <ul className="flex flex-col gap-3">
              <li><Link to="/login" className="text-[14px] text-white/70 hover:text-[#E5B268] transition-colors font-medium">Sign In</Link></li>
              <li><Link to="/signup" className="text-[14px] text-white/70 hover:text-[#E5B268] transition-colors font-medium">Create Account</Link></li>
              <li><Link to="/wishlist" className="text-[14px] text-white/70 hover:text-[#E5B268] transition-colors font-medium">Wishlist</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-white/60 font-medium">
            &copy; {currentYear} {APP_NAME}. All rights reserved.
          </p>
          <p className="text-[13px] text-white/60 font-medium">
            Problem-First Shopping
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
