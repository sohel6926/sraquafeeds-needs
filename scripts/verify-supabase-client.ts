import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lnsflmqbrpdkjcajzagw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxuc2ZsbXFicnBka2pjYWp6YWd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0MDkwNjcsImV4cCI6MjEwNTk4NTA2N30.YwBP5fHuJuwKuoMMfqpUb2-ZgkGZxCadQSiCd3VxCLQ';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function verify() {
  console.log('Testing Supabase client fetch with anon key...');
  
  const [productsRes, galleryRes, leadsRes, storiesRes, faqsRes, settingsRes] = await Promise.all([
    supabase.from('products').select('*'),
    supabase.from('gallery').select('*'),
    supabase.from('leads').select('*'),
    supabase.from('farmer_stories').select('*'),
    supabase.from('faqs').select('*'),
    supabase.from('site_settings').select('*'),
  ]);

  if (productsRes.error) console.error('Products error:', productsRes.error);
  else console.log(`✓ Products count: ${productsRes.data?.length}`);

  if (galleryRes.error) console.error('Gallery error:', galleryRes.error);
  else console.log(`✓ Gallery count: ${galleryRes.data?.length}`);

  if (leadsRes.error) console.error('Leads error:', leadsRes.error);
  else console.log(`✓ Leads count: ${leadsRes.data?.length}`);

  if (storiesRes.error) console.error('Stories error:', storiesRes.error);
  else console.log(`✓ Farmer stories count: ${storiesRes.data?.length}`);

  if (faqsRes.error) console.error('FAQs error:', faqsRes.error);
  else console.log(`✓ FAQs count: ${faqsRes.data?.length}`);

  if (settingsRes.error) console.error('Settings error:', settingsRes.error);
  else console.log(`✓ Site settings: ${settingsRes.data?.[0]?.business_name}`);
}

verify();
