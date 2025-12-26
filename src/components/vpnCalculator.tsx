"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Calculator,
  Shield,
  DollarSign,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Info,
  Minimize2,
  Maximize2,
  ExternalLink,
} from "lucide-react";
import { SubscriptionItem } from "../types";
import { VpnProvider } from "../data/vpnProvider"; // Import VPN data

interface VpnCalculatorProps {
  filteredData: SubscriptionItem[];
  isDarkMode: boolean;
}

export const VpnCalculator = ({
  filteredData,
  isDarkMode,
}: VpnCalculatorProps) => {
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [vpnCost, setVpnCost] = useState(5.99);
  const [isCollapsed, setIsCollapsed] = useState(true);

  // NEW: VPN Provider selection states
  const [selectedVpnProvider, setSelectedVpnProvider] =
    useState<VpnProvider | null>(null);
  // const [isVpnExpanded, setIsVpnExpanded] = useState(false);
  const [useYearlyPlan, setUseYearlyPlan] = useState(true); // Default to yearly for better pricing

  // Update VPN cost when provider or plan type changes
  const currentVpnCost = useMemo(() => {
    if (selectedVpnProvider) {
      return useYearlyPlan
        ? selectedVpnProvider.yearlyPrice
        : selectedVpnProvider.monthlyPrice;
    }
    return vpnCost;
  }, [selectedVpnProvider, useYearlyPlan, vpnCost]);

  const calculations = useMemo(() => {
    const selectedItems = filteredData.filter(
      (item) => selectedServices.includes(item.id) && item.vpnFriendly
    );

    if (selectedItems.length === 0) {
      return {
        totalCurrentCost: 0,
        totalBestCost: 0,
        totalSavings: 0,
        breakEvenPoint: 0,
        netSavings: 0,
        recommendations: [],
      };
    }

    const totalCurrentCost = selectedItems.reduce(
      (sum, item) => sum + item.basePrice,
      0
    );

    const recommendations = selectedItems.map((item) => {
      const cheapestPrice = Math.min(...item.prices.map((p) => p.price));
      const cheapestCountry = item.prices.find(
        (p) => p.price === cheapestPrice
      );
      const actualSavings = item.basePrice - cheapestPrice;
      const savingsPercent =
        item.basePrice > 0 ? (actualSavings / item.basePrice) * 100 : 0;

      return {
        ...item,
        bestPrice: cheapestPrice,
        bestCountry: cheapestCountry,
        savings: actualSavings,
        savingsPercent: Number(savingsPercent.toFixed(1)),
      };
    });

    const totalBestCost = recommendations.reduce(
      (sum, rec) => sum + rec.bestPrice,
      0
    );
    const totalSavings = totalCurrentCost - totalBestCost;
    const netSavings = totalSavings - currentVpnCost; // Use dynamic VPN cost
    const breakEvenPoint = totalSavings > 0 ? currentVpnCost / totalSavings : 0;

    return {
      totalCurrentCost,
      totalBestCost,
      totalSavings,
      breakEvenPoint,
      netSavings,
      recommendations,
    };
  }, [selectedServices, filteredData, currentVpnCost]);

  const toggleService = (serviceId: number) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  // const handleVpnProviderSelect = (provider: VpnProvider) => {
  //   setSelectedVpnProvider(provider);
  //   setIsVpnExpanded(false);
  // };

  const handleAffiliateClick = (provider: VpnProvider) => {
    window.open(provider.affiliateLink, "_blank", "noopener,noreferrer");
  };

  const isRecommended = calculations.netSavings > 0;

  return (
    <Card
      className={`mb-6 mx-auto ${
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"
      }`}
    >
      <CardHeader className={`${isCollapsed ? "pb-0" : "pb-2"}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg ${
                isDarkMode ? "bg-blue-900/50" : "bg-blue-100"
              }`}
            >
              <Calculator
                className={`w-5 h-5 ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                }`}
              />
            </div>
            <div>
              <CardTitle
                className={`${isDarkMode ? "text-white" : "text-gray-900"}`}
              >
                VPN Savings Calculator
              </CardTitle>
              {!isCollapsed && (
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  } text-sm`}
                >
                  Calculate potential savings by using a VPN to access regional
                  pricing
                </p>
              )}
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`h-8 w-8 ${
              isDarkMode
                ? "hover:bg-gray-700 text-gray-400"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            {isCollapsed ? (
              <Maximize2 className="w-4 h-4" />
            ) : (
              <Minimize2 className="w-4 h-4" />
            )}
          </Button>
        </div>
      </CardHeader>

      {!isCollapsed && (
        <div className="px-6 pb-2">
          <Card
            className={`${
              isDarkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-amber-50 border-amber-200"
            }`}
          >
            <CardContent className="p-3">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-amber-600 mt-0.5" />
                <div>
                  <h4
                    className={`font-medium text-sm ${
                      isDarkMode ? "text-amber-400" : "text-amber-900"
                    } mb-1`}
                  >
                    Important Notice
                  </h4>
                  <p
                    className={`${
                      isDarkMode ? "text-amber-300" : "text-amber-800"
                    } text-xs`}
                  >
                    Using VPNs to access regional pricing may violate terms of
                    service. This tool is for price transparency and research
                    purposes. Always check service terms before proceeding.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {!isCollapsed && (
        <CardContent className="space-y-6">
          {/* Service Selection */}
          <div>
            <h4
              className={`font-medium mb-3 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Select Your Services
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {filteredData.map((service) => (
                <div
                  key={service.id}
                  onClick={() =>
                    service.vpnFriendly && toggleService(service.id)
                  }
                  className={`p-2 rounded-lg border cursor-pointer transition-all ${
                    !service.vpnFriendly
                      ? isDarkMode
                        ? "bg-gray-700/50 border-gray-600 cursor-not-allowed opacity-50"
                        : "bg-gray-50 border-gray-200 cursor-not-allowed opacity-50"
                      : selectedServices.includes(service.id)
                      ? isDarkMode
                        ? "bg-blue-900/50 border-blue-600"
                        : "bg-blue-50 border-blue-300"
                      : isDarkMode
                      ? "bg-gray-700 border-gray-600 hover:bg-gray-600"
                      : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <service.icon className="w-3 h-3" />
                    <span
                      className={`text-xs font-medium truncate ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {service.product}
                    </span>
                    {!service.vpnFriendly && (
                      <AlertTriangle className="w-3 h-3 text-amber-500 flex-shrink-0" />
                    )}
                    {selectedServices.includes(service.id) && (
                      <div className=" flex justify-center">
                        <CheckCircle className="w-3 h-3 text-blue-600" />
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <span
                      className={`text-xs ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      ${service.basePrice}/mo
                    </span>
                    {service.vpnFriendly ? (
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                    ) : (
                      <div className="w-2 h-2 bg-amber-500 rounded-full" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 mt-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span
                  className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                >
                  VPN Friendly
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span
                  className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                >
                  VPN Restricted
                </span>
              </div>
            </div>
          </div>

          {/* NEW: VPN Cost Input with Provider Selection */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* VPN Cost Input */}
            <div className="lg:col-span-1">
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Monthly VPN Cost
              </label>

              {/* Show selected provider if any */}
              {selectedVpnProvider ? (
                <div
                  className={`p-3 rounded-lg border-2 mb-2 ${
                    isDarkMode
                      ? "bg-blue-900/20 border-blue-600"
                      : "bg-blue-50 border-blue-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={selectedVpnProvider.logo}
                        alt={selectedVpnProvider.name}
                        className="w-6 h-6 object-contain"
                      />
                      <span
                        className={`font-medium text-sm ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {selectedVpnProvider.name}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedVpnProvider(null)}
                      className="h-6 w-6 p-0"
                    >
                      ×
                    </Button>
                  </div>

                  {/* Plan Type Toggle */}
                  <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-700 rounded mb-2">
                    <Button
                      variant={useYearlyPlan ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setUseYearlyPlan(true)}
                      className="px-2 py-1 h-6 text-xs"
                    >
                      Yearly (-{selectedVpnProvider.yearlyDiscount}%)
                    </Button>
                    <Button
                      variant={!useYearlyPlan ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setUseYearlyPlan(false)}
                      className="px-2 py-1 h-6 text-xs"
                    >
                      Monthly
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className={`text-lg font-bold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      ${currentVpnCost}/mo
                    </span>
                    {useYearlyPlan && (
                      <span className="text-xs text-gray-500 line-through">
                        ${selectedVpnProvider.monthlyPrice}/mo
                      </span>
                    )}
                  </div>

                  <Button
                    onClick={() => handleAffiliateClick(selectedVpnProvider)}
                    className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white h-8 text-xs"
                  >
                    Get {selectedVpnProvider.name}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              ) : (
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="number"
                    value={vpnCost}
                    onChange={(e) => setVpnCost(parseFloat(e.target.value))}
                    step="0.01"
                    min="0"
                    className={`pl-10 ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-600 text-white"
                        : "bg-white border-gray-200 text-gray-900"
                    }`}
                    placeholder="5.99"
                  />
                </div>
              )}

              <p
                className={`text-xs mt-1 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {selectedVpnProvider
                  ? "Selected VPN provider"
                  : "Popular VPN services range from $3-12/month"}
              </p>
            </div>
            {/* NEW: VPN Provider Selection */}{" "}
            {/* Uncomment this to enable VPN provider selection */}
            {/* <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <label
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Choose VPN Provider (Optional)
                </label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsVpnExpanded(!isVpnExpanded)}
                  className={`h-6 px-2 sm:px-4 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {isVpnExpanded ? (
                    <>
                      Hide{" "}
                      <ChevronUp
                        className={`w-3 h-3 ml-1 ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      />
                    </>
                  ) : (
                    <>
                      Show Options{" "}
                      <ChevronDown
                        className={`w-3 h-3 ml-1 ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      />
                    </>
                  )}
                </Button>
              </div>

              {isVpnExpanded && (
                <div className="p-1 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[180px] overflow-y-auto">
                  {vpnProviders.map((provider) => (
                    <Card
                      key={provider.id}
                      className={`p-3 cursor-pointer transition-all duration-200 hover:shadow-md ${
                        isDarkMode
                          ? "border-gray-600 hover:border-gray-500 bg-gray-800"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => handleVpnProviderSelect(provider)}
                    >
                      <CardContent className="p-3 relative">
                        <div className="flex items-center gap-2 mb-2">
                          <img
                            src={provider.logo}
                            alt={provider.name}
                            className="w-6 h-6 object-contain"
                          />
                          <div className="flex-1 min-w-0">
                            <h4
                              className={`font-medium text-sm truncate ${
                                isDarkMode ? "text-gray-100" : "text-gray-900"
                              }`}
                            >
                              {provider.name}
                            </h4>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs text-gray-500">
                                {provider.rating}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Monthly:</span>
                            <span
                              className={
                                isDarkMode ? "text-white" : "text-gray-900"
                              }
                            >
                              ${provider.monthlyPrice}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Yearly:</span>
                            <span className="text-green-600 font-medium">
                              ${provider.yearlyPrice} (-
                              {provider.yearlyDiscount}%)
                            </span>
                          </div>
                          <div className="text-gray-500">
                            {provider.countries} countries •{" "}
                            {provider.simultaneous === 999
                              ? "Unlimited"
                              : provider.simultaneous}{" "}
                            devices
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
              <div
                className={`mt-3 p-2 rounded text-xs ${
                  isDarkMode
                    ? "bg-gray-700/50 text-gray-400"
                    : "bg-gray-50 text-gray-600"
                }`}
              >
                <strong>Disclosure:</strong> We may earn a commission if you
                purchase a VPN through our links. This helps us maintain our
                service at no extra cost to you.
              </div>
            </div> */}
          </div>

          {/* Results section remains the same... */}
          {selectedServices.length > 0 && (
            <div className="space-y-4">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card
                  className={
                    isDarkMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-gray-50 border-gray-200"
                  }
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <span
                        className={`text-sm ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Current Cost
                      </span>
                    </div>
                    <p
                      className={`text-2xl font-bold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      ${calculations.totalCurrentCost.toFixed(2)}
                    </p>
                    <p
                      className={`text-xs ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      per month
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className={
                    isDarkMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-gray-50 border-gray-200"
                  }
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span
                        className={`text-sm ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Potential Savings
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-green-600">
                      ${calculations.totalSavings.toFixed(2)}
                    </p>
                    <p
                      className={`text-xs ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      per month
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className={`${
                    isRecommended
                      ? isDarkMode
                        ? "bg-green-900/20 border-green-700"
                        : "bg-green-50 border-green-200"
                      : isDarkMode
                      ? "bg-red-900/20 border-red-700"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      {isRecommended ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                      )}
                      <span
                        className={`text-sm ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Net Savings
                      </span>
                    </div>
                    <p
                      className={`text-2xl font-bold ${
                        isRecommended ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {calculations.netSavings >= 0 ? "+" : ""}$
                      {calculations.netSavings.toFixed(2)}
                    </p>
                    <p
                      className={`text-xs ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      after VPN cost
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Recommendation Card */}
              <Card
                className={`${
                  isRecommended
                    ? isDarkMode
                      ? "bg-green-900/20 border-green-700"
                      : "bg-green-50 border-green-200"
                    : isDarkMode
                    ? "bg-amber-900/20 border-amber-700"
                    : "bg-amber-50 border-amber-200"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {isRecommended ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    ) : (
                      <Info className="w-5 h-5 text-amber-600 mt-0.5" />
                    )}
                    <div>
                      <h4
                        className={`font-semibold mb-1 ${
                          isRecommended ? "text-green-800" : "text-amber-800"
                        } ${isDarkMode ? "opacity-90" : ""}`}
                      >
                        {isRecommended
                          ? "VPN Recommended"
                          : "VPN Not Cost-Effective"}
                      </h4>
                      <p
                        className={`text-sm ${
                          isRecommended
                            ? isDarkMode
                              ? "text-green-300"
                              : "text-green-700"
                            : isDarkMode
                            ? "text-amber-300"
                            : "text-amber-700"
                        }`}
                      >
                        {isRecommended
                          ? `You could save $${calculations.netSavings.toFixed(
                              2
                            )} per month (${(
                              (calculations.netSavings /
                                calculations.totalCurrentCost) *
                              100
                            ).toFixed(1)}%) by using a VPN.`
                          : `The VPN cost exceeds potential savings. You'd lose $${Math.abs(
                              calculations.netSavings
                            ).toFixed(2)} per month.`}
                      </p>
                      {isRecommended && (
                        <p
                          className={`text-xs mt-2 ${
                            isDarkMode ? "text-green-400" : "text-green-600"
                          }`}
                        >
                          Annual savings: $
                          {(calculations.netSavings * 12).toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Breakdown */}
              {calculations.recommendations.length > 0 && (
                <div>
                  <h4
                    className={`font-medium mb-3 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Detailed Breakdown
                  </h4>
                  <div className="space-y-2">
                    {calculations.recommendations.map((rec) => (
                      <div
                        key={rec.id}
                        className={`p-3 rounded-lg border ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600"
                            : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <rec.icon className="w-4 h-4" />
                            <span
                              className={`font-medium ${
                                isDarkMode ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {rec.product}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-sm ${
                                  isDarkMode ? "text-gray-400" : "text-gray-600"
                                }`}
                              >
                                ${rec.basePrice.toFixed(2)}
                              </span>
                              <span className="text-sm">→</span>
                              <span className="font-semibold text-green-600">
                                ${rec.bestPrice.toFixed(2)}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <span
                                className={`${
                                  isDarkMode ? "text-gray-300" : "text-gray-600"
                                }`}
                              >
                                {rec.bestCountry?.flag}{" "}
                                {rec.bestCountry?.country}
                              </span>
                              <Badge
                                variant="outline"
                                className="text-xs text-green-600 border-green-600"
                              >
                                -{rec.savingsPercent.toFixed(1)}%
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};
