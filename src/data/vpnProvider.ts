// data/vpnProviders.ts
export interface VpnProvider {
  id: string;
  name: string;
  logo: string;
  monthlyPrice: number;
  yearlyPrice: number;
  yearlyDiscount: number;
  affiliateLink: string;
  features: string[];
  rating: number;
  countries: number;
  simultaneous: number;
  moneyBackGuarantee: number; // days
  popular?: boolean;
}

export const vpnProviders: VpnProvider[] = [
  {
    id: 'nordvpn',
    name: 'NordVPN',
    logo: '/vpn-logos/nordvpn.svg',
    monthlyPrice: 11.95,
    yearlyPrice: 4.99,
    yearlyDiscount: 58,
    affiliateLink: 'https://affiliate.nordvpn.com/your-affiliate-id',
    features: ['No logs policy', 'Kill switch', 'Double VPN', 'Threat Protection'],
    rating: 4.6,
    countries: 60,
    simultaneous: 6,
    moneyBackGuarantee: 30,
    popular: true
  },
  {
    id: 'surfshark',
    name: 'Surfshark',
    logo: '/vpn-logos/surfshark.svg',
    monthlyPrice: 12.95,
    yearlyPrice: 2.49,
    yearlyDiscount: 81,
    affiliateLink: 'https://affiliate.surfshark.com/your-affiliate-id',
    features: ['Unlimited devices', 'CleanWeb', 'Whitelister', 'MultiHop'],
    rating: 4.4,
    countries: 65,
    simultaneous: 999, // Unlimited
    moneyBackGuarantee: 30
  },
  {
    id: 'expressvpn',
    name: 'ExpressVPN',
    logo: '/vpn-logos/expressvpn.svg',
    monthlyPrice: 12.95,
    yearlyPrice: 6.67,
    yearlyDiscount: 49,
    affiliateLink: 'https://affiliate.expressvpn.com/your-affiliate-id',
    features: ['MediaStreamer', 'Split tunneling', 'TrustedServer', '24/7 support'],
    rating: 4.7,
    countries: 94,
    simultaneous: 5,
    moneyBackGuarantee: 30
  },
  {
    id: 'cyberghost',
    name: 'CyberGhost',
    logo: '/vpn-logos/cyberghost.svg',
    monthlyPrice: 11.99,
    yearlyPrice: 2.75,
    yearlyDiscount: 77,
    affiliateLink: 'https://affiliate.cyberghost.com/your-affiliate-id',
    features: ['Streaming servers', 'NoSpy servers', 'Ad blocker', 'Malware protection'],
    rating: 4.2,
    countries: 91,
    simultaneous: 7,
    moneyBackGuarantee: 45
  }
];
