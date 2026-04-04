import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { SITE_CONFIG } from '../constants/config';

export function useSiteSettings() {
  const [settings, setSettings] = useState({
    heroImage: SITE_CONFIG.heroImage,
    contactEmail: SITE_CONFIG.contactEmail,
    contactPhone: SITE_CONFIG.contactPhone,
    zelleEmail: SITE_CONFIG.zelleEmail,
    siteTitle: SITE_CONFIG.name,
  });
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('key, value');

      if (error) throw error;

      if (data) {
        const newSettings = { ...settings };
        data.forEach((item) => {
          if (item.key === 'hero_image') newSettings.heroImage = item.value;
          if (item.key === 'contact_email') newSettings.contactEmail = item.value;
          if (item.key === 'contact_phone') newSettings.contactPhone = item.value;
          if (item.key === 'zelle_email') newSettings.zelleEmail = item.value;
          if (item.key === 'site_title') newSettings.siteTitle = item.value;
        });
        setSettings(newSettings);
      }
    } catch (error) {
      console.error('Error fetching site settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (key: string, value: string) => {
    if (!isSupabaseConfigured) {
      alert('Supabase is not configured. Please add your credentials in Settings > Secrets.');
      return false;
    }

    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({ key, value, updated_at: new Date().toISOString() });

      if (error) throw error;

      // Update local state
      if (key === 'hero_image') setSettings((prev) => ({ ...prev, heroImage: value }));
      if (key === 'contact_email') setSettings((prev) => ({ ...prev, contactEmail: value }));
      if (key === 'contact_phone') setSettings((prev) => ({ ...prev, contactPhone: value }));
      if (key === 'zelle_email') setSettings((prev) => ({ ...prev, zelleEmail: value }));
      if (key === 'site_title') setSettings((prev) => ({ ...prev, siteTitle: value }));
      
      return true;
    } catch (error) {
      console.error('Error updating site setting:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return { settings, updateSetting, loading, refresh: fetchSettings };
}
