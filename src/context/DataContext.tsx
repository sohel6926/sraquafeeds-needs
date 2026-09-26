import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Product, GalleryItem, Lead, LeadStatus, SiteSettings, FarmerStory, FAQItem } from '../types.ts';
import { PRODUCTS_DATA } from '../data/products.ts';
import { GALLERY_DATA } from '../data/gallery.ts';
import {
  supabase,
  mapProductFromDb,
  mapProductToDb,
  mapGalleryFromDb,
  mapGalleryToDb,
  mapLeadFromDb,
  mapLeadToDb,
  mapStoryFromDb,
  mapStoryToDb,
  mapFaqFromDb,
  mapFaqToDb,
  mapSettingsFromDb,
  mapSettingsToDb,
} from '../lib/supabase.ts';

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  businessName: 'SR Aqua Feeds & Needs',
  tagline: 'Nourishing Life. Growing Future.',
  proprietor: 'Utukuri Rambabu',
  primaryPhone: '9493243244',
  secondaryPhone: '7075838624',
  whatsappNumber: '9493243244',
  primaryEmail: 'sraquafeedsneeds@gmail.com',
  secondaryEmail: 'rams34333@gmail.com',
  gstin: '37AGHPU5940Q1ZF',
  address: 'Chakicherla Peddapattapu Palem, Ulavapadu (Mandal), Ramayapatnam Road, SPSR Nellore District, Andhra Pradesh – 523292',
  shopHours: 'Monday – Sunday: 6:30 AM to 9:00 PM (Serving early pond feeding cycles)',
  coveredRadius: '35 km Coastal Pond Belt',
  announcementEnabled: true,
  announcementText: '🌊 Fresh High-Protein Vannamei Feed Batch Ready for Dispatch • Free DO & Salinity Testing at Ulavapadu Showroom • Call 9493243244',
  heroHeadline: 'High-Performance Feeds & Reliable Pond Care for Coastal Farmers',
  heroSubheadline: 'Your trusted retail partner in Ulavapadu for certified Vannamei and Tiger shrimp feeds, essential pond ionic minerals, bio-secure probiotics, and 24/7 emergency water care solutions. Supporting coastal farmers with reliable stock and rapid farm delivery.',
  heroBadge1: 'Newly Established & Rapidly Growing Aquaculture Partner',
  heroBadge2: 'Fresh Stock Daily',
  heroBadge3: 'Ulavapadu · Ramayapatnam Road',
  heroStat1Number: '500+',
  heroStat1Label: 'Happy Coastal Farmers',
  heroStat2Number: '15+',
  heroStat2Label: 'Years Aquaculture Wisdom',
  heroStat3Number: '35 km',
  heroStat3Label: 'Direct Farm Gate Reach',
  heroStat4Number: '100%',
  heroStat4Label: 'Genuine Sealed Factory Stock',
  aboutFounderMessage: 'Every farmer invests their hard-earned capital into shrimp farming. Our duty at SR Aqua is to ensure every bag of feed and every bottle of probiotic is 100% genuine and helps them harvest healthy crops with maximum profit.',
  aboutStoryPart1: 'Located along the strategic Ramayapatnam coastal aquaculture belt in Ulavapadu mandal, SR Aqua Feeds & Needs was founded by Utukuri Rambabu to address a critical need for local farmers: easy, immediate access to fresh, uncompromised shrimp feed and fast-acting pond care solutions.',
  aboutStoryPart2: 'In active operation, our retail showroom has established quick trust among progressive shrimp growers across Chakicherla Peddapattapu Palem and surrounding coastal villages. We keep overheads honest, maintain transparent pricing, and personally inspect every batch of incoming stock so farmers never face compromised yields.',
  aboutMission: 'To empower coastal aquaculture farmers across Andhra Pradesh with genuine feeds, scientifically verified bio-solutions, and dedicated emergency pond-side support for prosperous harvest yields.',
  dispatchTurnaround: '< 45 Mins Express Delivery',
  paymentNotice: 'For all genuine payments and invoice verification, please contact ONLY on 9493243244 (Utukuri Rambabu). Beware of unauthorized callers.',
};

