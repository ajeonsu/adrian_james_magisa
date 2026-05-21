# Project Documentation

Canonical overview for **AIO/LLMO Strategy OSINT Analyzer** — architecture, purpose, stack, and setup.

---

## Project name

| Field | Value |
|--------|--------|
| **Display name** | AIO/LLMO Strategy OSINT Analyzer |
| **npm package (frontend)** | `aio/llmo-strategy-osint-analyzer` |
| **npm package (backend)** | `aio-llmo-backend` |
| **Repository folder** | `aio_llmo-strategy-osint-analyzer` |
| **Production domain (reference)** | [aio-llmo.fshp.jp](https://aio-llmo.fshp.jp) |

---

## What this project does

A full-stack web application for **OSINT-style strategic analysis** of how a brand should optimize for **AI search** (AIO — AI Overview / AI-mediated search — and **LLMO** — LLM optimization).

**User flow**

1. User signs in with **Firebase Authentication** (email/password or Google).
2. User submits brand inputs: name, official URLs, optional extra URLs, competitors, goals, market conditions, and notes.
3. The **Next.js API** validates the Firebase ID token, optionally **scrapes** provided sites (and may **discover** related product pages when Serper is configured), then calls **Google Gemini** with a fixed Japanese consultant-style system prompt.
4. The API returns a long-form **Markdown report** (no `*` bold markers per prompt rules) and, when Firestore is configured, **persists** the run linked to the user.
5. The **Vite + React** UI renders the report and supports signed-in analysis workflows.

**Out of scope for end users**

- Gemini API keys never ship to the browser; only the backend holds `GEMINI_API_KEY`.
- Analysis endpoints require a valid **Bearer** Firebase ID token.

---

## Architecture

```mermaid
flowchart LR
  subgraph client [Frontend - Vite React]
    UI[InputForm / AnalysisReport]
    Auth[Firebase Auth Client]
  end
  subgraph api [Backend - Next.js on Vercel]
    Analyze["POST /api/analyze"]
    History["GET /api/history"]
    Health["GET /api/health"]
    Scrape[scraper + discovery]
    Gemini[Gemini API]
    Admin[Firebase Admin]
  end
  subgraph data [Data & AI]
    FS[(Firestore analyses)]
    G[Google Generative AI]
  end
  UI --> Auth
  UI -->|HTTPS + ID token| Analyze
  Analyze --> Scrape
  Scrape --> Gemini
  Gemini --> G
  Analyze --> Admin
  Admin --> FS
```

| Layer | Location | Role |
|--------|----------|------|
| Frontend | Repository root | SPA, auth UI, calls backend |
| Backend | `./api/` | API routes, scraping, Gemini, Firestore writes |
| AI | Google AI Studio / Gemini | Report generation |
| Auth | Firebase (client + Admin on API) | Login and token verification |
| Persistence | Firestore `analyses` collection | Per-user history (when Admin SDK is configured) |

Default local ports: frontend **5173**, backend **3001**.

---

## Tech stack

### Frontend (repository root)

| Category | Technology |
|----------|------------|
| Build | [Vite](https://vitejs.dev/) 6 |
| UI | [React](https://react.dev/) 19 |
| Language | TypeScript ~5.8 |
| Auth | Firebase JS SDK 11 (`lib/firebase.ts`, `contexts/AuthContext.tsx`) |
| Styling | Tailwind-style utility classes (inline in components) |
| API client | `services/geminiService.ts` → backend `ENV.API_URL` from `config.ts` |

### Backend (`api/`)

| Category | Technology |
|----------|------------|
| Framework | [Next.js](https://nextjs.org/) 15 (App Router, API routes) |
| Language | TypeScript |
| AI | `@google/generative-ai` (Gemini) |
| HTTP / HTML | `axios`, `cheerio` (scraping) |
| Optional search | Serper API (`SERPER_API_KEY`) for URL discovery |
| Database | Firebase Admin + Firestore |
| Hosting target | Vercel (see `api/vercel.json`, `maxDuration` on analyze route) |

### Tooling & docs elsewhere in repo

- `setup.js` — interactive local env setup
- `api/test-api.js`, `api/test-gemini-direct.js` — manual API checks
- Guides: `QUICKSTART.md`, `DEPLOYMENT.md`, `BACKEND_ENV_SETUP.md`, `VERCEL_ENV_SETUP.md`, `api/README.md`

---

## Repository layout (high level)

```
aio_llmo-strategy-osint-analyzer/
├── App.tsx, index.tsx, components/     # React UI
├── contexts/AuthContext.tsx            # Firebase auth state
├── lib/firebase.ts                     # Firebase web config
├── services/geminiService.ts           # Backend HTTP client
├── config.ts                           # VITE_API_URL / default production API
├── api/
│   ├── app/api/                        # analyze, analysis/[id], history, health
│   └── lib/                            # gemini, scraper, discovery, auth, firebase-admin
├── setup.js
└── PROJECT_DOCUMENTATION.md            # This file
```

See `FILE_STRUCTURE.md` for a fuller tree and doc index.

---

## Prerequisites

- **Node.js 18+** and npm
- **Google Gemini API key** — [Google AI Studio](https://aistudio.google.com/app/apikey)
- **Firebase project** with:
  - Authentication enabled (Email/Password and/or Google)
  - Firestore enabled (for saved analyses and history API)
- **Firebase Admin** credentials on the backend (service account env vars or key file)
- **(Optional)** [Serper](https://serper.dev) API key for automated product-page discovery

---

## Project setup

### Option A — Interactive setup

From the repository root:

```bash
node setup.js
```

The script checks Node version, helps create `api/.env.local`, and can install dependencies.

### Option B — Manual setup

#### 1. Backend

```bash
cd api
npm install
```

Create `api/.env.local` (minimum):

```env
GEMINI_API_KEY=your_gemini_api_key
```

For auth verification and Firestore (required for production parity):

```env
FIREBASE_ADMIN_PROJECT_ID=your-project-id
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

Optional:

```env
SERPER_API_KEY=your_serper_key
```

Start the API:

```bash
npm run dev
```

Backend: `http://localhost:3001` — verify with `GET http://localhost:3001/api/health`.

#### 2. Frontend

From the repository root:

```bash
npm install
```

Create `.env.local` as needed:

```env
VITE_API_URL=http://localhost:3001
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

(`lib/firebase.ts` includes fallbacks for a default project; override with env vars for your own Firebase app.)

Start the UI:

```bash
npm run dev
```

Open `http://localhost:5173`, sign in, submit an analysis.

#### 3. Smoke test backend only

```bash
cd api
npm run test:api
```

---

## Environment variables reference

### Frontend (`.env.local`)

| Variable | Purpose |
|----------|---------|
| `VITE_API_URL` | Backend base URL (default in `config.ts` may point at deployed Vercel API) |
| `VITE_FIREBASE_*` | Firebase web app config for client auth |

### Backend (`api/.env.local`)

| Variable | Required | Purpose |
|----------|----------|---------|
| `GEMINI_API_KEY` | Yes | Gemini API access |
| `FIREBASE_ADMIN_PROJECT_ID` | For auth + DB | Admin SDK project |
| `FIREBASE_ADMIN_CLIENT_EMAIL` | For auth + DB | Service account email |
| `FIREBASE_ADMIN_PRIVATE_KEY` | For auth + DB | Service account private key |
| `SERPER_API_KEY` | No | URL discovery layer |

Do **not** commit `.env.local`, `serviceAccountKey.json`, or API keys.

Detailed Vercel steps: `BACKEND_ENV_SETUP.md`, `VERCEL_ENV_SETUP.md`.

---

## API overview

All protected routes expect: `Authorization: Bearer <Firebase ID token>`.

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/analyze` | Run Gemini analysis; saves to Firestore when Admin SDK works |
| `GET` | `/api/analysis/[id]` | Fetch one saved analysis (owner-scoped) |
| `GET` | `/api/history` | List analyses for the signed-in user |
| `GET` | `/api/health` | Health check |

**Analyze request body (JSON)** — see `types.ts` / `api/types/index.ts`:

- `brandName` (required)
- `officialUrls` (required)
- `additionalUrls`, `competitors`, `goal`, `conditions`, `extraNotes` (optional)

**Success response shape:**

```json
{
  "success": true,
  "data": {
    "id": "analysis_...",
    "result": "... markdown report ...",
    "discoveredUrls": ["..."]
  }
}
```

Full route documentation: `api/README.md`.

---

## Scripts

### Frontend (root `package.json`)

| Command | Action |
|---------|--------|
| `npm run dev` | Vite dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |

### Backend (`api/package.json`)

| Command | Action |
|---------|--------|
| `npm run dev` | Next.js on port 3001 |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run test:api` | Run `test-api.js` |

---

## Deployment (summary)

- **Backend**: deploy the `api/` directory to Vercel (or compatible Node host); set all backend env vars in the dashboard.
- **Frontend**: build with `npm run build`, host `dist/` (Vercel, Netlify, etc.); set `VITE_API_URL` to the deployed API origin.
- **DNS**: production hostname documented as `aio-llmo.fshp.jp` in existing guides.

Step-by-step: `DEPLOYMENT.md`, `CHECKLIST.md`.

---

## Security notes

- Gemini and Firebase Admin secrets live **only** on the server.
- Client uses Firebase Auth; API verifies tokens via Firebase Admin.
- CORS is configured in `api/next.config.js` for allowed frontend origins.
- Scraping runs server-side; respect target sites’ terms and rate limits.

---

## Troubleshooting

| Symptom | Things to check |
|---------|------------------|
| “ログインが必要です” | Sign in via Firebase; token passed to `runAioAnalysis` |
| Frontend cannot reach API | `VITE_API_URL`, backend running on 3001, CORS |
| 401 from API | Valid ID token, Admin SDK env vars match Firebase project |
| Gemini errors | `GEMINI_API_KEY`, quota, model availability |
| History empty / save fails | Firestore enabled, Admin credentials, rules allowing server writes |
| Port in use (3001) | Stop other process or change Next dev port |

More detail: `QUICKSTART.md` troubleshooting, `README.md`.

---

## Related documentation

| Document | Use when |
|----------|----------|
| [QUICKSTART.md](./QUICKSTART.md) | Fast local run (~5 minutes) |
| [README.md](./README.md) | Overview, API examples, Firebase optional notes |
| [api/README.md](./api/README.md) | Backend-only API reference |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Production deploy and domain |
| [BACKEND_ENV_SETUP.md](./BACKEND_ENV_SETUP.md) | Firebase Admin on Vercel |
| [FILE_STRUCTURE.md](./FILE_STRUCTURE.md) | Full tree and doc map |
| [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) | Build history and design notes |

---

## License

MIT (see repository license file if present).
