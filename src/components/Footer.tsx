import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { useSiteSettings } from '../hooks/useSiteSettings';

export default function Footer() {
  const { settings } = useSiteSettings();
  
  return (
    <footer className="bg-brand-ink text-brand-cream/60 pt-16 md:pt-24 pb-12">
      <div className="max-w-[1400px] mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20 mb-16 md:mb-20">
          <div className="col-span-1 md:col-span-1">
            <Logo className="mb-8" light={true} />
            <p className="text-sm leading-relaxed mb-8 font-light">
              Giving Life a Second Chance — One Heart, One Story, One Community at a Time. Supporting organ donation awareness and transplant survivors globally.
            </p>
            <div className="flex space-x-6">
              <a href="https://www.instagram.com/second_chance_at_life_?igsh=a2k0YXI2b3Z2ZG43" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://x.com/secChanceAtLife" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-serif font-bold text-lg mb-8">Navigation</h3>
            <ul className="space-y-4 text-[12px] uppercase tracking-widest font-bold">
              <li><Link to="/about" className="hover:text-brand-red transition-colors">About Us</Link></li>
              <li><Link to="/impact" className="hover:text-brand-red transition-colors">Our Impact</Link></li>
              <li><Link to="/media" className="hover:text-brand-red transition-colors">Media Gallery</Link></li>
              <li><Link to="/contact" className="hover:text-brand-red transition-colors">Contact</Link></li>
              <li><Link to="/donate" className="hover:text-brand-red transition-colors">Donate</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-serif font-bold text-lg mb-8">Contact</h3>
            <ul className="space-y-6 text-sm font-light">
              <li className="flex items-center gap-4">
                <Mail className="w-4 h-4 text-brand-red" />
                <a href={`mailto:${settings.contactEmail}`} className="hover:text-brand-red transition-colors">{settings.contactEmail}</a>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-4 h-4 text-brand-red" />
                <a href={`tel:${settings.contactPhone.replace(/\D/g, '')}`} className="hover:text-brand-red transition-colors">{settings.contactPhone}</a>
              </li>
              <li className="flex items-start gap-4">
                <MapPin className="w-4 h-4 text-brand-red mt-1" />
                <span>Global Outreach: USA, Africa, India</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-serif font-bold text-lg mb-8">Newsletter</h3>
            <p className="text-sm mb-6 font-light">Stay updated with our latest missions and impact stories.</p>
            <form className="flex flex-col gap-4">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-white/5 border border-white/10 rounded-none px-6 py-3 text-sm w-full focus:ring-1 focus:ring-brand-red outline-none text-white"
              />
              <button className="bg-brand-red text-white px-8 py-3 rounded-none text-[10px] uppercase tracking-widest font-bold hover:bg-white hover:text-brand-red transition-all">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-12 text-center text-[10px] uppercase tracking-[0.2em] font-bold">
          <p>&copy; {new Date().getFullYear()} Second Chance At Life. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
