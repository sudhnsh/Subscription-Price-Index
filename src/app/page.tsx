export const metadata = {
  title: "Subscription Price Index - Compare & Save on Subscriptions",
  description:
    "Track and compare prices of popular subscription services like YouTube Premium, Apple Music, and Netflix across countries. Use our savings calculator to find the best regional deals.",
  keywords: [
    // Core Keywords
    "Subscription Price Index",
    "Subscription Price Calculator",
    "Compare Subscription Prices",
    "Regional Pricing Tool",
    "Savings Calculator",

    // Services
    "YouTube Premium Argentina",
    "Apple Music India",
    "Spotify Regional Pricing",
    "Netflix Cheapest Country",
    "Disney+ Hotstar Pricing",
    "ChatGPT Plus Pricing",
    "Tidal Subscription Price",

    // Use Case Keywords
    "How to save on subscriptions",
    "Best country for cheap subscriptions",
    "VPN friendly subscriptions",
    "Global subscription cost comparison",
    "Cheapest streaming services worldwide",
    "Compare Netflix prices by country",

    // Intent-based
    "Cut subscription costs",
    "Streaming VPN discounts",
    "Global pricing arbitrage",
    "Affordable premium plans",

    // VPN-Related
    "Best VPN for YouTube Premium",
    "Use VPN to save on subscriptions",
    "Change region to save money",
    "Subscriptions with VPN trick",

    // Brand Combinations (Useful for SEO reach)
    "Netflix VPN Pricing",
    "Spotify India Cost",
    "YouTube Premium Brazil Price",
    "Compare YouTube Premium Plans",
  ],

  openGraph: {
    title: "Subscription Price Index - Compare & Save",
    description:
      "Compare global subscription prices and calculate your savings with our powerful regional pricing tool.",
    url: "https://sudhnsh.dev/subscription-index",
    siteName: "Subscription Price Index",
    images: [
      {
        url: "https://sudhnsh.dev/sub-index.png",
        width: 1200,
        height: 630,
        alt: "Subscription Price Index dashboard screenshot",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Subscription Price Index",
    description:
      "Use our tool to compare subscription prices and calculate your savings across regions.",
    images: ["https://sudhnsh.dev/sub-index.png"],
  },
  icons: {
    icon: "/images/sub-index.svg", // Local path to icon
  },
};

import PriceIndex from "@/components/subsIndex";

export default function Page() {
  return <PriceIndex />;
}
