import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import TripForm from '@/components/TripForm';
import ExpensesPanel from '@/components/ExpensesPanel';
import { Badge } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

export default async function TripDetailPage({ params }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: trip } = await supabase
    .from('trips')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!trip) notFound();

  const { data: expenses } = await supabase
    .from('expenses')
    .select('*')
    .eq('trip_id', trip.id)
    .order('spent_on', { ascending: false });

  return (
    <div className="mx-auto max-w-5xl px-8 py-10">
      <div className="mb-8 flex items-center gap-3">
        <h1 className="font-display text-2xl font-semibold">{trip.destination}</h1>
        <Badge variant={trip.status}>{trip.status}</Badge>
      </div>

      <TripForm trip={trip} userId={user.id} />

      <div className="mt-8">
        <ExpensesPanel
          tripId={trip.id}
          userId={user.id}
          currency={trip.currency}
          initialExpenses={expenses || []}
        />
      </div>
    </div>
  );
}
