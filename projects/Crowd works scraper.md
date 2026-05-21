# CrowdWorks Job Scraper

Automated scraper for [CrowdWorks](https://crowdworks.jp) (クラウドワークス) job listings in selected development-related categories. It collects matching projects, applies budget filters, merges them into a cumulative master CSV, and optionally uploads a dated copy to Google Drive for team use.

---

## Tech stack

| Layer | Technology |
|--------|------------|
| Runtime | Node.js (ES modules, `"type": "module"`) |
| Browser automation | [Playwright](https://playwright.dev/) (Chromium) |
| Cloud upload | [Google APIs](https://github.com/googleapis/googleapis) — Drive API v3 |
| Auth | OAuth 2.0 (desktop / manual code flow) |
| Output | UTF-8 CSV with BOM (Excel-friendly) |
| Scheduling (optional) | Windows Task Scheduler + `run-scraper.bat` |

**npm package name:** `crowdworks-scraper` (v1.0.0)

---

## IT function (what this system does)

1. **Discovery** — Opens configured CrowdWorks category URLs and waits for listings to render.
2. **Extraction** — Parses job title, URL, client (poster), and budget from the live DOM (selectors tuned for current site structure).
3. **Filtering** — Keeps only jobs that meet minimum budget rules (or marks budget as undisclosed when parsing fails).
4. **Deduplication** — Merges today’s scrape into `crowdworks_jobs_master.csv` by job URL; new rows get today’s “Added date”; existing URLs keep their original date.
5. **Export** — Updates the master file and writes a daily snapshot `crowdworks_jobs_YYYY-MM-DD.csv`.
6. **Distribution** — If Google credentials are present, uploads `crowdworks_jobs_master_YYYY-MM-DD.csv` to a configured Drive folder.

Typical use: daily monitoring of freelance/contract opportunities on CrowdWorks for internal sales or recruiting workflows, without manual copy-paste from the website.

---

## Target categories (default)

Configured in `config.js`:

- Development (`/public/jobs/group/development`)
- AI / machine learning
- Software development
- Web products
- E-commerce (`ec`)

URLs and filters can be changed without code changes beyond editing `config.js`.

---

## Budget filter rules

| Type | Rule |
|------|------|
| Fixed price | Included if amount ≥ ¥50,000 |
| Hourly | Included if rate ≥ ¥2,000/hour |
| Unparsed / missing | Kept with budget text `Budget not disclosed yet` |

Thresholds are defined in `config.js` under `budgetFilters` (the scraper also enforces the same limits during extraction).

---

## CSV output schema

| Column | Description |
|--------|-------------|
| Project name | Job title |
| Platform | Always `Crowdworks` |
| URL | Full job detail URL |
| Client | Employer / poster name |
| Budget | Display string or `Budget not disclosed yet` |
| Added date | `YYYY/MM/DD` when the job was first seen in the master file |

**Local paths (default):**

- `./output/crowdworks_jobs_master.csv` — cumulative database
- `./output/crowdworks_jobs_YYYY-MM-DD.csv` — daily snapshot
- `./output/scraper.log` — optional log when using `run-scraper.bat`

Override output directory with environment variable `OUTPUT_DIR`.

---

## Project structure

```
crowdworks/
├── scraper.js          # Main scraper class and entry point
├── config.js           # URLs, browser, CSV headers, budget filters
├── auth.js             # Google OAuth client and token handling
├── run-scraper.bat     # Windows batch wrapper (logs to output/scraper.log)
├── package.json
├── credentials.json    # Google OAuth client secret (not in git)
├── token.json          # Saved OAuth tokens (not in git)
├── output/             # CSV and logs (not in git)
├── GDRIVE_NOTE.md      # Drive folder and auth migration notes
└── README.md           # This file
```

---

## Setup

### Prerequisites

- **Node.js** 18+ recommended
- **npm**
- Network access to `crowdworks.jp` and Google APIs (for upload)

### 1. Install dependencies

```bash
cd "c:\work in rapture.inc\page scraping\crowdworks"
npm install
```

### 2. Install Chromium for Playwright

```bash
npm run install-browser
```

### 3. (Optional) Google Drive upload

1. Create an OAuth 2.0 **Desktop** (or compatible) client in [Google Cloud Console](https://console.cloud.google.com/).
2. Enable the **Google Drive API** for the project.
3. Download the client JSON and save it as `credentials.json` in the project root.
4. On first run with upload enabled, the scraper prints an authorization URL; open it, approve access, and paste the code into the terminal.
5. Tokens are stored in `token.json` for subsequent runs.

**Important:** Do not use a **service account** for uploads to a personal “My Drive” folder — Google blocks that. Use OAuth as implemented in `auth.js`. See `GDRIVE_NOTE.md` for folder ID and historical context.

**Do not commit** `credentials.json` or `token.json` (listed in `.gitignore`).

### 4. Configure paths and URLs

Edit `config.js` if you need different categories, headless mode, retry counts, or `outputDir`. For a shared drive sync folder, set:

```bash
set OUTPUT_DIR=C:\path\to\your\sync\folder
```

---

## Running the scraper

### Manual run

```bash
npm run scrape
```

or:

```bash
node scraper.js
```

### Windows scheduled task

`run-scraper.bat` changes to the project directory, runs `node scraper.js`, and appends stdout/stderr to `output\scraper.log`. Point Task Scheduler at this batch file (e.g. daily at 4:00 AM as noted in `GDRIVE_NOTE.md`).

---

## Configuration reference (`config.js`)

| Setting | Purpose |
|---------|---------|
| `outputDir` | CSV output directory (`OUTPUT_DIR` env overrides) |
| `urls` | List of CrowdWorks category pages to scrape |
| `browser.headless` | Run Chromium without UI |
| `browser.viewport` / `userAgent` | Request fingerprint |
| `waitTime` | Ms to wait after navigation before extraction |
| `maxRetries` | Per-URL retry count on failure |
| `csvHeaders` / `platform` | CSV column layout and platform label |
| `budgetFilters` | Minimum fixed and hourly amounts |

Google Drive **folder ID** for uploads is set in `scraper.js` (`fileMetadata.parents`). Update it if you move files to a new folder.

---

## Operational behavior

- **Retries:** Failed page loads retry up to `maxRetries` with a short delay.
- **Politeness:** ~1 second delay between category URLs.
- **Master merge:** Jobs are keyed by URL; only new URLs increase the “new jobs today” count.
- **Sort order:** Master CSV rows are sorted by Added date (newest first).
- **Upload failure:** Local CSV generation still completes; upload errors are logged and do not stop the scrape.

---

## Security and compliance

- Respect CrowdWorks [terms of use](https://crowdworks.jp) and robots/rate limits; this tool is intended for reasonable, scheduled internal use.
- Keep OAuth secrets and tokens private.
- Scraped data may include client names and project details — handle CSVs according to your company data policy.

---

## Troubleshooting

| Symptom | Things to check |
|---------|------------------|
| Zero jobs extracted | Site HTML may have changed; verify selectors in `extractJobs()` in `scraper.js` |
| Playwright errors | Re-run `npm run install-browser` |
| Drive upload skipped | Missing `credentials.json` or failed OAuth |
| `invalid_grant` on Drive | Delete `token.json` and re-authorize |
| Token expires every ~7 days | OAuth app in “Testing” mode — publish app or re-auth when prompted |
| Service account message | Replace with OAuth credentials (`auth.js`) |

---

## Related documentation

- **GDRIVE_NOTE.md** — Why OAuth replaced service accounts, active folder link, and scheduling notes.

---

## License

ISC (see `package.json`).
