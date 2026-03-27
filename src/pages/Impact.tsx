import { motion } from 'motion/react';
import { Globe, Users, Heart, Megaphone, MapPin, CheckCircle, Edit3, Camera, Plus, Trash2 } from 'lucide-react';
import { useImpactData, ImpactInitiative, ImpactStat } from '../hooks/useImpactData';
import { useHeroContent } from '../hooks/useHeroContent';

export default function Impact() {
  const { 
    stats, 
    initiatives, 
    loading: impactLoading, 
    addInitiative, 
    updateInitiative, 
    deleteInitiative, 
    updateStat 
  } = useImpactData();
  const { hero, updateHero, loading: heroLoading } = useHeroContent('impact');

  const handleTextEdit = async (field: 'title' | 'subtitle' | 'badge_text') => {
    const currentValue = hero ? hero[field] : '';
    const newValue = prompt(`Enter new ${field.replace('_', ' ')}:`, currentValue);
    if (newValue !== null && newValue.trim() !== '') {
      await updateHero({ [field]: newValue });
    }
  };

  const handleHeroImageChange = async () => {
    const currentUrl = hero?.image_url || '';
    const newUrl = prompt('Enter new hero image URL:', currentUrl);
    if (newUrl && newUrl.trim() !== '') {
      await updateHero({ image_url: newUrl });
    }
  };

  const handleEditInitiative = async (item: ImpactInitiative) => {
    if (!item.id) return;
    const title = prompt('Enter new title:', item.title);
    const description = prompt('Enter new description:', item.description);
    const image_url = prompt('Enter new image URL:', item.image_url);

    if (title && description && image_url) {
      await updateInitiative(item.id, { title, description, image_url });
    }
  };

  const handleDeleteInitiative = async (id?: string) => {
    if (!id) return;
    if (confirm('Are you sure you want to delete this initiative?')) {
      await deleteInitiative(id);
    }
  };

  const handleAddInitiative = async () => {
    const title = prompt('Enter title:');
    const description = prompt('Enter description:');
    const image_url = prompt('Enter image URL:');

    if (title && description && image_url) {
      await addInitiative({ title, description, image_url, display_order: initiatives.length + 1 });
    }
  };

  const handleEditStat = async (stat: ImpactStat) => {
    if (!stat.id) return;
    const number = prompt('Enter new number (e.g. 10k+):', stat.number);
    const label = prompt('Enter new label:', stat.label);
    const description = prompt('Enter new description:', stat.description);

    if (number && label && description) {
      await updateStat(stat.id, { number, label, description });
    }
  };

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
      <section className="split-layout border-b border-brand-ink/5">
        <div className="flex flex-col justify-center px-8 md:px-20 py-20 group">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <span className="text-brand-red font-bold text-[11px] uppercase tracking-[0.3em] mb-6 block flex items-center gap-2">
              {hero?.badge_text || "Our Reach"}
            </span>
            <h1 className="text-5xl md:text-8xl font-serif font-bold text-brand-ink mb-12 leading-none flex items-start gap-4">
              <span dangerouslySetInnerHTML={{ __html: hero?.title || 'Global <span class="italic">Impact.</span>' }} />
            </h1>
            <div className="flex items-start gap-4">
              <p className="text-xl text-brand-ink/60 leading-relaxed font-light max-w-lg">
                {hero?.subtitle || "Measuring our success not in numbers, but in the lives we touch and the hope we restore across borders."}
              </p>
            </div>
          </motion.div>
        </div>
        <div className="relative h-[40vh] lg:h-auto overflow-hidden bg-brand-ink group/img">
          <img 
            src={hero?.image_url || "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1000"} 
            alt="Global impact" 
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* Stats - Oversized Numbers */}
      <section className="py-32 px-8 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group"
              >
                <span className="text-7xl font-serif font-bold text-brand-red/10 block mb-4">{stat.number}</span>
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-red mb-4">{stat.label}</h3>
                <p className="text-brand-ink/60 font-light text-sm">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives - Editorial Style */}
      <section className="py-32 px-8 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-24">
            <span className="text-brand-red font-bold text-[11px] uppercase tracking-[0.3em] mb-6">Our Work</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-brand-ink max-w-3xl leading-tight">
              Turning Compassion into <span className="italic">Action.</span>
            </h2>
          </div>
          
          <div className="space-y-40">
            {initiatives.map((item, i) => (
              <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-24 items-center group`}>
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
                    <img 
                      src={item.image_url} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-brand-red/10 mix-blend-multiply opacity-0 group-hover/img:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Borderless Mission - Immersive Dark */}
      <section className="py-32 px-8 md:px-20 bg-brand-ink text-brand-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
              <span className="text-brand-red font-bold text-[11px] uppercase tracking-[0.3em] block">Our Presence</span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
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
