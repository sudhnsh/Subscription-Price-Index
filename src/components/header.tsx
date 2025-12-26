import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
  selectedHomeCountry: string;
  onHomeCountryChange: (country: string) => void;
}

// // NEW: Added currency and country data for selectors
// const currencies = [
//   { code: "USD", symbol: "$", flag: "🇺🇸", name: "US Dollar" },
//   { code: "EUR", symbol: "€", flag: "🇪🇺", name: "Euro" },
//   { code: "GBP", symbol: "£", flag: "🇬🇧", name: "British Pound" },
//   { code: "INR", symbol: "₹", flag: "🇮🇳", name: "Indian Rupee" },
//   { code: "BRL", symbol: "R$", flag: "🇧🇷", name: "Brazilian Real" },
//   { code: "TRY", symbol: "₺", flag: "🇹🇷", name: "Turkish Lira" },
// ];

const homeCountries = [
  "United States",
  "United Kingdom",
  "India",
  "Brazil",
  "Turkey",
  "Argentina",
  "Mexico",
  "Philippines",
  "Ukraine",
];

export const Header = ({
  isDarkMode,
  onToggleDarkMode,
  //   selectedCurrency,
  //   onCurrencyChange,
  selectedHomeCountry,
  onHomeCountryChange,
}: HeaderProps) => {
  return (
    <div className="mb-8">
      {/* Mobile-first responsive layout */}
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-start">
        {/* Logo and Title Section */}
        <div className="flex items-center gap-3">
          <img
            src="/images/sub-index.svg"
            alt="Subscription Price Index"
            className="w-12 h-12 flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h1
              className={`text-2xl sm:text-3xl font-bold leading-tight ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Subscription Price Index
            </h1>
            <p
              className={`text-sm sm:text-base mt-1 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Compare popular subscription prices across countries and save with
              regional pricing
            </p>
          </div>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-shrink-0">
          {/* NEW: Currency Selector */}
          {/*
          <div className="flex items-center gap-2">
            <Globe className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
            <Select value={selectedCurrency} onValueChange={onCurrencyChange}>
              <SelectTrigger className={`w-full sm:w-[200px] ${
                isDarkMode
                  ? "bg-gray-800 border-gray-600 text-white"
                  : "bg-white border-gray-200 text-gray-900"
              }`}>
                <SelectValue placeholder="Select Currency" />
              </SelectTrigger>
              <SelectContent className={
                isDarkMode
                  ? "bg-gray-800 border-gray-600"
                  : "bg-white border-gray-200"
              }>
                {currencies.map((currency) => (
                  <SelectItem 
                    key={currency.code} 
                    value={currency.code}
                    className={
                      isDarkMode
                        ? "text-white hover:bg-gray-700 focus:bg-gray-700"
                        : "text-gray-900 hover:bg-gray-100 focus:bg-gray-100"
                    }
                  >
                    {currency.flag} {currency.code} - {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          */}

          {/* NEW: Home Country Selector */}
          <Select
            value={selectedHomeCountry}
            onValueChange={onHomeCountryChange}
          >
            <SelectTrigger
              className={`w-full sm:w-[180px] ${
                isDarkMode
                  ? "bg-gray-800 border-gray-600 text-white"
                  : "bg-white border-gray-200 text-gray-900"
              }`}
            >
              <SelectValue placeholder="Select Home Country" />
            </SelectTrigger>
            <SelectContent
              className={
                isDarkMode
                  ? "bg-gray-800 border-gray-600"
                  : "bg-white border-gray-200"
              }
            >
              {homeCountries.map((country) => (
                <SelectItem
                  key={country}
                  value={country}
                  className={
                    isDarkMode
                      ? "text-white hover:bg-gray-700 focus:bg-gray-700"
                      : "text-gray-900 hover:bg-gray-100 focus:bg-gray-100"
                  }
                >
                  🏠 {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* FIXED: Dark Mode Toggle with proper styling and mobile responsiveness */}
          <Button
            variant="outline"
            size="lg"
            onClick={onToggleDarkMode}
            className={`w-full sm:w-auto transition-colors ${
              isDarkMode
                ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-gray-200 bg-gray-800"
                : "border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 bg-white"
            }`}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
            <span className="ml-2">{isDarkMode ? "Light" : "Dark"}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
