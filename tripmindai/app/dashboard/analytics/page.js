import { createClient } from '@/lib/supabase/server';
import { Card } from '@/components/ui/card';
import { Wallet, PiggyBank, Plane, TrendingUp } from 'lucide-react';
import { BudgetVsSpentChart, CategoryPieChart, SpendOverTimeChart } from '@/components/AnalyticsCharts';

export const dynamic = 'force-dynamic';

export default async function AnalyticsPage() {
  const supabase = createClient();

  const { data: trips } = await supabase.from('trips').select('*');
  const { data: expenses } = await supabase.from('expenses').select('*');

  const tripsList = trips || [];
  const expensesList = expenses || [];

  const totalBudget = tripsList.reduce((s, t) => s + Number(t.budget), 0);
  const totalSpent = expensesList.reduce((s, e) => s + Number(e.amount), 0);
  const remaining = totalBudget - totalSpent;

  const budgetVsSpent = tripsList.map((t) => {
    const spent = expensesList
      .filter((e) => e.trip_id === t.id)
      .reduce((s, e) => s + Number(e.amount), 0);
    return { name: t.destination, budget: Number(t.budget), spent };
  });

  const byCategory = Object.entries(
    expensesList.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + Number(e.amount);
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const sortedByDate = [...expensesList].sort((a, b) => new Date(a.spent_on) - new Date(b.spent_on));
  let running = 0;
  const spendOverTime = sortedByDate.map((e) => {
    running += Number(e.amount);
    return { date: e.spent_on, cumulative: Number(running.toFixed(2)) };
  });

  const stats = [
    { label: 'Total trips', value: tripsList.length, icon: Plane },
    { label: 'Total budget', value: totalBudget.toFixed(2), icon: Wallet },
    { label: 'Total spent', value: totalSpent.toFixed(2), icon: TrendingUp },
    { label: 'Remaining', value: remaining.toFixed(2), icon: PiggyBank, alert: remaining < 0 },
  ];

  return (
    <div className="mx-auto max-w-6xl px-8 py-10">
      <h1 className="font-display text-2xl font-semibold">Analytics</h1>
      <p className="mt-1 text-sm text-ink/60">Every trip and every expense, rolled up in one view.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="flex items-center gap-4">
              <div className={`flex h-11 w-11 items-center justify-center rounded-full ${s.alert ? 'bg-coral/15 text-coral' : 'bg-teal/10 text-teal-dark'}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-ink/50">{s.label}</p>
                <p className="font-mono text-lg font-semibold">{s.value}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-4 font-display text-lg font-semibold">Budget vs. spent by trip</h2>
          <BudgetVsSpentChart data={budgetVsSpent} />
        </Card>
        <Card>
          <h2 className="mb-4 font-display text-lg font-semibold">Spend by category</h2>
          <CategoryPieChart data={byCategory} />
        </Card>
        <Card className="lg:col-span-2">
          <h2 className="mb-4 font-display text-lg font-semibold">Cumulative spend over time</h2>
          <SpendOverTimeChart data={spendOverTime} />
        </Card>
      </div>
    </div>
  );
}