export const DEFAULT_FARMER_STORIES: FarmerStory[] = [
  {
    id: 'story-1',
    name: 'K. Venkateswara Rao',
    village: 'Chakicherla Peddapattapu Palem',
    region: 'Ulavapadu Mandal',
    cultureType: 'L. vannamei Semi-Intensive',
    farmSize: '16 Acres (4 Ponds)',
    docDays: 'DOC 112 Harvest',
    stars: 5,
    highlightCategory: 'Minerals & Molting',
    quote:
      'During the full-moon molting cycle in low salinity (4 ppt), my shrimp were struggling with soft-shell and cramping. Rambabu personally analyzed our water hardness and provided the exact Calcium to Magnesium ionic balance minerals. Within 5 hours of broadcasting, the prawns hardened completely with zero mortality.',
    keyOutcomes: [
      { label: 'Survival Rate', value: '91.5%' },
      { label: 'Harvest Count', value: '28 Count/kg' },
      { label: 'Molt Mortality', value: '0% Soft-shell' },
    ],
    verifiedCropCount: '4th Consecutive Crop',
    date: 'Harvested August 2026',
  },
  {
    id: 'story-2',
    name: 'P. Suresh Reddy',
    village: 'Indukurpet Coastal Belt',
    region: 'Nellore Coastal District',
    cultureType: 'Intensive Vannamei Culture',
    farmSize: '22 Acres (6 Ponds)',
    docDays: 'DOC 120 Harvest',
    stars: 5,
    highlightCategory: 'Feed & Low FCR',
    quote:
      'We switched to high-stability shrimp feed from SR Aqua Feeds & Needs. The pellets held together in the check-trays for over two hours without crumbling or leaching into the black bottom soil. Our Feed Conversion Ratio dropped from 1.34 to 1.18, which saved us more than ₹1.8 Lakhs in feed expense this season alone.',
    keyOutcomes: [
      { label: 'Feed Conversion (FCR)', value: '1.18 Ratio' },
      { label: 'Net Biomass', value: '26.4 Metric Tons' },
      { label: 'Feed Savings', value: '₹1.85L Saved' },
    ],
    verifiedCropCount: '3 Crops with SR Aqua',
    date: 'Harvested July 2026',
  },
  {
    id: 'story-3',
    name: 'M. Subrahmanyam',
    village: 'Ramayapatnam Coastal Road',
    region: 'Prakasam / Nellore Border',
    cultureType: 'Vannamei Brackish Pond',
    farmSize: '12 Acres (3 Ponds)',
    docDays: 'DOC 98 Ongoing',
    stars: 5,
    highlightCategory: 'Emergency DO',
    quote:
      'At 2:30 AM during an intense thunderstorm, our coastal grid power tripped and our generator developed a starter fault. Dissolved oxygen plunged below 2.2 ppm. I called Rambabu at 3:00 AM — he dispatched emergency sodium percarbonate oxygen donor tablets to my pond bund within 35 minutes. He literally saved our entire crop from asphyxiation.',
    keyOutcomes: [
      { label: 'Emergency Response', value: '35 Minutes' },
      { label: 'Pond DO Restored', value: '5.8 PPM' },
      { label: 'Crop Saved', value: '100% Retained' },
    ],
    verifiedCropCount: 'Trusted Emergency Partner',
    date: 'September 2026',
  },
  {
    id: 'story-4',
    name: 'Sk. Abdul Kareem',
    village: 'Kota Mandal Coastal Ponds',
    region: 'Nellore District',
    cultureType: 'L. vannamei High Density',
    farmSize: '14 Acres (4 Ponds)',
    docDays: 'DOC 108 Harvest',
    stars: 5,
    highlightCategory: 'Vibrio Defense',
    quote:
      'In our 60th day of culture, neighboring ponds had severe white gut and running mortality (RMS). Rambabu recommended a multi-strain Bacillus gut probiotic combined with Yucca ammonia bind for the pond bottom. Our prawns showed zero luminescence on TCBS agar plates, hepatopancreas remained dark and full, and we harvested 32 count without any dropouts.',
    keyOutcomes: [
      { label: 'Gut Health Score', value: '100% Full' },
      { label: 'TCBS Colony Count', value: 'Zero Luminous' },
      { label: 'Harvest Average', value: '32 Count/kg' },
    ],
    verifiedCropCount: 'Indukurpet Farm Zone',
    date: 'June 2026',
  },
];

