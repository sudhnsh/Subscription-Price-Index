import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, X } from "lucide-react";
import { FilterState } from "../types";
import { getCountryFlag } from "../utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FiltersProps {
  filters: FilterState;
  countries: string[];
  allTags: string[];
  isDarkMode: boolean;
  onUpdateFilters: (filters: Partial<FilterState>) => void;
  onClearFilters: () => void; // FIXED: Uncommented this prop since it's being used
}

export const Filters = ({
  filters,
  countries,
  allTags,
  isDarkMode,
  onUpdateFilters, // FIXED: Uncommented this parameter
}: FiltersProps) => {
  const [isTagsDropdownOpen, setIsTagsDropdownOpen] = useState(false);

  const handleTagToggle = (tag: string) => {
    const newTags = filters.selectedTags.includes(tag)
      ? filters.selectedTags.filter((t) => t !== tag)
      : [...filters.selectedTags, tag];
    onUpdateFilters({ selectedTags: newTags });
  };

  const removeTag = (tag: string) => {
    const newTags = filters.selectedTags.filter((t) => t !== tag);
    onUpdateFilters({ selectedTags: newTags });
  };

  return (
    <Card
      className={`mb-5 ${
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <CardContent className="pl-6 pr-6">
        {" "}
        {/* FIXED: Changed back to p-6 for better spacing */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
            {/* Search with proper dark mode and icon alignment */}
            <div className="relative min-w-[40%] flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search
                  className={`w-4 h-4 ${
                    isDarkMode ? "text-gray-400" : "text-gray-400"
                  }`}
                />
              </div>
              <Input
                placeholder="Search products and services..."
                value={filters.searchTerm}
                onChange={(e) =>
                  onUpdateFilters({ searchTerm: e.target.value })
                }
                className={`pl-10 h-10 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                    : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500/20"
                }`}
              />
            </div>

            {/* Tags Filter with proper dark mode */}
            <div className="relative min-w-[200px]">
              <Button
                variant="outline"
                onClick={() => setIsTagsDropdownOpen(!isTagsDropdownOpen)}
                className={`w-full justify-between h-10 ${
                  isDarkMode
                    ? "border-gray-600 text-gray-300 bg-gray-800 hover:bg-gray-700 hover:text-gray-200"
                    : "border-gray-200 text-gray-700 bg-white hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span className="text-sm">
                  {filters.selectedTags.length === 0
                    ? "Select Tags..."
                    : `${filters.selectedTags.length} tag${
                        filters.selectedTags.length > 1 ? "s" : ""
                      } selected`}
                </span>
                <ChevronDown className="w-4 h-4" />
              </Button>

              {isTagsDropdownOpen && (
                <div
                  className={`absolute top-full left-0 right-0 mt-1 border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-600 shadow-gray-900/20"
                      : "bg-white border-gray-200 shadow-gray-200/20"
                  }`}
                >
                  <div className="p-2">
                    {allTags.map((tag) => (
                      <div
                        key={tag}
                        className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
                          isDarkMode
                            ? "hover:bg-gray-700 text-gray-200"
                            : "hover:bg-gray-100 text-gray-800"
                        }`}
                        onClick={() => handleTagToggle(tag)}
                      >
                        <input
                          type="checkbox"
                          checked={filters.selectedTags.includes(tag)}
                          onChange={() => handleTagToggle(tag)}
                          className={`rounded ${
                            isDarkMode
                              ? "bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800"
                              : "bg-white border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-white"
                          }`}
                        />
                        <span className="text-sm">{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Country Dropdown with consistent height */}
            <Select
              value={filters.selectedCountry}
              onValueChange={(value) =>
                onUpdateFilters({ selectedCountry: value })
              }
            >
              <SelectTrigger
                className={`min-w-[180px] h-10 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
                    : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
                }`}
              >
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent
                className={
                  isDarkMode
                    ? "bg-gray-800 border-gray-600"
                    : "bg-white border-gray-200"
                }
              >
                <SelectItem
                  value="All"
                  className={
                    isDarkMode
                      ? "text-white hover:bg-gray-700 focus:bg-gray-700"
                      : "text-gray-900 hover:bg-gray-100 focus:bg-gray-100"
                  }
                >
                  🌍 All Countries
                </SelectItem>
                {countries
                  .filter((country) => country !== "All")
                  .map((country) => (
                    <SelectItem
                      key={country}
                      value={country}
                      className={
                        isDarkMode
                          ? "text-white hover:bg-gray-700 focus:bg-gray-700"
                          : "text-gray-900 hover:bg-gray-100 focus:bg-gray-100"
                      }
                    >
                      {getCountryFlag(country)} {country}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            {/* FIXED: Sort Options with proper value handling */}
            <Select
              value={filters.sortBy}
              onValueChange={(value) => {
                onUpdateFilters({ sortBy: value });
              }}
            >
              <SelectTrigger
                className={`min-w-[160px] h-10 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
                    : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
                }`}
              >
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent
                className={
                  isDarkMode
                    ? "bg-gray-800 border-gray-600"
                    : "bg-white border-gray-200"
                }
              >
                <SelectItem
                  value="savings"
                  className={
                    isDarkMode
                      ? "text-white hover:bg-gray-700 focus:bg-gray-700"
                      : "text-gray-900 hover:bg-gray-100 focus:bg-gray-100"
                  }
                >
                  Max Savings
                </SelectItem>
                <SelectItem
                  value="product"
                  className={
                    isDarkMode
                      ? "text-white hover:bg-gray-700 focus:bg-gray-700"
                      : "text-gray-900 hover:bg-gray-100 focus:bg-gray-100"
                  }
                >
                  Product Name
                </SelectItem>
                <SelectItem
                  value="category"
                  className={
                    isDarkMode
                      ? "text-white hover:bg-gray-700 focus:bg-gray-700"
                      : "text-gray-900 hover:bg-gray-100 focus:bg-gray-100"
                  }
                >
                  Category
                </SelectItem>
                <SelectItem
                  value="price"
                  className={
                    isDarkMode
                      ? "text-white hover:bg-gray-700 focus:bg-gray-700"
                      : "text-gray-900 hover:bg-gray-100 focus:bg-gray-100"
                  }
                >
                  Base Price
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Selected Tags Display with better dark mode */}
          {filters.selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center mt-4">
              <span
                className={`text-sm font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Selected tags:
              </span>
              {filters.selectedTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className={`cursor-pointer transition-colors ${
                    isDarkMode
                      ? "bg-blue-900/50 text-blue-200 hover:bg-blue-800/50 border-blue-700"
                      : "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-300"
                  }`}
                >
                  {tag}
                  <X
                    className="w-3 h-3 ml-1 hover:text-red-400 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTag(tag);
                    }}
                  />
                </Badge>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onUpdateFilters({ selectedTags: [] })}
                className={`text-xs transition-colors ${
                  isDarkMode
                    ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
              >
                Clear all
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
