import { Heart, Camera } from 'lucide-react';
import { cn } from '../lib/utils';
import { useSiteImages } from '../hooks/useSiteImages';

export const Logo = ({ className = "", light = false }: { className?: string; light?: boolean }) => {
  const { images } = useSiteImages();
  const logoUrl = images.site_logo;

  if (logoUrl) {
    return (
      <div className={cn("relative group/logo flex items-center", className, light && "drop-shadow-sm")}>
        <img 
          src={logoUrl} 
          alt="Second Chance At Life Logo" 
          className={cn("h-[74px] w-auto object-contain", light && "brightness-0 invert")}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-4 relative group/logo", className, light && "drop-shadow-sm")}>
      <div className="relative flex items-center justify-center">
        <Heart className="w-10 h-10 text-brand-red fill-brand-red/10" strokeWidth={1.5} />
        <div className="absolute w-15 h-15 border border-brand-red/20 rounded-full animate-[pulse_4s_infinite]" />
      </div>
      <div className="flex flex-col leading-none">
        <span className={cn(
          "font-serif font-bold text-xl tracking-tight transition-colors",
          light ? "text-white" : "text-brand-ink"
        )}>
          Second Chance
        </span>
        <span className="text-[13px] uppercase tracking-[0.2em] font-medium text-brand-red">
          At Life
        </span>
      </div>
    </div>
  );
};