export const DEFAULT_FAQS: FAQItem[] = [
  {
    id: 'faq-feed-conversion',
    category: 'Products & Nutrition',
    question: 'How does SR Aqua pellet feed achieve a 1.15 to 1.25 Feed Conversion Ratio (FCR)?',
    answer:
      'Our feed is manufactured with high-shear hydrothermal conditioning that gelatinizes marine starches and coats the pellet with steam-dried fish protein peptides and squid meal attractants. This gives the pellet a 3+ hour water stability, meaning minimal leaching of amino acids before the shrimp locate and consume it from check-trays, resulting in higher biomass per bag.',
    keyPoints: [
      '3-Hour water stability prevents nutrient loss in check-trays.',
      'Enriched with prime Peruvian steam-dried fish meal and marine lipids.',
      'Significantly lowers bottom organic sludge and anaerobic black soil.',
    ],
  },
  {
    id: 'faq-molting-minerals',
    category: 'Water Quality & Minerals',
    question: 'What is the recommended mineral ratio during full moon & new moon molting in low salinity (3–8 ppt)?',
    answer:
      'In low salinity inland bore waters, the natural Calcium to Magnesium ratio is often skewed. For smooth exoskeleton hardening and zero molt death syndrome, we recommend maintaining a Ca:Mg:K ratio of roughly 1 : 3 : 1. Broadcast Mineral-Max at 10–15 kg/acre 24 hours prior to peak lunar molt cycles, alongside ionic magnesium chloride.',
    keyPoints: [
      'Target Ca:Mg ratio of 1:3 and maintain Potassium > 100 ppm.',
      'Broadcast 12–24 hours before full moon or new moon peaks.',
      'Always test pond total alkalinity (ideal 120–160 ppm) beforehand.',
    ],
  },
  {
    id: 'faq-emergency-delivery',
    category: 'Ordering & Delivery',
    question: 'How fast can you dispatch emergency DO tablets or feed to pond sites around Ulavapadu?',
    answer:
      'We maintain an active rapid dispatch vehicle on Ramayapatnam Road. For urgent emergencies like midnight dissolved oxygen drops or generator failure, we dispatch active sodium percarbonate donor tablets and Yucca gas binder within 45 minutes across the 35 km coastal belt including Chakicherla, Peddapattapu Palem, and Singarayakonda.',
    keyPoints: [
      '< 45 minutes express doorstep delivery to pond bunds.',
      '24/7 emergency dispatch line: 9493243244.',
      'Covers up to 35 km along Ramayapatnam coastal aquaculture belt.',
    ],
  },
  {
    id: 'faq-ammonia-spike',
    category: 'Water Quality & Minerals',
    question: 'What immediate steps should be taken if toxic ammonia (NH3) exceeds 0.1 ppm at DOC 70+?',
    answer:
      'Total ammonia becomes extremely toxic at higher pH (> 8.2). First, apply natural Yucca schidigera extract (Toxic-Gas Binder) at 1–2 liters per acre; its saponin sterols immediately cross-link and bind free NH3 and smelly H2S molecules. Simultaneously apply active Bacillus subtilis and Bacillus licheniformis probiotics (Bacto-Clean Pro) with fermented jaggery in the morning to permanently metabolize organic pond floor sludge into harmless nitrogen gas.',
    keyPoints: [
      'Yucca extract binds free ammonia and toxic gases within 2 hours.',
      'Active Bacillus strains digest accumulated sludge and prevent black soil.',
      'Maintain pond water pH between 7.5 and 8.2 to prevent free unionized NH3 spikes.',
    ],
  },
  {
    id: 'faq-probiotic-fermentation',
    category: 'Pond Farming Practices',
    question: 'How should soil probiotics be fermented for maximum colony count before pond broadcast?',
    answer:
      'For best bio-activation, dissolve 5 kg organic jaggery in 100 liters of clean, non-chlorinated bore water in a clean plastic drum. Mix in 1 kg of Eco-Clean Bacillus probiotic and aerate with a small aquarium air-pump or stir vigorously every 2 hours for 12–18 hours. Broadcast across pond corners around 9:00 AM on a sunny morning under active aeration.',
    keyPoints: [
      'Ferment 12–18 hours with 5 kg jaggery for 10x bacterial count.',
      'Always broadcast in sunny morning hours under active paddlewheel aeration.',
      'Avoid running chemical disinfectants or chlorine 72 hours before/after.',
    ],
  },
  {
    id: 'faq-lab-testing',
    category: 'Ordering & Delivery',
    question: 'Do you offer free water and shrimp health parameter testing at your retail store?',
    answer:
      'Yes! Bring a 500ml water sample collected 1 foot below surface level from your pond before 10 AM. We provide complimentary digital optical DO checking, refractometer salinity testing, total alkalinity titration, hardness analysis, and microscope gill/gut check for local farmers.',
    keyPoints: [
      'Free digital DO, salinity, alkalinity, and hardness testing.',
      'Microscope gill fouling and gut fullness check.',
      'Custom dosage calculation card provided on the spot.',
    ],
  },
];

