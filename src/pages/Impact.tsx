import { motion } from 'motion/react';
import { Globe, Users, Heart, Megaphone, MapPin, CheckCircle } from 'lucide-react';
import { useImpactData } from '../hooks/useImpactData';
import { useHeroContent } from '../hooks/useHeroContent';
import { useSiteImages } from '../hooks/useSiteImages';
import PlaceholderImage from '../components/PlaceholderImage';

export default function Impact() {
  const { 
    stats, 
    initiatives, 
    loading: impactLoading
  } = useImpactData();
  const { hero, loading: heroLoading } = useHeroContent('impact');
  const { images } = useSiteImages();

  if (impactLoading || heroLoading) {
    return (
      <div className="pt-32 min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red"></div>
      </div>
    );
  }

  return (
    <div className="pt-32 bg-brand-cream overflow-hidden">
      {/* Hero - Split Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-brand-ink/5">
        <div className="flex flex-col justify-center px-6 md:px-20 py-16 md:py-24 group">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <span className="text-brand-red font-bold text-[11px] uppercase tracking-[0.3em] mb-6 block flex items-center gap-2">
              {hero?.badge_text || "Our Reach"}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-serif font-bold text-brand-ink mb-8 md:mb-12 leading-tight md:leading-none flex items-start gap-4">
              <span dangerouslySetInnerHTML={{ __html: hero?.title || 'Global <span class="italic">Impact.</span>' }} />
            </h1>
            <div className="flex items-start gap-4">
              <p className="text-lg md:text-xl text-brand-ink/60 leading-relaxed font-light max-w-lg">
                {hero?.subtitle || "Measuring our success not in numbers, but in the lives we touch and the hope we restore across borders."}
              </p>
            </div>
          </motion.div>
        </div>
        <div className="relative h-[300px] sm:h-[400px] lg:h-auto overflow-hidden bg-brand-ink group/img">
          {hero?.image_url ? (
            <img 
              src={hero.image_url} 
              alt="Global impact" 
              className="w-full h-full object-cover opacity-60"
              referrerPolicy="no-referrer"
            />
          ) : (
            <PlaceholderImage className="w-full h-full opacity-40" />
          )}
        </div>
      </section>

      {/* Stats - Oversized Numbers */}
      <section className="py-20 md:py-32 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group"
              >
                <span className="text-6xl md:text-7xl font-serif font-bold text-brand-red/10 block mb-2 md:mb-4">{stat.number}</span>
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-red mb-4">{stat.label}</h3>
                <p className="text-brand-ink/60 font-light text-sm">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives - Editorial Style */}
      <section className="py-20 md:py-32 px-6 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16 md:mb-24">
            <span className="text-brand-red font-bold text-[11px] uppercase tracking-[0.3em] mb-6">Our Work</span>
            <h2 className="text-3xl md:text-6xl font-serif font-bold text-brand-ink max-w-3xl leading-tight">
              Turning Compassion into <span className="italic">Action.</span>
            </h2>
          </div>
          
          <div className="space-y-24 md:space-y-40">
            {initiatives.map((item, i) => (
              <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 md:gap-24 items-center group`}>
                <div className="flex-1 space-y-8">
                  <div className="flex items-center justify-between">
                    <span className="text-brand-red font-serif italic text-4xl">0{i + 1}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-brand-ink">{item.title}</h3>
                  <p className="text-xl text-brand-ink/60 leading-relaxed font-light">{item.description}</p>
                  <ul className="space-y-4 pt-4">
                    {[1, 2].map((_, j) => (
                      <li key={j} className="flex items-center gap-4 text-brand-ink/70">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                        <span className="font-light">Strategic partnership with local healthcare providers.</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 w-full">
                  <div className="aspect-[4/3] rounded-none overflow-hidden shadow-2xl relative group/img">
                    {item.image_url ? (
                      <img 
                        src={item.image_url} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-110"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <PlaceholderImage className="w-full h-full" />
                    )}
                    <div className="absolute inset-0 bg-brand-red/10 mix-blend-multiply opacity-0 group-hover/img:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* A Safe Return Home Section */}
      <section className="py-20 md:py-32 px-6 md:px-20 bg-brand-cream border-t border-brand-ink/5">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-12 md:space-y-20"
          >
            {/* Section Title */}
            <div className="space-y-4">
              <span className="text-brand-red font-bold text-[11px] uppercase tracking-[0.3em] block">Success Story</span>
              <h2 className="text-3xl md:text-6xl font-serif font-bold text-brand-ink leading-tight">
                A Safe Return Home: <span className="italic">A New Beginning.</span>
              </h2>
            </div>

            {/* Intro Image (Top) */}
            <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden shadow-2xl group">
              <img 
                src={images.impact_success_story_main} 
                alt="Child supported by Second Chance program" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-red/5 mix-blend-multiply" />
            </div>

            {/* Story Text */}
            <div className="max-w-3xl mx-auto">
              <p className="text-xl md:text-2xl text-brand-ink/80 leading-relaxed font-serif italic">
                “One of the children supported through the Second Chance program has safely returned to Uganda. We’re happy to share that the entire journey went smoothly, thanks to the dedication and support of everyone involved. This marks the beginning of a new chapter filled with hope, opportunity, and continued growth.”
              </p>
            </div>

            {/* Supporting Image (Below Text) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="aspect-square overflow-hidden shadow-xl">
                <img 
                  src={images.impact_success_story_caregiver} 
                  alt="Child with caregiver" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Credibility Element */}
              <div className="space-y-6 text-left">
                <div className="aspect-[3/4] bg-white p-4 shadow-lg border border-brand-ink/5 relative group">
                  <img 
                    src={images.impact_success_story_letter} 
                    alt="Ministry of Health Appreciation Letter" 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-brand-ink/10">
                    <CheckCircle className="w-12 h-12 text-brand-red" />
                  </div>
                </div>
                <p className="text-xs md:text-sm text-brand-ink/60 font-medium uppercase tracking-widest leading-relaxed">
                  “Official recognition from the Ministry of Health for contributions toward saving children’s lives.”
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="pt-12">
              <a 
                href="/donate" 
                className="inline-block bg-brand-red text-white px-12 py-6 rounded-none font-bold text-[12px] uppercase tracking-[0.3em] hover:bg-brand-ink transition-all shadow-2xl shadow-brand-red/20"
              >
                Support More Children
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Borderless Mission - Immersive Dark */}
      <section className="py-20 md:py-32 px-6 md:px-20 bg-brand-ink text-brand-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="space-y-10">
              <span className="text-brand-red font-bold text-[11px] uppercase tracking-[0.3em] block">Our Presence</span>
              <h2 className="text-3xl md:text-6xl font-serif font-bold leading-tight">
                A <span className="italic">Borderless</span> Mission.
              </h2>
              <p className="text-xl text-brand-cream/60 font-light leading-relaxed">
                From our roots in Texas to our outreach in Uganda and India, we believe that life-saving care should have no borders.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-8">
                {['United States', 'Uganda', 'India', 'Africa Outreach'].map((loc) => (
                  <div key={loc} className="flex items-center gap-4 group">
                    <MapPin className="w-5 h-5 text-brand-red group-hover:scale-125 transition-transform" />
                    <span className="font-serif italic text-lg">{loc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-full border border-brand-cream/10 flex items-center justify-center p-12">
                <Globe className="w-full h-full text-brand-red/20 animate-[spin_20s_linear_infinite]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-brand-red rounded-full blur-3xl opacity-20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
