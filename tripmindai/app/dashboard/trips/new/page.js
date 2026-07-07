import { createClient } from '@/lib/supabase/server';
import TripForm from '@/components/TripForm';

export default async function NewTripPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="mx-auto max-w-5xl px-8 py-10">
      <h1 className="font-display text-2xl font-semibold">Plan a new trip</h1>
      <p className="mt-1 text-sm text-ink/60">Give it a destination and a budget — TripMindAI does the rest.</p>
      <div className="mt-8">
        <TripForm userId={user.id} />
      </div>
    </div>
  );
}
