import { createClient } from '@supabase/supabase-js';
import {
  Product,
  GalleryItem,
  Lead,
  LeadStatus,
  FarmerStory,
  FAQItem,
  SiteSettings,
} from '../types.ts';

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://lnsflmqbrpdkjcajzagw.supabase.co';
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxuc2ZsbXFicnBka2pjYWp6YWd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0MDkwNjcsImV4cCI6MjEwNTk4NTA2N30.YwBP5fHuJuwKuoMMfqpUb2-ZgkGZxCadQSiCd3VxCLQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

/* =========================================================================
   Row Mapping Utilities (Database snake_case <-> App camelCase)
========================================================================= */

// 1. Products
export const mapProductFromDb = (row: any): Product => ({
  id: row.id,
  name: row.name,
  category: row.category,
  tagline: row.tagline || '',
  description: row.description || '',
  packaging: row.packaging || '',
  keyBenefits: Array.isArray(row.key_benefits) ? row.key_benefits : [],
  imageUrl: row.image_url || '',
  isPopular: Boolean(row.is_popular),
  curiosityHighlight: row.curiosity_highlight || '',
  curiosityBadge: row.curiosity_badge || '',
  fullDescription: row.full_description || '',
  composition: Array.isArray(row.composition) ? row.composition : [],
  specs: Array.isArray(row.specs) ? row.specs : [],
  dosageSchedule: Array.isArray(row.dosage_schedule) ? row.dosage_schedule : [],
  idealWaterParams: Array.isArray(row.ideal_water_params) ? row.ideal_water_params : [],
  handlingAndStorage: row.handling_and_storage || '',
});

export const mapProductToDb = (p: Partial<Product>) => ({
  id: p.id,
  name: p.name,
  category: p.category,
  tagline: p.tagline,
  description: p.description,
  packaging: p.packaging,
  key_benefits: p.keyBenefits,
  image_url: p.imageUrl,
  is_popular: p.isPopular,
  curiosity_highlight: p.curiosityHighlight,
  curiosity_badge: p.curiosityBadge,
  full_description: p.fullDescription,
  composition: p.composition,
  specs: p.specs,
  dosage_schedule: p.dosageSchedule,
  ideal_water_params: p.idealWaterParams,
  handling_and_storage: p.handlingAndStorage,
  updated_at: new Date().toISOString(),
});

// 2. Gallery
export const mapGalleryFromDb = (row: any): GalleryItem => ({
  id: row.id,
  title: row.title,
  category: row.category,
  description: row.description || '',
  imageUrl: row.image_url,
});

export const mapGalleryToDb = (g: Partial<GalleryItem>) => ({
  id: g.id,
  title: g.title,
  category: g.category,
  description: g.description,
  image_url: g.imageUrl,
  updated_at: new Date().toISOString(),
});

// 3. Leads
export const mapLeadFromDb = (row: any): Lead => ({
  id: row.id,
  farmerName: row.farmer_name,
  phone: row.phone,
  village: row.village || '',
  topic: row.topic || '',
  productName: row.product_name || '',
  category: row.category || '',
  amountOrAcres: row.amount_or_acres || '',
  leadType: row.lead_type || 'whatsapp',
  farmerProfile: row.farmer_profile || '',
  message: row.message || '',
  createdAt: row.created_at || new Date().toISOString(),
  status: (row.status as LeadStatus) || 'new',
  notes: row.notes || '',
  source: row.source || 'Website Contact Form',
});

export const mapLeadToDb = (l: Partial<Lead>) => ({
  id: l.id,
  farmer_name: l.farmerName,
  phone: l.phone,
  village: l.village,
  topic: l.topic,
  product_name: l.productName,
  category: l.category,
  amount_or_acres: l.amountOrAcres,
  lead_type: l.leadType,
  farmer_profile: l.farmerProfile,
  message: l.message,
  status: l.status,
  notes: l.notes,
  source: l.source,
  created_at: l.createdAt,
  updated_at: new Date().toISOString(),
});

// 4. Farmer Stories
export const mapStoryFromDb = (row: any): FarmerStory => ({
  id: row.id,
  name: row.name,
  village: row.village || '',
  region: row.region || '',
  cultureType: row.culture_type || '',
  farmSize: row.farm_size || '',
  docDays: row.doc_days || '',
  stars: Number(row.stars) || 5,
  highlightCategory: row.highlight_category || 'Minerals & Molting',
  quote: row.quote || '',
  keyOutcomes: Array.isArray(row.key_outcomes) ? row.key_outcomes : [],
  verifiedCropCount: row.verified_crop_count || '',
  date: row.date || '',
});

