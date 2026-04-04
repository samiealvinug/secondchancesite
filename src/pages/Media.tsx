import { motion } from 'motion/react';
import { Play, Image as ImageIcon, Video, ArrowRight } from 'lucide-react';
import { useMediaGallery } from '../hooks/useMediaGallery';
import PlaceholderImage from '../components/PlaceholderImage';

export default function Media() {
  const { media, loading: mediaLoading } = useMediaGallery();

  if (mediaLoading) {
    return (
      <div className="pt-32 min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red"></div>
      </div>
    );
  }

  const photos = media.filter(item => item.media_type === 'image');
  const videos = media.filter(item => item.media_type === 'video');

  return (
    <div className="pt-32 bg-brand-cream">
      {/* Visual Journey Section */}
      <section className="py-16 md:py-24 px-6 md:px-20 border-b border-brand-ink/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h2 className="text-brand-red font-bold text-[11px] uppercase tracking-[0.3em]">
              Visual Journey
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-serif font-bold text-brand-ink leading-tight md:leading-none">
              Media <span className="italic">Archive.</span>
            </h1>
            <p className="text-lg md:text-xl text-brand-ink/60 max-w-2xl font-light leading-relaxed">
              Witness the stories of hope and the impact of your support through our visual journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Video Section - Refined */}
      <section className="py-20 md:py-32 px-6 md:px-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red mb-6">
              <Video className="w-6 h-6" />
            </div>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-brand-ink mb-4">Our Story in Motion</h2>
            <div className="h-px w-20 bg-brand-red/30" />
          </div>
          
          <div className="relative aspect-video rounded-none overflow-hidden shadow-2xl bg-brand-ink group">
            <iframe 
              className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
              src={videos.length > 0 ? videos[0].media_url : "https://www.youtube.com/embed/L3dqtwVQd00"} 
              title="Second Chance At Life Story"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Photo Gallery - Sophisticated */}
      <section className="py-20 md:py-32 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-8">
            <div className="max-w-xl">
              <span className="text-brand-red font-bold text-[11px] uppercase tracking-[0.3em] mb-6 block">Moments</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-ink">Impact in <span className="italic">Focus.</span></h2>
            </div>
            <div className="flex flex-col items-end gap-4">
              <p className="text-brand-ink/60 font-light max-w-xs text-right">
                Real images of donation ceremonies, community work, and medical outreach across the globe.
              </p>
            </div>
          </div>

          {photos.length === 0 ? (
            <div className="py-20 text-center border-2 border-dashed border-brand-ink/10">
              <p className="text-brand-ink/40 font-serif italic text-xl">No photos in the archive yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {photos.map((photo, i) => (
                <motion.div 
                  key={photo.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative aspect-[4/5] rounded-none overflow-hidden shadow-lg bg-brand-ink"
                >
                  <img 
                    src={photo.media_url} 
                    alt={photo.title || `Gallery image ${i + 1}`} 
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:opacity-70"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-16 h-16 rounded-none bg-brand-red text-white flex items-center justify-center scale-75 group-hover:scale-100 transition-transform mb-4">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                  </div>
                  {photo.title && (
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-brand-ink to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white font-serif italic">{photo.title}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
          
          <div className="mt-24 text-center">
            <a 
              href="#" 
              className="inline-flex items-center gap-4 text-brand-red font-bold text-[12px] uppercase tracking-[0.3em] group"
            >
              View Full Archive
              <div className="w-10 h-10 rounded-none border border-brand-red/20 flex items-center justify-center group-hover:bg-brand-red group-hover:text-white transition-all">
                <ArrowRight className="w-4 h-4" />
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
