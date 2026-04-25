# VoterJourney — Election Crisis Navigator

> An interactive, offline-capable PWA that reduces voter cognitive overload.
> Non-partisan · WCAG 2.1 AA · Open Source

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- npm 10+

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/yourorg/voter-journey.git
cd voter-journey

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# 4. Start the dev server
npm run dev
```

App runs at **http://localhost:3000**

---

## 📁 Project Structure

```
src/
├── app/                     # Next.js App Router
│   ├── api/                 # Route Handlers (API endpoints)
│   ├── deadline-tracker/    # Election deadline countdown
│   ├── translator/          # Ballot Decoder (RSC)
│   ├── tracker/             # Voter Journey stepper
│   ├── plan/                # Make a Plan wizard
│   ├── locator/             # Polling location finder
│   ├── crisis-mode/         # Emergency election guidance
│   ├── offline/             # PWA offline fallback
│   ├── layout.tsx           # Root layout (accessibility + PWA)
│   └── page.tsx             # Landing page
├── components/
│   ├── ui/                  # Reusable UI primitives
│   └── features/            # Feature-specific components
├── hooks/                   # Custom React hooks
├── lib/                     # Utilities and API clients
├── middleware.ts             # Edge middleware (rate limiting, HTTPS)
├── tests/
│   ├── unit/                # Jest + RTL unit tests
│   └── e2e/                 # Cypress E2E tests
└── types/                   # TypeScript interfaces
public/
├── manifest.json            # PWA web app manifest
├── sw.js                    # Service worker (offline support)
└── icons/                   # App icons (192px, 512px)
```

---

## 🔑 Environment Variables

| Variable | Description | Required |
|---|---|---|
| `GOOGLE_CIVIC_API_KEY` | Google Civic Information API (server-only) | Yes |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps JS API (client) | Yes |
| `ANTHROPIC_API_KEY` | Anthropic API for AI summaries (optional) | No |
| `FIREBASE_PROJECT_ID` | Firebase project ID | Yes |
| `NEXT_PUBLIC_FIREBASE_*` | Firebase SDK configuration | Yes |

> See `.env.example` for the full list.

---

## 🧪 Testing

```bash
# Run all unit tests
npm test

# Run tests with coverage report (requires 80%)
npm run test:coverage

# Watch mode during development
npm run test:watch
```

---

## ♿ Accessibility

This app targets **WCAG 2.1 Level AA**:
- ✅ Skip navigation link
- ✅ Semantic HTML5 landmarks
- ✅ `aria-label` / `aria-current` on all interactive elements
- ✅ Minimum 4.5:1 color contrast ratio
- ✅ 16px minimum font size, scalable to 200%
- ✅ Full keyboard navigation
- ✅ Focus visible indicators
- ✅ Reduced motion support

---

## 🔒 Security

- CSP headers configured in `next.config.ts`
- Rate limiting middleware (60 req/min per IP)
- HTTPS enforcement in production
- All user inputs sanitized (XSS prevention)
- No sensitive data in localStorage
- API keys in `.env.local` (gitignored)

---

## 🌐 PWA & Offline

- Service worker at `/public/sw.js`
- Network-First caching strategy
- Offline fallback page at `/offline`
- Web App Manifest at `/public/manifest.json`

---

## 🚀 Deployment

### Firebase Hosting
```bash
npm run build
npx firebase deploy --only hosting
```

> Configure your Firebase project ID in `.firebaserc` before deploying.

---

## 📄 License

MIT — see [LICENSE](./LICENSE) for details.

> **Disclaimer:** VoterJourney is not affiliated with any government agency.
> Always verify information with your official state election authority.
