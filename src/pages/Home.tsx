import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, ArrowRight, Globe, ShieldCheck, Activity, ImagePlus, Edit3, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useHeroContent } from '../hooks/useHeroContent';
import { useSiteImages } from '../hooks/useSiteImages';
import PlaceholderImage from '../components/PlaceholderImage';

export default function Home() {
  const { hero, updateHero, loading: heroLoading } = useHeroContent('home');
  const { images, updateImage, loading: imagesLoading } = useSiteImages();
  const [heroImage, setHeroImage] = useState('');

  useEffect(() => {
    if (hero?.image_url) {
      setHeroImage(hero.image_url);
    }
  }, [hero?.image_url]);

  const handleImageChange = async () => {
    const newUrl = prompt('Enter a new image URL for the hero section:', heroImage);
    if (newUrl && newUrl.trim() !== '') {
      const success = await updateHero({ image_url: newUrl });
      if (success) {
        setHeroImage(newUrl);
      }
    }
  };

  const handleSiteImageChange = async (key: string, currentUrl: string) => {
    const newUrl = prompt(`Enter a new image URL for ${key}:`, currentUrl);
    if (newUrl && newUrl.trim() !== '') {
      await updateImage(key, newUrl);
    }
  };

  const handleTextEdit = async () => {
    const newTitle = prompt('Enter a new title:', hero?.title || '');
    const newSubtitle = prompt('Enter a new subtitle:', hero?.subtitle || '');
    
    if (newTitle !== null || newSubtitle !== null) {
      await updateHero({ 
        title: newTitle || hero?.title || '', 
        subtitle: newSubtitle || hero?.subtitle || '' 
      });
    }
  };

  if (heroLoading || imagesLoading) {
    return (
      <div className="pt-32 min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-brand-cream">
      {/* Unique Split Hero Section */}
      <section className="split-layout">
        <div className="flex flex-col justify-center px-8 md:px-20 py-20 bg-brand-cream relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden xl:block">
            <span className="vertical-text text-[10px] uppercase tracking-[0.5em] text-brand-ink/20 font-bold">
              ESTABLISHED 2024 — GLOBAL OUTREACH
            </span>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl group/text"
          >
            <span className="inline-block text-brand-red font-bold text-[11px] uppercase tracking-[0.3em] mb-6">
              {hero?.badge_text || 'A Human-Centered Mission'}
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-brand-ink leading-[0.9] mb-8">
              {hero?.title || 'Giving Life a Second Chance.'}
            </h1>
            <p className="text-lg text-brand-ink/60 mb-10 leading-relaxed font-light">
              {hero?.subtitle || 'Supporting organ donation awareness, transplant survivors, and life-saving medical care across borders. One heart at a time.'}
            </p>
            
            <div className="flex flex-wrap gap-6 items-center">
              <Link 
                to={hero?.button_link || '/about'} 
                className="bg-brand-red text-white px-10 py-5 rounded-none text-[12px] uppercase tracking-widest font-bold hover:bg-brand-ink transition-all shadow-2xl shadow-brand-red/20"
              >
                {hero?.button_text || 'Our Story'}
              </Link>
            </div>
          </motion.div>
        </div>
        
        <div className="relative h-[60vh] lg:h-auto overflow-hidden group">
          {heroImage ? (
            <>
              <motion.img 
                key={heroImage}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5 }}
                src={heroImage} 
                alt="Medical care and hope" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-red/10 mix-blend-multiply" />
            </>
          ) : (
            <PlaceholderImage className="w-full h-full" />
          )}
          
          <div className="absolute bottom-12 right-12 bg-brand-cream p-8 rounded-none shadow-2xl max-w-xs hidden md:block">
            <Activity className="w-8 h-8 text-brand-red mb-4" />
            <p className="text-sm text-brand-ink/60 leading-relaxed italic">
              "We exist to give hope and support families navigating life-saving medical journeys."
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section - Oversized Numbers */}
      <section className="py-32 bg-brand-ink text-brand-cream overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-8 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {[
              { number: "01", title: "Awareness", desc: "Debunking myths and educating communities about the power of donation." },
              { number: "02", title: "Advocacy", desc: "Fighting for patient rights and better access to life-saving care." },
              { number: "03", title: "Support", desc: "Direct assistance for families during their most critical moments." }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white/5 p-10 rounded-none border border-white/5"
              >
                <span className="text-8xl font-serif font-bold text-brand-red/20 block mb-6">{stat.number}</span>
                <h3 className="text-2xl font-serif font-bold mb-4">{stat.title}</h3>
                <p className="text-brand-cream/50 font-light leading-relaxed">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section - Editorial Style */}
      <section className="py-32 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-8 md:px-20">
          <div className="flex flex-col items-center text-center mb-24">
            <span className="text-brand-red font-bold text-[11px] uppercase tracking-[0.3em] mb-6">Our Philosophy</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-brand-ink max-w-3xl leading-tight">
              Survival Carries <span className="italic">Responsibility.</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative group/img">
              <div className="aspect-[4/5] rounded-none overflow-hidden shadow-2xl">
                {images.home_philosophy ? (
                  <img 
                    src={images.home_philosophy} 
                    alt="Helping hands" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <PlaceholderImage className="w-full h-full" />
                )}
              </div>
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-red rounded-none flex items-center justify-center p-8 text-center text-white shadow-2xl hidden xl:flex">
                <p className="text-xs font-bold uppercase tracking-widest leading-relaxed">100% of support goes to the mission</p>
              </div>
            </div>
            
            <div className="space-y-10">
              <p className="text-2xl font-serif italic text-brand-ink/80 leading-relaxed">
                "Second Chance at Life was born from lived experience with organ failure and transplantation. We believe every life saved is a testament to human resilience."
              </p>
              <div className="h-px w-20 bg-brand-red/30" />
              <p className="text-lg text-brand-ink/60 font-light leading-relaxed">
                Our organization focuses on advocacy, education, and compassionate support. We exist to give hope, raise awareness, and support individuals and families navigating life-saving medical journeys across the world.
              </p>
              <Link to="/about" className="inline-flex items-center gap-4 text-[12px] uppercase tracking-widest font-bold text-brand-red group">
                Discover More
                <div className="w-8 h-px bg-brand-red group-hover:w-12 transition-all" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Minimalist */}
      <section className="py-32 bg-white border-y border-brand-ink/5">
        <div className="max-w-7xl mx-auto px-8 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { name: "Sarah J.", role: "Transplant Recipient", text: "They gave me a community that understood my fear and my hope." },
              { name: "Michael O.", role: "Family Member", text: "The support we received during my father's surgery was life-changing." },
              { name: "Elena R.", role: "Donor Advocate", text: "Seeing Peter's story inspired me to register as a donor. One decision saves lives." }
            ].map((t, i) => (
              <div key={i} className="flex flex-col">
                <Heart className="w-6 h-6 text-brand-red/20 mb-6" />
                <p className="text-xl font-serif italic text-brand-ink/80 mb-8 leading-relaxed">"{t.text}"</p>
                <div className="mt-auto pt-8 border-t border-brand-ink/5">
                  <p className="font-bold text-brand-ink text-sm">{t.name}</p>
                  <p className="text-[10px] uppercase tracking-widest text-brand-ink/40 mt-1">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Section - High Impact */}
      <section className="py-32 bg-brand-cream border-t border-brand-ink/5">
        <div className="max-w-7xl mx-auto px-8 md:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-brand-red font-bold text-[11px] uppercase tracking-[0.3em] mb-6 block">Support Our Mission</span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-brand-ink mb-8 leading-tight">
                Give the Gift of <span className="italic">Life.</span>
              </h2>
              <p className="text-lg text-brand-ink/60 mb-10 leading-relaxed font-light">
                Your donation directly supports families navigating the complex journey of organ failure and transplantation. From medical expenses to emotional support, every contribution makes a difference.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link 
                  to="/donate" 
                  className="bg-brand-red text-white px-12 py-6 rounded-none font-bold text-[12px] uppercase tracking-widest hover:bg-brand-ink transition-all shadow-2xl shadow-brand-red/20 text-center"
                >
                  Donate Now
                </Link>
                <div className="flex items-center gap-4 px-6 py-4 border border-brand-ink/10">
                  <ShieldCheck className="w-6 h-6 text-brand-red" />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-brand-ink/60">Secure & Transparent</span>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative group/img">
              <div className="aspect-square rounded-none overflow-hidden shadow-2xl">
                {images.home_donation ? (
                  <img 
                    src={images.home_donation} 
                    alt="Helping hand" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <PlaceholderImage className="w-full h-full" />
                )}
              </div>
              <div className="absolute -bottom-12 -right-12 bg-brand-ink text-white p-12 rounded-none shadow-2xl hidden xl:block max-w-xs">
                <p className="text-3xl font-serif font-bold mb-4">100%</p>
                <p className="text-[10px] uppercase tracking-widest font-bold text-white/60">Of your donation goes directly to supporting our patients and awareness programs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Immersive */}
      <section className="py-40 bg-brand-red text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full border-[100px] border-white rounded-full scale-150 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-8 relative z-10">
          <h2 className="text-5xl md:text-8xl font-serif font-bold mb-10 leading-none">
            Be the <span className="italic">Reason</span> Someone Lives.
          </h2>
          <p className="text-xl text-white/80 mb-12 font-light max-w-2xl mx-auto">
            Your support gives someone another chance at life. Join our global mission today.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <Link to="/impact" className="bg-brand-cream text-brand-red px-12 py-6 rounded-none font-bold text-[12px] uppercase tracking-widest hover:bg-brand-ink hover:text-brand-cream transition-all shadow-2xl">
              Our Impact
            </Link>
            <Link to="/contact" className="bg-transparent border border-white/30 text-white px-12 py-6 rounded-none font-bold text-[12px] uppercase tracking-widest hover:bg-white hover:text-brand-red transition-all">
              Join Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
