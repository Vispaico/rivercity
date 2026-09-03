# AGENTS.md

RiverCity Bike Rentals — a Vite 6 + React 18 SPA deployed on Vercel (rivercitybikerentals.com). Node 20.19.1 (`npm i` matches `.nvmrc`).

## Commands

- `npm run dev` — Vite dev server (port 5173).
- `npm run build` — runs `node generate-sitemap.js && vite build`. **The sitemap step requires `.env.local` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` and exits 1 if missing.** It fetches the `posts` table from Supabase and reads `src/lib/vehicleCatalog.js`.
- `npm run preview` — serve built `dist/`.
- No lint or test scripts exist (ESLint 8 is installed but unconfigured/unwired). Don't invent them.

## Gotchas

- **This is not Next.js.** `dev-server.js` at the repo root imports `next` (not a dependency) — dead/stale, don't use or fix it.
- `dist/` is committed to git and `public/sitemap.xml` is a build artifact — regenerate via build, don't hand-edit.
- `vercel.json` rewrites every non-`api`, non-dotted path to `index.html`. All routes are client-side (react-router); new pages are just new components in `src/pages`.
- `vite.config.js` injects error-reporting scripts into `index.html` that `postMessage` errors to `window.parent` (an external preview harness) and defers CSS. These are intentional — don't remove them.

## Env vars

- `.env.local` (gitignored) is required for dev/build. Never commit it or hardcode its values.
- Client code reads vars via `import.meta.env.VITE_*` only (Vite prefix rule).
- Vercel functions read plain `process.env.*` (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `GROQ_API_KEY`, SMTP/webhook secrets) — configured in Vercel, not `.env.local`.
- Supabase is optional client-side: `src/lib/supabaseClient.js` returns `null` unless `VITE_SUPABASE_ENABLED` is truthy or creds exist.

## Architecture

- `src/` — SPA. Entry `src/main.jsx` → `src/App.jsx`. Alias `@` → `./src`. Vehicle/pricing data lives in `src/lib/vehicleCatalog.js` — the single source of truth for vehicle pages and the sitemap (add a vehicle here).
- `api/` — Vercel serverless functions (ESM `export default handler`). Helpers in `api/_lib/*.cjs` use CJS because the project is `"type": "module"`. Admin client `supabaseAdmin.cjs` requires service role key.
- Blog posts are stored in Supabase (`posts` table) and fetched at runtime — not local files. Schema SQL is in `supabase/` (gitignored).
- Chat: `api/chat.js` (GROQ + RAG via Supabase edge function `search-knowledge`) and `api/rivercity.js` proxy to an external agent at `https://rivercity-agent.vercel.app`. The Vite dev server proxies `/api/rivercity` there too.

## Knowledge base / chat agent

- `skills/` — chatbot domain knowledge (MOCs for rentals, transport, travel guides, ops). `bootstrap/` — the chat agent's persona and behavior (`AGENTS.md`, `SOUL.md`, `IDENTITY.md`, `USER.md`).
- The chat agent's operating rules (reply in the user's language, search knowledge first) are in `bootstrap/AGENTS.md`; its "Must Observe Rules" (no backward compat, simplest implementation, composition over centralization, never skip verification) reflect project-wide preferences. Root-level `*.md` content files (`new_articles.md`, etc.) are gitignored content sources.

## Must Observe Rules

- Do not preserve backward compatibility.
- Choose the simplest implementation that fully meets the current requirements.
- Prefer established, well-maintained libraries over custom implementations.
- Avoid premature abstraction: prefer simple concrete solutions until real patterns emerge.
- Prefer composition over centralization: use small focused modules with explicit interfaces instead of centralized systems.
- Keep responsibilities clear: keep modules focused and avoid mixing transport, orchestration, domain/workflow state, persistence, infrastructure.
- Never skip verification: do not bypass required checks, tests, or quality gates.

## NVIDIA API Rate Limiting Rule

When using NVIDIA API models:

- Limit requests to maximum 36 per minute
- Wait 1.7 seconds between requests (60/36 = ~1.67s)
- If you receive a 429 error, wait 5 seconds before retrying
- Log all rate limit waits to the console

This ensures continuous usage without hitting the 40 RPM limit.
