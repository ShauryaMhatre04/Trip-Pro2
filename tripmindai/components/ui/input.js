export function Label({ children, htmlFor, className = '' }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-xs font-semibold uppercase tracking-wide text-ink/60 mb-1.5 ${className}`}
    >
      {children}
    </label>
  );
}

export function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full rounded-lg border border-ink/20 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/35 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition ${className}`}
      {...props}
    />
  );
}

export function Textarea({ className = '', ...props }) {
  return (
    <textarea
      className={`w-full rounded-lg border border-ink/20 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/35 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition ${className}`}
      {...props}
    />
  );
}

export function Select({ className = '', children, ...props }) {
  return (
    <select
      className={`w-full rounded-lg border border-ink/20 bg-white px-3.5 py-2.5 text-sm text-ink focus:border-teal focus:ring-1 focus:ring-teal outline-none transition ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}