# EC One — Project Documentation

## Project name

| Item | Value |
|------|--------|
| **Product name** | **EC One** (EC-One) |
| **Tagline (JP)** | マルチチャネルEC統合プラットフォーム |
| **Repository** | `ec-one-dev` (monorepo) |
| **npm package (web)** | `ec-one` |
| **npm package (backend tooling)** | `ec-one-backend` |

EC One is a **B2B SaaS** platform for Japanese and multi-channel e-commerce operators. It unifies **orders, inventory, advertising, CRM, and P&L** across marketplaces and ad platforms in one dashboard.

---

## Overview

EC One helps teams:

- Connect **stores and ad accounts** (OAuth and webhooks)
- Monitor **business, ads, and CRM** KPIs on dashboards
- Run **inventory** workflows (status, warnings, purchase orders, supplier email)
- Operate **CRM** (segments, email and LINE campaigns, customer analytics)
- Manage **ads** (reports, creative checks, LP analysis, media matching)
- Build **internal reports** (graphs, diff reports, AI-assisted reports)
- View **profit & loss (PL)** views and progress
- Configure **company settings**, users, integrations, and automation

Platform copy also references: Amazon, Rakuten, Shopify, Yahoo! Shopping, TikTok Shop, and related channels.

---

## Tech stack

### Frontend (`web/`)

| Layer | Technology |
|--------|------------|
| Framework | **Next.js 14** (App Router) |
| Language | **TypeScript 5** |
| UI | **React 18**, **Tailwind CSS 4**, **Radix UI**, **shadcn-style** components (`components/ui`) |
| Forms / validation | **react-hook-form**, **Zod** |
| Charts | **ECharts**, **Recharts** |
| Data fetching | **SWR** |
| Auth | **Supabase Auth** (`@supabase/ssr`, `@supabase/supabase-js`) |
| Analytics | **PostHog**, **Vercel Analytics** |
| Rich content | **TipTap**, **react-email-editor**, **react-quill** |
| Ads / commerce SDKs (client/server) | **google-ads-api**, **googleapis**, **facebook-nodejs-business-sdk**, **@shopify/shopify-app-remix** |
| Testing | **Playwright** (dev dependency) |
| Tooling | **ESLint**, **Prettier** |

### Backend (`backend/supabase/`)

| Layer | Technology |
|--------|------------|
| Runtime | **Supabase Edge Functions** (**Deno**) |
| Database | **PostgreSQL** (Supabase), schema via **SQL migrations** |
| Auth / storage | **Supabase** (service role in functions) |
| Shared code | `functions/_shared/` (clients, OAuth, email, ads metrics, queues, etc.) |
| Node tooling | **npm** scripts for lint/type-check; optional **cron invoke** scripts |
| Queue / workers (env) | **Redis** referenced in `backend/env.example` for queue-related configuration |

### DevOps

| Item | Detail |
|------|--------|
| CI | GitHub Actions — **Deploy Supabase Functions** on push to `main` (`.github/workflows/deploy.yaml`) |
| Frontend hosting | Typical **Vercel**-style Next deployment (Analytics package present; URL via `NEXT_PUBLIC_SITE_URL`) |
| Workspace | `econe.code-workspace` (VS Code / Cursor multi-root) |

---

## Repository structure

```
ec-one-dev/
├── web/                    # Next.js application
│   ├── app/                # Routes: (public), (authenticated), (admin), api
│   ├── components/         # UI and feature components
│   ├── lib/                # Config, Supabase clients, RBAC, utilities
│   ├── hooks/              # React hooks
│   ├── contexts/           # React context providers
│   ├── jobs/               # Background/job helpers (if used from app)
│   └── tests/              # E2E / tests
├── backend/
│   └── supabase/
│       ├── functions/      # ~97 Edge Functions (+ _shared)
│       ├── migrations/     # Database schema changes
│       ├── databases/        # DB-related assets
│       ├── scripts/          # Operational scripts (e.g. cron invoke)
│       └── config.toml       # Supabase project config
├── docs/                   # Project and integration guides
├── .github/workflows/      # CI/CD
└── README.md               # Quick start
```

### Route groups (web)

| Group | Path prefix | Purpose |
|--------|-------------|---------|
| Public | `(public)/` | Marketing, auth (signup, login), legal, inquiries |
| Authenticated | `(authenticated)/` | Tenant product: dashboard, ads, CRM, inventory, PL, reports, settings |
| Admin | `(admin)/` and `/admin/*` | Super-admin: companies, agencies, billing, integrations approval |
| API | `app/api/` | Next.js route handlers (BFF-style endpoints where used) |

Navigation for tenants is driven by `web/lib/sidebar-config.ts` (role-based menus).

---

## Product functions (by module)

### Dashboard

- My dashboard, management dashboard, ads dashboard, CRM dashboard
- Custom visualization (`/viz/dashboards`) for configurable views

### Advertising (`/ads`)

- Ad operation reports and settings
- Creative (CR) check workflows
- Landing page (LP) analysis and period comparison
- Media matching (cases, search, offers)
- CSV import for ad-related data

### CRM (`/crm`)

- Customer list and detail
- Analysis dashboards and graph builder
- Behavior analytics
- **Email**: segments, step/spot deliveries, templates, settings, A/B-related delivery metadata (DB migrations)
- **LINE**: messaging, templates, rich menus, friend sync via webhooks

### Inventory (`/inventory`)

- Stock status and warnings
- Purchase orders: create, approve, supplier emails, pending approvals
- Forecasting / AI prediction (edge functions)
- Inventory-related mail lists

### Profit & loss (`/pl`)

- PL display and progress tracking

### Reports (`/reports`)

- Internal report templates
- Diff reports (sync comparison)
- Graph builder and schema-driven queries
- AI report generator

