'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Sparkles } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input, Label, Select, Textarea } from '@/components/ui/input';

const CURRENCIES = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD'];

export default function TripForm({ trip, userId }) {
  const router = useRouter();
  const isEdit = Boolean(trip?.id);

  const [form, setForm] = useState({
    title: trip?.title || '',
    destination: trip?.destination || '',
    start_date: trip?.start_date || '',
    end_date: trip?.end_date || '',
    budget: trip?.budget ?? '',
    currency: trip?.currency || 'USD',
    status: trip?.status || 'planning',
    interests: '',
  });
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [itinerary, setItinerary] = useState(trip?.ai_itinerary || '');
  const [error, setError] = useState('');

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleGenerateItinerary() {
    if (!form.destination || !form.budget) {
      setError('Add a destination and budget before generating an itinerary.');
      return;
    }
    setError('');
    setGenerating(true);
    try {
      const res = await fetch('/api/ai/itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: form.destination,
          budget: form.budget,
          currency: form.currency,
          startDate: form.start_date,
          endDate: form.end_date,
          interests: form.interests,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate itinerary');
      setItinerary(data.itinerary);
    } catch (err) {
      setError(err.message);
    } finally {
      setGenerating(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSaving(true);

    const supabase = createClient();
    const payload = {
      title: form.title || `Trip to ${form.destination}`,
      destination: form.destination,
      start_date: form.start_date || null,
      end_date: form.end_date || null,
      budget: Number(form.budget) || 0,
      currency: form.currency,
      status: form.status,
      ai_itinerary: itinerary || null,
    };

    let result;
    if (isEdit) {
      result = await supabase.from('trips').update(payload).eq('id', trip.id).select().single();
    } else {
      result = await supabase
        .from('trips')
        .insert({ ...payload, user_id: userId })
        .select()
        .single();
    }

    setSaving(false);

    if (result.error) {
      setError(result.error.message);
      return;
    }

    router.push(`/dashboard/trips/${result.data.id}`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-2">
      <div className="ticket space-y-4 p-6">
        <h2 className="font-display text-lg font-semibold">Trip details</h2>

        <div>
          <Label htmlFor="title">Trip name</Label>
          <Input
            id="title"
            value={form.title}
            onChange={(e) => update('title', e.target.value)}
            placeholder="Anniversary trip"
          />
        </div>

        <div>
          <Label htmlFor="destination">Destination</Label>
          <Input
            id="destination"
            required
            value={form.destination}
            onChange={(e) => update('destination', e.target.value)}
            placeholder="Bali, Indonesia"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="start_date">Start date</Label>
            <Input
              id="start_date"
              type="date"
              value={form.start_date || ''}
              onChange={(e) => update('start_date', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="end_date">End date</Label>
            <Input
              id="end_date"
              type="date"
              value={form.end_date || ''}
              onChange={(e) => update('end_date', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="budget">Total budget</Label>
            <Input
              id="budget"
              type="number"
              min="0"
              step="0.01"
              required
              value={form.budget}
              onChange={(e) => update('budget', e.target.value)}
              placeholder="950"
            />
          </div>
          <div>
            <Label htmlFor="currency">Currency</Label>
            <Select id="currency" value={form.currency} onChange={(e) => update('currency', e.target.value)}>
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </Select>
          </div>
        </div>

        {isEdit && (
          <div>
            <Label htmlFor="status">Status</Label>
            <Select id="status" value={form.status} onChange={(e) => update('status', e.target.value)}>
              <option value="planning">Planning</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
            </Select>
          </div>
        )}

        <div>
          <Label htmlFor="interests">Interests (for the AI planner)</Label>
          <Textarea
            id="interests"
            rows={2}
            value={form.interests}
            onChange={(e) => update('interests', e.target.value)}
            placeholder="street food, hiking, museums, nightlife…"
          />
        </div>

        {error && <p className="rounded-lg bg-coral/10 px-3 py-2 text-sm text-coral">{error}</p>}

        <div className="flex gap-3 pt-2">
          <Button type="submit" variant="amber" disabled={saving}>
            {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create trip'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleGenerateItinerary}
            disabled={generating}
          >
            {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {generating ? 'Thinking…' : 'Generate with AI'}
          </Button>
        </div>
      </div>

      <div className="ticket p-6">
        <h2 className="font-display text-lg font-semibold">AI itinerary</h2>
        <p className="mt-1 text-sm text-ink/55">
          Generated by Groq AI. Edit the trip details and regenerate any time — saving the trip keeps this text.
        </p>
        <div className="mt-4 max-h-[520px] overflow-y-auto whitespace-pre-wrap rounded-lg bg-paperDark/40 p-4 text-sm leading-relaxed text-ink/80">
          {itinerary || 'No itinerary yet. Fill in destination and budget, then click "Generate with AI".'}
        </div>
      </div>
    </form>
  );
}
