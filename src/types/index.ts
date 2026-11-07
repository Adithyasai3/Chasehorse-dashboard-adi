export type TierLevel = 1 | 2 | 3;

export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  tier: TierLevel;
  tierName: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  targetAudience: string[];
  problemsSolved: string[];
  features: string[];
  deliverables: string[];
  benefits: string[];
  workflow: WorkflowStep[];
  expectedOutcomes: string[];
  subservices: string[];
  basePriceDemo?: number;
  indicativePrice?: string;
  pricingUnit?: string;
}

export interface CityLocation {
  id: string;
  name: string;
  state: string;
  coords: { lat: number; lng: number };
  positionPercent: { top: number; left: number };
  hubType: string;
  address: string;
  contact: string;
  activeFieldWorkers: number;
  terminalBays: number;
  specialization: string[];
  isHeadquarters?: boolean;
}

export interface ProductVariant {
  sizes?: string[];
  colors?: { name: string; hex: string }[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'ppe-kits' | 'helmets' | 'footwear' | 'jackets' | 'protection' | 'spill-lashing';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery: string[];
  description: string;
  specifications: Record<string, string>;
  variants?: ProductVariant;
  inStock: boolean;
  standards: string[]; // e.g. "EN 397", "IS 2925:1984", "CE Certified"
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface JobOpening {
  id: string;
  slug: string;
  title: string;
  department: 'Operations' | 'Technology' | 'Quality & Safety' | 'Business Development' | 'Fleet & Logistics';
  location: string;
  type: 'Full-time' | 'Contract' | 'Internship';
  experience: string;
  salaryRange: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  isHot?: boolean;
}

export interface FreightIndexPoint {
  date: string;
  ratePerKm: number;
  dieselIndex: number;
  demandIndex: number;
}

export interface LaneRate {
  id: string;
  origin: string;
  destination: string;
  distance: string;
  transitTime: string;
  ratePerKm: number;
  changePercent: number;
  truckTypes: string[];
}