export const mapStoryToDb = (s: Partial<FarmerStory>) => ({
  id: s.id,
  name: s.name,
  village: s.village,
  region: s.region,
  culture_type: s.cultureType,
  farm_size: s.farmSize,
  doc_days: s.docDays,
  stars: s.stars,
  highlight_category: s.highlightCategory,
  quote: s.quote,
  key_outcomes: s.keyOutcomes,
  verified_crop_count: s.verifiedCropCount,
  date: s.date,
  updated_at: new Date().toISOString(),
});

// 5. FAQs
export const mapFaqFromDb = (row: any): FAQItem => ({
  id: row.id,
  category: row.category,
  question: row.question,
  answer: row.answer,
  keyPoints: Array.isArray(row.key_points) ? row.key_points : [],
  recommendedAction: row.recommended_action || undefined,
});

export const mapFaqToDb = (f: Partial<FAQItem>, sortOrder = 0) => ({
  id: f.id,
  category: f.category,
  question: f.question,
  answer: f.answer,
  key_points: f.keyPoints,
  recommended_action: f.recommendedAction,
  sort_order: sortOrder,
  updated_at: new Date().toISOString(),
});

// 6. Site Settings
export const mapSettingsFromDb = (row: any): SiteSettings => ({
  businessName: row.business_name || '',
  tagline: row.tagline || '',
  proprietor: row.proprietor || '',
  primaryPhone: row.primary_phone || '',
  secondaryPhone: row.secondary_phone || '',
  whatsappNumber: row.whatsapp_number || '',
  primaryEmail: row.primary_email || '',
  secondaryEmail: row.secondary_email || '',
  gstin: row.gstin || '',
  address: row.address || '',
  shopHours: row.shop_hours || '',
  coveredRadius: row.covered_radius || '',
  announcementEnabled: Boolean(row.announcement_enabled),
  announcementText: row.announcement_text || '',
  heroHeadline: row.hero_headline || '',
  heroSubheadline: row.hero_subheadline || '',
  heroTitle: row.hero_title || row.hero_headline || '',
  heroSubtitle: row.hero_subtitle || row.hero_subheadline || '',
  heroBadge1: row.hero_badge1 || '',
  heroBadge2: row.hero_badge2 || '',
  heroBadge3: row.hero_badge3 || '',
  heroStat1Number: row.hero_stat1_number || '',
  heroStat1Label: row.hero_stat1_label || '',
  heroStat2Number: row.hero_stat2_number || '',
  heroStat2Label: row.hero_stat2_label || '',
  heroStat3Number: row.hero_stat3_number || '',
  heroStat3Label: row.hero_stat3_label || '',
  heroStat4Number: row.hero_stat4_number || '',
  heroStat4Label: row.hero_stat4_label || '',
  aboutFounderMessage: row.about_founder_message || '',
  aboutStoryPart1: row.about_story_part1 || '',
  aboutStoryPart2: row.about_story_part2 || '',
  aboutMission: row.about_mission || '',
  dispatchTurnaround: row.dispatch_turnaround || '',
  paymentNotice: row.payment_notice || '',
});

export const mapSettingsToDb = (s: Partial<SiteSettings>) => ({
  id: 'default',
  business_name: s.businessName,
  tagline: s.tagline,
  proprietor: s.proprietor,
  primary_phone: s.primaryPhone,
  secondary_phone: s.secondaryPhone,
  whatsapp_number: s.whatsappNumber,
  primary_email: s.primaryEmail,
  secondary_email: s.secondaryEmail,
  gstin: s.gstin,
  address: s.address,
  shop_hours: s.shopHours,
  covered_radius: s.coveredRadius,
  announcement_enabled: s.announcementEnabled,
  announcement_text: s.announcementText,
  hero_headline: s.heroHeadline,
  hero_subheadline: s.heroSubheadline,
  hero_title: s.heroTitle,
  hero_subtitle: s.heroSubtitle,
  hero_badge1: s.heroBadge1,
  hero_badge2: s.heroBadge2,
  hero_badge3: s.heroBadge3,
  hero_stat1_number: s.heroStat1Number,
  hero_stat1_label: s.heroStat1Label,
  hero_stat2_number: s.heroStat2Number,
  hero_stat2_label: s.heroStat2Label,
  hero_stat3_number: s.heroStat3Number,
  hero_stat3_label: s.heroStat3Label,
  hero_stat4_number: s.heroStat4Number,
  hero_stat4_label: s.heroStat4Label,
  about_founder_message: s.aboutFounderMessage,
  about_story_part1: s.aboutStoryPart1,
  about_story_part2: s.aboutStoryPart2,
  about_mission: s.aboutMission,
  dispatch_turnaround: s.dispatchTurnaround,
  payment_notice: s.paymentNotice,
  updated_at: new Date().toISOString(),
});
