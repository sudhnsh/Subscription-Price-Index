import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingDown,
  TrendingUp,
  DollarSign,
  Percent,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react";
import { SubscriptionItem } from "../types";
import { getTagColors, formatSavings } from "../utils";

interface SubscriptionCardProps {
  item: SubscriptionItem;
  selectedCountry: string;
  isDarkMode: boolean;
  viewMode: "compact" | "full";
}

export const SubscriptionCard = ({
  item,
  selectedCountry,
  isDarkMode,
  viewMode,
}: SubscriptionCardProps) => {
  const [showAllPrices, setShowAllPrices] = useState(false);
  const PRICES_TO_SHOW = 4;

  const allSavings = item.prices.map((p) => p.savings);
  const maxSavings = Math.max(...allSavings);

  const bestDeal = item.prices.reduce((best, current) =>
    current.savings > best.savings ? current : best
  );

  if (viewMode === "compact") {
    const savingsDisplay = formatSavings(maxSavings);

    return (
      <Card
        className={`hover:shadow-lg transition-all duration-300 border-2 ${
          isDarkMode ? item.brandColorDark : item.brandColorLight
        }`}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg overflow-hidden bg-gradient-to-br ${item.brandColor} flex-shrink-0 flex items-center justify-center`}
              >
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3
                  className={`font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {item.product}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-lg">{bestDeal.flag}</span>
                  <span className="font-semibold text-blue-600">
                    ${bestDeal.price.toFixed(2)}
                  </span>
                  {bestDeal.note && (
                    <div className="relative group">
                      <Info className="w-3 h-3 text-gray-400 cursor-help" />
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        {bestDeal.note}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div
                className={`text-xl font-bold flex items-center gap-1 ${savingsDisplay.colorClass}`}
              >
                {savingsDisplay.isPositive ? (
                  <TrendingDown className="w-4 h-4" />
                ) : (
                  <TrendingUp className="w-4 h-4" />
                )}
                {savingsDisplay.displayText}
              </div>
              <p
                className={`${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                } text-xs`}
              >
                {savingsDisplay.isPositive ? "Best Savings" : "Less Expensive"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const sortedPrices = (
    selectedCountry === "All"
      ? item.prices
      : item.prices.filter((p) => p.country === selectedCountry)
  ).sort((a, b) => b.savings - a.savings);

  const displayedPrices =
    showAllPrices || sortedPrices.length <= PRICES_TO_SHOW
      ? sortedPrices
      : sortedPrices.slice(0, PRICES_TO_SHOW);

  const hasMorePrices = sortedPrices.length > PRICES_TO_SHOW;

  return (
    <Card
      className={`hover:shadow-lg transition-all duration-300 border-2 ${
        isDarkMode ? item.brandColorDark : item.brandColorLight
      }`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br ${item.brandColor} flex-shrink-0 flex items-center justify-center`}
            >
              <item.icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <CardTitle
                className={`text-lg ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {item.product}
              </CardTitle>

              <div className="flex flex-wrap gap-1 mt-2">
                {item.tags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className={`text-xs ${getTagColors(tag, isDarkMode)}`}
                  >
                    {tag}
                  </Badge>
                ))}
                {item.tags.length > 3 && (
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      isDarkMode
                        ? "border-gray-600 text-gray-400"
                        : "border-gray-300 text-gray-600"
                    }`}
                  >
                    +{item.tags.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="text-right">
            {(() => {
              const savingsDisplay = formatSavings(maxSavings);
              return (
                <>
                  <div
                    className={`flex items-center gap-2 text-2xl font-bold ${savingsDisplay.colorClass}`}
                  >
                    {savingsDisplay.isPositive ? (
                      <TrendingDown className="w-5 h-5" />
                    ) : (
                      <TrendingUp className="w-5 h-5" />
                    )}
                    {savingsDisplay.displayText}
                  </div>
                  <p
                    className={`${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    } text-sm`}
                  >
                    {savingsDisplay.isPositive ? "Max Savings" : "Best Option"}
                  </p>
                </>
              );
            })()}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        <div className="space-y-4">
          {displayedPrices.map((price) => {
            const savingsDisplay = formatSavings(price.savings);
            const isHighlighted =
              (price.savings === maxSavings && maxSavings > 0) ||
              selectedCountry === price.country ||
              (maxSavings <= 0 && price.savings === maxSavings);

            return (
              <div
                key={price.country}
                className={`rounded-lg ${
                  isHighlighted
                    ? isDarkMode
                      ? "bg-blue-900/30 border border-blue-700"
                      : "bg-blue-50 border border-blue-200"
                    : isDarkMode
                    ? "bg-gray-800/50"
                    : "bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{price.flag}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <p
                          className={`font-medium ${
                            isDarkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {price.country}
                        </p>
                        {price.note && (
                          <div className="relative group">
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                              {price.note}
                            </div>
                          </div>
                        )}
                      </div>
                      {isHighlighted && (
                        <p className="text-xs text-blue-600 font-medium">
                          {selectedCountry === price.country
                            ? "Selected Country"
                            : price.country === item.baseCountry
                            ? "Home Country"
                            : savingsDisplay.isPositive
                            ? "Best Deal"
                            : "Best Available"}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span
                        className={`text-lg font-semibold ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {price.price.toFixed(2)} {price.currency}
                      </span>
                    </div>
                    {price.country !== item.baseCountry && (
                      <div
                        className={`flex items-center gap-1 text-sm ${savingsDisplay.colorClass}`}
                      >
                        <Percent className="w-3 h-3" />
                        <span>
                          {savingsDisplay.isPositive
                            ? `Save ${savingsDisplay.displayText}`
                            : `Costs ${savingsDisplay.displayText} more`}
                        </span>
                      </div>
                    )}
                    {price.country === item.baseCountry && (
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <span>Base Price</span>
                      </div>
                    )}
                  </div>
                </div>

                {price.note && (
                  <div
                    className={`px-3 pb-3 -mt-1 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <div
                      className={`text-xs italic p-2 rounded-md ${
                        isDarkMode ? "bg-gray-700/50" : "bg-white/70"
                      }`}
                    >
                      <Info className="w-3 h-3 inline mr-1" />
                      {price.note}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {hasMorePrices && (
            <div className="flex justify-center pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAllPrices(!showAllPrices)}
                className={`text-xs ${
                  isDarkMode
                    ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
              >
                {showAllPrices ? (
                  <>
                    <ChevronUp className="w-3 h-3 mr-1" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3 h-3 mr-1" />
                    Show All {sortedPrices.length} Countries
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        <div
          className={`mt-4 pt-4 ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          } border-t`}
        >
          <div
            className={`flex items-center justify-between text-sm ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <span>Home Country ({item.baseCountry})</span>
            <span
              className={`font-medium ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              ${item.basePrice.toFixed(2)} {item.baseCurrency}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
