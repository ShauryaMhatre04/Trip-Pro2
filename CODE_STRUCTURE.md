# TripMindAI - Code Structure

## 📁 Project Overview
**TripMindAI** is a Next.js-based AI-powered trip planning application that helps users create budgeted itineraries, track expenses, and get AI-powered packing lists and receipt scanning.

---

## 🏗️ Folder Structure

```
tripmindai/
│
├── 📄 package.json                 # Project dependencies & scripts
├── 📄 next.config.js               # Next.js configuration
├── 📄 middleware.js                # Auth middleware (Supabase session management)
├── 📄 postcss.config.js            # PostCSS config (Tailwind)
├── 📄 tailwind.config.js           # Tailwind CSS theme configuration
├── 📄 jsconfig.json                # JS/TS path aliases
├── 📄 components.json              # Shadcn UI components config
├── 📄 README.md                    # Project documentation
│
├── 📁 app/                         # Next.js App Router
│   ├── 📄 layout.js                # Root layout (HTML, styles, providers)
│   ├── 📄 page.js                  # Home page (landing page)
│   ├── 📄 globals.css              # Global styles
│   │
│   ├── 📁 api/                     # API Routes
│   │   ├── 📁 ai/
│   │   │   ├── 📁 itinerary/
│   │   │   │   └── route.js        # POST: Generate itinerary/packing list (Groq AI)
│   │   │   └── 📁 vision/
│   │   │       └── route.js        # POST: Scan receipts with Groq Vision
│   │   │
│   │   ├── 📁 email/
│   │   │   └── 📁 welcome/
│   │   │       └── route.js        # POST: Send welcome email (Resend)
│   │   │
│   │   └── 📁 auth/
│   │       └── 📁 callback/
│   │           └── route.js        # GET: Supabase auth callback
│   │
│   ├── 📁 auth/
│   │   └── 📁 callback/
│   │       └── route.js            # Auth callback handler
│   │
│   ├── 📁 login/
│   │   └── page.js                 # Login page
│   │
│   ├── 📁 signup/
│   │   └── page.js                 # Sign up page
│   │
│   └── 📁 dashboard/               # Protected dashboard (requires auth)
│       ├── layout.js               # Dashboard layout with nav
│       ├── page.js                 # Dashboard home
│       │
│       ├── 📁 analytics/
│       │   └── page.js             # Analytics/stats page
│       │
│       └── 📁 trips/
│           ├── 📁 new/
│           │   └── page.js         # Create new trip form
│           │
│           └── 📁 [id]/
│               └── page.js         # Trip detail page (view, edit, expenses)
│
├── 📁 components/                  # React Components
│   ├── 📄 Navbar.js                # Top navigation bar
│   ├── 📄 DashboardNav.js          # Dashboard sidebar navigation
│   ├── 📄 Hero.js                  # Landing page hero section
│   ├── 📄 Stats.js                 # Statistics counter section
│   ├── 📄 WeatherPreview.js        # Weather forecast display (Open-Meteo API)
│   ├── 📄 PackingAssistant.js      # Packing list generator UI
│   ├── 📄 TripForm.js              # Trip creation/editing form
│   ├── 📄 ExpensesPanel.js         # Expense tracking & receipt scanning
│   ├── 📄 AnalyticsCharts.js       # Dashboard charts & metrics
│   ├── 📄 DeleteTripButton.js      # Delete trip button component
│   ├── 📄 FloatingCard.js          # Reusable floating card component
│   │
│   └── 📁 ui/                      # Shadcn UI Components (base/unstyled)
│       ├── 📄 button.js            # Button component
│       ├── 📄 button.jsx           # Alternative button variant
│       ├── 📄 card.js              # Card component
│       └── 📄 input.js             # Input/textarea/select component
│
├── 📁 lib/                         # Utility & Library Functions
│   ├── 📄 utils.js                 # Helper functions (cn, date formatting, etc.)
│   ├── 📄 groq.js                  # Groq AI client setup & models
│   ├── 📄 resend.js                # Email sending setup (Resend)
│   ├── 📄 weather.js               # Weather API integration (Open-Meteo)
│   │
│   └── 📁 supabase/
│       ├── 📄 client.js            # Supabase browser client
│       ├── 📄 server.js            # Supabase server-side client
│       └── 📄 middleware.js        # Supabase auth session middleware
│
├── 📁 public/                      # Static assets (images, icons, etc.)
│
└── 📁 supabase/
    └── 📄 schema.sql               # Database schema (tables, relationships)
```

