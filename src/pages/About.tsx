import { motion } from 'motion/react';
import { ShieldCheck, Globe, Heart, Users, Target, Eye, Quote, Award, Camera, Edit3 } from 'lucide-react';
import { useSiteImages } from '../hooks/useSiteImages';
import { useHeroContent } from '../hooks/useHeroContent';

export default function About() {
  const { images, updateImage, loading: imagesLoading } = useSiteImages();
  const { hero, updateHero, loading: heroLoading } = useHeroContent('about');

  const handleImageChange = async (key: string, currentUrl: string) => {
    const newUrl = prompt(`Enter a new image URL for ${key}:`, currentUrl);
    if (newUrl && newUrl.trim() !== '') {
      await updateImage(key, newUrl);
    }
  };

  const handleTextEdit = async (field: 'title' | 'subtitle' | 'badge_text') => {
    const currentValue = hero ? hero[field] : '';
    const newValue = prompt(`Enter new ${field.replace('_', ' ')}:`, currentValue);
    if (newValue !== null && newValue.trim() !== '') {
      await updateHero({ [field]: newValue });
    }
  };

  if (imagesLoading || heroLoading) {
    return (
      <div className="pt-32 min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red"></div>
      </div>
    );
  }

  return (
    <div className="pt-32 bg-brand-cream">
      {/* Header - Minimalist */}
      <section className="py-20 px-8 md:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative"
          >
            <span className="text-brand-red font-bold text-[11px] uppercase tracking-[0.3em] mb-6 block flex items-center gap-2">
              {hero?.badge_text || "Our Identity"}
            </span>
            <h1 className="text-5xl md:text-8xl font-serif font-bold text-brand-ink mb-12 leading-none flex items-start gap-4">
              <span dangerouslySetInnerHTML={{ __html: hero?.title || 'The <span class="italic">Responsibility</span> of Survival.' }} />
            </h1>
            <div className="flex items-start gap-4">
              <p className="text-xl text-brand-ink/60 max-w-2xl font-light leading-relaxed">
                {hero?.subtitle || "Second Chance at Life was born from lived experience with organ failure and transplantation."}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content - Split Layout */}
      <section className="py-24 px-8 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start mb-32">
            <div className="space-y-8">
              <h2 className="text-3xl font-serif font-bold text-brand-ink">A Bridge to Hope</h2>
              <p className="text-xl text-brand-ink/70 leading-relaxed font-light">
                Second Chance at Life was born from lived experience with organ failure and transplantation. We understand the physical, emotional, and financial toll these journeys take on individuals and their families.
              </p>
              <p className="text-lg text-brand-ink/60 leading-relaxed font-light">
                We believe that every life saved is a testament to human resilience and community support. Our organization serves as a bridge, connecting those in need with resources, education, and a global network of hope.
              </p>
            </div>
            <div className="relative group/img">
              <div className="aspect-[4/3] rounded-none overflow-hidden shadow-2xl">
                <img 
                  src={images.about_bridge || "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1000"} 
                  alt="Medical support" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-brand-red text-white p-8 rounded-none shadow-2xl hidden md:block">
                <p className="text-4xl font-serif font-bold mb-2">2024</p>
                <p className="text-[10px] uppercase tracking-widest font-bold">Foundation Year</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                icon: Target, 
                title: "Our Mission", 
                text: "To give hope, raise awareness, and support individuals and families navigating life-saving medical journeys across the world." 
              },
              { 
                icon: Eye, 
                title: "Our Vision", 
                text: "A world where organ donation is universally understood and every patient has the support they need to survive and thrive." 
              },
              { 
                icon: Heart, 
                title: "Our Values", 
                text: "Compassion, integrity, advocacy, and a relentless commitment to the sanctity of life." 
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white p-12 rounded-none border border-brand-ink/5 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="bg-brand-cream w-16 h-16 rounded-none flex items-center justify-center text-brand-red mb-8 group-hover:bg-brand-red group-hover:text-white transition-colors">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-brand-ink mb-6">{item.title}</h3>
                <p className="text-brand-ink/60 leading-relaxed font-light">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Story Section */}
      <section className="py-32 px-8 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <span className="text-brand-red font-bold text-[11px] uppercase tracking-[0.3em] mb-6 block">The Founder</span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-brand-ink mb-8 leading-tight">
                A Second Chance <br /><span className="italic text-brand-red">to Serve.</span>
              </h2>
              <div className="space-y-6 text-lg text-brand-ink/70 font-light leading-relaxed">
                <p className="text-xl font-serif italic text-brand-ink">
                  "I was once a rising star on the football field, an athlete at the University of Texas Longhorns. My life was defined by strength and competition until a life-threatening heart condition brought everything to a sudden halt."
                </p>
                <p>
                  Peter Mpagi's journey from a rising star on the football field to a heart transplant survivor is the heartbeat of our organization. Supported by his community, he received the gift of life: a heart transplant.
                </p>
                <p>
                  During his healing, Peter realized his survival was a call to action. He founded Second Chance at Life to ensure no one navigates the journey of organ failure alone.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative group/img"
            >
              <div className="aspect-[4/5] rounded-none overflow-hidden shadow-2xl bg-brand-ink">
                <img 
                  src={images.about_founder || "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=1000"} 
                  alt="Peter Mpagi" 
                  className="w-full h-full object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-12 -left-12 bg-white p-10 rounded-none shadow-2xl max-w-xs hidden md:block">
                <Award className="w-10 h-10 text-brand-red mb-4" />
                <h3 className="text-xl font-serif font-bold text-brand-ink mb-2">Peter Mpagi</h3>
                <p className="text-sm text-brand-ink/40 uppercase tracking-widest font-bold">Founder & Survivor</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-24 bg-brand-ink text-brand-cream">
        <div className="max-w-7xl mx-auto px-8 md:px-20">
          <div className="text-center mb-16">
            <span className="text-brand-red font-bold text-[11px] uppercase tracking-[0.3em] mb-4 block">Our Foundation</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Core Pillars</h2>
            <p className="text-brand-cream/60 font-light">The foundation of everything we do.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Advocacy", desc: "We fight for policies that increase organ donation rates and improve patient care standards globally." },
              { title: "Education", desc: "We provide clear, accessible information to debunk myths about organ donation and medical procedures." },
              { title: "Compassionate Support", desc: "We offer direct assistance and emotional guidance to families during their most difficult moments." }
            ].map((pillar, i) => (
              <div key={i} className="border border-brand-cream/10 p-10 rounded-none hover:bg-brand-cream/5 transition-all group">
                <h3 className="text-2xl font-serif font-bold mb-6 text-brand-red group-hover:translate-x-2 transition-transform">{pillar.title}</h3>
                <p className="text-brand-cream/60 leading-relaxed font-light">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
