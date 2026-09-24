import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, GalleryItem, Lead, LeadStatus, SiteSettings, FarmerStory, FAQItem } from '../types.ts';
import { PRODUCTS_DATA } from '../data/products.ts';
import { GALLERY_DATA } from '../data/gallery.ts';

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
    date: 'Harvested June 2026',
  },
];

export const DEFAULT_FAQS: FAQItem[] = [
  {
    id: 'faq-prod-1',
    category: 'Products & Nutrition',
    question: 'Why is 3-hour water stability critical in shrimp feed, and how does it prevent pond sludge?',
    answer:
      'Low-grade feeds quickly turn to mush within 30 to 45 minutes, leaching precious water-soluble amino acids and marine proteins into the bottom water before the prawns can consume them. This creates toxic black anaerobic sludge, fuels pathogenic Vibrio, and elevates ammonia. Our Supreme Vannamei and grower feeds are conditioned with hydrothermal marine binders that maintain complete physical pellet integrity for over 3 hours. This ensures 100% nutrient assimilation and consistently delivers optimal FCR between 1.1 and 1.25.',
    keyPoints: [
      '3+ hours water stability with zero check-tray disintegration or dusting.',
      'Prevents nutrient leaching into pond bottom mud.',
      'Saves up to 15% in overall feed costs by lowering FCR.',
    ],
  },
  {
    id: 'faq-farm-1',
    category: 'Pond Farming Practices',
    question: 'How do I calculate and maintain the correct Calcium, Magnesium, and Potassium ratios for molting?',
    answer:
      'In low and medium salinity coastal ponds (2 to 15 ppt), maintaining the golden 3:1 Magnesium (Mg²⁺) to Calcium (Ca²⁺) ratio and 1:1 Potassium (K⁺) to Sodium (Na⁺) ionic proportion is vital for synchronized molting and hard exoskeleton formation. When Mg or K is deficient, shrimp suffer from white muscle syndrome, body cramps, and post-molt cannibalism. We recommend broadcasting Aqua-CalMag ionic minerals during late evening or pre-dawn hours corresponding with the new moon and full moon molt cycles.',
    keyPoints: [
      'Maintain 3:1 Mg:Ca ratio for complete, hard-shell molting.',
      'Broadcast ionic minerals during late evening (6:00 PM – 9:00 PM) before night molts.',
      'Bring a 500ml water sample to our Ulavapadu counter for complimentary hardness testing.',
    ],
  },
  {
    id: 'faq-farm-2',
    category: 'Pond Farming Practices',
    question: 'What immediate steps should I take if pond dissolved oxygen (DO) drops below 3.0 ppm at midnight?',
    answer:
      'A dissolved oxygen crash below 3.0 ppm causes immediate shrimp distress, surface gasping, and rapid mortality. Immediately switch on all paddle-wheel and spiral aerators. Next, broadcast fast-sinking Oxy-Burst Sodium Percarbonate tablets directly into feeding zones and aerator corners (where DO is lowest). Sodium percarbonate dissolves into concentrated pure active oxygen directly on the pond floor within minutes. For night crises, call our emergency hotline at 9493243244 for immediate dispatch.',
    keyPoints: [
      'Run 100% aeration capacity immediately.',
      'Broadcast sinking sodium percarbonate tablets (5–10 kg/acre) in low-flow sludge zones.',
      '24/7 on-call dispatch available for midnight emergency oxygen replenishment.',
    ],
  },
  {
    id: 'faq-prod-2',
    category: 'Products & Nutrition',
    question: 'How do I choose between starter micro-crumbles and grower pellets for early stocking?',
    answer:
      'For newly stocked post-larvae (PL12 to PL30, DOC 1 to DOC 30), ultra-digestible micro-granules (0.5mm to 1.0mm) enriched with krill meal and immune stimulants are required because juvenile prawns have small mouths and fast metabolic rates. Once shrimp reach 3.0 to 5.0 grams (DOC 30+), transition smoothly over 4 days to 1.2mm–1.4mm extruded grower pellets with 38% crude protein to stimulate accelerated daily weight gain without particle size variation.',
    keyPoints: [
      'DOC 1–30: Use Aqua-Start Nursery Crumbles (0.5mm–1.0mm, 40% marine protein).',
      'DOC 30+: Transition gradually to Supreme Vannamei Grower Feed (38% protein).',
      'Gradual transition prevents digestive shock and size scattering.',
    ],
  },
  {
    id: 'faq-farm-3',
    category: 'Pond Farming Practices',
    question: 'How do I adjust feed check trays to prevent overfeeding and keep FCR under 1.2?',
    answer:
      'Place 4 to 6 check trays per acre along pond dykes, keeping them 3 to 4 meters away from aerators. Place approximately 0.8% to 1.0% of the total meal on the trays. Check after 2.0 to 2.5 hours: if trays are completely clean with empty shrimp guts, increase feed by 5%; if 10% feed remains, maintain feed; if more than 20% remains, reduce the next feeding by 25% to prevent water fouling. Always cut feeding by 30% to 50% during cloudy monsoon days, molting peaks, or sudden salinity swings.',
    keyPoints: [
      'Check trays at 2.0 to 2.5 hours after broadcast.',
      'Inspect prawn gut fullness (full dark line indicates active healthy feeding).',
      'Cut feeding during overcast, low DO, or heavy rain periods.',
    ],
  },
  {
    id: 'faq-water-1',
    category: 'Water Quality & Minerals',
    question: 'What is the fastest way to neutralize toxic Ammonia (NH3) and Hydrogen Sulfide (H2S)?',
    answer:
      'Total ammonia becomes extremely toxic at higher pH (> 8.2). First, apply natural Yucca schidigera extract (Toxic-Gas Binder) at 1–2 liters per acre; its saponin sterols immediately cross-link and bind free NH3 and smelly H2S molecules. Simultaneously apply active Bacillus subtilis and Bacillus licheniformis probiotics (Bacto-Clean Pro) with fermented jaggery in the morning to permanently metabolize organic pond floor sludge into harmless nitrogen gas.',
    keyPoints: [
      'Yucca extract binds free ammonia and toxic gases within 2 hours.',
      'Active Bacillus strains digest accumulated sludge and prevent black soil.',
      'Maintain pond water pH between 7.5 and 8.2 to prevent free unionized NH3 spikes.',
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
}

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  // Save to localStorage whenever state changes
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
    if (trimmed === '1234' || trimmed === 'admin' || trimmed === 'rambabu' || trimmed === '9493243244') {
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

  // Product operations
  const addProduct = (product: Omit<Product, 'id'> & { id?: string }) => {
    const newProduct: Product = {
      ...product,
      id: product.id || `prod-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const resetProducts = () => {
    setProducts(PRODUCTS_DATA);
  };

  // Gallery operations
  const addGalleryItem = (item: Omit<GalleryItem, 'id'> & { id?: string }) => {
    const newItem: GalleryItem = {
      ...item,
      id: item.id || `gal-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    };
    setGallery((prev) => [newItem, ...prev]);
  };

  const updateGalleryItem = (updated: GalleryItem) => {
    setGallery((prev) => prev.map((g) => (g.id === updated.id ? updated : g)));
  };

  const deleteGalleryItem = (id: string) => {
    setGallery((prev) => prev.filter((g) => g.id !== id));
  };

  const resetGallery = () => {
    setGallery(GALLERY_DATA);
  };

  // Lead operations
  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt' | 'status'> & { id?: string; status?: LeadStatus }): Lead => {
    const newLead: Lead = {
      id: leadData.id || `lead-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
      status: leadData.status || 'new',
      farmerName: leadData.farmerName,
      phone: leadData.phone,
      village: leadData.village,
      topic: leadData.topic,
      productName: leadData.productName,
      category: leadData.category || '🦐 Aqua Feed',
      amountOrAcres: leadData.amountOrAcres || 'General Need',
      leadType: leadData.leadType || 'whatsapp',
      farmerProfile: leadData.farmerProfile || 'Pond Cultivator',
      message: leadData.message,
      notes: leadData.notes || '',
      source: leadData.source || 'Website Contact Form',
    };
    setLeads((prev) => [newLead, ...prev]);
    return newLead;
  };

  const updateLeadStatus = (id: string, status: LeadStatus) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  const updateLeadNotes = (id: string, notes: string) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, notes } : l)));
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  const clearAllLeads = () => {
    setLeads([]);
  };

  const resetLeads = () => {
    setLeads(DEFAULT_LEADS);
  };

  // Farmer Stories operations
  const addFarmerStory = (story: Omit<FarmerStory, 'id'> & { id?: string }) => {
    const newStory: FarmerStory = {
      ...story,
      id: story.id || `story-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    };
    setFarmerStories((prev) => [newStory, ...prev]);
  };

  const updateFarmerStory = (updated: FarmerStory) => {
    setFarmerStories((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  };

  const deleteFarmerStory = (id: string) => {
    setFarmerStories((prev) => prev.filter((s) => s.id !== id));
  };

  const resetFarmerStories = () => {
    setFarmerStories(DEFAULT_FARMER_STORIES);
  };

  // FAQ operations
  const addFAQ = (faq: Omit<FAQItem, 'id'> & { id?: string }) => {
    const newFaq: FAQItem = {
      ...faq,
      id: faq.id || `faq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    };
    setFaqs((prev) => [newFaq, ...prev]);
  };

  const updateFAQ = (updated: FAQItem) => {
    setFaqs((prev) => prev.map((f) => (f.id === updated.id ? updated : f)));
  };

  const deleteFAQ = (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
  };

  const resetFAQs = () => {
    setFaqs(DEFAULT_FAQS);
  };

  // Site Settings operations
  const updateSiteSettings = (newSettings: Partial<SiteSettings>) => {
    setSiteSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const resetSiteSettings = () => {
    setSiteSettings(DEFAULT_SITE_SETTINGS);
  };

  // Complete data management
  const resetAllData = () => {
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
  };

  const exportAllDataJSON = (): string => {
    const backup = {
      version: '2.0',
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
      if (parsed.products && Array.isArray(parsed.products)) setProducts(parsed.products);
      if (parsed.gallery && Array.isArray(parsed.gallery)) setGallery(parsed.gallery);
      if (parsed.leads && Array.isArray(parsed.leads)) setLeads(parsed.leads);
      if (parsed.farmerStories && Array.isArray(parsed.farmerStories)) setFarmerStories(parsed.farmerStories);
      if (parsed.faqs && Array.isArray(parsed.faqs)) setFaqs(parsed.faqs);
      if (parsed.siteSettings && typeof parsed.siteSettings === 'object') setSiteSettings(parsed.siteSettings);
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
