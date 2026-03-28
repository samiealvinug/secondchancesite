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

export const DEFAULT_HERO_CONTENT: Record<string, HeroContent> = {
  home: {
    page_name: 'home',
    badge_text: 'A Human-Centered Mission',
    title: 'Giving Life a Second Chance.',
    subtitle: 'Supporting organ donation awareness, transplant survivors, and life-saving medical care across borders. One heart at a time.',
    button_text: 'Our Story',
    button_link: '/about',
    image_url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2070'
  },
  impact: {
    page_name: 'impact',
    badge_text: 'Our Reach',
    title: 'Global <span class="italic">Impact.</span>',
    subtitle: 'Measuring our success not in numbers, but in the lives we touch and the hope we restore across borders.',
    button_text: 'View Stats',
    button_link: '#stats',
    image_url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=2070'
  },
  about: {
    page_name: 'about',
    badge_text: 'Our Story',
    title: 'The <span class="italic">Heart</span> of Our Mission.',
    subtitle: 'A journey born from personal experience, dedicated to giving others a second chance at life.',
    button_text: 'Meet the Team',
    button_link: '#team',
    image_url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=2070'
  },
  donate: {
    page_name: 'donate',
    badge_text: 'Support the Mission',
    title: 'Give a <span class="italic">Second Chance.</span>',
    subtitle: 'Your contribution directly funds life-saving medical support, global awareness campaigns, and direct assistance for transplant survivors.',
    button_text: 'Donate Now',
    button_link: '#donate',
    image_url: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=2070'
  },
  media: {
    page_name: 'media',
    badge_text: 'Our Journey',
    title: 'Stories in <span class="italic">Motion.</span>',
    subtitle: 'Capturing the moments, the people, and the progress of our global mission.',
    button_text: 'View Gallery',
    button_link: '#gallery',
    image_url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=2070'
  }
};

export function useHeroContent(pageName: string = 'home') {
  const [hero, setHero] = useState<HeroContent | null>(DEFAULT_HERO_CONTENT[pageName] || DEFAULT_HERO_CONTENT.home);
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
      } else if (DEFAULT_HERO_CONTENT[pageName]) {
        // Seed the database with default content if it's missing
        await updateHero(DEFAULT_HERO_CONTENT[pageName]);
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
