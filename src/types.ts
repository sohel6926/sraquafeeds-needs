export type PageType = 'home' | 'about' | 'products' | 'gallery' | 'contact' | 'product-detail';

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