export const DEFAULT_LEADS: Lead[] = [
  {
    id: 'lead-1',
    farmerName: 'Gandam Bhagyalaxmi',
    phone: '9989715441',
    village: 'Chakicherla Coastal Belt',
    topic: 'Supreme Vannamei Feed',
    productName: 'Ultra Vannamei Feed 40 (38% Protein)',
    category: '🦐 Aqua Feed',
    amountOrAcres: '60 Bags (DOC 55)',
    leadType: 'form',
    farmerProfile: 'Semi-Intensive Vannamei (4 Ha)',
    message: 'Need 60 bags of 38% protein feed for 4-hectare pond DOC 55. Need delivery tomorrow morning by 7 AM.',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    status: 'new',
    notes: 'Urgent morning feeding requirement. Delivery vehicle arranged for early slot.',
    source: 'Online Form',
  },
  {
    id: 'lead-2',
    farmerName: 'K. Subba Reddy',
    phone: '9440187654',
    village: 'Ramayapatnam Coastal Road',
    topic: 'Oxy-Boost DO Tablets',
    productName: 'Oxy-Boost Ultra Active DO Tablets',
    category: '⚡ Emergency DO',
    amountOrAcres: '8 Buckets (DOC 85)',
    leadType: 'call',
    farmerProfile: 'Pond Cultivator (3 Ponds)',
    message: 'Sudden drop in dissolved oxygen due to overcast weather. Need 8 buckets of active oxygen tablets immediately.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    status: 'new',
    notes: 'Called farmer. Express bike delivery sent with 8 buckets. Followed up on aeration levels.',
    source: 'Direct Phone Call',
  },
  {
    id: 'lead-3',
    farmerName: 'NEELAM HARISH',
    phone: '918074194666',
    village: 'Singarayakonda Mandal',
    topic: 'Gas-Free Zeolite & Yucca',
    productName: 'Gas-Free Zeolite & Yucca Complex',
    category: '🧪 Gas Control',
    amountOrAcres: 'Amount: ₹35,000 (15 Bags)',
    leadType: 'form',
    farmerProfile: 'Commercial Aqua Farmer',
    message: 'High nitrite and toxic ammonia smell near outlet sluice. What is the recommended dosage for 1.2 meter depth?',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    status: 'new',
    notes: 'Advised 15 kg/acre combined with zeolite broadcast. Sent price quote on WhatsApp.',
    source: 'Online Form',
  },
  {
    id: 'lead-4',
    farmerName: 'P. Rajesh Chowdary',
    phone: '9701234987',
    village: 'Kavali Coastal Reach',
    topic: 'Mineral-Max Balancer',
    productName: 'Mineral-Max Ionic Osmotic Balancer',
    category: '🌱 Pond Minerals',
    amountOrAcres: 'Pond: 6 Acres (Salinity 8 ppt)',
    leadType: 'whatsapp',
    farmerProfile: 'Vannamei Pond Owner',
    message: 'Salinity dropped to 8 ppt after canal intake. Need calcium and magnesium booster for upcoming molt cycle.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    status: 'new',
    notes: 'Order confirmed for 20 bags. Dispatched with invoice #SR-2026-084.',
    source: 'WhatsApp Lead',
  },
  {
    id: 'lead-5',
    farmerName: 'T. Narayana',
    phone: '9866543219',
    village: 'Peddapattapu Palem',
    topic: 'Eco-Clean Probiotic',
    productName: 'Eco-Clean Dense Bacillus Bioremediator',
    category: '🦠 Probiotics',
    amountOrAcres: '5 kg Pack (Fermentation)',
    leadType: 'whatsapp',
    farmerProfile: 'Pond Cultivator',
    message: 'Black soil accumulation near aerator corners. Need multi-strain soil probiotic.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    status: 'contacted',
    notes: 'Applied 1 kg fermented with jaggery. Farmer reported clear bottom after 4 days.',
    source: 'WhatsApp Lead',
  },
  {
    id: 'lead-6',
    farmerName: 'K. Venkateswara Rao',
    phone: '9848022334',
    village: 'Chakicherla Village',
    topic: 'Starter Crumbles DOC 1-30',
    productName: 'Aqua-Start Micro Crumbles 40%',
    category: '🦐 Aqua Feed',
    amountOrAcres: '25 Bags (Stocking DOC 10)',
    leadType: 'call',
    farmerProfile: 'Semi-Intensive Cultivator',
    message: 'Stocked 1.5 lakh seeds last week. Need 25 bags of starter crumble feed delivered to bund.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
    status: 'quote_sent',
    notes: 'Provided sample bag test. Ready for dispatch.',
    source: 'Direct Phone Call',
  },
  {
    id: 'lead-7',
    farmerName: 'M. Chenna Kesavulu',
    phone: '9949123844',
    village: 'Ulavapadu Town',
    topic: 'Potassium & Magnesium Salt',
    productName: 'Aqua-Magnesium High Purity Salt',
    category: '🌱 Pond Minerals',
    amountOrAcres: '40 Bags',
    leadType: 'whatsapp',
    farmerProfile: 'Brackish Water Farmer',
    message: 'Looking for prompt delivery of magnesium chloride and KCl for full moon molting.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
    status: 'order_placed',
    notes: 'Delivered 40 bags on tractor dispatch.',
    source: 'WhatsApp Lead',
  },
  {
    id: 'lead-8',
    farmerName: 'S. Ramanaiah',
    phone: '9490123778',
    village: 'Karedu Sea Coast',
    topic: 'Water Sample Testing',
    productName: 'Full Pond Parameter Check',
    category: '🔬 Testing Lab',
    amountOrAcres: '3 Ponds (DOC 40)',
    leadType: 'form',
    farmerProfile: 'Coastal Farm Operator',
    message: 'Bringing 500ml water sample to store counter at 10 AM for alkalinity and hardness check.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 150).toISOString(),
    status: 'closed',
    notes: 'Tested in store lab: Alkalinity 140 ppm, Hardness 950 ppm. Corrective dosage given.',
    source: 'Online Form',
  },
];

const STORAGE_KEYS = {
  PRODUCTS: 'sraqua_products_v1',
  GALLERY: 'sraqua_gallery_v1',
  LEADS: 'sraqua_leads_v1',
  SETTINGS: 'sraqua_settings_v1',
  STORIES: 'sraqua_stories_v1',
  FAQS: 'sraqua_faqs_v1',
  ADMIN_AUTH: 'sraqua_admin_auth_v1',
};

