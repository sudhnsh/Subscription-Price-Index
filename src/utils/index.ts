import { SubscriptionItem } from "@/types";

export const getCountryFlag = (country: string): string => {
  const flagMap: { [key: string]: string } = {
    Turkey: "🇹🇷",
    Argentina: "🇦🇷",
    India: "🇮🇳",
    Brazil: "🇧🇷",
    Philippines: "🇵🇭",
    Mexico: "🇲🇽",
    "United Kingdom": "🇬🇧",
    "United States": "🇺🇸",
    Ukraine: "🇺🇦",
  };
  return flagMap[country] || "🌍";
};

export const getTagColors = (tag: string, isDarkMode: boolean): string => {
  if (tag === "Music") {
    return isDarkMode
      ? "bg-purple-900/50 border-purple-700 text-purple-300"
      : "bg-purple-100 border-purple-300 text-purple-700";
  } else if (tag === "Video") {
    return isDarkMode
      ? "bg-blue-900/50 border-blue-700 text-blue-300"
      : "bg-blue-100 border-blue-300 text-blue-700";
  } else if (tag === "Gaming") {
    return isDarkMode
      ? "bg-orange-900/50 border-orange-700 text-orange-300"
      : "bg-orange-100 border-orange-300 text-orange-700";
  } else if (tag === "VPN Friendly") {
    return isDarkMode
      ? "bg-green-900/50 border-green-700 text-green-300"
      : "bg-green-100 border-green-300 text-green-700";
  } else if (tag === "VPN Restricted") {
    return isDarkMode
      ? "bg-red-900/50 border-red-700 text-red-300"
      : "bg-red-100 border-red-300 text-red-700";
  } else {
    return isDarkMode
      ? "border-gray-600 text-gray-400"
      : "border-gray-300 text-gray-600";
  }
};

// FIXED: Zero savings should be blue (neutral), not red
export const formatSavings = (savings: number): { 
  displayText: string, 
  colorClass: string, 
  isPositive: boolean 
} => {
  const absValue = Math.abs(savings);
  
  if (savings > 0) {
    return {
      displayText: `${absValue.toFixed(1)}%`,
      colorClass: 'text-green-600',
      isPositive: true
    };
  } else if (savings < 0) {
    return {
      displayText: `${absValue.toFixed(1)}%`,
      colorClass: 'text-red-600',
      isPositive: false
    };
  } else {
    // FIXED: Zero savings = neutral/blue color
    return {
      displayText: `${absValue.toFixed(1)}%`,
      colorClass: 'text-blue-600',
      isPositive: true // Treat as neutral-positive for UI purposes
    };
  }
};

export const getCurrencySymbol = (currencyCode: string): string => {
  const currencyMap: { [key: string]: string } = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'INR': '₹',
    'BRL': 'R$',
    'TRY': '₺',
  };
  return currencyMap[currencyCode] || currencyCode;
};

// NEW: Function to auto-calculate savings for initial data load
export const calculateInitialSavings = (
  subscriptionData: SubscriptionItem[]
): SubscriptionItem[] => {
  return subscriptionData.map(item => {
    // Find the base country price
    const baseCountryData = item.prices.find(price => price.country === item.baseCountry);
    
    if (!baseCountryData) {
      console.warn(`No pricing data found for ${item.product} in base country ${item.baseCountry}`);
      return item;
    }

    // Calculate savings for each country based on the base country
    const calculatedPrices = item.prices.map(price => {
      if (baseCountryData.price <= 0) {
        return { ...price, savings: 0 };
      }
      
      if (price.price <= 0) {
        return { ...price, savings: 100 };
      }

      // Calculate savings: (base price - other price) / base price * 100
      const savings = ((baseCountryData.price - price.price) / baseCountryData.price) * 100;
      
      return {
        ...price,
        savings: Number(savings.toFixed(1))
      };
    });

    return {
      ...item,
      prices: calculatedPrices
    };
  });
};

// UPDATED: Enhanced function for dynamic home country changes
export const recalculateSavingsForHomeCountry = (
  subscriptionData: SubscriptionItem[],
  selectedHomeCountry: string
): SubscriptionItem[] => {
  return subscriptionData.map(item => {
    const homeCountryData = item.prices.find(price => price.country === selectedHomeCountry);
    
    if (!homeCountryData) {
      console.warn(`No pricing data found for ${item.product} in ${selectedHomeCountry}`);
      return {
        ...item,
        prices: item.prices.map(price => ({ ...price, savings: 0 }))
      };
    }

    const recalculatedPrices = item.prices.map(price => {
      if (homeCountryData.price <= 0) {
        return { ...price, savings: 0 };
      }
      
      if (price.price <= 0) {
        return { ...price, savings: 100 };
      }

      const savings = ((homeCountryData.price - price.price) / homeCountryData.price) * 100;
      
      return {
        ...price,
        savings: Number(savings.toFixed(1))
      };
    });

    return {
      ...item,
      basePrice: homeCountryData.price,
      baseCountry: selectedHomeCountry,
      baseCurrency: homeCountryData.currency,
      prices: recalculatedPrices
    };
  });
};
