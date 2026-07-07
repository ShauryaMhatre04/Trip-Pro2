export function Card({ className = '', children }) {
  return (
    <div className={`rounded-2xl border border-ink/10 bg-white/70 p-6 ${className}`}>
      {children}
    </div>
  );
}

const badgeVariants = {
  planning: 'bg-amber/20 text-amber-dark',
  upcoming: 'bg-teal/15 text-teal-dark',
  completed: 'bg-ink/10 text-ink/60',
  over: 'bg-coral/15 text-coral',
};

export function Badge({ variant = 'planning', children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${badgeVariants[variant] || badgeVariants.planning} ${className}`}
    >
      {children}
    </span>
  );
}