# Subscription Price Index

Compare subscription prices across countries, see potential savings, and explore whether using regional pricing is worth it.

## What This App Does

- Shows a list of subscription services (Netflix, Spotify, etc.) with per-country pricing.
- Calculates savings vs a selected “home country” price.
- Provides search + filters (country, tags) and sorting.
- Includes a “VPN Savings Calculator” to estimate whether VPN cost is worth the savings (for VPN-friendly services).

## Getting Started

From the repo root, the actual Next.js project lives inside `Subscription-Price-Index/`.

```bash
cd Subscription-Price-Index
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

Run these inside `Subscription-Price-Index/`:

- `npm run dev` — start dev server (Turbopack)
- `npm run build` — production build
- `npm run start` — run production server
- `npm run lint` — lint
- `npm run typecheck` — typecheck (`tsc --noEmit`)

## Data (“Database”)

This project currently has no external database/backend. All pricing data is stored in code:

- Subscription prices: `src/data/data.ts` (`priceData`)
- VPN providers (data exists, provider picker UI is currently commented out): `src/data/vpnProvider.ts` (`vpnProviders`)

### Data Model

The key types are defined in `src/types/index.ts`:

- `SubscriptionItem` (service metadata + `prices` array)
- `PriceData` (country, price, currency, flag, savings, optional note)
- `FilterState` (search, country, tags, sort)

### Savings Calculation

- Initial savings are computed on load: `src/utils/index.ts` (`calculateInitialSavings`)
- Savings can be recalculated when the “home country” changes: `src/utils/index.ts` (`recalculateSavingsForHomeCountry`)

## Project Structure

- `src/app/` — Next.js App Router entry (`page.tsx`, `layout.tsx`, `globals.css`)
- `src/components/` — main UI (filters, cards, VPN calculator, header)
- `src/components/ui/` — shadcn/ui components
- `src/data/` — in-code datasets
- `src/hooks/` — client hooks (filtering/sorting)
- `src/types/` — TypeScript types
- `src/utils/` — shared helper functions (flags, savings formatting/calculation)

## Notes

- The VPN calculator includes an “Important Notice” about terms of service. It’s intended for transparency and research.
- Country flags shown in filters use `getCountryFlag` (`src/utils/index.ts`). Per-price flags shown in the card UI come from the `flag` field in `priceData`.

## License

MIT — see `LICENSE`.

## Tech Stack

- Next.js `16`
- React `19`
- TypeScript
- Tailwind CSS (v4)
- shadcn/ui + Radix UI primitives
