import pg from 'pg';
import fs from 'fs';
import path from 'path';

const { Client } = pg;

const projectId = 'lnsflmqbrpdkjcajzagw';
const dbPw = 'Codtech@1208';
const host = 'aws-0-ap-southeast-1.pooler.supabase.com';

const schemaSql = `
-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  packaging TEXT,
  key_benefits JSONB DEFAULT '[]'::jsonb,
  image_url TEXT,
  is_popular BOOLEAN DEFAULT false,
  curiosity_highlight TEXT,
  curiosity_badge TEXT,
  full_description TEXT,
  composition JSONB DEFAULT '[]'::jsonb,
  specs JSONB DEFAULT '[]'::jsonb,
  dosage_schedule JSONB DEFAULT '[]'::jsonb,
  ideal_water_params JSONB DEFAULT '[]'::jsonb,
  handling_and_storage TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. GALLERY TABLE
CREATE TABLE IF NOT EXISTS public.gallery (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. LEADS TABLE
CREATE TABLE IF NOT EXISTS public.leads (
  id TEXT PRIMARY KEY,
  farmer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  village TEXT,
  topic TEXT,
  product_name TEXT,
  category TEXT,
  amount_or_acres TEXT,
  lead_type TEXT DEFAULT 'whatsapp',
  farmer_profile TEXT,
  message TEXT,
  status TEXT DEFAULT 'new',
  notes TEXT,
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. FARMER STORIES TABLE
CREATE TABLE IF NOT EXISTS public.farmer_stories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  village TEXT,
  region TEXT,
  culture_type TEXT,
  farm_size TEXT,
  doc_days TEXT,
  stars INTEGER DEFAULT 5,
  highlight_category TEXT,
  quote TEXT,
  key_outcomes JSONB DEFAULT '[]'::jsonb,
  verified_crop_count TEXT,
  date TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. FAQS TABLE
CREATE TABLE IF NOT EXISTS public.faqs (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  key_points JSONB DEFAULT '[]'::jsonb,
  recommended_action JSONB,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  business_name TEXT,
  tagline TEXT,
  proprietor TEXT,
  primary_phone TEXT,
  secondary_phone TEXT,
  whatsapp_number TEXT,
  primary_email TEXT,
  secondary_email TEXT,
  gstin TEXT,
  address TEXT,
  shop_hours TEXT,
  covered_radius TEXT,
  announcement_enabled BOOLEAN DEFAULT true,
  announcement_text TEXT,
  hero_headline TEXT,
  hero_subheadline TEXT,
  hero_title TEXT,
  hero_subtitle TEXT,
  hero_badge1 TEXT,
  hero_badge2 TEXT,
  hero_badge3 TEXT,
  hero_stat1_number TEXT,
  hero_stat1_label TEXT,
  hero_stat2_number TEXT,
  hero_stat2_label TEXT,
  hero_stat3_number TEXT,
  hero_stat3_label TEXT,
  hero_stat4_number TEXT,
  hero_stat4_label TEXT,
  about_founder_message TEXT,
  about_story_part1 TEXT,
  about_story_part2 TEXT,
  about_mission TEXT,
  dispatch_turnaround TEXT,
  payment_notice TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. ADMIN AUTH TABLE
CREATE TABLE IF NOT EXISTS public.admin_auth (
  id TEXT PRIMARY KEY DEFAULT 'admin',
  pin_code TEXT DEFAULT '1234',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default admin auth if not exists
INSERT INTO public.admin_auth (id, pin_code)
VALUES ('admin', '1234')
ON CONFLICT (id) DO NOTHING;

-- Grant permissions to public roles (anon and authenticated)
GRANT ALL ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated, service_role;

-- Enable Row Level Security and add open policies for anon & authenticated
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public access on products" ON public.products;
CREATE POLICY "Public access on products" ON public.products FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public access on gallery" ON public.gallery;
CREATE POLICY "Public access on gallery" ON public.gallery FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public access on leads" ON public.leads;
CREATE POLICY "Public access on leads" ON public.leads FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE public.farmer_stories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public access on farmer_stories" ON public.farmer_stories;
CREATE POLICY "Public access on farmer_stories" ON public.farmer_stories FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public access on faqs" ON public.faqs;
CREATE POLICY "Public access on faqs" ON public.faqs FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public access on site_settings" ON public.site_settings;
CREATE POLICY "Public access on site_settings" ON public.site_settings FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE public.admin_auth ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public access on admin_auth" ON public.admin_auth;
CREATE POLICY "Public access on admin_auth" ON public.admin_auth FOR ALL USING (true) WITH CHECK (true);

-- Enable Realtime for all tables
DO $$
BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.products, public.gallery, public.leads, public.farmer_stories, public.faqs, public.site_settings;
  EXCEPTION
    WHEN duplicate_object THEN NULL;
    WHEN others THEN NULL;
  END;
END $$;
`;

async function migrate() {
  console.log(`Connecting to Supabase at ${host}:5432...`);
  const client = new Client({
    host,
    port: 5432,
    database: 'postgres',
    user: `postgres.${projectId}`,
    password: dbPw,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 15000,
  });

  try {
    await client.connect();
    console.log("Connected to PostgreSQL!");

    console.log("Applying schema...");
    await client.query(schemaSql);
    console.log("All tables created, RLS enabled, and permissions granted!");

    // Check tables in public schema
    const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);
    console.log("Tables in public schema:", res.rows.map(r => r.table_name));

    await client.end();
  } catch (err) {
    console.error("Migration failed:", err);
    try { await client.end(); } catch (e) {}
    process.exit(1);
  }
}

migrate();
