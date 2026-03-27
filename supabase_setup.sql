/*
  Run this SQL in your Supabase SQL Editor to set up the database:

  -- 1. SITE SETTINGS TABLE
  CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  -- Insert default values for site settings
  INSERT INTO site_settings (key, value) VALUES
    ('hero_image', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2070'),
    ('contact_email', 'secondchanceatlifeorg@gmail.com'),
    ('contact_phone', '+1 (832) 230-9085'),
    ('zelle_email', 'secondchanceatlifeorg@gmail.com')
  ON CONFLICT (key) DO NOTHING;

  -- 2. IMPACT STATS TABLE
  CREATE TABLE IF NOT EXISTS impact_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    number TEXT NOT NULL,
    label TEXT NOT NULL,
    description TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  -- Insert default impact stats
  INSERT INTO impact_stats (number, label, description, display_order) VALUES
    ('03+', 'Countries', 'USA, Uganda, India & beyond', 1),
    ('10k+', 'Awareness', 'Reached through global campaigns', 2),
    ('100s', 'Lives Saved', 'Direct support for transplant patients', 3),
    ('Global', 'Advocacy', 'Policy & education focus', 4);

  -- 3. IMPACT INITIATIVES TABLE
  CREATE TABLE IF NOT EXISTS impact_initiatives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  -- Insert default initiatives
  INSERT INTO impact_initiatives (title, description, image_url, display_order) VALUES
    ('Organ Donation Awareness', 'Comprehensive campaigns across the United States and Africa to educate the public on the life-saving power of organ donation.', 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=1000', 1),
    ('Patient & Family Support', 'Providing financial, emotional, and logistical support for transplant patients and their families navigating complex medical journeys.', 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=1000', 2),
    ('Medical Outreach', 'Coordinating medical missions and support systems in Uganda, India, and other regions where access to advanced care is limited.', 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1000', 3);

  -- 4. MEDIA GALLERY TABLE
  CREATE TABLE IF NOT EXISTS media_gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT,
    category TEXT,
    media_url TEXT NOT NULL,
    media_type TEXT DEFAULT 'image', -- 'image' or 'video'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  -- 5. HERO CONTENT TABLE
  CREATE TABLE IF NOT EXISTS hero_content (
    page_name TEXT PRIMARY KEY, -- 'home', 'about', 'impact', 'donate'
    badge_text TEXT,
    title TEXT NOT NULL,
    subtitle TEXT,
    button_text TEXT,
    button_link TEXT,
    image_url TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  -- Insert default hero content
  INSERT INTO hero_content (page_name, badge_text, title, subtitle, button_text, button_link, image_url)
  VALUES 
    ('home', 'Second Chance at Life', 'The Responsibility of Survival.', 'Empowering organ transplant survivors and raising global awareness through advocacy, education, and compassionate support.', 'Support Our Mission', '/donate', 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=2000'),
    ('about', 'Our Identity', 'The Responsibility of Survival.', 'Second Chance at Life was born from lived experience with organ failure and transplantation.', 'Learn More', '/impact', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=2000'),
    ('impact', 'Our Reach', 'Global Impact.', 'Measuring our success not in numbers, but in the lives we touch and the hope we restore across borders.', 'See Our Work', '#initiatives', 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=2000'),
    ('donate', 'Support the Mission', 'Give a Second Chance.', 'Your contribution directly funds life-saving medical support, global awareness campaigns, and direct assistance for transplant survivors.', 'Donate Now', '#form', 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=2000')
  ON CONFLICT (page_name) DO NOTHING;

  -- 6. SITE IMAGES TABLE
  CREATE TABLE IF NOT EXISTS site_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image_key TEXT UNIQUE NOT NULL, -- e.g., 'home_philosophy', 'about_bridge'
    image_url TEXT NOT NULL,
    alt_text TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  -- Insert default site images
  INSERT INTO site_images (image_key, image_url, alt_text)
  VALUES 
    ('home_philosophy', 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=1000', 'Helping hands'),
    ('home_donation', 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=1000', 'Helping hand'),
    ('about_bridge', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1000', 'Medical support'),
    ('about_founder', 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=1000', 'Peter Mpagi'),
    ('site_logo', '', 'Site Logo')
  ON CONFLICT (image_key) DO NOTHING;

  -- 7. ENABLE RLS & POLICIES
  
  -- Site Settings
  ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
  CREATE POLICY "Allow public read access" ON site_settings FOR SELECT USING (true);
  CREATE POLICY "Allow public update access for testing" ON site_settings FOR UPDATE USING (true) WITH CHECK (true);

  -- Impact Stats
  ALTER TABLE impact_stats ENABLE ROW LEVEL SECURITY;
  CREATE POLICY "Allow public read access" ON impact_stats FOR SELECT USING (true);
  CREATE POLICY "Allow public update access for testing" ON impact_stats FOR ALL USING (true);

  -- Impact Initiatives
  ALTER TABLE impact_initiatives ENABLE ROW LEVEL SECURITY;
  CREATE POLICY "Allow public read access" ON impact_initiatives FOR SELECT USING (true);
  CREATE POLICY "Allow public update access for testing" ON impact_initiatives FOR ALL USING (true);

  -- Media Gallery
  ALTER TABLE media_gallery ENABLE ROW LEVEL SECURITY;
  CREATE POLICY "Allow public read access" ON media_gallery FOR SELECT USING (true);
  CREATE POLICY "Allow public update access for testing" ON media_gallery FOR ALL USING (true);

  -- Hero Content
  ALTER TABLE hero_content ENABLE ROW LEVEL SECURITY;
  CREATE POLICY "Allow public read access" ON hero_content FOR SELECT USING (true);
  CREATE POLICY "Allow public update access for testing" ON hero_content FOR ALL USING (true);

  -- Site Images
  ALTER TABLE site_images ENABLE ROW LEVEL SECURITY;
  CREATE POLICY "Allow public read access" ON site_images FOR SELECT USING (true);
  CREATE POLICY "Allow public update access for testing" ON site_images FOR ALL USING (true);
*/
