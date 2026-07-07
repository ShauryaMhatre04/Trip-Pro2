import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import Stats from "@/components/Stats";
import WeatherPreview from "@/components/WeatherPreview";
import PackingAssistant from "@/components/PackingAssistant";
import {
  Sparkles,
  Wallet,
  Camera,
  MapPin,
  Plane,
  ArrowRight,
  ScanLine,
  LineChart,
} from 'lucide-react';

const steps = [
  {
    n: 'DEP',
    title: 'Tell it your trip',
    body: 'Destination, dates, and the one number that matters: your total budget.',
    icon: MapPin,
  },
  {
    n: 'AI',
    title: 'Groq builds the plan',
    body: 'A day-by-day itinerary sized to your budget, generated in seconds by Groq AI.',
    icon: Sparkles,
  },
  {
    n: 'SCAN',
    title: 'Snap a receipt',
    body: 'Groq Vision reads your receipts and photos, logging spend to the right category.',
    icon: Camera,
  },
  {
    n: 'ARR',
    title: 'Watch the budget',
    body: 'A live dashboard shows what is left to spend before you land back home.',
    icon: LineChart,
  },
];

const features = [
  {
    icon: Sparkles,
    title: 'AI itineraries, not templates',
    body: 'Groq AI drafts a route through your destination shaped around what you actually want to spend — swap any day and it re-balances the rest.',
  },
  {
    icon: ScanLine,
    title: 'Receipt scanning with Groq Vision',
    body: 'Photograph a receipt or a menu and Groq Vision reads the total, currency, and category — no manual typing at the end of a long day.',
  },
  {
    icon: Wallet,
    title: 'Budget that talks back',
    body: 'Every expense you log updates a running "runway" so you know, mid-trip, whether today is a splurge day or a noodles day.',
  },
  {
    icon: Plane,
    title: 'One trip, one ticket',
    body: 'Trips live as boarding-pass cards — destination, dates, and spend at a glance, with full itinerary and expense history underneath.',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-paper">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-16 md:grid-cols-2 md:pt-24">
          <div className="flex flex-col justify-center">
            <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-dark">
              <Sparkles className="h-3.5 w-3.5" /> AI trip planning, under budget
            </span>
          <h1 className="font-display text-4xl font-semibold leading-[1.08] text-ink md:text-6xl">
  <span className="gradient-text">
    Plan the trip.
  </span>

  <br />

  Skip the{" "}
  <span className="gradient-text">
    overspend
  </span>.
</h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink/70">
              TripMindAI turns a destination and a number into a real, day-by-day
              itinerary — then keeps every rupee, dollar, or euro on track with AI
              receipt scanning and a live budget dashboard.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/signup" variant="amber" size="lg">
                Plan your first trip <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="#how-it-works" variant="outline" size="lg">
                See how it works
              </Button>
            </div>
            <p className="mt-6 text-xs text-ink/45">
              No credit card. Your data stays yours, secured by Supabase.
            </p>
          </div>

          {/* Signature: boarding pass card */}
          <div className="flex items-center justify-center">
              <div className="ticket ticket-stub float shadow-premium w-full max-w-sm rotate-1 p-0">
              <div className="flex items-center justify-between rounded-t-[14px] bg-ink px-5 py-3 text-paper">
                <span className="font-display text-sm font-semibold tracking-wide">
                  BOARDING PASS
                </span>
                <Plane className="h-4 w-4 text-amber" />
              </div>
              <div className="px-5 pt-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-ink/45">From</p>
                    <p className="font-display text-2xl font-semibold">PUN</p>
                  </div>
                  <div className="flex-1 px-3">
                    <div className="flight-path h-px w-full" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-ink/45">To</p>
                    <p className="font-display text-2xl font-semibold">BALI</p>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <p className="text-ink/45">Dates</p>
                    <p className="font-mono font-medium">12–18 Sep</p>
                  </div>
                  <div>
                    <p className="text-ink/45">Budget</p>
                    <p className="font-mono font-medium">$950.00</p>
                  </div>
                  <div>
                    <p className="text-ink/45">Spent</p>
                    <p className="font-mono font-medium text-teal-dark">$412.30</p>
                  </div>
                </div>
              </div>
              <div className="my-5 border-t-2 border-dashed border-ink/15" />
              <div className="px-5 pb-6 text-xs text-ink/60">
                <p className="mb-2 font-semibold uppercase tracking-wide text-ink/45">
                  AI itinerary — Day 1
                </p>
                <p className="leading-relaxed">
                  Land Denpasar, tuk-tuk to Ubud homestay ($18), sunset at Campuhan
                  Ridge, warung dinner ($6). Runway: on budget.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
       
       <Stats />
       <WeatherPreview />
       <PackingAssistant />


      {/* HOW IT WORKS */}
      <section id="how-it-works" className="border-t border-ink/10 bg-paperDark/60 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-dark">
              The route
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold md:text-4xl">
              Four stops from idea to itinerary
            </h2>
          </div>
          <div className="relative grid gap-8 md:grid-cols-4">
            <div className="absolute left-0 right-0 top-6 hidden h-px md:block flight-path" />
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.n} className="relative">
                  <div className="relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 bg-paper font-mono text-[10px] font-semibold text-ink/50">
                    {step.n}
                  </div>
                  <Icon className="mb-3 h-5 w-5 text-teal" strokeWidth={2} />
                  <h3 className="font-display text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">{step.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
{/* FEATURES */}

<section
  id="features"
  className="py-24 bg-gradient-to-b from-white to-gray-50"
>

<div className="mx-auto max-w-7xl px-6">

<div className="text-center mb-16">

<span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">

Why TripMind AI?

</span>

<h2 className="mt-6 text-5xl font-bold">

Everything You Need

For Your Journey

</h2>

<p className="mt-4 text-gray-500">

Travel planning powered by AI.

</p>

</div>

<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

{features.map((f)=>{

const Icon=f.icon;

return(

<div
key={f.title}
className="group rounded-3xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
>

<div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 transition group-hover:scale-110">

<Icon
className="h-8 w-8 text-amber-500"
/>

</div>

<h3 className="text-xl font-bold">

{f.title}

</h3>

<p className="mt-4 leading-7 text-gray-500">

{f.body}

</p>

</div>

)

})}

</div>

</div>

</section>

      {/* PRICING / CTA */}
      <section id="pricing" className="border-t border-ink/10 bg-ink py-20 text-paper">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber">
            One fare, all destinations
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
            Free while you're planning your next trip
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-paper/65">
            Unlimited trips, AI itineraries, and Groq Vision receipt scanning —
            on the house during early access.
          </p>
          <div className="mt-8">
            <Button href="/signup" variant="amber" size="lg">
              Create your account <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-ink/10 py-8 text-center text-xs text-ink/45">
        © {new Date().getFullYear()} TripMindAI. Built with Supabase, Groq AI &amp; Resend.
      </footer>
    </div>
  );
}