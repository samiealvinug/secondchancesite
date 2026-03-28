import { motion } from 'motion/react';
import { ShieldCheck, Award, Mail } from 'lucide-react';
import { useHeroContent } from '../hooks/useHeroContent';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { useSiteImages } from '../hooks/useSiteImages';
import PlaceholderImage from '../components/PlaceholderImage';

export default function Donate() {
  const { hero, loading: heroLoading } = useHeroContent('donate');
  const { settings, loading: settingsLoading } = useSiteSettings();
  const { images, loading: imagesLoading } = useSiteImages();

  const loading = heroLoading || settingsLoading || imagesLoading;

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
      <section className="relative py-20 md:py-32 px-6 md:px-20 overflow-hidden bg-brand-ink">
        <div className="absolute inset-0 z-0">
          {images.donate_bg_image ? (
            <img 
              src={images.donate_bg_image} 
              alt="Donate background" 
              className="w-full h-full object-cover opacity-40"
              referrerPolicy="no-referrer"
            />
          ) : (
            <PlaceholderImage className="w-full h-full opacity-20" />
          )}
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
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-serif font-bold text-white mb-8 md:mb-12 leading-tight md:leading-none flex items-center justify-center gap-4">
              <span dangerouslySetInnerHTML={{ __html: hero?.title || 'Give a <span class="italic">Second Chance.</span>' }} />
            </h1>
            <div className="flex items-center justify-center gap-4">
              <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
                {hero?.subtitle || "Your contribution directly funds life-saving medical support, global awareness campaigns, and direct assistance for transplant survivors."}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Donation Options */}
      <section className="py-16 md:py-24 px-6 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
            {/* Impact Cards */}
            <div className="lg:col-span-2 space-y-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
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
                    className="p-8 md:p-10 border border-brand-ink/5 bg-brand-cream/30 hover:bg-white hover:shadow-2xl transition-all group cursor-pointer"
                  >
                    <span className="text-3xl font-serif font-bold text-brand-red block mb-4">{item.amount}</span>
                    <h3 className="text-xl font-serif font-bold text-brand-ink mb-4">{item.title}</h3>
                    <p className="text-sm text-brand-ink/60 font-light leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              <div className="p-8 md:p-12 border border-brand-ink/5 bg-brand-ink text-white">
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

            {/* Zelle Donation Info */}
            <div className="bg-brand-cream p-8 md:p-12 border border-brand-ink/5 shadow-xl h-fit lg:sticky lg:top-32">
              <h3 className="text-2xl font-serif font-bold text-brand-ink mb-8">Make a Donation</h3>
              <div className="space-y-8">
                <div className="p-6 bg-white border border-brand-ink/5">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-brand-red text-white flex items-center justify-center">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest font-bold text-brand-ink/40">Primary Method</h4>
                      <p className="text-lg font-serif font-bold text-brand-ink">Zelle Transfer</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-sm text-brand-ink/60 font-light leading-relaxed">
                      Please send your contributions directly to our official Zelle account:
                    </p>
                    <div className="p-4 bg-brand-cream border border-brand-ink/5 select-all cursor-pointer group relative">
                      <span className="text-brand-ink font-bold break-all block pr-8">
                        {settings.zelleEmail}
                      </span>
                    </div>
                    <p className="text-[10px] text-brand-ink/40 italic">
                      * 100% of your donation goes directly to our programs.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-brand-ink/40">Instructions</h4>
                  <ul className="text-xs text-brand-ink/60 space-y-2 font-light list-disc pl-4">
                    <li>Open your banking app</li>
                    <li>Select "Send Money with Zelle"</li>
                    <li>Enter our email address above</li>
                    <li>Enter the amount you wish to donate</li>
                    <li>Confirm and send</li>
                  </ul>
                </div>

                <div className="pt-6 border-t border-brand-ink/5 flex items-center justify-center gap-4">
                  <ShieldCheck className="w-4 h-4 text-brand-ink/40" />
                  <span className="text-[9px] uppercase tracking-widest font-bold text-brand-ink/40">Direct & Secure Transfer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