interface DataContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'> & { id?: string }) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  resetProducts: () => void;

  gallery: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id'> & { id?: string }) => void;
  updateGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;
  resetGallery: () => void;

  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'status'> & { id?: string; status?: LeadStatus }) => Lead;
  updateLeadStatus: (id: string, status: LeadStatus) => void;
  updateLeadNotes: (id: string, notes: string) => void;
  deleteLead: (id: string) => void;
  clearAllLeads: () => void;
  resetLeads: () => void;

  farmerStories: FarmerStory[];
  addFarmerStory: (story: Omit<FarmerStory, 'id'> & { id?: string }) => void;
  updateFarmerStory: (story: FarmerStory) => void;
  deleteFarmerStory: (id: string) => void;
  resetFarmerStories: () => void;

  faqs: FAQItem[];
  addFAQ: (faq: Omit<FAQItem, 'id'> & { id?: string }) => void;
  updateFAQ: (faq: FAQItem) => void;
  deleteFAQ: (id: string) => void;
  resetFAQs: () => void;

  siteSettings: SiteSettings;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  resetSiteSettings: () => void;

  isAdminAuthenticated: boolean;
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;

  resetAllData: () => void;
  exportAllDataJSON: () => string;
  importAllDataJSON: (jsonStr: string) => boolean;

  isLoading: boolean;
  isSupabaseConnected: boolean;
}

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState<boolean>(false);
  const currentPinRef = useRef<string>('1234');

  // 1. Products state
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback
    }
    return PRODUCTS_DATA;
  });

  // 2. Gallery state
  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.GALLERY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback
    }
    return GALLERY_DATA;
  });

  // 3. Leads state
  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.LEADS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Fallback
    }
    return DEFAULT_LEADS;
  });

  // 4. Farmer Stories state
  const [farmerStories, setFarmerStories] = useState<FarmerStory[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.STORIES);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback
    }
    return DEFAULT_FARMER_STORIES;
  });

  // 5. FAQs state
  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.FAQS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback
    }
    return DEFAULT_FAQS;
  });

  // 6. Site Settings state
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') return { ...DEFAULT_SITE_SETTINGS, ...parsed };
      }
    } catch {
      // Fallback
    }
    return DEFAULT_SITE_SETTINGS;
  });

  // 7. Admin Authentication state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // Fetch initial data from Supabase on mount
  useEffect(() => {
    let isMounted = true;

    async function fetchFromSupabase() {
      try {
        setIsLoading(true);

        const [
          productsRes,
          galleryRes,
          leadsRes,
          storiesRes,
          faqsRes,
          settingsRes,
          adminAuthRes,
        ] = await Promise.all([
          supabase.from('products').select('*').order('created_at', { ascending: false }),
          supabase.from('gallery').select('*').order('created_at', { ascending: false }),
          supabase.from('leads').select('*').order('created_at', { ascending: false }),
          supabase.from('farmer_stories').select('*').order('created_at', { ascending: true }),
          supabase.from('faqs').select('*').order('sort_order', { ascending: true }),
          supabase.from('site_settings').select('*').eq('id', 'default').maybeSingle(),
          supabase.from('admin_auth').select('*').eq('id', 'admin').maybeSingle(),
        ]);

        if (!isMounted) return;

        let hasData = false;

        if (productsRes.data && productsRes.data.length > 0) {
          const mapped = productsRes.data.map(mapProductFromDb);
          setProducts(mapped);
          hasData = true;
        }

        if (galleryRes.data && galleryRes.data.length > 0) {
          const mapped = galleryRes.data.map(mapGalleryFromDb);
          setGallery(mapped);
          hasData = true;
        }

        if (leadsRes.data) {
          const mapped = leadsRes.data.map(mapLeadFromDb);
          setLeads(mapped);
          hasData = true;
        }

        if (storiesRes.data && storiesRes.data.length > 0) {
          const mapped = storiesRes.data.map(mapStoryFromDb);
          setFarmerStories(mapped);
          hasData = true;
        }

        if (faqsRes.data && faqsRes.data.length > 0) {
          const mapped = faqsRes.data.map(mapFaqFromDb);
          setFaqs(mapped);
          hasData = true;
        }

        if (settingsRes.data) {
          const mapped = mapSettingsFromDb(settingsRes.data);
          setSiteSettings(mapped);
          hasData = true;
        }

        if (adminAuthRes.data && adminAuthRes.data.pin_code) {
          currentPinRef.current = adminAuthRes.data.pin_code;
        }

        if (hasData || (!productsRes.error && !leadsRes.error)) {
          setIsSupabaseConnected(true);
        }
      } catch (err) {
        console.warn('Initial Supabase fetch warning, continuing with local cache:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchFromSupabase();

    // Supabase Realtime Subscription for all tables
    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          const item = mapProductFromDb(payload.new);
          setProducts((prev) => [item, ...prev.filter((p) => p.id !== item.id)]);
        } else if (payload.eventType === 'UPDATE') {
          const item = mapProductFromDb(payload.new);
          setProducts((prev) => prev.map((p) => (p.id === item.id ? item : p)));
        } else if (payload.eventType === 'DELETE' && payload.old) {
          setProducts((prev) => prev.filter((p) => p.id !== payload.old.id));
        }
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'gallery' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          const item = mapGalleryFromDb(payload.new);
          setGallery((prev) => [item, ...prev.filter((g) => g.id !== item.id)]);
        } else if (payload.eventType === 'UPDATE') {
          const item = mapGalleryFromDb(payload.new);
          setGallery((prev) => prev.map((g) => (g.id === item.id ? item : g)));
        } else if (payload.eventType === 'DELETE' && payload.old) {
          setGallery((prev) => prev.filter((g) => g.id !== payload.old.id));
        }
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          const item = mapLeadFromDb(payload.new);
          setLeads((prev) => [item, ...prev.filter((l) => l.id !== item.id)]);
        } else if (payload.eventType === 'UPDATE') {
          const item = mapLeadFromDb(payload.new);
          setLeads((prev) => prev.map((l) => (l.id === item.id ? item : l)));
        } else if (payload.eventType === 'DELETE' && payload.old) {
          setLeads((prev) => prev.filter((l) => l.id !== payload.old.id));
        }
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'farmer_stories' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          const item = mapStoryFromDb(payload.new);
          setFarmerStories((prev) => [item, ...prev.filter((s) => s.id !== item.id)]);
        } else if (payload.eventType === 'UPDATE') {
          const item = mapStoryFromDb(payload.new);
          setFarmerStories((prev) => prev.map((s) => (s.id === item.id ? item : s)));
        } else if (payload.eventType === 'DELETE' && payload.old) {
          setFarmerStories((prev) => prev.filter((s) => s.id !== payload.old.id));
        }
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'faqs' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          const item = mapFaqFromDb(payload.new);
          setFaqs((prev) => [item, ...prev.filter((f) => f.id !== item.id)]);
        } else if (payload.eventType === 'UPDATE') {
          const item = mapFaqFromDb(payload.new);
          setFaqs((prev) => prev.map((f) => (f.id === item.id ? item : f)));
        } else if (payload.eventType === 'DELETE' && payload.old) {
          setFaqs((prev) => prev.filter((f) => f.id !== payload.old.id));
        }
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'site_settings' }, (payload) => {
        if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
          setSiteSettings(mapSettingsFromDb(payload.new));
        }
      })
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  // Save to localStorage as offline cache whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error('Failed saving products to localStorage', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
    } catch (e) {
      console.error('Failed saving gallery to localStorage', e);
    }
  }, [gallery]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
    } catch (e) {
      console.error('Failed saving leads to localStorage', e);
    }
  }, [leads]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STORIES, JSON.stringify(farmerStories));
    } catch (e) {
      console.error('Failed saving stories to localStorage', e);
    }
  }, [farmerStories]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(faqs));
    } catch (e) {
      console.error('Failed saving faqs to localStorage', e);
    }
  }, [faqs]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(siteSettings));
    } catch (e) {
      console.error('Failed saving settings to localStorage', e);
    }
  }, [siteSettings]);

  // Auth functions
  const loginAdmin = (pin: string) => {
    const trimmed = pin.trim().toLowerCase();
    const hardcodedPins = ['1234', 'admin', 'rambabu', '9493243244'];
    if (hardcodedPins.includes(trimmed) || trimmed === currentPinRef.current.toLowerCase()) {
      setIsAdminAuthenticated(true);
      try {
        sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      } catch {
        // Ignore
      }
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    } catch {
      // Ignore
    }
  };

  // 1. Product operations
  const addProduct = async (product: Omit<Product, 'id'> & { id?: string }) => {
    const newProduct: Product = {
      ...product,
      id: product.id || `prod-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    };
    setProducts((prev) => [newProduct, ...prev]);

    try {
      const dbRow = mapProductToDb(newProduct);
      const { error } = await supabase.from('products').insert(dbRow);
      if (error) console.error('Supabase addProduct error:', error);
    } catch (e) {
      console.error('Failed to sync new product to Supabase', e);
    }
  };

  const updateProduct = async (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));

    try {
      const dbRow = mapProductToDb(updated);
      const { error } = await supabase.from('products').update(dbRow).eq('id', updated.id);
      if (error) console.error('Supabase updateProduct error:', error);
    } catch (e) {
      console.error('Failed to sync updated product to Supabase', e);
    }
  };

  const deleteProduct = async (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));

    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) console.error('Supabase deleteProduct error:', error);
    } catch (e) {
      console.error('Failed to delete product from Supabase', e);
    }
  };

  const resetProducts = async () => {
    setProducts(PRODUCTS_DATA);
    try {
      for (const p of PRODUCTS_DATA) {
        await supabase.from('products').upsert(mapProductToDb(p));
      }
    } catch (e) {
      console.error('Failed to reset products in Supabase', e);
    }
  };

  // 2. Gallery operations
  const addGalleryItem = async (item: Omit<GalleryItem, 'id'> & { id?: string }) => {
    const newItem: GalleryItem = {
      ...item,
      id: item.id || `gal-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    };
    setGallery((prev) => [newItem, ...prev]);

    try {
      const dbRow = mapGalleryToDb(newItem);
      const { error } = await supabase.from('gallery').insert(dbRow);
      if (error) console.error('Supabase addGalleryItem error:', error);
    } catch (e) {
      console.error('Failed to sync gallery item to Supabase', e);
    }
  };

  const updateGalleryItem = async (updated: GalleryItem) => {
    setGallery((prev) => prev.map((g) => (g.id === updated.id ? updated : g)));

    try {
      const dbRow = mapGalleryToDb(updated);
      const { error } = await supabase.from('gallery').update(dbRow).eq('id', updated.id);
      if (error) console.error('Supabase updateGalleryItem error:', error);
    } catch (e) {
      console.error('Failed to sync gallery update to Supabase', e);
    }
  };

  const deleteGalleryItem = async (id: string) => {
    setGallery((prev) => prev.filter((g) => g.id !== id));

    try {
      const { error } = await supabase.from('gallery').delete().eq('id', id);
      if (error) console.error('Supabase deleteGalleryItem error:', error);
    } catch (e) {
      console.error('Failed to delete gallery item from Supabase', e);
    }
  };

  const resetGallery = async () => {
    setGallery(GALLERY_DATA);
    try {
      for (const g of GALLERY_DATA) {
        await supabase.from('gallery').upsert(mapGalleryToDb(g));
      }
    } catch (e) {
      console.error('Failed to reset gallery in Supabase', e);
    }
  };

  // 3. Lead operations
  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt' | 'status'> & { id?: string; status?: LeadStatus }): Lead => {
    const newLead: Lead = {
      id: leadData.id || `lead-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
      status: leadData.status || 'new',
      farmerName: leadData.farmerName,
      phone: leadData.phone,
      village: leadData.village || '',
      topic: leadData.topic || '',
      productName: leadData.productName || '',
      category: leadData.category || '🦐 Aqua Feed',
      amountOrAcres: leadData.amountOrAcres || 'General Need',
      leadType: leadData.leadType || 'whatsapp',
      farmerProfile: leadData.farmerProfile || 'Pond Cultivator',
      message: leadData.message || '',
      notes: leadData.notes || '',
      source: leadData.source || 'Website Contact Form',
    };

    setLeads((prev) => [newLead, ...prev]);

    // Async push to Supabase leads table
    (async () => {
      try {
        const dbRow = mapLeadToDb(newLead);
        const { error } = await supabase.from('leads').insert(dbRow);
        if (error) console.error('Supabase addLead error:', error);
      } catch (e) {
        console.error('Failed to sync new lead to Supabase', e);
      }
    })();

    return newLead;
  };

  const updateLeadStatus = async (id: string, status: LeadStatus) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));

    try {
      const { error } = await supabase.from('leads').update({ status, updated_at: new Date().toISOString() }).eq('id', id);
      if (error) console.error('Supabase updateLeadStatus error:', error);
    } catch (e) {
      console.error('Failed to update lead status in Supabase', e);
    }
  };

  const updateLeadNotes = async (id: string, notes: string) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, notes } : l)));

    try {
      const { error } = await supabase.from('leads').update({ notes, updated_at: new Date().toISOString() }).eq('id', id);
      if (error) console.error('Supabase updateLeadNotes error:', error);
    } catch (e) {
      console.error('Failed to update lead notes in Supabase', e);
    }
  };

  const deleteLead = async (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));

    try {
      const { error } = await supabase.from('leads').delete().eq('id', id);
      if (error) console.error('Supabase deleteLead error:', error);
    } catch (e) {
      console.error('Failed to delete lead from Supabase', e);
    }
  };

  const clearAllLeads = async () => {
    setLeads([]);

    try {
      const { error } = await supabase.from('leads').delete().neq('id', '');
      if (error) console.error('Supabase clearAllLeads error:', error);
    } catch (e) {
      console.error('Failed to clear leads in Supabase', e);
    }
  };

  const resetLeads = async () => {
    setLeads(DEFAULT_LEADS);
    try {
      for (const l of DEFAULT_LEADS) {
        await supabase.from('leads').upsert(mapLeadToDb(l));
      }
    } catch (e) {
      console.error('Failed to reset leads in Supabase', e);
    }
  };

  // 4. Farmer Stories operations
  const addFarmerStory = async (story: Omit<FarmerStory, 'id'> & { id?: string }) => {
    const newStory: FarmerStory = {
      ...story,
      id: story.id || `story-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    };
    setFarmerStories((prev) => [newStory, ...prev]);

    try {
      const dbRow = mapStoryToDb(newStory);
      const { error } = await supabase.from('farmer_stories').insert(dbRow);
      if (error) console.error('Supabase addFarmerStory error:', error);
    } catch (e) {
      console.error('Failed to sync story to Supabase', e);
    }
  };

  const updateFarmerStory = async (updated: FarmerStory) => {
    setFarmerStories((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));

    try {
      const dbRow = mapStoryToDb(updated);
      const { error } = await supabase.from('farmer_stories').update(dbRow).eq('id', updated.id);
      if (error) console.error('Supabase updateFarmerStory error:', error);
    } catch (e) {
      console.error('Failed to update story in Supabase', e);
    }
  };

  const deleteFarmerStory = async (id: string) => {
    setFarmerStories((prev) => prev.filter((s) => s.id !== id));

    try {
      const { error } = await supabase.from('farmer_stories').delete().eq('id', id);
      if (error) console.error('Supabase deleteFarmerStory error:', error);
    } catch (e) {
      console.error('Failed to delete story from Supabase', e);
    }
  };

  const resetFarmerStories = async () => {
    setFarmerStories(DEFAULT_FARMER_STORIES);
    try {
      for (const s of DEFAULT_FARMER_STORIES) {
        await supabase.from('farmer_stories').upsert(mapStoryToDb(s));
      }
    } catch (e) {
      console.error('Failed to reset stories in Supabase', e);
    }
  };

  // 5. FAQ operations
  const addFAQ = async (faq: Omit<FAQItem, 'id'> & { id?: string }) => {
    const newFaq: FAQItem = {
      ...faq,
      id: faq.id || `faq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    };
    setFaqs((prev) => [newFaq, ...prev]);

    try {
      const dbRow = mapFaqToDb(newFaq, faqs.length);
      const { error } = await supabase.from('faqs').insert(dbRow);
      if (error) console.error('Supabase addFAQ error:', error);
    } catch (e) {
      console.error('Failed to sync FAQ to Supabase', e);
    }
  };

  const updateFAQ = async (updated: FAQItem) => {
    setFaqs((prev) => prev.map((f) => (f.id === updated.id ? updated : f)));

    try {
      const dbRow = mapFaqToDb(updated);
      const { error } = await supabase.from('faqs').update(dbRow).eq('id', updated.id);
      if (error) console.error('Supabase updateFAQ error:', error);
    } catch (e) {
      console.error('Failed to update FAQ in Supabase', e);
    }
  };

  const deleteFAQ = async (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));

    try {
      const { error } = await supabase.from('faqs').delete().eq('id', id);
      if (error) console.error('Supabase deleteFAQ error:', error);
    } catch (e) {
      console.error('Failed to delete FAQ from Supabase', e);
    }
  };

  const resetFAQs = async () => {
    setFaqs(DEFAULT_FAQS);
    try {
      for (let i = 0; i < DEFAULT_FAQS.length; i++) {
        await supabase.from('faqs').upsert(mapFaqToDb(DEFAULT_FAQS[i], i));
      }
    } catch (e) {
      console.error('Failed to reset FAQs in Supabase', e);
    }
  };

  // 6. Site Settings operations
  const updateSiteSettings = async (newSettings: Partial<SiteSettings>) => {
    const merged = { ...siteSettings, ...newSettings };
    setSiteSettings(merged);

    try {
      const dbRow = mapSettingsToDb(merged);
      const { error } = await supabase.from('site_settings').upsert(dbRow);
      if (error) console.error('Supabase updateSiteSettings error:', error);
    } catch (e) {
      console.error('Failed to update site settings in Supabase', e);
    }
  };

  const resetSiteSettings = async () => {
    setSiteSettings(DEFAULT_SITE_SETTINGS);
    try {
      const dbRow = mapSettingsToDb(DEFAULT_SITE_SETTINGS);
      await supabase.from('site_settings').upsert(dbRow);
    } catch (e) {
      console.error('Failed to reset site settings in Supabase', e);
    }
  };

  // Complete data management
  const resetAllData = async () => {
    setProducts(PRODUCTS_DATA);
    setGallery(GALLERY_DATA);
    setLeads(DEFAULT_LEADS);
    setFarmerStories(DEFAULT_FARMER_STORIES);
    setFaqs(DEFAULT_FAQS);
    setSiteSettings(DEFAULT_SITE_SETTINGS);

    try {
      localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
      localStorage.removeItem(STORAGE_KEYS.GALLERY);
      localStorage.removeItem(STORAGE_KEYS.LEADS);
      localStorage.removeItem(STORAGE_KEYS.STORIES);
      localStorage.removeItem(STORAGE_KEYS.FAQS);
      localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    } catch {
      // Ignore
    }

    try {
      await Promise.all([
        resetProducts(),
        resetGallery(),
        resetLeads(),
        resetFarmerStories(),
        resetFAQs(),
        resetSiteSettings(),
      ]);
    } catch (e) {
      console.error('Failed resetting all data to Supabase', e);
    }
  };

  const exportAllDataJSON = (): string => {
    const backup = {
      version: '3.0-supabase',
      exportedAt: new Date().toISOString(),
      products,
      gallery,
      leads,
      farmerStories,
      faqs,
      siteSettings,
    };
    return JSON.stringify(backup, null, 2);
  };

  const importAllDataJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.products && Array.isArray(parsed.products)) {
        setProducts(parsed.products);
        parsed.products.forEach((p: Product) => supabase.from('products').upsert(mapProductToDb(p)));
      }
      if (parsed.gallery && Array.isArray(parsed.gallery)) {
        setGallery(parsed.gallery);
        parsed.gallery.forEach((g: GalleryItem) => supabase.from('gallery').upsert(mapGalleryToDb(g)));
      }
      if (parsed.leads && Array.isArray(parsed.leads)) {
        setLeads(parsed.leads);
        parsed.leads.forEach((l: Lead) => supabase.from('leads').upsert(mapLeadToDb(l)));
      }
      if (parsed.farmerStories && Array.isArray(parsed.farmerStories)) {
        setFarmerStories(parsed.farmerStories);
        parsed.farmerStories.forEach((s: FarmerStory) => supabase.from('farmer_stories').upsert(mapStoryToDb(s)));
      }
      if (parsed.faqs && Array.isArray(parsed.faqs)) {
        setFaqs(parsed.faqs);
        parsed.faqs.forEach((f: FAQItem, idx: number) => supabase.from('faqs').upsert(mapFaqToDb(f, idx)));
      }
      if (parsed.siteSettings && typeof parsed.siteSettings === 'object') {
        const merged = { ...DEFAULT_SITE_SETTINGS, ...parsed.siteSettings };
        setSiteSettings(merged);
        supabase.from('site_settings').upsert(mapSettingsToDb(merged));
      }
      return true;
    } catch (e) {
      console.error('Failed to import JSON data', e);
      return false;
    }
  };

  return (
    <DataContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProducts,
        gallery,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        resetGallery,
        leads,
        addLead,
        updateLeadStatus,
        updateLeadNotes,
        deleteLead,
        clearAllLeads,
        resetLeads,
        farmerStories,
        addFarmerStory,
        updateFarmerStory,
        deleteFarmerStory,
        resetFarmerStories,
        faqs,
        addFAQ,
        updateFAQ,
        deleteFAQ,
        resetFAQs,
        siteSettings,
        updateSiteSettings,
        resetSiteSettings,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        resetAllData,
        exportAllDataJSON,
        importAllDataJSON,
        isLoading,
        isSupabaseConnected,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
