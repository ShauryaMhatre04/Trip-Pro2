'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from 'recharts';

const CATEGORY_COLORS = {
  flights: '#2F6F63',
  stay: '#E8A33D',
  food: '#C1502E',
  transport: '#4E9385',
  activities: '#16233A',
  shopping: '#F4C978',
  other: '#8A93A6',
};

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-ink/10 bg-white px-3 py-2 text-xs shadow-md">
      <p className="mb-1 font-semibold">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color || p.fill }}>
          {p.name}: {typeof p.value === 'number' ? p.value.toFixed(2) : p.value}
        </p>
      ))}
    </div>
  );
}

export function BudgetVsSpentChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(22,35,58,0.08)" />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#16233A99' }} />
        <YAxis tick={{ fontSize: 12, fill: '#16233A99' }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Bar dataKey="budget" name="Budget" fill="#16233A" radius={[6, 6, 0, 0]} />
        <Bar dataKey="spent" name="Spent" fill="#E8A33D" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function CategoryPieChart({ data }) {
  if (!data.length) {
    return <p className="py-16 text-center text-sm text-ink/45">No expenses logged yet.</p>;
  }
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
        >
          {data.map((entry, i) => (
            <Cell key={i} fill={CATEGORY_COLORS[entry.name] || '#8A93A6'} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function SpendOverTimeChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(22,35,58,0.08)" />
        <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#16233A99' }} />
        <YAxis tick={{ fontSize: 12, fill: '#16233A99' }} />
        <Tooltip content={<CustomTooltip />} />
        <Line type="monotone" dataKey="cumulative" name="Cumulative spend" stroke="#2F6F63" strokeWidth={2.5} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
