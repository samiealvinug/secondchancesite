import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface ImpactStat {
  id?: string;
  number: string;
  label: string;
  description: string;
  display_order?: number;
}

export interface ImpactInitiative {
  id?: string;
  title: string;
  description: string;
  image_url: string;
  display_order?: number;
}

export function useImpactData() {
  const [stats, setStats] = useState<ImpactStat[]>([
    { number: "03+", label: "Countries", description: "USA, Uganda, India & beyond" },
    { number: "10k+", label: "Awareness", description: "Reached through global campaigns" },
    { number: "100s", label: "Lives Saved", description: "Direct support for transplant patients" },
    { number: "Global", label: "Advocacy", description: "Policy & education focus" }
  ]);

  const [initiatives, setInitiatives] = useState<ImpactInitiative[]>([
    {
      title: "Organ Donation Awareness",
      description: "Comprehensive campaigns across the United States and Africa to educate the public on the life-saving power of organ donation.",
      image_url: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Patient & Family Support",
      description: "Providing financial, emotional, and logistical support for transplant patients and their families navigating complex medical journeys.",
      image_url: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Medical Outreach",
      description: "Coordinating medical missions and support systems in Uganda, India, and other regions where access to advanced care is limited.",
      image_url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1000"
    }
  ]);

  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    try {
      const { data: statsData, error: statsError } = await supabase
        .from('impact_stats')
        .select('*')
        .order('display_order', { ascending: true });

      if (!statsError && statsData && statsData.length > 0) {
        setStats(statsData);
      }

      const { data: initiativesData, error: initiativesError } = await supabase
        .from('impact_initiatives')
        .select('*')
        .order('display_order', { ascending: true });

      if (!initiativesError && initiativesData && initiativesData.length > 0) {
        setInitiatives(initiativesData);
      }
    } catch (error) {
      console.error('Error fetching impact data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addInitiative = async (initiative: Omit<ImpactInitiative, 'id'>) => {
    if (!isSupabaseConfigured) return false;
    try {
      const { error } = await supabase.from('impact_initiatives').insert([initiative]);
      if (error) throw error;
      fetchData();
      return true;
    } catch (error) {
      console.error('Error adding initiative:', error);
      return false;
    }
  };

  const updateInitiative = async (id: string, updates: Partial<ImpactInitiative>) => {
    if (!isSupabaseConfigured) return false;
    try {
      const { error } = await supabase.from('impact_initiatives').update(updates).eq('id', id);
      if (error) throw error;
      fetchData();
      return true;
    } catch (error) {
      console.error('Error updating initiative:', error);
      return false;
    }
  };

  const deleteInitiative = async (id: string) => {
    if (!isSupabaseConfigured) return false;
    try {
      const { error } = await supabase.from('impact_initiatives').delete().eq('id', id);
      if (error) throw error;
      fetchData();
      return true;
    } catch (error) {
      console.error('Error deleting initiative:', error);
      return false;
    }
  };

  const updateStat = async (id: string, updates: Partial<ImpactStat>) => {
    if (!isSupabaseConfigured) return false;
    try {
      const { error } = await supabase.from('impact_stats').update(updates).eq('id', id);
      if (error) throw error;
      fetchData();
      return true;
    } catch (error) {
      console.error('Error updating stat:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { 
    stats, 
    initiatives, 
    loading, 
    refresh: fetchData,
    addInitiative,
    updateInitiative,
    deleteInitiative,
    updateStat
  };
}
