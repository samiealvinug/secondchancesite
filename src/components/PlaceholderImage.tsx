import { Image as ImageIcon } from 'lucide-react';

interface PlaceholderImageProps {
  className?: string;
  text?: string;
}

export default function PlaceholderImage({ className = "", text = "Image Coming Soon" }: PlaceholderImageProps) {
  return (
    <div className={`bg-brand-ink/5 flex flex-col items-center justify-center p-8 text-center border border-brand-ink/5 ${className}`}>
      <div className="w-16 h-16 rounded-none bg-brand-red/10 flex items-center justify-center text-brand-red mb-4">
        <ImageIcon className="w-8 h-8 opacity-40" />
      </div>
      <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-ink/40">{text}</p>
    </div>
  );
}
