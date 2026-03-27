import { motion } from 'motion/react';
import { Heart, ShieldCheck, Globe, CreditCard, DollarSign, Award, Mail } from 'lucide-react';
import { useHeroContent } from '../hooks/useHeroContent';
import { useSiteSettings } from '../hooks/useSiteSettings';

export default function Donate() {
  const { hero, loading: heroLoading } = useHeroContent('donate');
  const { settings, loading: settingsLoading } = useSiteSettings();

  const loading = heroLoading || settingsLoading;

  if (loading) {
    return (
      <div className="pt-32 min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red"></div>
      </div>
    );
  }

  return (
    <div className="pt-32 bg-brand-cream min-h-screen">
      {/* Header */}
      <section className="relative py-32 px-8 md:px-20 overflow-hidden bg-brand-ink">
        <div className="absolute inset-0 z-0">
          <img 
            src={hero?.image_url || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=2000"} 
            alt="Donate background" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-ink/60 to-brand-ink" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10 group">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <span className="text-brand-red font-bold text-[11px] uppercase tracking-[0.3em] mb-6 block flex items-center justify-center gap-2">
              {hero?.badge_text || "Support the Mission"}
            </span>
            <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-12 leading-none flex items-center justify-center gap-4">
              <span dangerouslySetInnerHTML={{ __html: hero?.title || 'Give a <span class="italic">Second Chance.</span>' }} />
            </h1>
            <div className="flex items-center justify-center gap-4">
              <p className="text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
                {hero?.subtitle || "Your contribution directly funds life-saving medical support, global awareness campaigns, and direct assistance for transplant survivors."}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Donation Options */}
      <section className="py-24 px-8 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Impact Cards */}
            <div className="lg:col-span-2 space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { amount: "$25", title: "Patient Support", desc: "Provides essential medical supplies for a patient in recovery." },
                  { amount: "$50", title: "Awareness Kit", desc: "Funds educational materials for a community outreach program." },
                  { amount: "$100", title: "Global Outreach", desc: "Supports travel and logistics for life-saving organ transport." },
                  { amount: "Custom", title: "Your Choice", desc: "Every dollar makes a difference in our mission to save lives." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-10 border border-brand-ink/5 bg-brand-cream/30 hover:bg-white hover:shadow-2xl transition-all group cursor-pointer"
                  >
                    <span className="text-3xl font-serif font-bold text-brand-red block mb-4">{item.amount}</span>
                    <h3 className="text-xl font-serif font-bold text-brand-ink mb-4">{item.title}</h3>
                    <p className="text-sm text-brand-ink/60 font-light leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              <div className="p-12 border border-brand-ink/5 bg-brand-ink text-white">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 bg-brand-red flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold">100% Impact Guarantee</h3>
                    <p className="text-white/60 text-sm font-light">Transparency is at the core of our mission.</p>
                  </div>
                </div>
                <p className="text-white/80 leading-relaxed font-light">
                  We ensure that every cent of your donation goes directly to our programs. Our administrative costs are covered by separate private grants, meaning your gift has the maximum possible impact on the lives of those we serve.
                </p>
              </div>
            </div>

            {/* Donation Form Placeholder */}
            <div className="bg-brand-cream p-12 border border-brand-ink/5 shadow-xl h-fit sticky top-32">
              <h3 className="text-2xl font-serif font-bold text-brand-ink mb-8">Make a Donation</h3>
              <form className="space-y-6">
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-brand-ink/40 mb-2 block">Select Amount</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['$25', '$50', '$100'].map((amt) => (
                      <button 
                        key={amt}
                        type="button"
                        className="py-3 border border-brand-ink/10 text-sm font-bold hover:bg-brand-red hover:text-white transition-all"
                      >
                        {amt}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-brand-ink/40 mb-2 block">Custom Amount</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-ink/40" />
                    <input 
                      type="number" 
                      placeholder="0.00"
                      className="w-full bg-white border border-brand-ink/10 px-10 py-4 text-sm focus:ring-1 focus:ring-brand-red outline-none"
                    />
                  </div>
                </div>
                <button className="w-full bg-brand-red text-white py-5 font-bold text-[12px] uppercase tracking-widest hover:bg-brand-ink transition-all shadow-xl shadow-brand-red/20">
                  Proceed to Payment
                </button>

                {/* Zelle Payment Option */}
                <div className="pt-6 border-t border-brand-ink/5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-brand-ink text-white flex items-center justify-center rounded-full">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-brand-ink">Donate via Zelle</span>
                  </div>
                  <p className="text-sm text-brand-ink/60 font-light leading-relaxed">
                    You can also send your donation directly via Zelle to:
                    <br />
                    <span className="font-bold text-brand-ink break-all">{settings.zelleEmail}</span>
                  </p>
                </div>

                <div className="flex items-center justify-center gap-4 pt-4 border-t border-brand-ink/5">
                  <ShieldCheck className="w-4 h-4 text-brand-ink/40" />
                  <span className="text-[9px] uppercase tracking-widest font-bold text-brand-ink/40">Secure SSL Encryption</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Global Impact */}
      <section className="py-32 px-8 md:px-20 bg-brand-ink text-brand-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div>
              <Globe className="w-10 h-10 text-brand-red mx-auto mb-8" />
              <h3 className="text-4xl font-serif font-bold mb-4">Global</h3>
              <p className="text-brand-cream/40 text-sm font-light">Outreach across USA, Africa, and India.</p>
            </div>
            <div>
              <Heart className="w-10 h-10 text-brand-red mx-auto mb-8" />
              <h3 className="text-4xl font-serif font-bold mb-4">Direct</h3>
              <p className="text-brand-cream/40 text-sm font-light">Assistance for transplant survivors.</p>
            </div>
            <div>
              <CreditCard className="w-10 h-10 text-brand-red mx-auto mb-8" />
              <h3 className="text-4xl font-serif font-bold mb-4">Secure</h3>
              <p className="text-brand-cream/40 text-sm font-light">Safe and transparent transactions.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
