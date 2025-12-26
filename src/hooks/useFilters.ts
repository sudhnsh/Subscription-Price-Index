import { useState, useMemo } from "react";
import { SubscriptionItem, FilterState } from "../types";

export const useFilters = (priceData: SubscriptionItem[]) => {
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: "",
    selectedCountry: "All",
    selectedTags: [],
    sortBy: "savings",
  });

  const countries = useMemo(() => {
    const allCountries = new Set<string>();
    priceData.forEach((item) => {
      item.prices.forEach((price) => {
        allCountries.add(price.country);
      });
    });
    return ["All", ...Array.from(allCountries).sort()];
  }, [priceData]);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    priceData.forEach((item) => {
      item.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [priceData]);

  const filteredData = useMemo(() => {
    const filtered = priceData.filter((item) => {
      const matchesSearch = item.product
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase());
      const matchesCountry =
        filters.selectedCountry === "All" ||
        item.prices.some((price) => price.country === filters.selectedCountry);
      const matchesTags =
        filters.selectedTags.length === 0 ||
        filters.selectedTags.every((tag) => item.tags.includes(tag));
      return matchesSearch && matchesCountry && matchesTags;
    });

    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "product":
          return a.product.localeCompare(b.product);
        case "category":
          return a.category.localeCompare(b.category);
        case "price":
          return a.basePrice - b.basePrice;
        case "savings":
        default:
          const maxSavingsA = Math.max(...a.prices.map((p) => p.savings));
          const maxSavingsB = Math.max(...b.prices.map((p) => p.savings));
          return maxSavingsB - maxSavingsA;
      }
    });

    return filtered;
  }, [priceData, filters]);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: "",
      selectedCountry: "All",
      selectedTags: [],
      sortBy: "savings",
    });
  };

  return {
    filters,
    countries,
    allTags,
    filteredData,
    updateFilters,
    clearFilters,
  };
};
