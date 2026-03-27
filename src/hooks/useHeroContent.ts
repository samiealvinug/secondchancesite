import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface HeroContent {
  page_name: string;
  badge_text: string;
  title: string;
  subtitle: string;
  button_text: string;
  button_link: string;
  image_url: string;
}

export function useHeroContent(pageName: string = 'home') {
  const [hero, setHero] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchHero = async () => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('hero_content')
        .select('*')
        .eq('page_name', pageName)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "no rows returned"

      if (data) {
        setHero(data);
      }
    } catch (error) {
      console.error(`Error fetching hero content for ${pageName}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const updateHero = async (updates: Partial<HeroContent>) => {
    if (!isSupabaseConfigured) {
      alert('Supabase is not configured.');
      return false;
    }

    try {
      const { error } = await supabase
        .from('hero_content')
        .upsert({ 
          page_name: pageName, 
          ...updates, 
          updated_at: new Date().toISOString() 
        }, { onConflict: 'page_name' });

      if (error) throw error;

      setHero(prev => prev ? { ...prev, ...updates } : null);
      return true;
    } catch (error) {
      console.error('Error updating hero content:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchHero();
  }, [pageName]);

  return { hero, loading, updateHero, refresh: fetchHero };
}
