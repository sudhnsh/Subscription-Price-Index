import { LucideIcon } from "lucide-react";

export interface PriceData {
  country: string;
  price: number;
  currency: string;
  flag: string;
  savings: number;
  note?: string;
}

export interface SubscriptionItem {
  id: number;
  product: string;
  category: string;
  icon: LucideIcon; // LucideIcon type if you want to be more specific

  brandColor: string;
  brandColorLight: string;
  brandColorDark: string;
  basePrice: number;
  baseCurrency: string;
  baseCountry: string;
  tags: string[];
  prices: PriceData[];
  image: string;
  vpnFriendly: boolean;
}

export interface FilterState {
  searchTerm: string;
  selectedCountry: string;
  selectedTags: string[];
  sortBy: string;
}

// NEW: Added VPN Calculator types
export interface VpnRecommendation {
  id: number;
  product: string;
  icon: LucideIcon;

  basePrice: number;
  bestPrice: number;
  bestCountry: PriceData;
  savings: number;
  savingsPercent: number;
}

export interface VpnCalculation {
  totalCurrentCost: number;
  totalBestCost: number;
  totalSavings: number;
  breakEvenPoint: number;
  netSavings: number;
  recommendations: VpnRecommendation[];
}
