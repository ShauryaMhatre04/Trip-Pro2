import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/card';
import { Plane, ArrowRight } from 'lucide-react';
import DeleteTripButton from '@/components/DeleteTripButton';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: trips } = await supabase
    .from('trips')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: expenses } = await supabase
    .from('expenses')
    .select('trip_id, amount');

  const spentByTrip = (expenses || []).reduce((acc, e) => {
    acc[e.trip_id] = (acc[e.trip_id] || 0) + Number(e.amount);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-6xl px-8 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">Your trips</h1>
          <p className="mt-1 text-sm text-ink/60">
            {trips?.length ? `${trips.length} trip${trips.length > 1 ? 's' : ''} on the board.` : 'No trips yet — let’s plan one.'}
          </p>
        </div>
        <Button href="/dashboard/trips/new" variant="amber">
          <Plane className="h-4 w-4" /> New trip
        </Button>
      </div>

      {!trips?.length && (
        <div className="ticket flex flex-col items-center justify-center gap-3 py-20 text-center">
          <Plane className="h-8 w-8 text-teal" />
          <p className="font-display text-lg font-semibold">Your board is empty</p>
          <p className="max-w-sm text-sm text-ink/60">
            Add a destination and a budget — TripMindAI's Groq-powered planner will draft the itinerary for you.
          </p>
          <Button href="/dashboard/trips/new" variant="amber" className="mt-2">
            Plan your first trip
          </Button>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trips?.map((trip) => {
          const spent = spentByTrip[trip.id] || 0;
          const pct = trip.budget > 0 ? Math.min(100, Math.round((spent / trip.budget) * 100)) : 0;
          const over = spent > trip.budget;

          return (
            <div key={trip.id} className="ticket ticket-stub flex flex-col p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-ink/45">Destination</p>
                  <h3 className="font-display text-lg font-semibold">{trip.destination}</h3>
                </div>
                <Badge variant={over ? 'over' : trip.status}>{over ? 'over budget' : trip.status}</Badge>
              </div>

              <p className="mt-1 text-sm text-ink/60">{trip.title}</p>

              <div className="my-4 border-t-2 border-dashed border-ink/10" />

              <div className="flex items-center justify-between text-xs">
                <div>
                  <p className="text-ink/45">Budget</p>
                  <p className="font-mono font-medium">{trip.currency} {Number(trip.budget).toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-ink/45">Spent</p>
                  <p className={`font-mono font-medium ${over ? 'text-coral' : 'text-teal-dark'}`}>
                    {trip.currency} {spent.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-ink/10">
                <div
                  className={`h-full rounded-full ${over ? 'bg-coral' : 'bg-teal'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>

              <div className="mt-5 flex items-center justify-between">
                <Link
                  href={`/dashboard/trips/${trip.id}`}
                  className="flex items-center gap-1 text-sm font-semibold text-teal-dark hover:underline"
                >
                  Open trip <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <DeleteTripButton tripId={trip.id} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