---

## 🔄 Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React/Next.js)                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Homepage    │  │  Dashboard   │  │ Auth Pages   │      │
│  │  (Landing)   │  │  (Protected) │  │ (Login/Sign) │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                   │                 │             │
│         └───────────────────┼─────────────────┘             │
│                             ▼                               │
│                   Components & Hooks                        │
│                   (TripForm, ExpensesPanel                  │
│                    PackingAssistant, etc.)                  │
└─────────────────────────────────────────────────────────────┘
              │
              │ (HTTP Requests)
              ▼
┌─────────────────────────────────────────────────────────────┐
│               MIDDLEWARE & API ROUTES (Next.js)             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ middleware.js: Auth Session Management (Supabase)  │    │
│  └─────────────────────────────────────────────────────┘    │
│         ▼                ▼                 ▼                 │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │  AI Routes │  │Auth Routes │  │Email Routes│            │
│  │ /api/ai/*  │  │  /api/auth │  │/api/email/ │            │
│  └────────────┘  └────────────┘  └────────────┘            │
└─────────────────────────────────────────────────────────────┘
     │              │               │
     │              │               │
     ▼              ▼               ▼
┌─────────────────────────────────────────────────────────────┐
│              EXTERNAL SERVICES (SDKs)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Groq AI      │  │ Supabase     │  │ Resend Email │      │
│  │ (LLM, Vision)│  │ (DB & Auth)  │  │ (Transactional) │    │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔑 Key Components & Their Purposes

### **Frontend Pages**
| Page | Path | Purpose |
|------|------|---------|
| **Homepage** | `/` | Landing page with features, stats, testimonials |
| **Sign Up** | `/signup` | User registration |
| **Login** | `/login` | User authentication |
| **Dashboard** | `/dashboard` | Trip overview & stats |
| **New Trip** | `/dashboard/trips/new` | Create new trip form |
| **Trip Detail** | `/dashboard/trips/[id]` | View, edit trip & manage expenses |
| **Analytics** | `/dashboard/analytics` | Trip statistics & insights |

### **React Components**
| Component | Purpose |
|-----------|---------|
| **TripForm.js** | Create/edit trip, generate AI itinerary |
| **ExpensesPanel.js** | Add expenses, scan receipts with AI |
| **PackingAssistant.js** | Generate packing checklists |
| **WeatherPreview.js** | Display weather forecast for destination |
| **Stats.js** | Show KPIs (trips planned, countries, etc.) |
| **DashboardNav.js** | Sidebar navigation menu |
| **Navbar.js** | Top navigation bar |

### **API Routes**
| Route | Method | Purpose |
|-------|--------|---------|
| `/api/ai/itinerary` | POST | Generate itinerary/packing list (Groq) |
| `/api/ai/vision` | POST | Scan receipt images (Groq Vision) |
| `/api/email/welcome` | POST | Send welcome email to new users |
| `/api/auth/callback` | GET | Supabase OAuth callback handler |

### **Database (Supabase)**
- **tables**: trips, expenses, users (via Supabase Auth)
- **relationships**: user → trips → expenses
- **See**: `supabase/schema.sql`

---

## 🛠️ Technology Stack

```
Frontend:
  ├─ React 18 (UI rendering)
  ├─ Next.js 14+ (App Router, SSR, API routes)
  ├─ Tailwind CSS (styling)
  ├─ Lucide Icons (UI icons)
  ├─ Framer Motion (animations)
  └─ React CountUp (counters)

Backend/Services:
  ├─ Supabase (PostgreSQL database + auth)
  ├─ Groq AI (LLM for itineraries, Vision for receipts)
  ├─ Resend (transactional emails)
  └─ Open-Meteo (weather forecasts)

Authentication:
  └─ Supabase SSR (session management with JWT)

Build/Dev:
  ├─ Next.js (framework)
  ├─ PostCSS (CSS processing)
  └─ ESLint (code linting)
```

---

## 📡 Key Files & Responsibilities

### **Authentication Flow**
1. **middleware.js** → Manages Supabase session for all requests
2. **lib/supabase/client.js** → Browser-side Supabase client
3. **lib/supabase/server.js** → Server-side Supabase client
4. **lib/supabase/middleware.js** → Session refresh logic
5. **app/auth/callback/route.js** → OAuth redirect handler

### **Trip Management**
1. **components/TripForm.js** → Form to create/edit trips
2. **app/dashboard/trips/[id]/page.js** → Trip detail view
3. **components/ExpensesPanel.js** → Manage trip expenses
4. **api/ai/itinerary/route.js** → AI itinerary generation

### **AI Features**
1. **lib/groq.js** → Groq client initialization
2. **api/ai/itinerary/route.js** → Itinerary/packing generation
3. **api/ai/vision/route.js** → Receipt scanning with vision

### **Email**
1. **lib/resend.js** → Resend client setup
2. **api/email/welcome/route.js** → Welcome email sending

---

## 🔌 Environment Variables (.env.local)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Groq AI
GROQ_API_KEY=your_groq_key

# Resend Email
RESEND_API_KEY=your_resend_key
RESEND_FROM_EMAIL=sender@example.com

# App Config
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 🚀 Key Features Architecture

### **1. Trip Planning**
- User enters destination, budget, dates, interests
- Groq AI generates day-by-day itinerary
- Itinerary saved to Supabase database

### **2. Expense Tracking**
- Manual expense entry OR AI receipt scanning
- Groq Vision extracts amount, category, date from receipts
- Real-time budget runway calculation

### **3. Packing Assistant**
- User provides destination, duration, activities
- Groq AI generates personalized packing checklist

### **4. Weather Integration**
- Open-Meteo API provides 7-day forecast
- Displayed on homepage for featured destination

### **5. Authentication**
- Supabase Auth handles signup/login
- SSR middleware refreshes JWT on each request
- Protected routes redirect to login if no session

---

## 🔐 Security Considerations

✅ **Implemented:**
- Supabase Row-Level Security (RLS) on database
- JWT-based authentication
- Middleware session validation
- CORS configured in Next.js

⚠️ **Areas to strengthen:**
- Rate limiting on API endpoints
- Input validation on all forms
- CSRF protection

---

## 📦 Dependencies

**Key npm packages:**
- `@supabase/ssr` - Supabase SSR auth
- `groq-sdk` - Groq AI SDK
- `resend` - Email service
- `next` - Framework
- `react`, `react-dom` - UI library
- `tailwindcss` - Styling
- `lucide-react` - Icons
- `framer-motion` - Animations

Run `npm list` in the tripmindai folder to see all dependencies.

---

## 🎯 Development Workflow

```
1. User interaction (form submission)
  ↓
2. Frontend validates & sends POST to API route
  ↓
3. API route authenticates user via middleware
  ↓
4. If needed, calls external service (Groq, Supabase, Resend)
  ↓
5. Response returned to frontend
  ↓
6. Frontend updates state & re-renders
  ↓
7. Data persisted to Supabase
```

---

## 📝 File Naming Conventions

- **Pages**: `page.js` (Next.js app router convention)
- **API Routes**: `route.js` (Next.js API convention)
- **Components**: PascalCase (e.g., `TripForm.js`)
- **Utilities**: camelCase (e.g., `utils.js`)
- **Styles**: Tailwind classes inline, no separate CSS files

---

## 🧪 Testing Strategy (Recommended)

- **Unit tests**: Jest for utility functions
- **Component tests**: React Testing Library
- **E2E tests**: Playwright for user flows
- **API tests**: Postman or similar for endpoint validation

---

## 📚 Next Steps / Improvements

1. ✅ Fix API endpoints (DONE)
2. Add unit tests
3. Implement rate limiting
4. Add image upload validation
5. Enhance error messages
6. Add loading skeletons
7. Implement trip sharing feature
8. Add offline support with Service Workers

---

**Created**: 2026-07-08  
**Last Updated**: 2026-07-08
