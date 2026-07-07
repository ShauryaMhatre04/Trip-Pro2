'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, Camera, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input, Label, Select } from '@/components/ui/input';

const CATEGORIES = ['flights', 'stay', 'food', 'transport', 'activities', 'shopping', 'other'];

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ExpensesPanel({ tripId, userId, currency, initialExpenses }) {
  const router = useRouter();
  const [expenses, setExpenses] = useState(initialExpenses || []);
  const [form, setForm] = useState({
    category: 'food',
    description: '',
    amount: '',
    spent_on: new Date().toISOString().slice(0, 10),
  });
  const [saving, setSaving] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState('');

  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  async function refreshExpenses() {
    const supabase = createClient();
    const { data } = await supabase
      .from('expenses')
      .select('*')
      .eq('trip_id', tripId)
      .order('spent_on', { ascending: false });
    setExpenses(data || []);
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (!form.amount) return;
    setSaving(true);
    setError('');

    const supabase = createClient();
    const { error } = await supabase.from('expenses').insert({
      trip_id: tripId,
      user_id: userId,
      category: form.category,
      description: form.description || null,
      amount: Number(form.amount),
      spent_on: form.spent_on,
      source: 'manual',
    });

    setSaving(false);

    if (error) {
      setError(error.message);
      return;
    }

    setForm({ category: 'food', description: '', amount: '', spent_on: new Date().toISOString().slice(0, 10) });
    await refreshExpenses();
    router.refresh();
  }

  async function handleDelete(id) {
    const supabase = createClient();
    await supabase.from('expenses').delete().eq('id', id);
    await refreshExpenses();
    router.refresh();
  }

  async function handleReceiptUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setScanning(true);
    setError('');
    try {
      const base64 = await fileToBase64(file);
      const res = await fetch('/api/ai/vision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64, mimeType: file.type }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not read receipt');

      const parsed = data.expense;
      const supabase = createClient();
      const { error } = await supabase.from('expenses').insert({
        trip_id: tripId,
        user_id: userId,
        category: parsed.category,
        description: parsed.description || 'Scanned receipt',
        amount: Number(parsed.amount) || 0,
        spent_on: parsed.spent_on || new Date().toISOString().slice(0, 10),
        source: 'ai_receipt_scan',
      });
      if (error) throw error;

      await refreshExpenses();
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setScanning(false);
      e.target.value = '';
    }
  }

  return (
    <div className="ticket p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold">Expenses</h2>
        <span className="font-mono text-sm text-ink/60">
          {currency} {total.toFixed(2)} logged
        </span>
      </div>

      <form onSubmit={handleAdd} className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
        <div className="col-span-2 sm:col-span-1">
          <Label htmlFor="category">Category</Label>
          <Select id="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Select>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            min="0"
            step="0.01"
            required
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            placeholder="0.00"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <Label htmlFor="spent_on">Date</Label>
          <Input
            id="spent_on"
            type="date"
            value={form.spent_on}
            onChange={(e) => setForm({ ...form, spent_on: e.target.value })}
          />
        </div>
        <div className="col-span-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Warung dinner"
          />
        </div>
        <div className="col-span-2 flex items-end gap-2 sm:col-span-5">
          <Button type="submit" variant="amber" size="sm" disabled={saving}>
            <Plus className="h-4 w-4" /> Add expense
          </Button>

          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-teal/40 px-4 py-2 text-sm font-medium text-teal-dark hover:bg-teal/5">
            {scanning ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
            {scanning ? 'Reading receipt…' : 'Scan receipt (Groq Vision)'}
            <input type="file" accept="image/*" className="hidden" onChange={handleReceiptUpload} disabled={scanning} />
          </label>
        </div>
      </form>

      {error && <p className="mt-3 rounded-lg bg-coral/10 px-3 py-2 text-sm text-coral">{error}</p>}

      <div className="mt-6 divide-y divide-ink/10">
        {expenses.length === 0 && (
          <p className="py-6 text-center text-sm text-ink/50">No expenses logged yet.</p>
        )}
        {expenses.map((exp) => (
          <div key={exp.id} className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium capitalize">
                {exp.description || exp.category}
                {exp.source === 'ai_receipt_scan' && (
                  <span className="ml-2 rounded-full bg-teal/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-teal-dark">
                    AI scan
                  </span>
                )}
              </p>
              <p className="text-xs text-ink/45 capitalize">{exp.category} · {exp.spent_on}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm">{currency} {Number(exp.amount).toFixed(2)}</span>
              <button
                onClick={() => handleDelete(exp.id)}
                className="rounded-full p-1.5 text-ink/35 hover:bg-coral/10 hover:text-coral"
                aria-label="Delete expense"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
