export type PageType = 'home' | 'about' | 'products' | 'gallery' | 'contact' | 'product-detail' | 'admin';

export type ProductCategory =
  | 'All'
  | 'Shrimp & Fish Feed'
  | 'Pond Minerals'
  | 'Probiotics & Enzymes'
  | 'Ammonia & Gas Control'
  | 'Oxygen Enhancers'
  | 'Disinfectants & Sanitizers'
  | 'Growth Promoters & Immunity';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  tagline: string;
  description: string;
  packaging: string;
  keyBenefits: string[];
  imageUrl: string;
  isPopular?: boolean;
  curiosityHighlight?: string;
  curiosityBadge?: string;
  fullDescription?: string;
  composition?: { component: string; percentage: string }[];
  specs?: { label: string; value: string }[];
  dosageSchedule?: { stage: string; dose: string; frequency: string; notes: string }[];
  idealWaterParams?: { param: string; target: string; note: string }[];
  handlingAndStorage?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category:
    | 'Shop Interior'
    | 'Stock & Warehouse'
    | 'Products Display'
    | 'Farmer Support'
    | 'Prawn & Crop Vitality'
    | 'Pond & Farm Scenery';
  description: string;
  imageUrl: string;
}

export type LeadStatus = 'new' | 'contacted' | 'quote_sent' | 'order_placed' | 'closed';

export interface Lead {
  id: string;
  farmerName: string;
  phone: string;
  village: string;
  topic: string;
  productName?: string;
  category?: string;
  amountOrAcres?: string;
  leadType?: 'whatsapp' | 'call' | 'email' | 'form';
  farmerProfile?: string;
  message: string;
  createdAt: string;
  status: LeadStatus;
  notes?: string;
  source?: string;
}

export interface FarmerStory {
  id: string;
  name: string;
  village: string;
  region: string;
  cultureType: string;
  farmSize: string;
  docDays: string;
  stars: number;
  highlightCategory: 'Minerals & Molting' | 'Feed & Low FCR' | 'Vibrio Defense' | 'Emergency DO';
  quote: string;
  keyOutcomes: {
    label: string;
    value: string;
  }[];
  verifiedCropCount: string;
  date: string;
}

export interface FAQItem {
  id: string;
  category: 'Products & Nutrition' | 'Pond Farming Practices' | 'Water Quality & Minerals' | 'Ordering & Delivery';
  question: string;
  answer: string;
  keyPoints?: string[];
  recommendedAction?: {
    label: string;
    waText: string;
  };
}

export interface SiteSettings {
  businessName: string;
  tagline: string;
  proprietor: string;
  primaryPhone: string;
  secondaryPhone: string;
  whatsappNumber: string;
  primaryEmail: string;
  secondaryEmail: string;
  gstin: string;
  address: string;
  shopHours: string;
  coveredRadius: string;
  announcementEnabled: boolean;
  announcementText: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroBadge1: string;
  heroBadge2: string;
  heroBadge3: string;
  heroStat1Number: string;
  heroStat1Label: string;
  heroStat2Number: string;
  heroStat2Label: string;
  heroStat3Number: string;
  heroStat3Label: string;
  heroStat4Number: string;
  heroStat4Label: string;
  aboutFounderMessage: string;
  aboutStoryPart1: string;
  aboutStoryPart2: string;
  aboutMission: string;
  dispatchTurnaround: string;
  paymentNotice: string;
}


