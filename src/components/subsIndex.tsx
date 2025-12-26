"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/footer";
import { Globe, LayoutGrid, List } from "lucide-react";
import { priceData } from "../data/data";
import { useFilters } from "../hooks/useFilters";
import { Header } from "./header";
import { Filters } from "./filters";
import { VpnCalculator } from "./vpnCalculator";
import { SubscriptionCard } from "./subscriptionCard";
import {
  getCountryFlag,
  recalculateSavingsForHomeCountry,
  calculateInitialSavings,
} from "../utils";

export default function PriceIndex() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [subscriptionData] = useState(() => calculateInitialSavings(priceData));

  const [viewMode, setViewMode] = useState<"compact" | "full">("compact");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [selectedHomeCountry, setSelectedHomeCountry] =
    useState("United States");

  // NEW: Recalculate data based on selected home country
  const processedPriceData = useMemo(() => {
    return recalculateSavingsForHomeCountry(subscriptionData, selectedHomeCountry);
  }, [subscriptionData, selectedHomeCountry]);

  // UPDATE: Use processed data instead of original data
  const {
    filters,
    countries,
    allTags,
    filteredData,
    updateFilters,
    clearFilters,
  } = useFilters(processedPriceData);

  return (
    <div>
      <div
        className={`min-h-[calc(100vh-54px)] transition-colors duration-300 p-10 ${
          isDarkMode
            ? "bg-gradient-to-br from-gray-900 to-gray-800"
            : "bg-gradient-to-br from-green-50 to-blue-50"
        }`}
      >
        <div className="max-w-9xl  mx-auto">
          <Header
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            selectedCurrency={selectedCurrency}
            onCurrencyChange={setSelectedCurrency}
            selectedHomeCountry={selectedHomeCountry}
            onHomeCountryChange={setSelectedHomeCountry}
          />

          <Filters
            filters={filters}
            countries={countries}
            allTags={allTags}
            isDarkMode={isDarkMode}
            onUpdateFilters={updateFilters}
            onClearFilters={clearFilters}
          />

          <VpnCalculator filteredData={filteredData} isDarkMode={isDarkMode} />

          {/* Show current base country info */}
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p
                className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                {filteredData.length}{" "}
                {filteredData.length === 1 ? "product" : "products"} found
                {filters.selectedCountry !== "All" && (
                  <span className="ml-2 text-sm">
                    • Showing prices for{" "}
                    {getCountryFlag(filters.selectedCountry)}{" "}
                    {filters.selectedCountry}
                  </span>
                )}
                {filters.selectedTags.length > 0 && (
                  <span className="ml-2 text-sm">
                    • Filtered by {filters.selectedTags.length} tag
                    {filters.selectedTags.length > 1 ? "s" : ""}
                  </span>
                )}
              </p>
              {/* NEW: Show base country info */}
              <p
                className={`text-xs mt-1 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Savings calculated based on{" "}
                {getCountryFlag(selectedHomeCountry)} {selectedHomeCountry}{" "}
                pricing
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* View Mode Buttons */}
              <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <Button
                  variant={viewMode === "compact" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("compact")}
                  className="px-3 py-1 h-8"
                >
                  <LayoutGrid className="w-4 h-4 mr-1" />
                  Compact
                </Button>
                <Button
                  variant={viewMode === "full" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("full")}
                  className="px-3 py-1 h-8"
                >
                  <List className="w-4 h-4 mr-1" />
                  Full
                </Button>
              </div>

              {(filters.selectedCountry !== "All" ||
                filters.selectedTags.length > 0) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className={`${
                    isDarkMode
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                      : ""
                  }`}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>

          <div
            className={`grid gap-6 ${
              viewMode === "compact"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 xl:grid-cols-2"
            }`}
          >
            {filteredData.map((item) => (
              <SubscriptionCard
                key={item.id}
                item={item}
                selectedCountry={filters.selectedCountry}
                isDarkMode={isDarkMode}
                viewMode={viewMode}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredData.length === 0 && (
            <Card className="p-12 text-center">
              <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3
                className={`text-lg font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                } mb-2`}
              >
                No products found
              </h3>
              <p
                className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                Try adjusting your search or filter criteria
              </p>
            </Card>
          )}
        </div>
      </div>
      <Footer
        isDarkMode={isDarkMode}
        bgColorLight="bg-gray-100/90"
        bgColorDark="bg-slate-900/90"
        textColorLight="text-gray-600"
        textColorDark="text-white"
        borderColorLight="border-gray-200"
        borderColorDark="border-slate-700"
      />
    </div>
  );
}
