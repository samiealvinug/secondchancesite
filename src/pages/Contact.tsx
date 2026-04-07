import { motion } from 'motion/react';
import { Mail, Phone, Instagram, Twitter, MapPin, Send, ArrowRight } from 'lucide-react';
import { useSiteSettings } from '../hooks/useSiteSettings';

export default function Contact() {
  const { settings } = useSiteSettings();

  return (
    <div className="pt-32 bg-brand-cream overflow-hidden">
      {/* Header - Minimalist */}
      <section className="py-12 md:py-20 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-brand-red font-bold text-[11px] uppercase tracking-[0.3em] mb-6 block">Connect</span>
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-serif font-bold text-brand-ink mb-8 md:mb-12 leading-tight md:leading-none">
              Get in <span className="italic text-brand-red">Touch.</span>
            </h1>
            <p className="text-lg md:text-xl text-brand-ink/60 leading-relaxed font-light max-w-2xl">
              Have questions or want to get involved? Our team is here to support you and answer any inquiries.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-6 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-start">
            {/* Contact Info - Editorial Style */}
            <div className="space-y-16">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-ink mb-6 md:mb-8">Reach Out to <span className="italic">Us.</span></h2>
                <p className="text-xl text-brand-ink/60 font-light leading-relaxed">
                  Whether you're a patient seeking support, a potential donor, or someone who wants to volunteer, we are ready to listen.
                </p>
              </div>

              <div className="space-y-10">
                <div className="flex items-start gap-6 md:gap-8 group">
                  <div className="bg-brand-cream w-14 h-14 md:w-16 md:h-16 rounded-none flex items-center justify-center text-brand-red shrink-0 group-hover:bg-brand-red group-hover:text-white transition-all shadow-sm">
                    <Mail className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-brand-ink/40 mb-2">Email Us</h4>
                    <a href={`mailto:${settings.contactEmail}`} className="text-lg md:text-xl font-serif font-bold text-brand-ink hover:text-brand-red transition-colors">
                      {settings.contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-6 md:gap-8 group">
                  <div className="bg-brand-cream w-14 h-14 md:w-16 md:h-16 rounded-none flex items-center justify-center text-brand-red shrink-0 group-hover:bg-brand-red group-hover:text-white transition-all shadow-sm">
                    <Phone className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-brand-ink/40 mb-2">Call Us</h4>
                    <a href={`tel:${settings.contactPhone.replace(/\D/g, '')}`} className="text-lg md:text-xl font-serif font-bold text-brand-ink hover:text-brand-red transition-colors">
                      {settings.contactPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-6 md:gap-8 group">
                  <div className="bg-brand-cream w-14 h-14 md:w-16 md:h-16 rounded-none flex items-center justify-center text-brand-red shrink-0 group-hover:bg-brand-red group-hover:text-white transition-all shadow-sm">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-brand-ink/40 mb-2">Global Presence</h4>
                    <p className="text-lg md:text-xl font-serif font-bold text-brand-ink">United States, Uganda, India</p>
                  </div>
                </div>
              </div>

              <div className="pt-12 border-t border-brand-ink/5">
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-brand-ink/40 mb-8">Follow Our Journey</h4>
                <div className="flex gap-6">
                  {[
                    { icon: Instagram, href: "https://www.instagram.com/second_chance_at_life_?igsh=a2k0YXI2b3Z2ZG43" },
                    { icon: Twitter, href: "https://x.com/secChanceAtLife" }
                  ].map((social, i) => (
                    <a 
                      key={i}
                      href={social.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-14 h-14 rounded-none border border-brand-ink/10 flex items-center justify-center text-brand-ink hover:bg-brand-red hover:text-white hover:border-brand-red transition-all"
                    >
                      <social.icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form - Refined */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-brand-cream p-8 md:p-16 rounded-none border border-brand-ink/5 shadow-sm"
            >
              <h3 className="text-3xl font-serif font-bold text-brand-ink mb-10">Send a Message</h3>
              <form className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-ink/40">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full bg-white border border-brand-ink/5 rounded-none px-6 py-4 focus:ring-2 focus:ring-brand-red/20 outline-none transition-all font-light"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-ink/40">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full bg-white border border-brand-ink/5 rounded-none px-6 py-4 focus:ring-2 focus:ring-brand-red/20 outline-none transition-all font-light"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-brand-ink/40">Subject</label>
                  <select className="w-full bg-white border border-brand-ink/5 rounded-none px-6 py-4 focus:ring-2 focus:ring-brand-red/20 outline-none transition-all font-light appearance-none">
                    <option>General Inquiry</option>
                    <option>Volunteer Interest</option>
                    <option>Media Request</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-brand-ink/40">Message</label>
                  <textarea 
                    rows={5}
                    placeholder="How can we help you?"
                    className="w-full bg-white border border-brand-ink/5 rounded-none px-6 py-4 focus:ring-2 focus:ring-brand-red/20 outline-none transition-all resize-none font-light"
                  ></textarea>
                </div>
                <button className="w-full bg-brand-red text-white py-6 rounded-none font-bold text-[12px] uppercase tracking-[0.3em] hover:bg-brand-ink transition-all shadow-2xl shadow-brand-red/20 flex items-center justify-center gap-4 group">
                  Send Message
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