### Settings & integrations (`/settings`, `/integrations`)

- Company and product master data
- Partners, users, notifications
- API connections and integration request status
- Initial setup and automation settings
- Agency management (tenant and platform levels)

### Operations & platform admin

- **Super admin** (`/admin`): companies, agencies, subscriptions, billing, SendGrid, invoice history, integration approvals, logs, support
- **Ops** routes (where enabled): invoices, dashboard stats, exports
- **Agency** advertiser views for partner organizations

### Public / growth

- Features, case studies, partners, pricing
- Material download and inquiry forms
- Articles (content pages)

---

## External integrations

Edge functions and app code integrate with many third-party systems. Representative categories:

| Category | Examples (functions / areas) |
|----------|------------------------------|
| Marketplaces / stores | **Shopify** (sync, webhooks, stores), **Amazon SP-API**, **Rakuten RMS / RPP**, **Qoo10** |
| Advertising | **Google Ads**, **Meta Ads**, **Yahoo Ads**, **TikTok Ads**, token refresh crons, metrics ETL |
| Messaging | **LINE** (connect, webhook, messages, rich menu), **SendGrid** (email delivery, DKIM admin) |
| Analytics / UX | **Microsoft Clarity** (heatmaps), tracking proxy |
| Productivity | PDF generation, CSV import/export, DNS verification |

Detailed runbooks live under `docs/` (e.g. Shopify webhooks, LINE authentication, Amazon security review).

---

## Security & access control

- Authentication: **Supabase Auth** with Next.js middleware session handling (`web/middleware.ts`)
- Authorization tiers (`web/lib/rbac.ts`):
  - **SUPER_ADMIN** — platform administration
  - **COMPANY_ADMIN** — full tenant menu (Owner / Admin / AgencyAdmin roles)
  - **SUB_USER** — reduced sidebar (e.g. limited dashboard and ads)
- Row-level security and policies are enforced in **Postgres** (see migrations); Edge Functions use the **service role** where server-side privileges are required

---

## Data & backend processing

- **Schema**: evolved through `backend/supabase/migrations/*.sql`
- **API surface**: primarily **Edge Functions** invoked from the Next.js app (and webhooks from external providers)
- **Automation**: cron-style functions (e.g. `queue-cron`, `token-refresh-cron`, `process-step-deliveries`, `segment-auto-update`) and GitHub-deployed function updates
- **Shared libraries**: `_shared` modules for Supabase client, OAuth, email, ads entities, validation, queues

---

## Local development

### Prerequisites

- **Node.js** (LTS recommended)
- **npm**
- **Supabase CLI** (for functions and DB; version pinned in web devDependencies)
- Supabase project credentials and integration secrets (per feature)

### Web app

```bash
cd web
npm install
# Copy environment template to .env.local and set Supabase / third-party keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> The root `README.md` references `web/.env.example`; if missing, use team-provided env templates or `backend/env.example` as a checklist of backend-related variables.

### Backend (Edge Functions)

```bash
cd backend
npm install
cp env.example .env   # fill Supabase URL, service role, Redis, etc.
npm run lint
npm run type-check
```

Use your Supabase workflow to **serve** or **deploy** functions from `backend/supabase/`.

### Useful scripts

| Location | Command | Purpose |
|----------|---------|---------|
| `web/` | `npm run build` | Production Next build |
| `web/` | `npm run lint` / `format` / `type-check` | Quality checks |
| `backend/` | `npm run cron:step-deliveries` | Invoke step delivery processor (script) |

---

## Deployment

| Component | Mechanism |
|-----------|-----------|
| Edge Functions | GitHub Action `Deploy Supabase Functions` — `supabase functions deploy` on `main` |
| Database | Apply migrations via Supabase migration workflow (team process) |
| Web | Deploy Next.js app (commonly Vercel); set `NEXT_PUBLIC_*` and server env vars |

Required GitHub secrets (functions deploy): `SUPABASE_ACCESS_TOKEN`, `SUPABASE_PROJECT_ID`.

---

## Related documentation

| Document | Topic |
|----------|--------|
| [README.md](../README.md) | Quick start |
| [web/README.md](../web/README.md) | Frontend notes |
| [backend/README.md](../backend/README.md) | Edge Functions layout |
| [LINE_AUTHENTICATION_GUIDE.md](./LINE_AUTHENTICATION_GUIDE.md) | LINE OAuth / linking |
| [SHOPIFY_CUSTOMER_WEBHOOK.md](./SHOPIFY_CUSTOMER_WEBHOOK.md) | Shopify webhooks |
| [WEBHOOK_VERIFICATION_GUIDE.md](./WEBHOOK_VERIFICATION_GUIDE.md) | Webhook verification |
| [AMAZON_SECURITY_REVIEW.md](./AMAZON_SECURITY_REVIEW.md) | Amazon SP-API security |

---

## Environment variables (summary)

Configure per environment (never commit secrets).

| Area | Typical variables |
|------|-------------------|
| Web | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL`, PostHog keys, integration client IDs as needed |
| Edge Functions / backend | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, OAuth secrets per platform, SendGrid, LINE, Redis (`REDIS_*`), `ALLOWED_ORIGINS` |

See `backend/env.example` for backend-oriented defaults.

---

## Maintenance notes

- Prefer **small, focused migrations** in `backend/supabase/migrations/`
- Add new Edge Functions as `supabase/functions/<kebab-name>/index.ts` and reuse `_shared`
- Match existing **TypeScript**, **Tailwind**, and **sidebar** patterns when adding UI routes
- Feature flags and analytics naming: follow `web/.cursor/rules/posthog-integration.mdc` when touching PostHog

---

*Last updated from repository structure and metadata. For legal or commercial terms, see public routes such as `/terms` and `/privacy` in the web app.*
