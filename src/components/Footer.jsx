import { Link } from 'react-router-dom';
import { Globe, Link as LinkIcon, Mail } from 'lucide-react';
import { APP_NAME, NAV_LINKS } from '../utils/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-[22px] font-extrabold tracking-tight text-white">
                Fixora
              </span>
            </Link>
            <p className="text-[#6B6B6B] text-sm leading-relaxed max-w-sm mb-6">
              AI-powered problem-solving e-commerce platform. 
              We don't just sell products, we sell solutions to your daily frustrations.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                <Globe size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                <Mail size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                <LinkIcon size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[13px] text-white uppercase tracking-[0.1em] mb-4 font-semibold">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-[14px] text-[#6B6B6B] hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] text-white uppercase tracking-[0.1em] mb-4 font-semibold">Legal</h4>
            <ul className="flex flex-col gap-3">
              <li><Link to="/privacy" className="text-[14px] text-[#6B6B6B] hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-[14px] text-[#6B6B6B] hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/returns" className="text-[14px] text-[#6B6B6B] hover:text-white transition-colors">Return Policy</Link></li>
              <li><Link to="/contact" className="text-[14px] text-[#6B6B6B] hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] text-white uppercase tracking-[0.1em] mb-4 font-semibold">Account</h4>
            <ul className="flex flex-col gap-3">
              <li><Link to="/login" className="text-[14px] text-[#6B6B6B] hover:text-white transition-colors">Sign In</Link></li>
              <li><Link to="/signup" className="text-[14px] text-[#6B6B6B] hover:text-white transition-colors">Create Account</Link></li>
              <li><Link to="/wishlist" className="text-[14px] text-[#6B6B6B] hover:text-white transition-colors">Wishlist</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-6 border-t border-[#1a1a1a] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-[#6B6B6B]">
            &copy; {currentYear} {APP_NAME}. All rights reserved.
          </p>
          <p className="text-[13px] text-[#6B6B6B]">
            Made with care
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
