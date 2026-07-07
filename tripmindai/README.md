# TripMindAI ✈️

AI-powered, budget-first travel planning. Tell it a destination and a budget —
Groq AI drafts a day-by-day itinerary, Groq Vision reads your receipts, and a
live analytics dashboard keeps every trip on track.

## Stack

| Piece | Tech |
|---|---|
| Framework | Next.js 14 (App Router, JavaScript) |
| Auth & DB | Supabase (Auth + Postgres + Row Level Security) |
| AI text | Groq AI (`llama-3.3-70b-versatile`) — itinerary generation |
| AI vision | Groq Vision (`llama-3.2-90b-vision-preview`) — receipt scanning |
| Email | Resend — welcome emails |
| Charts | Recharts |
| Styling | Tailwind CSS, hand-built UI primitives |

Features: Supabase email/password auth, middleware-protected `/dashboard`
routes, full CRUD on trips + expenses, an analytics dashboard (budget vs.
spend, category breakdown, cumulative spend over time), and a landing page.

---

## 1. Prerequisites

- Node.js 18.18+ and npm
- A free [Supabase](https://supabase.com) project
- A free [Groq](https://console.groq.com) API key
- A free [Resend](https://resend.com) API key

## 2. Set up Supabase

1. Create a new project at supabase.com.
2. Go to **SQL Editor** → paste the contents of `supabase/schema.sql` → **Run**.
   This creates the `trips` and `expenses` tables with Row Level Security so
   each user can only see their own data.
3. Go to **Project Settings → API** and copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. (Optional but recommended) Under **Authentication → URL Configuration**,
   set the Site URL to `http://localhost:3000` for local dev (add your
   production URL later after deploying).

## 3. Get your API keys

- **Groq**: console.groq.com/keys → create a key → `GROQ_API_KEY`
- **Resend**: resend.com/api-keys → create a key → `RESEND_API_KEY`
  (the sandbox `onboarding@resend.dev` sender works with no domain setup)

## 4. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in every value in `.env.local` with the keys from steps 2–3.

## 5. Run it locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Sign up, confirm your
email (check inbox/spam — Supabase sends this), log in, and create your first
trip.

> **Note on this deliverable:** this project was generated in a sandboxed
> environment with no internet access, so `npm install` / `npm run build`
> could not be executed here to verify a clean install. The code follows the
> standard Next.js App Router + Supabase SSR patterns exactly, but please run
> `npm run dev` locally first and let me know if you hit any error — happy to
> fix it immediately.

---

## 6. Push to GitHub

```bash
cd tripmindai
git init
git add .
git commit -m "Initial commit: TripMindAI"
git branch -M main
git remote add origin https://github.com/<your-username>/tripmindai.git
git push -u origin main
```

(`.env.local` is already git-ignored, so your keys won't be committed.)

## 7. Deploy (Vercel — recommended, has a generous free tier)

1. Push the repo to GitHub (step 6).
2. Go to [vercel.com/new](https://vercel.com/new) → import the `tripmindai` repo.
3. In **Environment Variables**, add all six variables from `.env.example`
   with your real values (use your production domain for
   `NEXT_PUBLIC_SITE_URL`, e.g. `https://tripmindai.vercel.app`).
4. Click **Deploy**.
5. Back in Supabase → **Authentication → URL Configuration**, add your
   Vercel URL (`https://your-app.vercel.app/**`) to Redirect URLs so the
   email-confirmation link works in production.
6. Share the Vercel URL — that's your live link.

---

## Project structure

```
app/
  page.js                       landing page
  login/, signup/                auth pages
  auth/callback/route.js         email-confirmation handler
  dashboard/
    layout.js                    protected shell (checks Supabase session)
    page.js                      trips list (Read + Delete)
    trips/new/page.js            create trip
    trips/[id]/page.js           edit trip + AI itinerary + expenses
    analytics/page.js            Recharts dashboard
  api/
    ai/itinerary/route.js        Groq AI itinerary generation
    ai/vision/route.js           Groq Vision receipt scanning
    email/welcome/route.js       Resend welcome email
components/                      UI + feature components
lib/supabase/                    browser/server/middleware Supabase clients
lib/groq.js, lib/resend.js       third-party client helpers
supabase/schema.sql              DB schema + RLS policies
middleware.js                    protects /dashboard/*
```

## How the required pieces map to features

- **Supabase Authentication** — `app/login`, `app/signup`, `lib/supabase/*`
- **Protected Routes** — `middleware.js` + `app/dashboard/layout.js` (defense in depth)
- **CRUD Operations** — Trips and Expenses, both fully create/read/update/delete
- **Analytics Dashboard (Recharts)** — `app/dashboard/analytics/page.js`
- **Landing Page** — `app/page.js`
- **Groq AI** — `app/api/ai/itinerary/route.js`
- **Groq Vision** — `app/api/ai/vision/route.js`
- **Resend** — `app/api/email/welcome/route.js`
