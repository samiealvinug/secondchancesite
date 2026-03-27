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
      setMedia([]);
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
