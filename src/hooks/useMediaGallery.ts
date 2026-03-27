import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface MediaItem {
  id: string;
  title: string;
  category: string;
  media_url: string;
  media_type: 'image' | 'video';
}

export function useMediaGallery() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMedia = async () => {
    if (!isSupabaseConfigured) {
      // Fallback data if not configured
      setMedia([
        { id: '1', title: 'Gallery 1', category: 'Impact', media_url: "https://images.unsplash.com/photo-1559027615-cd937c9be54a?auto=format&fit=crop&q=80&w=800", media_type: 'image' },
        { id: '2', title: 'Gallery 2', category: 'Impact', media_url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800", media_type: 'image' },
        { id: '3', title: 'Gallery 3', category: 'Impact', media_url: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=800", media_type: 'image' },
        { id: '4', title: 'Gallery 4', category: 'Impact', media_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800", media_type: 'image' },
        { id: '5', title: 'Gallery 5', category: 'Impact', media_url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800", media_type: 'image' },
        { id: '6', title: 'Gallery 6', category: 'Impact', media_url: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=800", media_type: 'image' },
      ]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('media_gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data && data.length > 0) {
        setMedia(data);
      } else {
        // If table is empty, show empty list or fallback
        setMedia([]);
      }
    } catch (error) {
      console.error('Error fetching media gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const addMedia = async (item: Omit<MediaItem, 'id'>) => {
    if (!isSupabaseConfigured) return false;
    try {
      const { error } = await supabase
        .from('media_gallery')
        .insert([item]);
      if (error) throw error;
      await fetchMedia();
      return true;
    } catch (error) {
      console.error('Error adding media:', error);
      return false;
    }
  };

  const deleteMedia = async (id: string) => {
    if (!isSupabaseConfigured) return false;
    try {
      const { error } = await supabase
        .from('media_gallery')
        .delete()
        .eq('id', id);
      if (error) throw error;
      await fetchMedia();
      return true;
    } catch (error) {
      console.error('Error deleting media:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  return { media, loading, addMedia, deleteMedia, refresh: fetchMedia };
}
