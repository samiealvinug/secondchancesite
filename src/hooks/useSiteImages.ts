import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface SiteImage {
  image_key: string;
  image_url: string;
  alt_text: string;
}

export function useSiteImages() {
  const [images, setImages] = useState<Record<string, string>>({
    home_philosophy: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=1000',
    home_donation: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1000',
    about_bridge: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1000',
    about_founder: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000',
    donate_bg_image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=2070',
    impact_success_story_main: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1600',
    impact_success_story_caregiver: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&q=80&w=1000',
    impact_success_story_letter: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800'
  });
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('site_images')
        .select('image_key, image_url');

      if (error) throw error;

      if (data) {
        const imageMap: Record<string, string> = {};
        data.forEach((img) => {
          imageMap[img.image_key] = img.image_url;
        });
        setImages(imageMap);
      }
    } catch (error) {
      console.error('Error fetching site images:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateImage = async (key: string, url: string) => {
    if (!isSupabaseConfigured) return false;

    try {
      const { error } = await supabase
        .from('site_images')
        .upsert({ 
          image_key: key, 
          image_url: url, 
          updated_at: new Date().toISOString() 
        }, { onConflict: 'image_key' });

      if (error) throw error;

      setImages(prev => ({ ...prev, [key]: url }));
      return true;
    } catch (error) {
      console.error(`Error updating image ${key}:`, error);
      return false;
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return { images, updateImage, loading, refresh: fetchImages };
}
