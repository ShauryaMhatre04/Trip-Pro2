'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function DeleteTripButton({ tripId }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleDelete() {
    if (!confirm('Delete this trip and all of its expenses? This cannot be undone.')) return;

    setBusy(true);
    const supabase = createClient();
    await supabase.from('trips').delete().eq('id', tripId);
    setBusy(false);
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={busy}
      className="rounded-full p-2 text-ink/40 transition hover:bg-coral/10 hover:text-coral disabled:opacity-50"
      aria-label="Delete trip"
      title="Delete trip"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
