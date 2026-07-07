'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Compass, LayoutGrid, BarChart3, LogOut, Plane } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const links = [
  { href: '/dashboard', label: 'Trips', icon: LayoutGrid },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
];

export default function DashboardNav({ email }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  }

  return (
    <aside className="flex h-screen w-64 flex-col justify-between border-r border-ink/10 bg-paperDark/40 px-5 py-6">
      <div>
        <Link href="/" className="mb-10 flex items-center gap-2 font-display text-lg font-semibold">
          <Compass className="h-5 w-5 text-teal" strokeWidth={2.2} />
          TripMind<span className="text-teal">AI</span>
        </Link>

        <nav className="space-y-1">
          {links.map((l) => {
            const Icon = l.icon;
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  active ? 'bg-ink text-paper' : 'text-ink/70 hover:bg-ink/5'
                }`}
              >
                <Icon className="h-4 w-4" />
                {l.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/dashboard/trips/new"
          className="mt-6 flex items-center gap-2 rounded-lg border border-dashed border-teal/50 px-3 py-2.5 text-sm font-medium text-teal-dark hover:bg-teal/5"
        >
          <Plane className="h-4 w-4" /> New trip
        </Link>
      </div>

      <div>
        <p className="mb-2 truncate text-xs text-ink/45">{email}</p>
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-ink/60 hover:bg-coral/10 hover:text-coral"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>
    </aside>
  );
}
